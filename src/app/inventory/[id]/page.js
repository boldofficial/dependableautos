'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getCar } from '@/lib/cars';
import PhotoGallery from '@/components/PhotoGallery';
import ContactForm from '@/components/ContactForm';
import styles from './page.module.css';

function formatPrice(price) {
  if (!price && price !== 0) return 'Contact for Price';
  return '$' + Number(price).toLocaleString('en-US');
}

function formatMileage(mileage) {
  if (!mileage && mileage !== 0) return '—';
  return Number(mileage).toLocaleString('en-US') + ' mi';
}

export default function VehicleDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getCar(id).then((data) => {
        setCar(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading vehicle details...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className={styles.notFound}>
        <span className={styles.notFoundIcon}>🚫</span>
        <h2>Vehicle Not Found</h2>
        <p style={{ color: 'var(--text-light)' }}>
          This listing may have been removed or sold.
        </p>
        <Link href="/inventory" className="btn btn-primary" style={{ marginTop: 12 }}>
          ← Back to Inventory
        </Link>
      </div>
    );
  }

  const title = [car.year, car.make, car.model, car.trim].filter(Boolean).join(' ');

  const details = [
    { label: 'Mileage', value: formatMileage(car.mileage) },
    { label: 'Exterior Color', value: car.exteriorColor || '—' },
    { label: 'Interior Color', value: car.interiorColor || '—' },
    { label: 'Transmission', value: car.transmission || '—' },
    { label: 'Drivetrain', value: car.drivetrain || '—' },
    { label: 'VIN', value: car.vin || '—' },
  ];

  return (
    <div className={styles.page}>
      <div className="container" style={{ paddingTop: '28px' }}>
        <Link href="/inventory" className={styles.backLink}>
          ← Back to Inventory
        </Link>

        <div className={styles.content}>
          {/* Gallery */}
          <div>
            <PhotoGallery photoIds={car.photoIds || []} />
          </div>

          {/* Info Panel */}
          <div className={styles.infoPanel}>
            <div className={styles.titleRow}>
              <h1 className={styles.carTitle}>{title}</h1>
              <span className={styles.price}>{formatPrice(car.price)}</span>
            </div>

            {/* Details Grid */}
            <div className={styles.detailsGrid}>
              {details.map((d) => (
                <div key={d.label} className={styles.detailItem}>
                  <span className={styles.detailLabel}>{d.label}</span>
                  <span className={styles.detailValue}>{d.value}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            {car.description && (
              <div className={styles.description}>
                <h3 className={styles.descTitle}>Description</h3>
                <p className={styles.descText}>{car.description}</p>
              </div>
            )}

            {/* CTA */}
            <div className={styles.ctaRow}>
              <a href="tel:+16085550123" className="btn btn-primary">
                📞 Call Us
              </a>
              <a href="#inquiry" className="btn btn-accent">
                ✉️ Send Inquiry
              </a>
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div id="inquiry" className={styles.inquirySection}>
          <h2 className={styles.inquiryTitle}>
            Interested in this {car.year} {car.make} {car.model}?
          </h2>
          <ContactForm carId={car.$id} />
        </div>
      </div>
    </div>
  );
}
