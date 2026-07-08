'use client';

import { useState } from 'react';
import { getFullImageUrl, getThumbnailUrl } from '@/lib/storage';
import styles from './PhotoGallery.module.css';

export default function PhotoGallery({ photoIds = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!photoIds || photoIds.length === 0) {
    return (
      <div className={styles.gallery}>
        <div className={styles.mainWrap}>
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>📷</span>
            <span className={styles.placeholderText}>No photos available</span>
          </div>
        </div>
      </div>
    );
  }

  const mainUrl = getFullImageUrl(photoIds[activeIndex]);

  return (
    <div className={styles.gallery}>
      {/* Main image */}
      <div className={styles.mainWrap}>
        <img
          key={activeIndex}
          src={mainUrl}
          alt={`Vehicle photo ${activeIndex + 1} of ${photoIds.length}`}
          className={styles.mainImage}
        />
        {photoIds.length > 1 && (
          <span className={styles.counter}>
            {activeIndex + 1} / {photoIds.length}
          </span>
        )}
      </div>

      {/* Thumbnail strip */}
      {photoIds.length > 1 && (
        <div className={styles.thumbStrip} role="listbox" aria-label="Photo thumbnails">
          {photoIds.map((id, i) => (
            <button
              key={id}
              className={`${styles.thumb} ${i === activeIndex ? styles.thumbActive : ''}`}
              onClick={() => setActiveIndex(i)}
              role="option"
              aria-selected={i === activeIndex}
              aria-label={`View photo ${i + 1}`}
            >
              <img
                src={getThumbnailUrl(id)}
                alt={`Thumbnail ${i + 1}`}
                className={styles.thumbImg}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
