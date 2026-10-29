import type { CSSProperties } from 'react';
import type { Project, ProjectResourceLink } from '../../data/projects';
import SectionLabel from '../ui/SectionLabel';
import { adjustTileColor } from '../../lib/color';
import { useLocale } from '../../i18n/LocaleContext';
import { trackGoal } from '../../lib/analytics';
import styles from './ProjectResources.module.css';

// Tile label/platform text comes from the active locale (`t.resources`).
// Every resource type has its own unique background color.
const RESOURCE_META: Array<{ key: keyof Project['resources']; background: string }> = [
  { key: 'caseStudy', background: '#F0F3F3' },
  { key: 'uxResearch', background: '#FCF1D0' },
  { key: 'uiMockups', background: '#F2DAC4' },
  { key: 'mvp', background: '#F2CB57' },
  { key: 'landingPage', background: '#E4ECDA' },
  { key: 'livePage', background: '#E2DCEF' },
  { key: 'website', background: '#D9E6EE' },
  { key: 'github', background: '#A4BFBA' },
];

type ProjectResourcesProps = {
  resources: Project['resources'];
  projectTitle: string;
  projectSlug: string;
};

export default function ProjectResources({ resources, projectTitle, projectSlug }: ProjectResourcesProps) {
  const { t, l } = useLocale();
  const available = RESOURCE_META.filter(({ key }) => resources[key] && !resources[key].tableOnly);

  if (available.length === 0) return null;

  return (
    <div className={styles.resources}>
      <SectionLabel>{t.portfolio.projectResources}</SectionLabel>
      <div className={styles.grid}>
        {available.map(({ key, background }) => {
          const resource = resources[key] as ProjectResourceLink;
          const label = resource.tile ? l(resource.tile.label) : t.resources[key].tile;
          const platform = resource.tile ? l(resource.tile.platform) : t.resources[key].platform;
          const isAccent = resource.accent;

          // Hover/active are derived from each tile's own background — more
          // saturated (10%/20%) and darker (10% each) — rather than one fixed
          // hover color for every resource type. Accent tiles skip this and
          // use the accent-hover/accent-active tokens instead (see CSS).
          const tileStyle = isAccent
            ? undefined
            : ({
                '--tile-bg': background,
                '--tile-bg-hover': adjustTileColor(background, 10, 10),
                '--tile-bg-active': adjustTileColor(background, 20, 10),
              } as CSSProperties);

          if (resource.onRequest) {
            return (
              <div
                key={key}
                role="link"
                aria-disabled="true"
                tabIndex={0}
                className={`${styles.tile} ${styles.tileDisabled}`}
                aria-label={`${label} — ${projectTitle} — ${t.access.onRequest}`}
                data-tooltip={t.access.onRequest}
              >
                <span className={styles.tileLabel}>{label}</span>
                <span className={styles.tilePlatform}>{t.access.onRequestShort}</span>
              </div>
            );
          }

          return (
            <a
              key={key}
              href={resource.href}
              className={`${styles.tile} ${isAccent ? styles.tileAccent : ''}`}
              style={tileStyle}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} — ${projectTitle}`}
              onClick={() =>
                trackGoal('project_resource_click', { project: projectSlug, resource: key, place: 'case_study' })
              }
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
