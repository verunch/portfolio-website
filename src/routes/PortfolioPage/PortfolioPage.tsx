import { Fragment } from 'react';
import Divider from '../../components/ui/Divider';
import { useScrollToHash } from '../../hooks/useScrollToHash';
import { projects, type ProjectGroup } from '../../data/projects';
import { useLocale } from '../../i18n/LocaleContext';
import PortfolioHero from './PortfolioHero';
import ProjectCardGallery from './ProjectCardGallery';
import CaseStudySection from './CaseStudySection';
import PageFooterNav from '../../components/layout/PageFooterNav';
import styles from './PortfolioPage.module.css';

// Subsection order on the page.
const GROUPS: ProjectGroup[] = ['saas', 'showcase'];

export default function PortfolioPage() {
  useScrollToHash();
  const { t } = useLocale();

  const portfolioProjects = projects.filter((project) => project.showOnPortfolioPage);
  const groups = GROUPS.map((group) => ({
    group,
    projects: portfolioProjects.filter((project) => project.group === group),
  })).filter(({ projects: groupProjects }) => groupProjects.length > 0);

  return (
    <div className={styles.page}>
      <PortfolioHero />
      {/* All card galleries first, one per subsection… */}
      {groups.map(({ group, projects: groupProjects }) => (
        <section key={group} aria-labelledby={`group-${group}-cards`} className={styles.cardsGroup}>
          <h2 id={`group-${group}-cards`} className={styles.groupTitle}>
            {t.portfolio.groups[group]}
          </h2>
          <ProjectCardGallery projects={groupProjects} />
        </section>
      ))}
      {/* …then every case study as one continuous list: websites & apps
          first, then cases (same order as the galleries above). */}
      {groups
        .flatMap(({ projects: groupProjects }) => groupProjects)
        .map((project, index) => (
          <Fragment key={project.slug}>
            {index > 0 && <Divider />}
            <CaseStudySection project={project} index={index + 1} />
          </Fragment>
        ))}
      <PageFooterNav currentPath="/portfolio" divider={false} />
    </div>
  );
}
