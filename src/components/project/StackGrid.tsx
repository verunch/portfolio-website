import type { Tool } from '../../data/stack';
import styles from './StackGrid.module.css';

type StackGridProps = {
  tools: Tool[];
};

export default function StackGrid({ tools }: StackGridProps) {
  return (
    <ul className={styles.grid}>
      {tools.map((tool) => (
        <li key={tool.id} className={styles.item}>
          <span className={styles.badge} aria-hidden="true">
            {tool.label}
          </span>
          <span className={styles.name}>{tool.name}</span>
        </li>
      ))}
    </ul>
  );
}
