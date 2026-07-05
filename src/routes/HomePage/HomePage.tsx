import HeroCollage from './HeroCollage';
import IntroBlock from './IntroBlock';
import styles from './HomePage.module.css';

// Hero only for this milestone — About/Stack/ProjectsTable land later.
export default function HomePage() {
  return (
    <div className={styles.page}>
      <HeroCollage />
      <IntroBlock />
    </div>
  );
}
