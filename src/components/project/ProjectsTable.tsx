import type { Project, ProjectResourceLink } from '../../data/projects';
import ProjectStatusBadge from './ProjectStatusBadge';
import styles from './ProjectsTable.module.css';

type ProjectsTableProps = {
  projects: Project[];
};

const RESOURCE_COLUMNS: Array<{
  key: keyof Project['resources'];
  label: string;
  abbr: string;
}> = [
  { key: 'caseStudy', label: 'Case Study', abbr: 'CS' },
  { key: 'uxResearch', label: 'UX Research', abbr: 'UX' },
  { key: 'uiMockups', label: 'UI Mockups', abbr: 'UI' },
  { key: 'mvp', label: 'MVP', abbr: 'MVP' },
  { key: 'github', label: 'GitHub', abbr: 'GH' },
];

type ResourceCellProps = {
  resource?: ProjectResourceLink;
  projectTitle: string;
  label: string;
  abbr: string;
};

// Renders icon-only / abbreviated / full-label presentations together and
// lets CSS pick which is visible per breakpoint (table -> condensed -> cards,
// ARCHITECTURE.md §6) — the accessible name stays constant regardless of
// which visual is shown.
function ResourceCell({ resource, projectTitle, label, abbr }: ResourceCellProps) {
  const accessibleName = `${label} — ${projectTitle}`;

  if (!resource) {
    return (
      <span className={styles.resourceEmpty} aria-label={`${accessibleName} — not available`}>
        <span className={styles.resourceIcon} aria-hidden="true">
          —
        </span>
        <span className={styles.resourceAbbr} aria-hidden="true">
          {abbr}
        </span>
        <span className={styles.resourceFull} aria-hidden="true">
          {label} —
        </span>
      </span>
    );
  }

  return (
    <a
      href={resource.href}
      className={styles.resourceLink}
      aria-label={accessibleName}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={styles.resourceIcon} aria-hidden="true">
        ↗
      </span>
      <span className={styles.resourceAbbr} aria-hidden="true">
        {abbr}
      </span>
      <span className={styles.resourceFull} aria-hidden="true">
        {label} ↗
      </span>
    </a>
  );
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <div className={styles.table}>
      <div className={styles.headerRowWide} aria-hidden="true">
        <span>Project</span>
        <span>Status</span>
        <span>Case Study</span>
        <span>UX Research</span>
        <span>UI Mockups</span>
        <span>MVP</span>
        <span>GitHub</span>
      </div>
      <div className={styles.headerRowCondensed} aria-hidden="true">
        <span>Project</span>
        <span>Status</span>
        <span className={styles.headerResources}>Resources</span>
      </div>

      <ul className={styles.list}>
        {projects.map((project) => (
          <li key={project.slug} className={styles.row}>
            <div className={styles.rowHead}>
              <a href={`/portfolio#${project.slug}`} className={styles.projectLink}>
                {project.title}
              </a>
              <ProjectStatusBadge status={project.status} />
            </div>
            <div className={styles.resourcesGroup}>
              {RESOURCE_COLUMNS.map(({ key, label, abbr }) => (
                <ResourceCell
                  key={key}
                  resource={project.resources[key]}
                  projectTitle={project.title}
                  label={label}
                  abbr={abbr}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
