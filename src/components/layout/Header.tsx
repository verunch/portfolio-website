import { Link } from 'react-router-dom';
import MailIcon from '../icons/MailIcon';
import NavLinks from '../nav/NavLinks';
import LanguageSwitcher from '../nav/LanguageSwitcher';
import { navConfig } from '../nav/navConfig';
import { profile } from '../../data/profile';
import { useLocale } from '../../i18n/LocaleContext';
import { trackGoal } from '../../lib/analytics';
import styles from './Header.module.css';

// Same pair IdentityRail shows in its vertical rail — mirrored here
// horizontally since Header covers every route below the rail's breakpoint.
const socials = [
  { label: 'in', nameKey: 'linkedin', href: profile.linkedin, external: true },
  { label: 'email', nameKey: 'email', href: `mailto:${profile.email}`, external: false },
] as const;

type HeaderProps = {
  // True when this Header instance sits on the Home route, where it only
  // covers <1024px — IdentityRail takes over above that (ARCHITECTURE.md §9).
  collapseOnRail?: boolean;
};

function SocialsList({ className }: { className: string }) {
  const { t } = useLocale();

  return (
    <ul className={className}>
      {socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            className={styles.socialLink}
            aria-label={t.socials[social.nameKey]}
            onClick={() => trackGoal('contact_click', { channel: social.nameKey, place: 'header' })}
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
  const { t, l } = useLocale();
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
          {l(profile.name)}
        </Link>
        {/* <478px only — see .socialsBar */}
        <SocialsList className={styles.socialsBar} />
        <Link to="/" className={`${styles.wordmark} ${styles.tagline}`}>
          {t.header.tagline}
        </Link>
      </div>
      <nav id="primary-navigation" aria-label={t.nav.primaryAriaLabel} className={`${styles.nav} ${styles.container}`}>
        <NavLinks items={navConfig} orientation="horizontal" />
        <LanguageSwitcher className={styles.languageSwitcher} />
        {/* >=478px only — see .socialsNav */}
        <SocialsList className={styles.socialsNav} />
      </nav>
    </header>
  );
}
