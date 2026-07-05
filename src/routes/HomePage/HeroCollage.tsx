import { Link } from 'react-router-dom';
import ImagePlaceholder from '../../components/ui/ImagePlaceholder';
import SectionLabel from '../../components/ui/SectionLabel';
import styles from './HeroCollage.module.css';

// "Social Radar" is the approved seed project (ARCHITECTURE.md §16 seed set) —
// carried over as the wireframe's literal featured-project placeholder, not
// invented copy. Full project data lands with the ProjectsTable milestone.
export default function HeroCollage() {
  return (
    <div className={styles.collage}>
      <ImagePlaceholder label="portrait" aspectRatio="4 / 5" decorative />

      <Link to="/portfolio#social-radar" className={styles.featuredCard}>
        <SectionLabel>Featured Project</SectionLabel>
        <ImagePlaceholder label="cover" aspectRatio="16 / 10" decorative />
        <p className={styles.featuredTitle}>Social Radar</p>
        <p className={styles.featuredKicker}>Product Design</p>
      </Link>

      <ImagePlaceholder
        label="work"
        aspectRatio="16 / 5"
        className={styles.wideBand}
        decorative
      />
    </div>
  );
}
