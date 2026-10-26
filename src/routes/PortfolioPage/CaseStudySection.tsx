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
  const indexLabel = `${t.portfolio.projectIndex} ${String(index).padStart(2, '0')}`;
  const title = l(project.title);
  const imageAlt = l(project.cover.imageAlt);
  // Case studies without copy yet show a placeholder in each field.
  const fieldText = (value: Project['overview']) => (value ? l(value) : t.portfolio.placeholderText);
  const showSolution = Boolean(project.solution) || (!project.product && !project.design);
  const detailLists = [
    { key: 'product', label: t.portfolio.product, items: project.product },
    { key: 'design', label: t.portfolio.design, items: project.design },
  ] as const;
  const hasDetails = Boolean(project.product || project.design || project.metrics);

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

  return (
    <section id={project.slug} className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLabel}>
          <SectionLabel>{indexLabel}</SectionLabel>
          <ProjectStatusBadge status={project.status} />
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <div className={styles.introGrid}>
        <div className={styles.mediaContainer}>{cover}</div>

        <div className={styles.overviewGrid}>
          <div className={styles.field}>
            <SectionLabel>{t.portfolio.overview}</SectionLabel>
            <p>{fieldText(project.overview)}</p>
          </div>

          <div className={styles.field}>
            <SectionLabel>{t.portfolio.role}</SectionLabel>
            <p>{fieldText(project.role)}</p>
          </div>

          <div className={styles.field}>
            <SectionLabel>{t.portfolio.problem}</SectionLabel>
            <p>{fieldText(project.problem)}</p>
          </div>

          {showSolution && (
            <div className={styles.field}>
              <SectionLabel>{t.portfolio.solution}</SectionLabel>
              <p>{fieldText(project.solution)}</p>
            </div>
          )}
        </div>
      </div>

      {hasDetails && (
        <div className={styles.detailsGrid}>
          {detailLists.map(
            ({ key, label, items }) =>
              items && (
                <div key={key} className={styles.field}>
                  <SectionLabel>{label}</SectionLabel>
                  <ul className={styles.detailList}>
                    {l(items).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ),
          )}
          {project.metrics && (
            <div className={styles.field}>
              <SectionLabel>{t.portfolio.metrics}</SectionLabel>
              <p>{l(project.metrics)}</p>
            </div>
          )}
        </div>
      )}

      <ProjectResources resources={project.resources} projectTitle={title} projectSlug={project.slug} />

    </section>
  );
}
