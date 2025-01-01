
import styles from './index.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.socialIcons}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>FB</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>TW</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>IG</a>
      </div>
    </nav>
  );
}