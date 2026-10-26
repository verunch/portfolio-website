import { Link } from 'react-router-dom';
import { profile } from '../../data/profile';
import { useLocale } from '../../i18n/LocaleContext';
import { trackGoal } from '../../lib/analytics';
import portraitSrc from '../../../assets/images/portrrait5.webp';
import heroWorkSrc from '../../../assets/images/social_radar_work.webp';
import styles from './HeroCollage.module.css';

// Portrait + bio panel side by side, with the Social Radar showcase image as
// the wide band below (links to the Portfolio page).
export default function HeroCollage() {
  const { t, l } = useLocale();

  return (
    <div className={styles.collage}>
      <img src={portraitSrc} alt={l(profile.name)} className={styles.portraitImage} />

      <div className={styles.bioPanel}>
        <h1 className={styles.name}>{l(profile.name)}</h1>
        <p className={styles.bio}>{l(profile.bio)}</p>

        <div className={styles.contacts}>
          <a
            href={`mailto:${profile.email}`}
            className={styles.contactLink}
            onClick={() => trackGoal('contact_click', { channel: 'email', place: 'hero' })}
          >
            {t.home.emailLink}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
            onClick={() => trackGoal('contact_click', { channel: 'linkedin', place: 'hero' })}
          >
            {t.home.linkedinLink}
          </a>
          <a
            href={profile.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
            onClick={() => trackGoal('contact_click', { channel: 'telegram', place: 'hero' })}
          >
            {t.home.telegramLink}
          </a>
        </div>
      </div>

      <Link to="/portfolio" className={styles.wideBand}>
        <img src={heroWorkSrc} alt="Social Radar" className={styles.wideBandImage} />
      </Link>
    </div>
  );
}
