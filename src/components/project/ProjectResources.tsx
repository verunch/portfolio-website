import type { Project, ProjectResourceLink } from '../../data/projects';
import SectionLabel from '../ui/SectionLabel';
import styles from './ProjectResources.module.css';

const RESOURCE_META: Array<{ key: keyof Project['resources']; label: string; platform: string }> = [
  { key: 'caseStudy', label: 'Case Study', platform: 'Notion' },
  { key: 'uxResearch', label: 'UX Research', platform: 'Miro' },
  { key: 'uiMockups', label: 'UI Mockups', platform: 'Figma' },
  { key: 'mvp', label: 'MVP', platform: 'Live app' },
  { key: 'github', label: 'GitHub', platform: 'Repo' },
];

type ProjectResourcesProps = {
  resources: Project['resources'];
  projectTitle: string;
};

export default function ProjectResources({ resources, projectTitle }: ProjectResourcesProps) {
  return (
    <div className={styles.resources}>
      <SectionLabel>Project Resources</SectionLabel>
      <div className={styles.grid}>
        {RESOURCE_META.map(({ key, label, platform }) => {
          const resource: ProjectResourceLink | undefined = resources[key];

          if (!resource) {
            return (
              <span
                key={key}
                className={styles.tileEmpty}
                aria-label={`${label} — ${projectTitle} — not available`}
              >
                <span className={styles.tileLabel}>{label}</span>
                <span className={styles.tilePlatform}>—</span>
              </span>
            );
          }

          return (
            <a
              key={key}
              href={resource.href}
              className={styles.tile}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} — ${projectTitle}`}
            >
              <span className={styles.tileLabel}>{label}</span>
              <span className={styles.tilePlatform}>{platform} ↗</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
