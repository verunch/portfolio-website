import Button from '../../components/ui/Button';
import { profile } from '../../data/profile';
import styles from './IntroBlock.module.css';

export default function IntroBlock() {
  return (
    <div className={styles.intro}>
      <div className={styles.bioCluster}>
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
      </div>

      <div className={styles.ctaRow}>
        <Button variant="primary" href="/portfolio">
          View Portfolio →
        </Button>
        <Button variant="outline" href={profile.resumeUrl} external>
          Résumé ↗ <span className={styles.resumeHint}>new tab</span>
        </Button>
      </div>
    </div>
  );
}
