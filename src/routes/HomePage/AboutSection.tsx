import SectionLabel from '../../components/ui/SectionLabel';
import { profile } from '../../data/profile';
import { useLocale } from '../../i18n/LocaleContext';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  const { t, l } = useLocale();

  return (
    <section aria-label={t.home.aboutLabel} className={styles.about}>
      <SectionLabel>{t.home.aboutLabel}</SectionLabel>
      <div className={styles.copy}>
        {l(profile.about.paragraphs).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
