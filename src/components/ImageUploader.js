'use client';

import { useState, useRef, useCallback } from 'react';
import { getImagePreviewUrl } from '@/lib/storage';
import styles from './ImageUploader.module.css';

const MAX_FILES = 10;

export default function ImageUploader({
  onChange,
  existingPhotoIds = [],
  onRemoveExisting,
}) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  /* ── helpers ────────────────────────────────── */
  const addFiles = useCallback(
    (incoming) => {
      const totalExisting = existingPhotoIds.length;
      const available = MAX_FILES - totalExisting - files.length;
      const accepted = Array.from(incoming).slice(0, Math.max(0, available));

      if (accepted.length === 0) return;

      const newPreviews = accepted.map((f) => URL.createObjectURL(f));
      const nextFiles = [...files, ...accepted];
      const nextPreviews = [...previews, ...newPreviews];

      setFiles(nextFiles);
      setPreviews(nextPreviews);
      onChange && onChange(nextFiles);
    },
    [files, previews, existingPhotoIds.length, onChange],
  );

  const removeFile = (index) => {
    URL.revokeObjectURL(previews[index]);
    const nextFiles = files.filter((_, i) => i !== index);
    const nextPreviews = previews.filter((_, i) => i !== index);
    setFiles(nextFiles);
    setPreviews(nextPreviews);
    onChange && onChange(nextFiles);
  };

  /* ── drag events ────────────────────────────── */
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
      e.target.value = '';
    }
  };

  const totalCount = existingPhotoIds.length + files.length;

  return (
    <div className={styles.wrapper}>
      {/* Drop zone */}
      <div
        className={`${styles.dropzone} ${dragActive ? styles.dropzoneActive : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
        }}
      >
        <span className={styles.dropIcon}>📷</span>
        <span className={styles.dropLabel}>
          Drag &amp; drop photos here, or click to browse
        </span>
        <span className={styles.dropHint}>
          {totalCount}/{MAX_FILES} images · JPG, PNG, WebP
        </span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className={styles.hiddenInput}
          onChange={handleChange}
        />
      </div>

      {/* Preview grid */}
      {(existingPhotoIds.length > 0 || previews.length > 0) && (
        <div className={styles.previewGrid}>
          {/* Existing photos */}
          {existingPhotoIds.map((id) => {
            const url = getImagePreviewUrl(id, 300, 225);
            return (
              <div key={id} className={styles.previewCard}>
                <img
                  src={typeof url === 'string' ? url : url.href}
                  alt="Existing photo"
                  className={styles.previewImg}
                />
                <span className={styles.existingBadge}>Saved</span>
                {onRemoveExisting && (
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => onRemoveExisting(id)}
                    aria-label="Remove existing photo"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}

          {/* New file previews */}
          {previews.map((src, i) => (
            <div key={src} className={styles.previewCard}>
              <img
                src={src}
                alt={`New upload ${i + 1}`}
                className={styles.previewImg}
              />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeFile(i)}
                aria-label={`Remove new photo ${i + 1}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
