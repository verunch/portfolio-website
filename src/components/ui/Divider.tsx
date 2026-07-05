import styles from './Divider.module.css';

type DividerProps = {
  spacing?: 6 | 8 | 12 | 16;
};

const spacingClass: Record<NonNullable<DividerProps['spacing']>, string> = {
  6: styles.spacing6,
  8: styles.spacing8,
  12: styles.spacing12,
  16: styles.spacing16,
};

export default function Divider({ spacing = 8 }: DividerProps) {
  return <hr className={`${styles.divider} ${spacingClass[spacing]}`} />;
}
