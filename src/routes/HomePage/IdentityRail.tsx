import { Link } from 'react-router-dom';
import NavLinks from '../../components/nav/NavLinks';
import { navConfig } from '../../components/nav/navConfig';
import styles from './IdentityRail.module.css';

// Twitter/Behance removed per product decision (docs/architecture/DECISIONS.md)
// — LinkedIn only.
const socials = [{ label: 'in', name: 'LinkedIn', href: 'https://www.linkedin.com/in/vera-bakerava-7a1022a1/' }];

// Desktop/laptop-only (>=1024px) Home chrome — replaces Header at that breakpoint
// per ARCHITECTURE.md §9. Shares navConfig with Header via NavLinks ("one nav
// data source driving two presentational shells").
export default function IdentityRail() {
  return (
    <aside className={styles.rail} aria-label="Identity">
      <Link to="/" className={styles.monogram} aria-label="Vera Bakerava — Home">
        VB
      </Link>
      <NavLinks items={navConfig} orientation="vertical" />
      <ul className={styles.socials}>
        {socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              className={styles.socialLink}
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
