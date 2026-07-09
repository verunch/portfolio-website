import type { ReactNode } from 'react';
import styles from './TechIconButton.module.css';

type TechIconButtonProps = {
  icon: ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  dark?: boolean;
  bordered?: boolean;
};

export default function TechIconButton({
  icon,
  label,
  href,
  active = false,
  dark = false,
  bordered = false,
}: TechIconButtonProps) {
  const className = [
    styles.button,
    active ? styles.active : '',
    dark ? styles.dark : '',
    bordered ? styles.bordered : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a href={href} className={className} aria-label={label} target="_blank" rel="noopener noreferrer">
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      </a>
    );
  }

  return (
    <span className={className} role="img" aria-label={label}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
    </span>
  );
}
