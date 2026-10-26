import styles from './ActionButton.module.css';

type ActionButtonProps = {
  href: string;
  ariaLabel: string;
  // Internal in-app navigation (e.g. a Portfolio anchor) skips target=_blank;
  // every other destination opens in a new tab. Defaults to external since
  // most Action Buttons point off-site.
  external?: boolean;
  onClick?: () => void;
  // Renders a non-interactive, dimmed button with this text as a tooltip
  // (e.g. a private repo — "access on request").
  disabledReason?: string;
};

// The single reusable arrow-icon control for every clickable action in the
// Projects table (project anchor, case study, Figma, Miro, MVP, landing
// page, GitHub) — destinations differ, the button never does.
export default function ActionButton({ href, ariaLabel, external = true, onClick, disabledReason }: ActionButtonProps) {
  if (disabledReason) {
    // Focusable so keyboard users can reach the tooltip; aria-disabled keeps
    // it announced as an unavailable link.
    return (
      <span
        role="link"
        aria-disabled="true"
        tabIndex={0}
        className={`${styles.button} ${styles.disabled}`}
        aria-label={`${ariaLabel} — ${disabledReason}`}
        data-tooltip={disabledReason}
        data-tooltip-align="end"
      >
        <span aria-hidden="true">↗</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      className={styles.button}
      aria-label={ariaLabel}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span aria-hidden="true">↗</span>
    </a>
  );
}
