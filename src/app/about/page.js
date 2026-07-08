import styles from './page.module.css';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | Dependable Auto Sports LLC',
  description: 'Learn more about Dependable Auto Sports LLC, your trusted used car dealer in Madison, WI.',
};

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>About Dependable Auto Sports</h1>
          <p>Committed to providing quality vehicles and exceptional service in Madison, WI.</p>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div className={styles.storyText}>
              <h2>Our Story</h2>
              <p>
                Dependable Auto Sports LLC was founded on a simple principle: to offer the community of Madison reliable, high-quality pre-owned vehicles at fair prices. We believe that buying a used car shouldn't be a stressful experience, which is why we focus on transparency, honesty, and customer satisfaction above all else.
              </p>
              <p>
                As a fully licensed and bonded dealership (Dealer MV 5126), we stand behind every vehicle we sell. Our inventory is carefully selected and inspected to ensure you drive away with confidence.
              </p>
            </div>
            <div className={styles.storyImagePlaceholder}>
              {/* Optional: Add an image here later */}
              <div className={styles.placeholderBox}>
                <span>Quality Vehicles, Trusted Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.icon}>🤝</div>
              <h3>Dependability</h3>
              <p>We earn our name by providing vehicles you can count on and service you can trust.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.icon}>⭐</div>
              <h3>Quality</h3>
              <p>Every vehicle in our lot is carefully selected to meet our high standards.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.icon}>💰</div>
              <h3>Fair Pricing</h3>
              <p>No hidden fees or games. We offer competitive, straightforward pricing on all our cars.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2>Ready to find your next car?</h2>
            <p>Browse our current selection of quality pre-owned vehicles.</p>
            <Link href="/inventory" className="btn btn-accent">
              View Inventory
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
