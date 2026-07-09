import type { Project, ProjectResourceLink } from '../../data/projects';
import SectionLabel from '../ui/SectionLabel';
import styles from './ProjectResources.module.css';

const RESOURCE_META: Array<{ key: keyof Project['resources']; label: string; platform: string; background: string }> = [
  { key: 'caseStudy', label: 'Case Study', platform: 'Notion', background: '#F0F3F3' },
  { key: 'uxResearch', label: 'UX Research', platform: 'Miro', background: '#FCF1D0' },
  { key: 'uiMockups', label: 'UI Mockups', platform: 'Figma', background: '#F2DAC4' },
  { key: 'mvp', label: 'MVP', platform: 'Live app', background: '#F2CB57' },
  { key: 'github', label: 'GitHub', platform: 'Repo', background: '#A4BFBA' },
];

type ProjectResourcesProps = {
  resources: Project['resources'];
  projectTitle: string;
};

export default function ProjectResources({ resources, projectTitle }: ProjectResourcesProps) {
  const available = RESOURCE_META.filter(({ key }) => resources[key]);

  if (available.length === 0) return null;

  return (
    <div className={styles.resources}>
      <SectionLabel>Project Resources</SectionLabel>
      <div className={styles.grid}>
        {available.map(({ key, label, platform, background }) => {
          const resource = resources[key] as ProjectResourceLink;
          const isAccent = resource.accent;

          return (
            <a
              key={key}
              href={resource.href}
              className={`${styles.tile} ${isAccent ? styles.tileAccent : ''}`}
              style={isAccent ? undefined : { background }}
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
