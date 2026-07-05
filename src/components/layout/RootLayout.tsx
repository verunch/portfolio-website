import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import IdentityRail from '../../routes/HomePage/IdentityRail';
import styles from './RootLayout.module.css';

// Footer intentionally omitted for this milestone — real implementation lands
// after Home's content sections are built.
export default function RootLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className={styles.shell}>
      {isHome && <IdentityRail />}
      <Header collapseOnRail={isHome} />
      <main className={isHome ? styles.mainWithRail : styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
