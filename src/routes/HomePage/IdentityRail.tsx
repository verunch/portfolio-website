import { Link } from 'react-router-dom';
import NavLinks from '../../components/nav/NavLinks';
import { navConfig } from '../../components/nav/navConfig';
import styles from './IdentityRail.module.css';

// Social labels are the literal placeholder set drawn in the approved wireframe
// (Twitter / Behance / LinkedIn abbreviations) — hrefs are stand-ins until real
// profile links are supplied.
const socials = [
  { label: 'Tw', href: '#' },
  { label: 'Be', href: '#' },
  { label: 'in', href: '#' },
];

// Desktop/laptop-only (>=1024px) Home chrome — replaces Header at that breakpoint
// per ARCHITECTURE.md §9. Shares navConfig with Header via NavLinks ("one nav
// data source driving two presentational shells").
export default function IdentityRail() {
  return (
    <aside className={styles.rail} aria-label="Identity">
      <Link to="/" className={styles.monogram} aria-label="Your Name — Home">
        YN
      </Link>
      <NavLinks items={navConfig} orientation="vertical" />
      <ul className={styles.socials}>
        {socials.map((social) => (
          <li key={social.label}>
            <a href={social.href} className={styles.socialLink}>
              {social.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
