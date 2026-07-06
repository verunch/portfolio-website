import type { Project } from '../../data/projects';
import SectionLabel from '../../components/ui/SectionLabel';
import ImagePlaceholder from '../../components/ui/ImagePlaceholder';
import ProjectStatusBadge from '../../components/project/ProjectStatusBadge';
import ProjectResources from '../../components/project/ProjectResources';
import styles from './CaseStudySection.module.css';

type CaseStudySectionProps = {
  project: Project;
  index: number;
};

export default function CaseStudySection({ project, index }: CaseStudySectionProps) {
  const indexLabel = `Project ${String(index).padStart(2, '0')}`;

  return (
    <section id={project.slug} className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLabel}>
          <SectionLabel>{indexLabel}</SectionLabel>
          <ProjectStatusBadge status={project.status} />
        </div>
        <h2 className={styles.title}>{project.title}</h2>
        <ImagePlaceholder
          label={project.cover.imageAlt}
          aspectRatio="16 / 8"
          className={styles.heroImage}
          decorative
        />
      </div>

      <div className={styles.overviewGrid}>
        <SectionLabel>Overview</SectionLabel>
        <p>{project.overview}</p>

        <SectionLabel>Role</SectionLabel>
        <p>{project.role}</p>

        <SectionLabel>Problem</SectionLabel>
        <p>{project.problem}</p>

        <SectionLabel>Solution</SectionLabel>
        <div className={styles.solution}>
          <p>{project.solution}</p>
          {project.solutionMedia && (
            <ImagePlaceholder label={project.solutionMedia.imageAlt} aspectRatio="16 / 9" decorative />
          )}
        </div>

        <SectionLabel>Outcome</SectionLabel>
        <p>{project.outcome}</p>
      </div>

      <ProjectResources resources={project.resources} projectTitle={project.title} />
    </section>
  );
}
