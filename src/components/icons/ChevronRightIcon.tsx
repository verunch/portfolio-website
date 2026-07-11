// Shared chevron glyph — history/page "forward" control in Header (mobile)
// and ResumeModal (PDF page nav). Unsized on purpose: the consuming button
// controls rendered size via CSS, not props on this component.
export default function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
