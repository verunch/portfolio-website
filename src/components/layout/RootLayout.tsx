import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { trackPageview } from '../../lib/analytics';
import { useLocale } from '../../i18n/LocaleContext';
import Header from './Header';
import IdentityRail from '../../routes/HomePage/IdentityRail';
import { ResumeModalProvider } from '../resume/ResumeModalContext';
import styles from './RootLayout.module.css';

// Footer intentionally omitted for this milestone — real implementation lands
// after Home's content sections are built.
export default function RootLayout() {
  const { pathname, search } = useLocation();
  const isHome = pathname === '/';

  const { t } = useLocale();

  // Page title per route and language (Services has its own SEO title).
  useEffect(() => {
    document.title = pathname === '/services' ? t.meta.servicesTitle : t.meta.title;
  }, [pathname, t]);

  // Metrica runs with `defer: true`, so every SPA route change (including
  // the first load) reports its own page hit.
  useEffect(() => {
    trackPageview(pathname + search);
  }, [pathname, search]);

  return (
    <ResumeModalProvider>
      <div className={styles.shell}>
        {isHome && <IdentityRail />}
        <Header collapseOnRail={isHome} />
        <main className={isHome ? styles.mainWithRail : styles.main}>
          <Outlet />
        </main>
      </div>
    </ResumeModalProvider>
  );
}
