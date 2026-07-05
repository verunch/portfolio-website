import SectionLabel from '../../components/ui/SectionLabel';
import StackGrid from '../../components/project/StackGrid';
import { stack } from '../../data/stack';
import styles from './StackSection.module.css';

export default function StackSection() {
  return (
    <section aria-label="My Stack" className={styles.section}>
      <div className={styles.header}>
        <SectionLabel>My Stack</SectionLabel>
        <p className={styles.subtitle}>— tools &amp; technologies I work with</p>
      </div>
      <StackGrid tools={stack} />
    </section>
  );
}
