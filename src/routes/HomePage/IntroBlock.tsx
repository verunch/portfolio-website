import Button from '../../components/ui/Button';
import styles from './IntroBlock.module.css';

// Placeholder profile content, carried over from the approved wireframe's own
// seed copy (ARCHITECTURE.md §16 `profile` shape) — not invented. Real content
// and the data/profile.ts access layer land in a later milestone.
const profile = {
  name: 'Your Name',
  bio: 'Short bio — one or two calm, specific lines on who you are and what you build.',
  email: 'hello@yourname.com',
  linkedin: 'https://linkedin.com/in/yourname',
};

export default function IntroBlock() {
  return (
    <div className={styles.intro}>
      <h1 className={styles.name}>{profile.name}</h1>
      <p className={styles.bio}>{profile.bio}</p>

      <div className={styles.contacts}>
        <a href={`mailto:${profile.email}`} className={styles.contactLink}>
          email ↗
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactLink}
        >
          linkedin ↗
        </a>
      </div>

      <div className={styles.ctaRow}>
        <Button variant="primary" href="/portfolio">
          View Portfolio →
        </Button>
        <Button variant="outline" href="/resume.pdf" external>
          Résumé ↗
        </Button>
      </div>
    </div>
  );
}
