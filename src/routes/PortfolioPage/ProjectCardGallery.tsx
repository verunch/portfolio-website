import type { Project } from '../../data/projects';
import ImagePlaceholder from '../../components/ui/ImagePlaceholder';
import styles from './ProjectCardGallery.module.css';

type ProjectCardGalleryProps = {
  projects: Project[];
};

export default function ProjectCardGallery({ projects }: ProjectCardGalleryProps) {
  return (
    <ul className={styles.gallery}>
      {projects.map((project) => (
        <li key={project.slug}>
          <a href={`#${project.slug}`} className={styles.card}>
            <ImagePlaceholder label={project.cover.imageAlt} aspectRatio="16 / 10" decorative />
            <div className={styles.cardBody}>
              <span className={styles.cardTitle}>{project.title}</span>
              <span className={styles.cardSlug}>#{project.slug} →</span>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
