// Shared envelope glyph for the Email entry point in IdentityRail (desktop
// socials) and Header (tablet/mobile bar) — same markup keeps both in the
// same visual language. Unsized on purpose: the consuming button (.socialLink,
// .emailLink) controls rendered size via CSS, not props on this component.
export default function MailIcon() {
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
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}
