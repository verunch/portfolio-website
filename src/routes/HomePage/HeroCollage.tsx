import { Link } from 'react-router-dom';
import SectionLabel from '../../components/ui/SectionLabel';
import portraitSrc from '../../../assets/images/portrrait5.webp';
import heroWorkSrc from '../../../assets/images/social_radar_work.webp';
import styles from './HeroCollage.module.css';

// "Social Radar" is the approved seed project (ARCHITECTURE.md §16 seed set) —
// carried over as the wireframe's literal featured-project placeholder, not
// invented copy. Full project data lands with the ProjectsTable milestone.
export default function HeroCollage() {
  return (
    <div className={styles.collage}>
      <img src={portraitSrc} alt="Vera Bakerava" className={styles.portraitImage} />

      <Link to="/portfolio#social-radar" className={styles.featuredCard}>
        <SectionLabel>Featured Project</SectionLabel>
        <p className={styles.featuredTitle}>Social Radar</p>
        <p className={styles.featuredKicker}>Product Design</p>
        <span className={styles.featuredAccent} aria-hidden="true" />
      </Link>

      <Link to="/portfolio#social-radar" className={styles.wideBand}>
        <img src={heroWorkSrc} alt="Social Radar" className={styles.wideBandImage} />
      </Link>
    </div>
  );
}
