import Link from 'next/link';
import { getThumbnailUrl } from '@/lib/storage';
import styles from './CarCard.module.css';

function formatPrice(price) {
  if (!price && price !== 0) return 'Contact for Price';
  return '$' + Number(price).toLocaleString('en-US');
}

function formatMileage(mileage) {
  if (!mileage && mileage !== 0) return '';
  return Number(mileage).toLocaleString('en-US') + ' mi';
}

export default function CarCard({ car }) {
  const title = [car.year, car.make, car.model].filter(Boolean).join(' ');
  const hasPhoto = car.photoIds && car.photoIds.length > 0;
  const thumbUrl = hasPhoto ? getThumbnailUrl(car.photoIds[0]) : null;

  return (
    <Link href={`/inventory/${car.$id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        {hasPhoto ? (
          <img
            src={thumbUrl}
            alt={title}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>🚗</span>
            <span className={styles.placeholderText}>No photo available</span>
          </div>
        )}
        {car.status === 'active' && car.photoIds?.length > 1 && (
          <span className={styles.badge}>{car.photoIds.length} photos</span>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.meta}>
          <span className={styles.price}>{formatPrice(car.price)}</span>
          {car.mileage ? (
            <span className={styles.mileage}>{formatMileage(car.mileage)}</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
