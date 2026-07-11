import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import Button from '../ui/Button';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import { profile } from '../../data/profile';
import portraitSrc from '../../../assets/images/portrrait5.webp';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import styles from './ResumeModal.module.css';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const MIN_SCALE = 0.6;
const MAX_SCALE = 2.2;
const SCALE_STEP = 0.2;

type ResumeModalProps = {
  onClose: () => void;
};

export default function ResumeModal({ onClose }: ResumeModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pagesScrollRef = useRef<HTMLDivElement>(null);
  const pagesContainerRef = useRef<HTMLDivElement>(null);
  const pdfDocRef = useRef<PDFDocumentProxy | null>(null);
  const pageWrappersRef = useRef<Map<number, HTMLDivElement>>(new Map());
  const visiblePagesRef = useRef<Set<number>>(new Set());

  const [isClosing, setIsClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [scale, setScale] = useState(1);
  const [supportsFullscreen, setSupportsFullscreen] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useBodyScrollLock();

  // Closing plays the reverse animation before the component actually unmounts.
  const requestClose = () => setIsClosing(true);

  useEffect(() => {
    setSupportsFullscreen(Boolean(document.documentElement.requestFullscreen));
  }, []);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        requestClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Lazy-loads pdf.js only once the modal is actually open. Every page gets a
  // placeholder sized to its real aspect ratio up front (so scroll height and
  // position stay stable), but the canvas itself is only rendered once the
  // placeholder scrolls near the viewport, and torn down again once it scrolls
  // far past it — a long résumé shouldn't hold dozens of full-res canvases in
  // memory at once.
  useEffect(() => {
    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let viewportObserver: IntersectionObserver | null = null;
    const pageEntries: Array<{
      wrapper: HTMLDivElement;
      pageNumber: number;
      renderToken: number;
      renderTask: { cancel: () => void } | null;
    }> = [];

    async function renderPdf() {
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.min.mjs',
          import.meta.url,
        ).toString();

        const pdf = await pdfjs.getDocument(profile.resumeUrl).promise;
        if (cancelled) {
          pdf.destroy();
          return;
        }
        pdfDocRef.current = pdf;

        const container = pagesContainerRef.current;
        if (!container) return;
        container.innerHTML = '';
        pageWrappersRef.current.clear();
        visiblePagesRef.current.clear();

        const outputScale = window.devicePixelRatio || 1;

        const renderPage = async (entry: (typeof pageEntries)[number]) => {
          const token = entry.renderToken;
          const page = await pdf.getPage(entry.pageNumber);
          if (cancelled || token !== entry.renderToken) return;

          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          canvas.className = styles.pageCanvas;
          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);
          entry.wrapper.innerHTML = '';
          entry.wrapper.appendChild(canvas);

          const context = canvas.getContext('2d');
          if (!context) return;

          const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;
          const task = page.render({ canvasContext: context, viewport, transform });
          entry.renderTask = task;
          try {
            await task.promise;
          } catch {
            // Cancelled render (e.g. scrolled away mid-render) — nothing to do.
          }
        };

        const unloadPage = (entry: (typeof pageEntries)[number]) => {
          entry.renderToken += 1;
          entry.renderTask?.cancel();
          entry.renderTask = null;
          entry.wrapper.innerHTML = '';
        };

        // First page up front to size the placeholders; the rest fetched as
        // getPage() resolves near-instantly once the document is parsed.
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (cancelled) return;
          const page = await pdf.getPage(pageNumber);
          const viewport = page.getViewport({ scale });

          const wrapper = document.createElement('div');
          wrapper.className = styles.page;
          wrapper.style.width = `${Math.floor(viewport.width)}px`;
          wrapper.style.aspectRatio = `${viewport.width} / ${viewport.height}`;
          container.appendChild(wrapper);
          pageEntries.push({ wrapper, pageNumber, renderToken: 0, renderTask: null });
          pageWrappersRef.current.set(pageNumber, wrapper);
        }

        if (cancelled) return;
        setIsLoading(false);
        setNumPages(pdf.numPages);

        observer = new IntersectionObserver(
          (observedEntries) => {
            for (const observed of observedEntries) {
              const entry = pageEntries.find((candidate) => candidate.wrapper === observed.target);
              if (!entry) continue;
              if (observed.isIntersecting) {
                renderPage(entry);
              } else {
                unloadPage(entry);
              }
            }
          },
          // Renders slightly before a page enters view and unloads once it's
          // fully scrolled past this margin, so scrolling stays smooth.
          { root: pagesScrollRef.current, rootMargin: '600px 0px', threshold: 0.01 },
        );

        // Separate, tight-margin observer just for the prev/next "current
        // page" readout — the wide preload margin above would otherwise keep
        // counting a page as "current" long after it scrolled off-screen.
        viewportObserver = new IntersectionObserver(
          (observedEntries) => {
            for (const observed of observedEntries) {
              const entry = pageEntries.find((candidate) => candidate.wrapper === observed.target);
              if (!entry) continue;
              if (observed.isIntersecting) {
                visiblePagesRef.current.add(entry.pageNumber);
              } else {
                visiblePagesRef.current.delete(entry.pageNumber);
              }
            }
            if (visiblePagesRef.current.size > 0) {
              setCurrentPage(Math.min(...visiblePagesRef.current));
            }
          },
          { root: pagesScrollRef.current, rootMargin: '0px', threshold: 0.5 },
        );

        pageEntries.forEach((entry) => {
          observer?.observe(entry.wrapper);
          viewportObserver?.observe(entry.wrapper);
        });
      } catch {
        if (!cancelled) {
          setLoadError(true);
          setIsLoading(false);
        }
      }
    }

    renderPdf();

    return () => {
      cancelled = true;
      observer?.disconnect();
      viewportObserver?.disconnect();
      pageEntries.forEach((entry) => entry.renderTask?.cancel());
      pageWrappersRef.current.clear();
      visiblePagesRef.current.clear();
      pdfDocRef.current?.destroy();
      pdfDocRef.current = null;
    };
  }, [scale]);

  const handleBackdropClick = () => requestClose();

  const handleAnimationEnd = () => {
    if (isClosing) onClose();
  };

  const handleFullscreen = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      dialog.requestFullscreen?.();
    }
  };

  const zoomIn = () => setScale((current) => Math.min(MAX_SCALE, +(current + SCALE_STEP).toFixed(2)));
  const zoomOut = () => setScale((current) => Math.max(MIN_SCALE, +(current - SCALE_STEP).toFixed(2)));

  const goToPage = (target: number) => {
    const clamped = Math.min(Math.max(target, 1), numPages || 1);
    pageWrappersRef.current.get(clamped)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const goToPrevPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  return createPortal(
    <div
      className={`${styles.backdrop} ${isClosing ? styles.backdropClosing : ''}`}
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        className={`${styles.dialog} ${isClosing ? styles.dialogClosing : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Résumé"
        onClick={(event) => event.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
      >
        <header className={styles.header}>
          <h2 className={styles.headerTitle}>Resume</h2>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={requestClose}
            aria-label="Close résumé preview"
          >
            ×
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.profileSummary}>
            <img src={portraitSrc} alt="" className={styles.avatar} />
            <div className={styles.profileMeta}>
              <p className={styles.profileName}>{profile.name}</p>
              <p className={styles.profileRoles}>{profile.roles.join(' · ')}</p>
              <dl className={styles.factGrid}>
                <div className={styles.fact}>
                  <dt>Languages</dt>
                  <dd>{profile.languages}</dd>
                </div>
                <div className={styles.fact}>
                  <dt>Location</dt>
                  <dd>{profile.location}</dd>
                </div>
                <div className={styles.fact}>
                  <dt>Experience</dt>
                  <dd>{profile.experienceSummary}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className={styles.viewer}>
            <div className={styles.pageNav}>
              <button
                type="button"
                className={styles.pageNavButton}
                onClick={goToPrevPage}
                disabled={currentPage <= 1}
                aria-label="Previous page"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                className={styles.pageNavButton}
                onClick={goToNextPage}
                disabled={numPages === 0 || currentPage >= numPages}
                aria-label="Next page"
              >
                <ChevronRightIcon />
              </button>
            </div>

            <div className={styles.zoomControls}>
              <button
                type="button"
                className={styles.zoomButton}
                onClick={zoomOut}
                disabled={scale <= MIN_SCALE}
                aria-label="Zoom out"
              >
                −
              </button>
              <button
                type="button"
                className={styles.zoomButton}
                onClick={zoomIn}
                disabled={scale >= MAX_SCALE}
                aria-label="Zoom in"
              >
                +
              </button>
            </div>

            {isLoading && <p className={styles.viewerStatus}>Loading résumé…</p>}
            {loadError && (
              <p className={styles.viewerStatus}>
                Couldn't load the preview.{' '}
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                  Open the PDF directly
                </a>
                .
              </p>
            )}
            <div className={styles.pagesScroll} ref={pagesScrollRef}>
              <div ref={pagesContainerRef} className={styles.pagesContainer} />
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          {supportsFullscreen && (
            <Button variant="primary" onClick={handleFullscreen} className={styles.footerButton}>
              Open Full Screen
            </Button>
          )}
          <Button
            variant="outline"
            href={profile.resumeUrl}
            download="Vera-Bakerava-Resume.pdf"
            className={styles.footerButton}
          >
            Download PDF
          </Button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
