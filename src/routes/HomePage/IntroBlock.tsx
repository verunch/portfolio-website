import Button from '../../components/ui/Button';
import { profile } from '../../data/profile';
import { useResumeModal } from '../../components/resume/ResumeModalContext';
import { useLocale } from '../../i18n/LocaleContext';
import { trackGoal } from '../../lib/analytics';
import styles from './IntroBlock.module.css';

export default function IntroBlock() {
  const { openResumeModal } = useResumeModal();
  const { t } = useLocale();

  return (
    <div className={styles.intro}>
      <div className={styles.ctaRow}>
        <Button variant="primary" href="/portfolio" onClick={() => trackGoal('view_portfolio_click')}>
          {t.home.viewPortfolio}
        </Button>
        <Button variant="primary" href="/services" onClick={() => trackGoal('order_cta_click')}>
          {t.home.orderCta}
        </Button>
        <Button
          variant="outline"
          href={profile.resumeUrl}
          external
          className={styles.resumeButton}
          onClick={(event) => {
            event.preventDefault();
            openResumeModal();
          }}
        >
          {t.home.resume}
          <span className={styles.resumeBadge}>PDF</span>
        </Button>
      </div>
    </div>
  );
}
