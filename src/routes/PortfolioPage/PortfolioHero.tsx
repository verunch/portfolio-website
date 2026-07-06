import styles from './PortfolioHero.module.css';

export default function PortfolioHero() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>Portfolio</h1>
      <p className={styles.helper}>Click a card to jump to its case study ↓</p>
    </div>
  );
}
