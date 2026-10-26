import SectionLabel from '../../components/ui/SectionLabel';
import TechnologyPanel from '../../components/project/TechnologyPanel';
import { stack } from '../../data/stack';
import { useLocale } from '../../i18n/LocaleContext';
import styles from './StackSection.module.css';

export default function StackSection() {
  const { t } = useLocale();

  return (
    <section aria-label={t.home.stackLabel} className={styles.section}>
      <div className={styles.header}>
        <SectionLabel>{t.home.stackLabel}</SectionLabel>
        <p className={styles.subtitle}>{t.home.stackSubtitle}</p>
      </div>
      <TechnologyPanel technologies={stack} />
    </section>
  );
}
