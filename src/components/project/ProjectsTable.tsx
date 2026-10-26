import ActionButton from '../ui/ActionButton';
import type { Project } from '../../data/projects';
import ProjectStatusBadge from './ProjectStatusBadge';
import { useLocale } from '../../i18n/LocaleContext';
import { trackGoal } from '../../lib/analytics';
import styles from './ProjectsTable.module.css';

type ProjectsTableProps = {
  projects: Project[];
};

type ResourceKey = keyof Project['resources'];

// Order drives both the header row and every project row — single source
// so columns can't drift out of sync. Labels come from the active locale.
const RESOURCE_COLUMNS: ResourceKey[] = [
  'caseStudy',
  'uiMockups',
  'uxResearch',
  'mvp',
  'landingPage',
  'livePage',
  'website',
  'github',
];

type ResourceCellProps = {
  project: Project;
  column: ResourceKey;
};

// Renders a button only when the project has a URL for this resource. With
// no URL the cell is left empty — no dash, no disabled button, no empty
// wrapper — and `.cell:empty` collapses it entirely on mobile cards while
// still holding its column position in the desktop/tablet grid.
function ResourceCell({ project, column }: ResourceCellProps) {
  const { t, l } = useLocale();
  const resource = project.resources[column];
  const label = t.resources[column].column;

  if (!resource) {
    return <div className={styles.cell} role="cell" />;
  }

  return (
    <div className={styles.cell} role="cell">
      <span className={styles.cellLabel} aria-hidden="true">
        {label}
      </span>
      <div className={styles.buttonSlot}>
        <ActionButton
          href={resource.href}
          ariaLabel={`${label} — ${l(project.title)}`}
          onClick={() =>
            trackGoal('project_resource_click', { project: project.slug, resource: column, place: 'home_table' })
          }
          disabledReason={resource.onRequest ? t.access.onRequest : undefined}
        />
      </div>
    </div>
  );
}

type ProjectCellProps = {
  project: Project;
};

function ProjectCell({ project }: ProjectCellProps) {
  const { t, l } = useLocale();
  const title = l(project.title);
  // Only projects with a case-study section on /portfolio get an arrow
  // button (e.g. Cell Culture Monitoring Workspace has none yet).
  const nameHref = `/portfolio#${project.slug}`;

  return (
    <div className={`${styles.cell} ${styles.colProject}`} role="cell">
      <span className={styles.cellLabel} aria-hidden="true">
        {t.table.project}
      </span>
      <div className={styles.projectMeta}>
        <span className={styles.projectTitle}>{title}</span>
        {project.showOnPortfolioPage && (
          <div className={styles.buttonSlot}>
            <ActionButton href={nameHref} ariaLabel={`${t.table.viewProject} ${title}`} external={false} />
          </div>
        )}
      </div>
    </div>
  );
}

function StatusCell({ project }: ProjectCellProps) {
  const { t } = useLocale();

  return (
    <div className={styles.cell} role="cell">
      <span className={styles.cellLabel} aria-hidden="true">
        {t.table.status}
      </span>
      <ProjectStatusBadge status={project.status} />
    </div>
  );
}

function ProjectRow({ project }: ProjectCellProps) {
  return (
    <div className={styles.row} role="row">
      <ProjectCell project={project} />
      <StatusCell project={project} />
      {RESOURCE_COLUMNS.map((column) => (
        <ResourceCell key={column} project={project} column={column} />
      ))}
    </div>
  );
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const { t } = useLocale();
  const headerLabels = [
    t.table.project,
    t.table.status,
    ...RESOURCE_COLUMNS.map((column) => t.resources[column].column),
  ];

  return (
    <div className={styles.table} role="table" aria-label={t.home.selectedProjectsLabel}>
      <div className={styles.headerRow} role="row">
        {headerLabels.map((label) => (
          <div key={label} className={styles.headerCell} role="columnheader">
            {label}
          </div>
        ))}
      </div>

      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}
    </div>
  );
}
