import { cache } from 'react';
import Link from 'next/link';
import { getCar } from '@/lib/cars';
import { getFullImageUrl } from '@/lib/storage';
import PhotoGallery from '@/components/PhotoGallery';
import ContactForm from '@/components/ContactForm';
import { PHONE_TEL, PHONE_DISPLAY, BUSINESS_NAME, SITE_URL } from '@/lib/business';
import styles from './page.module.css';

// Server-render each vehicle with ISR so the listing is indexable and shareable.
export const revalidate = 300;

// Dedupe the fetch between generateMetadata and the page render.
const loadCar = cache((id) => getCar(id));

function formatPrice(price) {
  if (!price && price !== 0) return 'Contact for Price';
  return '$' + Number(price).toLocaleString('en-US');
}

function formatMileage(mileage) {
  if (!mileage && mileage !== 0) return '—';
  return Number(mileage).toLocaleString('en-US') + ' mi';
}

function vehicleTitle(car) {
  return [car.year, car.make, car.model, car.trim].filter(Boolean).join(' ');
}

function absoluteUrl(url) {
  if (!url) return null;
  const s = String(url);
  return s.startsWith('http') ? s : `${SITE_URL}${s}`;
}

function primaryImage(car) {
  const first = car.photoIds && car.photoIds[0];
  return first ? absoluteUrl(getFullImageUrl(first)) : `${SITE_URL}/og-image.png`;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const car = await loadCar(id);

  if (!car) {
    return { title: 'Vehicle Not Found', robots: { index: false, follow: true } };
  }

  const title = vehicleTitle(car);
  const priceStr = formatPrice(car.price);
  const bits = [];
  if (car.mileage) bits.push(`${Number(car.mileage).toLocaleString('en-US')} miles`);
  if (car.exteriorColor) bits.push(car.exteriorColor);
  const specLine = bits.length ? `${bits.join(', ')}. ` : '';
  const description =
    `${title} for sale at ${BUSINESS_NAME} in Madison, WI. ${specLine}${priceStr}. Call ${PHONE_DISPLAY} or send an inquiry online.`;

  return {
    title: `${title} — ${priceStr}`,
    description,
    alternates: { canonical: `/inventory/${id}` },
    openGraph: {
      title: `${title} — ${priceStr}`,
      description,
      url: `${SITE_URL}/inventory/${id}`,
      type: 'website',
      images: [{ url: primaryImage(car), alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — ${priceStr}`,
      description,
      images: [primaryImage(car)],
    },
  };
}

export default async function VehicleDetailPage({ params }) {
  const { id } = await params;
  const car = await loadCar(id);

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

  const title = vehicleTitle(car);

  const details = [
    { label: 'Mileage', value: formatMileage(car.mileage) },
    { label: 'Exterior Color', value: car.exteriorColor || '—' },
    { label: 'Interior Color', value: car.interiorColor || '—' },
    { label: 'Transmission', value: car.transmission || '—' },
    { label: 'Drivetrain', value: car.drivetrain || '—' },
    { label: 'VIN', value: car.vin || '—' },
  ];

  const vehicleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: title,
    url: `${SITE_URL}/inventory/${id}`,
    image: primaryImage(car),
    ...(car.make && { brand: { '@type': 'Brand', name: car.make } }),
    ...(car.model && { model: car.model }),
    ...(car.year && { vehicleModelDate: String(car.year) }),
    ...(car.vin && { vehicleIdentificationNumber: car.vin }),
    ...(car.exteriorColor && { color: car.exteriorColor }),
    ...(car.transmission && { vehicleTransmission: car.transmission }),
    ...(car.description && { description: car.description }),
    ...(car.mileage && {
      mileageFromOdometer: { '@type': 'QuantitativeValue', value: car.mileage, unitCode: 'SMI' },
    }),
    itemCondition: 'https://schema.org/UsedCondition',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/UsedCondition',
      url: `${SITE_URL}/inventory/${id}`,
      priceCurrency: 'USD',
      ...(car.price ? { price: car.price } : {}),
      seller: { '@type': 'AutoDealer', name: BUSINESS_NAME },
    },
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleSchema) }}
      />
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
              <a href={`tel:${PHONE_TEL}`} className="btn btn-primary">
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
