import { Fragment } from 'react';
import Divider from '../../components/ui/Divider';
import { useScrollToHash } from '../../hooks/useScrollToHash';
import { projects } from '../../data/projects';
import PortfolioHero from './PortfolioHero';
import ProjectCardGallery from './ProjectCardGallery';
import CaseStudySection from './CaseStudySection';
import styles from './PortfolioPage.module.css';

export default function PortfolioPage() {
  useScrollToHash();

  return (
    <div className={styles.page}>
      <PortfolioHero />
      <ProjectCardGallery projects={projects} />
      {/* 2px brand-colored rule — the one documented exception to hairline
          dividers between sections (ARCHITECTURE.md §14). */}
      <hr className={styles.accentRule} />
      {projects.map((project, index) => (
        <Fragment key={project.slug}>
          {index > 0 && <Divider />}
          <CaseStudySection project={project} index={index + 1} />
        </Fragment>
      ))}
    </div>
  );
}
