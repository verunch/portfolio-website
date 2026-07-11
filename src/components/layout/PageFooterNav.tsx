import { Link } from 'react-router-dom';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';
import ArrowUpIcon from '../icons/ArrowUpIcon';
import Divider from '../ui/Divider';
import { useResumeModal } from '../resume/ResumeModalContext';
import styles from './PageFooterNav.module.css';

// The site's two routable pages, in browsing order.
const PAGES = [
  { path: '/', label: 'Home' },
  { path: '/portfolio', label: 'Portfolio' },
] as const;

type PageFooterNavProps = {
  currentPath: (typeof PAGES)[number]['path'];
};

export default function PageFooterNav({ currentPath }: PageFooterNavProps) {
  const { openResumeModal } = useResumeModal();
  const index = PAGES.findIndex((page) => page.path === currentPath);
  const prevPage = index > 0 ? PAGES[index - 1] : null;
  const nextPage = index >= 0 && index < PAGES.length - 1 ? PAGES[index + 1] : null;
  // Résumé opens a modal rather than a route, so it isn't in PAGES — but the
  // last routable page's "Next" slot continues on to it.
  const isLastPage = index === PAGES.length - 1;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <Divider spacing={12} />
      <nav className={styles.footerNav} aria-label="Page navigation">
        <div className={styles.side}>
          {prevPage && (
            <Link to={prevPage.path} className={styles.pageLink}>
              <ChevronLeftIcon />
              <span>{prevPage.label}</span>
            </Link>
          )}
        </div>

        <button type="button" className={styles.topButton} onClick={scrollToTop} aria-label="Scroll to top">
          <ArrowUpIcon />
        </button>

        <div className={`${styles.side} ${styles.sideEnd}`}>
          {nextPage && (
            <Link to={nextPage.path} className={styles.pageLink}>
              <span>{nextPage.label}</span>
              <ChevronRightIcon />
            </Link>
          )}
          {!nextPage && isLastPage && (
            <button type="button" className={styles.pageLink} onClick={openResumeModal}>
              <span>Résumé</span>
              <ChevronRightIcon />
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
