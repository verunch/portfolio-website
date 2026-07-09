import type { Tool } from '../../data/stack';
import TechIconButton from '../ui/TechIconButton';
import styles from './TechnologyPanel.module.css';

type TechnologyPanelProps = {
  technologies: Tool[];
};

export default function TechnologyPanel({ technologies }: TechnologyPanelProps) {
  return (
    <ul className={styles.panel}>
      {technologies.map((tech) => {
        const Icon = tech.icon;
        return (
          <li key={tech.id}>
            <TechIconButton icon={<Icon />} label={tech.name} dark={tech.dark} bordered={tech.bordered} />
          </li>
        );
      })}
    </ul>
  );
}
