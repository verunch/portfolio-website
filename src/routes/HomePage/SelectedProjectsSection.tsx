import { useState } from 'react';
import SectionLabel from '../../components/ui/SectionLabel';
import Button from '../../components/ui/Button';
import ProjectsTable from '../../components/project/ProjectsTable';
import { projects } from '../../data/projects';
import { useLocale } from '../../i18n/LocaleContext';
import { trackGoal } from '../../lib/analytics';
import styles from './SelectedProjectsSection.module.css';

// Rows follow data order — the same as the Portfolio cards. The first
// FEATURED_COUNT are shown while the table is collapsed.
const FEATURED_COUNT = 5;

const featured = projects.slice(0, FEATURED_COUNT);
const rest = projects.slice(FEATURED_COUNT);

export default function SelectedProjectsSection() {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState(false);

  return (
    <section aria-label={t.home.selectedProjectsLabel} className={styles.section}>
      {/* Phones only — the hero's "Start a project" button moves here. */}
      <Button
        variant="primary"
        href="/services"
        className={styles.orderButton}
        onClick={() => trackGoal('order_cta_click', { place: 'projects' })}
      >
        {t.home.orderCta}
      </Button>
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
