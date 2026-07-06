import type { Tool } from '../../data/stack';
import styles from './StackGrid.module.css';

type StackGridProps = {
  tools: Tool[];
};

// Badge-only, brand-colored per tool (product decision, docs/architecture/
// DECISIONS.md) — recognizable without reproducing any logo artwork. Full
// name stays in the accessible tree via a visually-hidden span.
export default function StackGrid({ tools }: StackGridProps) {
  return (
    <ul className={styles.grid}>
      {tools.map((tool) => (
        <li key={tool.id} className={styles.item}>
          <span
            className={styles.badge}
            style={{
              background: tool.brandColor,
              color: tool.textColor === 'light' ? '#ffffff' : '#1a1a1a',
            }}
          >
            <span aria-hidden="true">{tool.label}</span>
            <span className={styles.srOnly}>{tool.name}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
