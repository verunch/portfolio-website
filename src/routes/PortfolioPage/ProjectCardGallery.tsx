import type { Project } from '../../data/projects';
import ImagePlaceholder from '../../components/ui/ImagePlaceholder';
import { useLocale } from '../../i18n/LocaleContext';
import styles from './ProjectCardGallery.module.css';

type ProjectCardGalleryProps = {
  projects: Project[];
};

export default function ProjectCardGallery({ projects }: ProjectCardGalleryProps) {
  const { l } = useLocale();

  return (
    <ul className={styles.gallery}>
      {projects.map((project) => (
        <li key={project.slug}>
          <a href={`#${project.slug}`} className={styles.card}>
            <div className={styles.coverContainer}>
              {project.cover.galleryEmbedUrl ?? project.cover.embedUrl ? (
                <iframe
                  src={project.cover.galleryEmbedUrl ?? project.cover.embedUrl}
                  title={l(project.cover.imageAlt)}
                  className={styles.coverEmbed}
                  scrolling="no"
                  loading="lazy"
                />
              ) : project.cover.src ? (
                <img src={project.cover.src} alt={l(project.cover.imageAlt)} className={styles.cover} />
              ) : (
                <ImagePlaceholder label={l(project.cover.imageAlt)} aspectRatio="16 / 10" decorative />
              )}
            </div>
            <div className={styles.cardBody}>
              <span className={styles.cardTitle}>{l(project.title)}</span>
              <span className={styles.cardSlug}>#{project.slug} →</span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
