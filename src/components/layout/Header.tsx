import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import NavLinks from '../nav/NavLinks';
import { navConfig } from '../nav/navConfig';
import styles from './Header.module.css';

type HeaderProps = {
  // True when this Header instance sits on the Home route, where it only
  // covers <1024px — IdentityRail takes over above that (ARCHITECTURE.md §9).
  // Below 1024px on Home, the nav stays hamburger-gated even at tablet width
  // (§6), unlike the standard bar used on every other route.
  collapseOnRail?: boolean;
};

export default function Header({ collapseOnRail = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  const headerClasses = [styles.header, collapseOnRail ? styles.hiddenAboveRail : styles.expandable]
    .join(' ');

  return (
    <header className={headerClasses}>
      <div className={styles.bar}>
        <Link to="/" className={styles.wordmark}>
          Your Name
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className={styles.menuToggle}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className={styles.srOnly}>{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className={styles.hamburgerIcon} aria-hidden="true" />
        </button>
      </div>
      <nav
        id="primary-navigation"
        aria-label="Primary"
        className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
      >
        <NavLinks items={navConfig} orientation="horizontal" onLinkClick={() => setIsMenuOpen(false)} />
      </nav>
    </header>
  );
}
