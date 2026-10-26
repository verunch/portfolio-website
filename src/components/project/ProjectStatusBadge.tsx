import type { ProjectStatus } from '../../data/projects';
import { useLocale } from '../../i18n/LocaleContext';
import styles from './ProjectStatusBadge.module.css';

const statusClass: Record<ProjectStatus, string> = {
  ready: styles.shipped,
  'coming-soon': styles.concept,
  'mvp-coming-soon': styles.inProgress,
};

type ProjectStatusBadgeProps = {
  status: ProjectStatus;
};

export default function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const { t } = useLocale();

  return <span className={`${styles.badge} ${statusClass[status]}`}>{t.status[status]}</span>;
}
