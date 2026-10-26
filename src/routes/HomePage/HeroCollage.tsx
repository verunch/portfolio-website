import { Link } from 'react-router-dom';
import { profile } from '../../data/profile';
import { useLocale } from '../../i18n/LocaleContext';
import { trackGoal } from '../../lib/analytics';
import IntroBlock from './IntroBlock';
import portraitSrc from '../../../assets/images/portrrait5.webp';
import heroWorkSrc from '../../../assets/images/social_radar_work.webp';
import styles from './HeroCollage.module.css';

// Portrait + bio panel side by side, the Social Radar showcase image as the
// wide band below (links to the Portfolio page), then the CTA buttons. On
// phones the order becomes: bio, buttons, portrait, band.
export default function HeroCollage() {
  const { t, l } = useLocale();

  return (
    <div className={styles.collage}>
      <img src={portraitSrc} alt={l(profile.name)} className={styles.portraitImage} />

      <div className={styles.bioPanel}>
        <div className={styles.heading}>
          <h1 className={styles.role}>{t.header.tagline}</h1>
          <p className={styles.name}>{l(profile.name)}</p>
        </div>
        <p className={styles.bio}>{l(profile.bio)}</p>
        <p className={`${styles.bio} ${styles.services}`}>{l(profile.services)}</p>

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

      {/* CTA buttons — part of the grid so phones can move them right under
          the bio card (see .cta order below 768px). */}
      <div className={styles.cta}>
        <IntroBlock />
      </div>
    </div>
  );
}
