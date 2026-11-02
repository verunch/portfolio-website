import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Project } from '../../data/projects';
import SectionLabel from '../../components/ui/SectionLabel';
import ImagePlaceholder from '../../components/ui/ImagePlaceholder';
import ProjectStatusBadge from '../../components/project/ProjectStatusBadge';
import ProjectResources from '../../components/project/ProjectResources';
import { useLocale } from '../../i18n/LocaleContext';
import styles from './CaseStudySection.module.css';

type CaseStudySectionProps = {
  project: Project;
  index: number;
};

export default function CaseStudySection({ project, index }: CaseStudySectionProps) {
  const { t, l } = useLocale();
  const [expanded, setExpanded] = useState(false);
  // Collapsed (the default): the text beside the cover is cut to the cover's
  // height (see .collapsed in CSS) — track whether anything is actually cut
  // off, so the toggle only shows up when there is more to read.
  const overviewRef = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const indexLabel = `${t.portfolio.projectIndex} ${String(index).padStart(2, '0')}`;
  const title = l(project.title);
  const cardType = project.cardType && l(project.cardType) !== title ? l(project.cardType) : undefined;
  const imageAlt = l(project.cover.imageAlt);
  // Case studies without copy yet show a placeholder in each field.
  const fieldText = (value: Project['overview']) => (value ? l(value) : t.portfolio.placeholderText);
  const showSolution = Boolean(project.solution) || (!project.product && !project.design && !project.solutionDetails);
  const detailLists = [
    {
      key: 'solution',
      label: t.portfolio.solution,
      items: project.solutionDetails,
    },
    { key: 'product', label: t.portfolio.product, items: project.product },
    { key: 'design', label: t.portfolio.design, items: project.design },
  ] as const;
  const hasDetailLists = Boolean(project.product || project.design || project.solutionDetails);
  // Without list blocks or metrics, extra blocks (e.g. AI) just continue the
  // text beside the cover instead of opening a section of their own below.
  const extraInIntro = !hasDetailLists && !project.metrics;
  const hasDetails = hasDetailLists || Boolean(project.metrics || (project.extraDetails && !extraInIntro));
  // Problem stays beside the cover, right after Role; it moves down only
  // when Solution is a list there, so the two stay next to each other.
  const problemBelow = Boolean(project.solutionDetails);
  const metrics = project.metrics ? l(project.metrics) : undefined;
  const renderList = (items: string[]) => (
    <ul className={styles.detailList}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );

  // Case-study-only images, distinct from the Portfolio Gallery thumbnail
  // (`src`): a stacked set (detailStack) or a single detailSrc.
  const detailImageSrc = project.cover.detailSrc ?? project.cover.src;
  const detailImages = project.cover.detailStack ?? (detailImageSrc ? [detailImageSrc] : []);

  // Static covers only — no click-to-enlarge, same as the gallery cards.
  const renderImage = (src: string) => <img key={src} src={src} alt={imageAlt} className={styles.heroImage} />;

  // Animated HTML embed (DocAssistant) takes precedence over images.
  const cover = project.cover.embedUrl ? (
    <iframe
      src={project.cover.embedUrl}
      title={imageAlt}
      className={`${styles.heroImage} ${styles.heroEmbed}`}
      loading="lazy"
    />
  ) : detailImages.length > 1 ? (
    <div className={styles.coverStack}>{detailImages.map(renderImage)}</div>
  ) : detailImages.length === 1 ? (
    renderImage(detailImages[0])
  ) : (
    <ImagePlaceholder label={imageAlt} aspectRatio="16 / 8" className={styles.heroImage} decorative />
  );

  useEffect(() => {
    const element = overviewRef.current;
    if (!element || expanded) return;
    const check = () => setOverflowing(element.scrollHeight > element.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(element);
    return () => observer.disconnect();
  }, [expanded]);

  // Expanded rows are separate grids (so each can sit beside or below the
  // floated cover) — line their label columns up at the widest label.
  useLayoutEffect(() => {
    const element = detailsRef.current;
    if (!element || !expanded) return;
    element.style.removeProperty('--label-width');
    const widths = Array.from(element.children, (row) => row.firstElementChild?.getBoundingClientRect().width ?? 0);
    element.style.setProperty('--label-width', `${Math.ceil(Math.max(...widths))}px`);
  }, [expanded]);

  const collapsible = hasDetails || overflowing;
  const collapsed = !expanded;
  const detailsId = `${project.slug}-details`;

  const toggle = () => {
    // Collapsing a long case from below would leave the reader far down the
    // page — bring the case's top back into view.
    if (expanded) {
      const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) sectionRef.current?.scrollIntoView({ block: 'start' });
    }
    setExpanded((value) => !value);
  };

  // A text link, not a button: it discloses more of the same text rather
  // than starting an action, so it shouldn't compete with the resource
  // tiles. Collapsed it sits under the text beside the cover; expanded, at
  // the end of the description.
  const toggleLink = collapsible && (
    <button
      type="button"
      className={styles.toggle}
      aria-expanded={expanded}
      aria-controls={`${project.slug}-overview${hasDetails ? ` ${detailsId}` : ''}`}
      onClick={toggle}
    >
      {expanded ? t.portfolio.hideFullDescription : t.portfolio.showFullDescription}
      <span aria-hidden="true">{expanded ? ' ↑' : ' ↓'}</span>
    </button>
  );

  return (
    <section
      ref={sectionRef}
      id={project.slug}
      className={`${styles.section} ${collapsed ? styles.collapsed : styles.expanded}`}
    >
      <div className={styles.header}>
        <div className={styles.headerLabel}>
          <SectionLabel>{indexLabel}</SectionLabel>
          <ProjectStatusBadge status={project.status} />
        </div>
        {/* Type on its own line above the title, in one heading; skipped when
            it would just repeat the title. */}
        <h3 className={styles.title}>
          {cardType && <span className={styles.titleType}>{cardType}</span>}
          {title}
        </h3>
      </div>

      <div className={styles.introGrid}>
        <div className={styles.mediaContainer}>{cover}</div>

        <div className={styles.textColumn}>
          <div
            ref={overviewRef}
            id={`${project.slug}-overview`}
            className={`${styles.overviewGrid} ${collapsed && overflowing ? styles.faded : ''}`}
          >
            <div className={styles.field}>
              <SectionLabel>{t.portfolio.overview}</SectionLabel>
              <p>{fieldText(project.overview)}</p>
            </div>

            <div className={styles.field}>
              <SectionLabel>{t.portfolio.role}</SectionLabel>
              <p>{fieldText(project.role)}</p>
            </div>

            {!problemBelow && (
              <div className={styles.field}>
                <SectionLabel>{t.portfolio.problem}</SectionLabel>
                <p>{fieldText(project.problem)}</p>
              </div>
            )}

            {showSolution && (
              <div className={styles.field}>
                <SectionLabel>{t.portfolio.solution}</SectionLabel>
                <p>{fieldText(project.solution)}</p>
              </div>
            )}

            {extraInIntro &&
              project.extraDetails?.map(({ label, items }) => (
                <div key={l(label)} className={styles.field}>
                  <SectionLabel>{l(label)}</SectionLabel>
                  {l(items).map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              ))}
          </div>

          {collapsed && toggleLink}
        </div>

        {/* Inside the intro so that, expanded, it flows on right after the text
            beside the cover and widens once the cover ends (see .expanded). */}
        {hasDetails && !collapsed && (
          <div ref={detailsRef} id={detailsId} className={styles.detailsGrid}>
            {problemBelow && (
              <div className={styles.field}>
                <SectionLabel>{t.portfolio.problem}</SectionLabel>
                <p>{fieldText(project.problem)}</p>
              </div>
            )}
            {detailLists.map(
              ({ key, label, items }) =>
                items && (
                  <div key={key} className={styles.field}>
                    <SectionLabel>{label}</SectionLabel>
                    {renderList(l(items))}
                  </div>
                ),
            )}
            {metrics && (
              <div className={styles.field}>
                <SectionLabel>{t.portfolio.metrics}</SectionLabel>
                {Array.isArray(metrics) ? renderList(metrics) : <p>{metrics}</p>}
              </div>
            )}
            {!extraInIntro &&
              project.extraDetails?.map(({ label, items }) => (
                <div key={l(label)} className={styles.field}>
                  <SectionLabel>{l(label)}</SectionLabel>
                  {renderList(l(items))}
                </div>
              ))}
          </div>
        )}
      </div>

      {expanded && toggleLink}

      <ProjectResources resources={project.resources} projectTitle={title} projectSlug={project.slug} />
    </section>
  );
}
