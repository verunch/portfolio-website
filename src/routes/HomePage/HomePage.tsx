import HeroCollage from './HeroCollage';
import StackSection from './StackSection';
import AboutSection from './AboutSection';
import SelectedProjectsSection from './SelectedProjectsSection';
import PageFooterNav from '../../components/layout/PageFooterNav';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <HeroCollage />
      <StackSection />
      <AboutSection />
      <SelectedProjectsSection />
      <PageFooterNav currentPath="/" divider={false} />
    </div>
  );
}
