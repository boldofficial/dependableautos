import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandTop}>
            <Image
              src="/logo.png"
              alt="Dependable Auto Sports"
              width={48}
              height={48}
              className={styles.logoImage}
            />
            <span className={styles.brandName}>Dependable Auto Sports LLC</span>
          </div>
          <p className={styles.brandDesc}>
            Your trusted source for quality pre-owned vehicles in Madison, Wisconsin.
            Licensed and committed to providing dependable cars at fair prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className={styles.columnTitle}>Quick Links</h4>
          <nav className={styles.links}>
            <Link href="/" className={styles.link}>Home</Link>
            <Link href="/inventory" className={styles.link}>Inventory</Link>
            <Link href="/about" className={styles.link}>About Us</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h4 className={styles.columnTitle}>Contact Us</h4>
          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📍</span>
              <span>4290 Hoepker Rd<br />Madison, WI 53704</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📞</span>
              <a href="tel:+16082174010" style={{ color: 'inherit', textDecoration: 'none' }}>+1 608-217-4010</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>✉️</span>
              <a href="mailto:dependableautosportsllc@yahoo.com" style={{ color: 'inherit', textDecoration: 'none' }}>dependableautosportsllc@yahoo.com</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>👍</span>
              <a href="https://www.facebook.com/DependableAutoSports/" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Facebook</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>🕐</span>
              <span>Mon–Sat: 9 AM – 6 PM<br />Sun: Closed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span>© {year} Dependable Auto Sports LLC. All rights reserved.</span>
          <span className={styles.dealerBadge}>
            🏷️ Licensed Dealer MV 5126
          </span>
        </div>
      </div>
    </footer>
  );
}
