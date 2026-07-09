import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import {
  BUSINESS_NAME,
  DEALER_LICENSE,
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL,
  FACEBOOK_URL,
  ADDRESS,
  HOURS,
} from '@/lib/business';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandTop}>
            <Image
              src="/logo-dark.png"
              alt="Dependable Auto Sports"
              width={160}
              height={47}
              className={styles.logoImage}
            />
            <span className={styles.brandName}>{BUSINESS_NAME}</span>
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
              <span>{ADDRESS.street}<br />{ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📞</span>
              <a href={`tel:${PHONE_TEL}`} style={{ color: 'inherit', textDecoration: 'none' }}>{PHONE_DISPLAY}</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>✉️</span>
              <a href={`mailto:${EMAIL}`} style={{ color: 'inherit', textDecoration: 'none' }}>{EMAIL}</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>👍</span>
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Facebook</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>🕐</span>
              <span>
                {HOURS.map((h, i) => (
                  <span key={h.label}>{i > 0 && <br />}{h.label}: {h.display}</span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span>© {year} {BUSINESS_NAME}. All rights reserved.</span>
          <span className={styles.dealerBadge}>
            🏷️ Licensed Dealer {DEALER_LICENSE}
          </span>
        </div>
      </div>
    </footer>
  );
}
