import { Link } from 'react-router-dom';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import ArrowUpIcon from '../icons/ArrowUpIcon';
import Divider from '../ui/Divider';
import { useResumeModal } from '../resume/ResumeModalContext';
import { useLocale } from '../../i18n/LocaleContext';
import styles from './PageFooterNav.module.css';

// The site's two routable pages, in browsing order.
const PAGES = [
  { path: '/', labelKey: 'home' },
  { path: '/portfolio', labelKey: 'portfolio' },
] as const;

type PageFooterNavProps = {
  currentPath: (typeof PAGES)[number]['path'];
  // Hairline above the nav (currently turned off on both Home and Portfolio).
  divider?: boolean;
};

export default function PageFooterNav({ currentPath, divider = true }: PageFooterNavProps) {
  const { openResumeModal } = useResumeModal();
  const { t } = useLocale();
  const index = PAGES.findIndex((page) => page.path === currentPath);
  const prevPage = index > 0 ? PAGES[index - 1] : null;
  const nextPage = index >= 0 && index < PAGES.length - 1 ? PAGES[index + 1] : null;
  // Résumé opens a modal rather than a route, so it isn't in PAGES — but the
  // last routable page's "Next" slot continues on to it.
  const isLastPage = index === PAGES.length - 1;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {divider && <Divider spacing={12} />}
      <nav
        className={divider ? styles.footerNav : `${styles.footerNav} ${styles.noDivider}`}
        aria-label={t.nav.pageNavAriaLabel}
      >
        {/* Far left corner. */}
        <button type="button" className={styles.topButton} onClick={scrollToTop} aria-label={t.nav.scrollToTop}>
          <ArrowUpIcon />
        </button>

        {/* Page links grouped on the right: previous, then next. */}
        <div className={`${styles.side} ${styles.sideEnd}`}>
          {prevPage && (
            <Link to={prevPage.path} className={styles.pageLink}>
              <ChevronLeftIcon />
              <span>{t.nav[prevPage.labelKey]}</span>
            </Link>
          )}
          {nextPage && (
            <Link to={nextPage.path} className={styles.pageLink}>
              <span>{t.nav[nextPage.labelKey]}</span>
              <ChevronRightIcon />
            </Link>
          )}
          {!nextPage && isLastPage && (
            <button type="button" className={styles.pageLink} onClick={openResumeModal}>
              <span>{t.nav.resume}</span>
              <ChevronRightIcon />
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
