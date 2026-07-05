import SectionLabel from '../../components/ui/SectionLabel';
import { profile } from '../../data/profile';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section aria-label="About" className={styles.about}>
      <SectionLabel>About</SectionLabel>
      <div className={styles.copy}>
        {profile.about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
