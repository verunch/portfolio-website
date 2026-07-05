import type { Tool } from '../../data/stack';
import styles from './StackGrid.module.css';

type StackGridProps = {
  tools: Tool[];
};

// Text labels removed per product decision (docs/architecture/DECISIONS.md) —
// the badge communicates the technology on its own. The full name stays in
// the accessible tree via a visually-hidden span.
export default function StackGrid({ tools }: StackGridProps) {
  return (
    <ul className={styles.grid}>
      {tools.map((tool) => (
        <li key={tool.id} className={styles.item}>
          <span className={styles.badge}>
            <span aria-hidden="true">{tool.label}</span>
            <span className={styles.srOnly}>{tool.name}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
