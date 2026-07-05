import SectionLabel from '../../components/ui/SectionLabel';
import ProjectsTable from '../../components/project/ProjectsTable';
import { projects } from '../../data/projects';
import styles from './SelectedProjectsSection.module.css';

export default function SelectedProjectsSection() {
  return (
    <section aria-label="Selected Projects" className={styles.section}>
      <SectionLabel>Selected Projects</SectionLabel>
      <ProjectsTable projects={projects} />
    </section>
  );
}
