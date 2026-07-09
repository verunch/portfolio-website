import styles from './ActionButton.module.css';

type ActionButtonProps = {
  href: string;
  ariaLabel: string;
  // Internal in-app navigation (e.g. a Portfolio anchor) skips target=_blank;
  // every other destination opens in a new tab. Defaults to external since
  // most Action Buttons point off-site.
  external?: boolean;
};

// The single reusable arrow-icon control for every clickable action in the
// Projects table (project anchor, case study, Figma, Miro, MVP, landing
// page, GitHub) — destinations differ, the button never does.
export default function ActionButton({ href, ariaLabel, external = true }: ActionButtonProps) {
  return (
    <a
      href={href}
      className={styles.button}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span aria-hidden="true">↗</span>
    </a>
  );
}
