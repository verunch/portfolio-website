import { useEffect, useRef, useState } from 'react';
import type { Project } from '../../data/projects';
import SectionLabel from '../../components/ui/SectionLabel';
import ImagePlaceholder from '../../components/ui/ImagePlaceholder';
import ImageLightbox from '../../components/ui/ImageLightbox';
import ProjectStatusBadge from '../../components/project/ProjectStatusBadge';
import ProjectResources from '../../components/project/ProjectResources';
import styles from './CaseStudySection.module.css';

type CaseStudySectionProps = {
  project: Project;
  index: number;
};

// Lightbox is desktop-only (>=1200px) — matches the layout breakpoint where
// the cover image sits in its own column at natural viewing size.
const LIGHTBOX_QUERY = '(min-width: 1200px)';

export default function CaseStudySection({ project, index }: CaseStudySectionProps) {
  const indexLabel = `Project ${String(index).padStart(2, '0')}`;
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(LIGHTBOX_QUERY).matches);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const coverTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mql = window.matchMedia(LIGHTBOX_QUERY);
    const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const closeLightbox = () => {
    setLightboxOpen(false);
    coverTriggerRef.current?.focus();
  };

  // detailSrc (when present) is a case-study-only illustration, distinct
  // from the Portfolio Gallery thumbnail (`src`) — e.g. Ascendra Workspaces.
  const detailImageSrc = project.cover.detailSrc ?? project.cover.src;

  // Animated HTML embed (DocAssistant) is never wrapped in the lightbox
  // trigger — the lightbox is designed for viewing static images larger,
  // which doesn't apply to an auto-playing embed.
  const cover = project.cover.embedUrl ? (
    <iframe
      src={project.cover.embedUrl}
      title={project.cover.imageAlt}
      className={`${styles.heroImage} ${styles.heroEmbed}`}
      loading="lazy"
    />
  ) : detailImageSrc ? (
    <img src={detailImageSrc} alt={project.cover.imageAlt} className={styles.heroImage} />
  ) : (
    <ImagePlaceholder label={project.cover.imageAlt} aspectRatio="16 / 8" className={styles.heroImage} decorative />
  );

  return (
    <section id={project.slug} className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLabel}>
          <SectionLabel>{indexLabel}</SectionLabel>
          <ProjectStatusBadge status={project.status} />
        </div>
        <h2 className={styles.title}>{project.title}</h2>
      </div>

      <div className={styles.introGrid}>
        <div className={styles.mediaContainer}>
          {isDesktop && !project.cover.embedUrl ? (
            <button
              ref={coverTriggerRef}
              type="button"
              className={styles.coverButton}
              onClick={() => setLightboxOpen(true)}
              aria-label={`View larger image — ${project.cover.imageAlt}`}
            >
              {cover}
            </button>
          ) : (
            cover
          )}
        </div>

        <div className={styles.overviewGrid}>
          <div className={styles.field}>
            <SectionLabel>Overview</SectionLabel>
            <p>{project.overview}</p>
          </div>

          <div className={styles.field}>
            <SectionLabel>Role</SectionLabel>
            <p>{project.role}</p>
          </div>

          <div className={styles.field}>
            <SectionLabel>Problem</SectionLabel>
            <p>{project.problem}</p>
          </div>

          <div className={styles.field}>
            <SectionLabel>Solution</SectionLabel>
            <p>{project.solution}</p>
          </div>
        </div>
      </div>

      <ProjectResources resources={project.resources} projectTitle={project.title} />

      {lightboxOpen && detailImageSrc && (
        <ImageLightbox src={detailImageSrc} alt={project.cover.imageAlt} onClose={closeLightbox} />
      )}
    </section>
  );
}
