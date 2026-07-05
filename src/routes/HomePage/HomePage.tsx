import Divider from '../../components/ui/Divider';
import HeroCollage from './HeroCollage';
import IntroBlock from './IntroBlock';
import StackSection from './StackSection';
import AboutSection from './AboutSection';
import SelectedProjectsSection from './SelectedProjectsSection';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <HeroCollage />
      <IntroBlock />
      <Divider />
      <StackSection />
      <Divider />
      <AboutSection />
      <Divider />
      <SelectedProjectsSection />
    </div>
  );
}
