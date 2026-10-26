import { useLocale } from '../../i18n/LocaleContext';
import styles from './PortfolioHero.module.css';

export default function PortfolioHero() {
  const { t } = useLocale();

  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>{t.portfolio.title}</h1>
      <p className={styles.helper}>{t.portfolio.helper}</p>
    </div>
  );
}
