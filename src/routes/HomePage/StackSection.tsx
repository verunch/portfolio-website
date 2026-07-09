import SectionLabel from '../../components/ui/SectionLabel';
import TechnologyPanel from '../../components/project/TechnologyPanel';
import { stack } from '../../data/stack';
import styles from './StackSection.module.css';

export default function StackSection() {
  return (
    <section aria-label="My Stack" className={styles.section}>
      <div className={styles.header}>
        <SectionLabel>My Stack</SectionLabel>
        <p className={styles.subtitle}>— tools &amp; technologies I work with</p>
      </div>
      <TechnologyPanel technologies={stack} />
    </section>
  );
}
