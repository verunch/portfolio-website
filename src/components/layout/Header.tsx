import { Link } from 'react-router-dom';
import MailIcon from '../icons/MailIcon';
import NavLinks from '../nav/NavLinks';
import { navConfig } from '../nav/navConfig';
import { profile } from '../../data/profile';
import styles from './Header.module.css';

// Same pair IdentityRail shows in its vertical rail — mirrored here
// horizontally since Header covers every route below the rail's breakpoint.
const socials = [
  { label: 'in', name: 'LinkedIn', href: profile.linkedin, external: true },
  { label: 'email', name: 'Email', href: `mailto:${profile.email}`, external: false },
];

type HeaderProps = {
  // True when this Header instance sits on the Home route, where it only
  // covers <1024px — IdentityRail takes over above that (ARCHITECTURE.md §9).
  collapseOnRail?: boolean;
};

function SocialsList({ className }: { className: string }) {
  return (
    <ul className={className}>
      {socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            className={styles.socialLink}
            aria-label={social.name}
            {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {social.label === 'email' ? <MailIcon /> : social.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Header({ collapseOnRail = false }: HeaderProps) {
  // `.expandable` drives the always-visible nav row on every route;
  // `.hiddenAboveRail` additionally hides the whole bar once IdentityRail
  // takes over on Home (>=1024px) — the two are independent concerns.
  const headerClasses = [styles.header, styles.expandable, collapseOnRail ? styles.hiddenAboveRail : '']
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClasses}>
      <div className={`${styles.bar} ${styles.container}`}>
        <Link to="/" className={styles.wordmark}>
          Vera Bakerava
        </Link>
        {/* <478px only — see .socialsBar */}
        <SocialsList className={styles.socialsBar} />
        <Link to="/" className={`${styles.wordmark} ${styles.tagline}`}>
          Product Designer
        </Link>
      </div>
      <nav id="primary-navigation" aria-label="Primary" className={`${styles.nav} ${styles.container}`}>
        <NavLinks items={navConfig} orientation="horizontal" />
        {/* >=478px only — see .socialsNav */}
        <SocialsList className={styles.socialsNav} />
      </nav>
    </header>
  );
}
