import { useState } from 'react';
import SectionLabel from '../../components/ui/SectionLabel';
import Button from '../../components/ui/Button';
import ProjectsTable from '../../components/project/ProjectsTable';
import { projects, type Project } from '../../data/projects';
import { useLocale } from '../../i18n/LocaleContext';
import styles from './SelectedProjectsSection.module.css';

// Rows shown while the table is collapsed, in this order. "Show all" adds
// the remaining projects after them in data order.
const FEATURED_SLUGS = ['social-radar', 'bioquest', 'photographer-portfolio', 'ascendra'];

const featured = FEATURED_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter(
  (project): project is Project => Boolean(project),
);
const rest = projects.filter((project) => !FEATURED_SLUGS.includes(project.slug));

export default function SelectedProjectsSection() {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState(false);

  return (
    <section aria-label={t.home.selectedProjectsLabel} className={styles.section}>
      <SectionLabel>{t.home.selectedProjectsLabel}</SectionLabel>
      <div id="selected-projects-table">
        <ProjectsTable projects={expanded ? [...featured, ...rest] : featured} />
      </div>
      {rest.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          className={styles.toggle}
          aria-expanded={expanded}
          aria-controls="selected-projects-table"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? t.home.showLess : `${t.home.showAll} (${projects.length})`}
        </Button>
      )}
    </section>
  );
}
