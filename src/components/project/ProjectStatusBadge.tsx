import type { ProjectStatus } from '../../data/projects';
import styles from './ProjectStatusBadge.module.css';

const statusLabel: Record<ProjectStatus, string> = {
  ready: 'Ready',
  'coming-soon': 'Coming Soon',
  'mvp-coming-soon': 'MVP Coming Soon',
};

const statusClass: Record<ProjectStatus, string> = {
  ready: styles.shipped,
  'coming-soon': styles.concept,
  'mvp-coming-soon': styles.inProgress,
};

type ProjectStatusBadgeProps = {
  status: ProjectStatus;
};

export default function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  return <span className={`${styles.badge} ${statusClass[status]}`}>{statusLabel[status]}</span>;
}
