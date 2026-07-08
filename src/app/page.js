'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CarCard from '@/components/CarCard';
import { getFeaturedCars } from '@/lib/cars';

/* ── Inline styles (no separate CSS module needed for the home page) ── */

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedCars(6).then((cars) => {
      setFeatured(cars);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {/* ════════════════════════ HERO ════════════════════════ */}
      <section style={heroSection}>
        <div style={heroOverlay} />

        <div style={heroContent}>
          <Image
            src="/logo.png"
            alt="Dependable Auto Sports"
            width={90}
            height={90}
            style={heroLogo}
            priority
          />
          <h1 style={heroTitle}>Dependable Auto Sports</h1>
          <p style={heroTagline}>Quality Pre-Owned Vehicles in Madison, WI</p>
          <div style={heroCtas}>
            <Link href="/inventory" className="btn btn-primary" style={{ fontSize: '1.05rem', boxShadow: '0 8px 16px rgba(26,63,160,0.2)' }}>
              Browse Inventory →
            </Link>
            <Link href="/contact" className="btn btn-outline" style={{ borderColor: '#1a3fa0', color: '#1a3fa0' }}>
              Contact Us
            </Link>
          </div>
          <p style={heroBadge}>🏷️ Licensed Wisconsin Dealer MV 5126</p>
        </div>
      </section>

      {/* ════════════════════ FEATURED ════════════════════════ */}
      <section style={sectionPadding}>
        <div className="container">
          <h2 className="section-title">Featured Vehicles</h2>
          <p className="section-subtitle">
            Hand-picked from our latest arrivals — quality you can count on.
          </p>

          {loading ? (
            <div style={loadingGrid}>
              {[1, 2, 3].map((n) => (
                <div key={n} style={skeletonCard}>
                  <div style={skeletonImage} />
                  <div style={{ padding: 20 }}>
                    <div style={{ ...skeletonLine, width: '70%' }} />
                    <div style={{ ...skeletonLine, width: '40%', marginTop: 12 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div style={carGrid} className="stagger">
              {featured.map((car) => (
                <div key={car.$id} className="animate-fade-in-up">
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          ) : (
            <p style={emptyState}>
              No vehicles listed yet — check back soon!
            </p>
          )}

          {featured.length > 0 && (
            <div style={centerWrap}>
              <Link href="/inventory" className="btn btn-primary" style={{ marginTop: 20 }}>
                View All Inventory →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════ WHY CHOOSE US ══════════════════════ */}
      <section style={{ ...sectionPadding, background: 'var(--white)' }}>
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            What sets Dependable Auto Sports apart from the rest.
          </p>

          <div style={valueGrid}>
            {VALUES.map((v, i) => (
              <div key={i} style={valueCard} className="glass-card">
                <span style={valueIcon}>{v.icon}</span>
                <h3 style={valueTitle}>{v.title}</h3>
                <p style={valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ CONTACT PREVIEW ════════════════════ */}
      <section style={sectionPadding}>
        <div className="container">
          <h2 className="section-title">Visit Us</h2>
          <p className="section-subtitle">
            We&apos;re conveniently located in Madison, WI. Stop by today!
          </p>

          <div style={contactPreviewGrid}>
            <div style={contactInfoCard} className="glass-card">
              <div style={contactItem}>
                <span style={contactIcon}>📍</span>
                <div>
                  <strong>Address</strong>
                  <p style={contactDetail}>4290 Hoepker Rd, Madison, WI 53704</p>
                </div>
              </div>
              <div style={contactItem}>
                <span style={contactIcon}>📞</span>
                <div>
                  <strong>Phone</strong>
                  <p style={contactDetail}>(608) 555-0123</p>
                </div>
              </div>
              <div style={contactItem}>
                <span style={contactIcon}>🕐</span>
                <div>
                  <strong>Hours</strong>
                  <p style={contactDetail}>Mon–Sat: 9 AM – 6 PM</p>
                  <p style={contactDetail}>Sun: Closed</p>
                </div>
              </div>
              <Link href="/contact" className="btn btn-primary" style={{ marginTop: 8, alignSelf: 'flex-start' }}>
                Get Directions
              </Link>
            </div>

            <div style={mapPlaceholder}>
              <iframe
                title="Dependable Auto Sports Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2909.5!2d-89.3!3d43.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s4290+Hoepker+Rd+Madison+WI+53704!5e0!3m2!1sen!2sus!4v1700000000000"
                style={mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Values Data ──────────────────────────────────────────── */
const VALUES = [
  {
    icon: '🏛️',
    title: 'Licensed Dealer',
    desc: 'We are a fully licensed Wisconsin motor vehicle dealer (MV 5126). Buy with confidence knowing you are working with a legitimate, registered business.',
  },
  {
    icon: '✅',
    title: 'Quality Selection',
    desc: 'Every vehicle in our inventory is carefully inspected and selected. We stand behind the quality and reliability of the cars we sell.',
  },
  {
    icon: '💰',
    title: 'Great Prices',
    desc: 'We price our vehicles competitively and fairly. No hidden fees, no games — just honest, transparent pricing you can trust.',
  },
];

/* ── Style Objects ────────────────────────────────────────── */
const heroSection = {
  position: 'relative',
  minHeight: 'min(85vh, 700px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingLeft: 'clamp(20px, 10vw, 120px)',
  paddingRight: '20px',
  background: 'url("https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1920") center/cover no-repeat',
  backgroundColor: '#1a1a2e',
  overflow: 'hidden',
};

const heroOverlay = {
  position: 'absolute',
  inset: 0,
  background: 'rgba(0,0,0,0.25)',
  zIndex: 1,
};

const heroContent = {
  position: 'relative',
  zIndex: 2,
  textAlign: 'left',
  padding: '50px 40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
  background: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  maxWidth: '520px',
  animation: 'fadeInUp 0.8s cubic-bezier(0.22,1,0.36,1)',
};

const heroLogo = {
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
};

const heroTitle = {
  fontSize: 'clamp(2rem, 5vw, 3rem)',
  fontWeight: 800,
  color: '#1a1a2e',
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
};

const heroTagline = {
  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
  color: '#444',
  fontWeight: 500,
  lineHeight: 1.5,
};

const heroCtas = {
  display: 'flex',
  gap: '14px',
  marginTop: '8px',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
};

const heroBadge = {
  marginTop: '16px',
  padding: '8px 16px',
  background: 'rgba(26,63,160,0.1)',
  color: '#1a3fa0',
  borderRadius: '24px',
  fontSize: '0.85rem',
  fontWeight: 600,
};

const sectionPadding = {
  padding: '80px 0',
};

const carGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: '28px',
};

const loadingGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: '28px',
};

const skeletonCard = {
  borderRadius: '20px',
  overflow: 'hidden',
  background: '#fff',
  boxShadow: '0 4px 24px rgba(26,63,160,0.08)',
};

const skeletonImage = {
  width: '100%',
  aspectRatio: '4/3',
  background: 'linear-gradient(90deg, #eee 25%, #e0e0e0 50%, #eee 75%)',
  backgroundSize: '200% 100%',
  animation: 'pulse 1.5s ease-in-out infinite',
};

const skeletonLine = {
  height: '14px',
  borderRadius: '7px',
  background: '#eee',
};

const emptyState = {
  textAlign: 'center',
  padding: '60px 20px',
  color: 'var(--text-light)',
  fontSize: '1.1rem',
};

const centerWrap = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '36px',
};

const valueGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '28px',
};

const valueCard = {
  padding: '36px 28px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '14px',
};

const valueIcon = {
  fontSize: '2.5rem',
  lineHeight: 1,
};

const valueTitle = {
  fontSize: '1.15rem',
  fontWeight: 700,
  color: 'var(--text)',
};

const valueDesc = {
  fontSize: '0.92rem',
  color: 'var(--text-light)',
  lineHeight: 1.7,
  maxWidth: '320px',
};

const contactPreviewGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr 1.2fr',
  gap: '28px',
  alignItems: 'stretch',
};

const contactInfoCard = {
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const contactItem = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
};

const contactIcon = {
  fontSize: '1.3rem',
  flexShrink: 0,
  marginTop: '2px',
};

const contactDetail = {
  color: 'var(--text-light)',
  fontSize: '0.92rem',
  margin: '2px 0 0',
};

const mapPlaceholder = {
  borderRadius: 'var(--radius-lg)',
  overflow: 'hidden',
  minHeight: '340px',
  boxShadow: 'var(--card-shadow)',
};

const mapIframe = {
  width: '100%',
  height: '100%',
  minHeight: '340px',
  border: 0,
};
