import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { trackPageview } from '../../lib/analytics';
import Header from './Header';
import IdentityRail from '../../routes/HomePage/IdentityRail';
import { ResumeModalProvider } from '../resume/ResumeModalContext';
import styles from './RootLayout.module.css';

// Footer intentionally omitted for this milestone — real implementation lands
// after Home's content sections are built.
export default function RootLayout() {
  const { pathname, search } = useLocation();
  const isHome = pathname === '/';

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
