import ActionButton from '../ui/ActionButton';
import type { Project } from '../../data/projects';
import ProjectStatusBadge from './ProjectStatusBadge';
import styles from './ProjectsTable.module.css';

type ProjectsTableProps = {
  projects: Project[];
};

type ResourceKey = keyof Project['resources'];

type ColumnDef = {
  key: ResourceKey;
  label: string;
};

// Order drives both the header row and every project row — single source
// so columns can't drift out of sync.
const RESOURCE_COLUMNS: ColumnDef[] = [
  { key: 'caseStudy', label: 'Case Study' },
  { key: 'uiMockups', label: 'UI (Figma)' },
  { key: 'uxResearch', label: 'UX (Miro)' },
  { key: 'mvp', label: 'MVP' },
  { key: 'landingPage', label: 'Landing Page' },
  { key: 'github', label: 'GitHub' },
];

const HEADER_LABELS = ['Project', 'Status', ...RESOURCE_COLUMNS.map((column) => column.label)];

type ResourceCellProps = {
  project: Project;
  column: ColumnDef;
};

// Renders a button only when the project has a URL for this resource. With
// no URL the cell is left empty — no dash, no disabled button, no empty
// wrapper — and `.cell:empty` collapses it entirely on mobile cards while
// still holding its column position in the desktop/tablet grid.
function ResourceCell({ project, column }: ResourceCellProps) {
  const resource = project.resources[column.key];

  if (!resource) {
    return <div className={styles.cell} role="cell" />;
  }

  return (
    <div className={styles.cell} role="cell">
      <span className={styles.cellLabel} aria-hidden="true">
        {column.label}
      </span>
      <div className={styles.buttonSlot}>
        <ActionButton href={resource.href} ariaLabel={`${column.label} — ${project.title}`} />
      </div>
    </div>
  );
}

type ProjectCellProps = {
  project: Project;
};

function ProjectCell({ project }: ProjectCellProps) {
  // Portfolio Website has no case-study section on /portfolio — its anchor
  // points at the Home page (its own heading) instead.
  const nameHref = project.slug === 'portfolio-website' ? '/' : `/portfolio#${project.slug}`;

  return (
    <div className={`${styles.cell} ${styles.colProject}`} role="cell">
      <span className={styles.cellLabel} aria-hidden="true">
        Project
      </span>
      <div className={styles.projectMeta}>
        <span className={styles.projectTitle}>{project.title}</span>
        <div className={styles.buttonSlot}>
          <ActionButton href={nameHref} ariaLabel={`View ${project.title}`} external={false} />
        </div>
      </div>
    </div>
  );
}

function StatusCell({ project }: ProjectCellProps) {
  return (
    <div className={styles.cell} role="cell">
      <span className={styles.cellLabel} aria-hidden="true">
        Status
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
        <ResourceCell key={column.key} project={project} column={column} />
      ))}
    </div>
  );
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <div className={styles.table} role="table" aria-label="Selected Projects">
      <div className={styles.headerRow} role="row">
        {HEADER_LABELS.map((label) => (
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
