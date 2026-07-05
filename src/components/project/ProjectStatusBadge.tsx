import type { ProjectStatus } from '../../data/projects';
import styles from './ProjectStatusBadge.module.css';

const statusLabel: Record<ProjectStatus, string> = {
  shipped: 'Shipped',
  'in-progress': 'In progress',
  concept: 'Concept',
};

const statusClass: Record<ProjectStatus, string> = {
  shipped: styles.shipped,
  'in-progress': styles.inProgress,
  concept: styles.concept,
};

type ProjectStatusBadgeProps = {
  status: ProjectStatus;
};

export default function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  return <span className={`${styles.badge} ${statusClass[status]}`}>{statusLabel[status]}</span>;
}
