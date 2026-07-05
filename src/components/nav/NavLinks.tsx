import { Link, useLocation } from 'react-router-dom';
import type { NavItem } from './navConfig';
import styles from './NavLinks.module.css';

type NavLinksProps = {
  items: NavItem[];
  orientation?: 'horizontal' | 'vertical';
  activePath?: string;
  onLinkClick?: () => void;
};

export default function NavLinks({
  items,
  orientation = 'horizontal',
  activePath,
  onLinkClick,
}: NavLinksProps) {
  const location = useLocation();
  const currentPath = activePath ?? location.pathname;

  return (
    <ul
      className={`${styles.list} ${orientation === 'vertical' ? styles.vertical : styles.horizontal}`}
    >
      {items.map((item) => {
        const isActive = !item.external && item.path === currentPath;
        return (
          <li key={item.path}>
            {item.external ? (
              <a
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                onClick={onLinkClick}
              >
                {item.label}
              </a>
            ) : (
              <Link
                to={item.path}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={onLinkClick}
              >
                {item.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
