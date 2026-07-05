import styles from './ImagePlaceholder.module.css';

type ImagePlaceholderProps = {
  label: string;
  aspectRatio?: string;
  height?: string;
  decorative?: boolean;
  className?: string;
};

export default function ImagePlaceholder({
  label,
  aspectRatio,
  height,
  decorative = false,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={[styles.placeholder, className].filter(Boolean).join(' ')}
      style={{ aspectRatio, height }}
      {...(decorative
        ? { 'aria-hidden': true }
        : { role: 'img', 'aria-label': label })}
    >
      <span className={styles.caption} aria-hidden="true">
        [ {label} ]
      </span>
    </div>
  );
}
