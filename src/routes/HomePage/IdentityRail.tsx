import { Link } from 'react-router-dom';
import MailIcon from '../../components/icons/MailIcon';
import TelegramIcon from '../../components/icons/TelegramIcon';
import NavLinks from '../../components/nav/NavLinks';
import LanguageSwitcher from '../../components/nav/LanguageSwitcher';
import { navConfig } from '../../components/nav/navConfig';
import { profile } from '../../data/profile';
import { useLocale } from '../../i18n/LocaleContext';
import { trackGoal } from '../../lib/analytics';
import styles from './IdentityRail.module.css';

// Twitter/Behance removed per product decision (docs/architecture/DECISIONS.md)
// — LinkedIn only.
const socials = [
  { label: 'in', nameKey: 'linkedin', href: profile.linkedin, external: true },
  { label: 'telegram', nameKey: 'telegram', href: profile.telegram, external: true },
  { label: 'email', nameKey: 'email', href: `mailto:${profile.email}`, external: false },
] as const;

// Desktop/laptop-only (>=1024px) Home chrome — replaces Header at that breakpoint
// per ARCHITECTURE.md §9. Shares navConfig with Header via NavLinks ("one nav
// data source driving two presentational shells").
export default function IdentityRail() {
  const { t, l } = useLocale();

  return (
    <aside className={styles.rail} aria-label={t.identityRail.ariaLabel}>
      <Link to="/" className={styles.monogram} aria-label={t.identityRail.homeAriaLabel}>
        {l(profile.initials)}
      </Link>
      <NavLinks items={navConfig} orientation="vertical" />
      <LanguageSwitcher orientation="vertical" className={styles.languageSwitcher} />
      <ul className={styles.socials}>
        {socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              className={styles.socialLink}
              aria-label={t.socials[social.nameKey]}
              onClick={() => trackGoal('contact_click', { channel: social.nameKey, place: 'rail' })}
              {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {social.label === 'email' ? <MailIcon /> : social.label === 'telegram' ? <TelegramIcon /> : social.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
