import type { ReactNode } from 'react';
import styles from './SectionLabel.module.css';

type SectionLabelProps = {
  children: ReactNode;
  align?: 'left' | 'center';
};

export default function SectionLabel({ children, align = 'left' }: SectionLabelProps) {
  const classes = [styles.label, align === 'center' ? styles.center : null]
    .filter(Boolean)
    .join(' ');

  return <p className={classes}>{children}</p>;
}
