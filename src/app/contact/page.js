import styles from './page.module.css';
import ContactForm from '@/components/ContactForm';
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL,
  FACEBOOK_URL,
  ADDRESS,
  ADDRESS_LINE,
  HOURS,
} from '@/lib/business';

export const metadata = {
  title: 'Contact Us',
  description:
    `Contact Dependable Auto Sports in Madison, WI. Call ${PHONE_DISPLAY}, email us, or visit ${ADDRESS_LINE}. Open Mon–Fri 9–6 and Sat 10–4.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're here to help you find your next vehicle.</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.contentGrid}>
          <div className={styles.formSection}>
            <div className={styles.card}>
              <h2>Send us a message</h2>
              <ContactForm />
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoCard}>
              <h2>Contact Information</h2>
              
              <div className={styles.infoItem}>
                <div className={styles.icon}>📍</div>
                <div>
                  <strong>Address</strong>
                  <p>{ADDRESS.street}<br/>{ADDRESS.city}, {ADDRESS.state} {ADDRESS.zip}</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.icon}>📞</div>
                <div>
                  <strong>Phone</strong>
                  <p><a href={`tel:${PHONE_TEL}`} style={{ color: 'inherit', textDecoration: 'none' }}>{PHONE_DISPLAY}</a></p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.icon}>✉️</div>
                <div>
                  <strong>Email</strong>
                  <p><a href={`mailto:${EMAIL}`} style={{ color: 'inherit', textDecoration: 'none' }}>{EMAIL}</a></p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.icon}>👍</div>
                <div>
                  <strong>Facebook</strong>
                  <p><a href={FACEBOOK_URL} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>@DependableAutoSports</a></p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.icon}>🕒</div>
                <div>
                  <strong>Business Hours</strong>
                  <p>
                    {HOURS.map((h, i) => (
                      <span key={h.label}>{i > 0 && <br />}{h.label}: {h.display}</span>
                    ))}
                  </p>
                </div>
              </div>

              <div className={styles.mapContainer}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2910.6586071852924!2d-89.2965684!3d43.1537233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88065538e9324029%3A0xe67db50ed8a3ed37!2s4290%20Hoepker%20Rd%2C%20Madison%2C%20WI%2053704!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="250" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps - Dependable Auto Sports Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
