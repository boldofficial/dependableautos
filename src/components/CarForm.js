'use client';

import { useState } from 'react';
import { uploadImages } from '@/lib/storage';
import { deleteImage } from '@/lib/storage';
import ImageUploader from './ImageUploader';
import styles from './CarForm.module.css';

const EMPTY = {
  year: '',
  make: '',
  model: '',
  trim: '',
  price: '',
  mileage: '',
  exteriorColor: '',
  interiorColor: '',
  transmission: 'Automatic',
  drivetrain: 'FWD',
  vin: '',
  description: '',
  status: 'active',
};

export default function CarForm({ initialData = null, onSubmit }) {
  const isEdit = !!initialData;

  const [form, setForm] = useState(() => {
    if (initialData) {
      return {
        year: initialData.year ?? '',
        make: initialData.make ?? '',
        model: initialData.model ?? '',
        trim: initialData.trim ?? '',
        price: initialData.price ?? '',
        mileage: initialData.mileage ?? '',
        exteriorColor: initialData.exteriorColor ?? '',
        interiorColor: initialData.interiorColor ?? '',
        transmission: initialData.transmission ?? 'Automatic',
        drivetrain: initialData.drivetrain ?? 'FWD',
        vin: initialData.vin ?? '',
        description: initialData.description ?? '',
        status: initialData.status ?? 'active',
      };
    }
    return { ...EMPTY };
  });

  const [existingPhotoIds, setExistingPhotoIds] = useState(
    () => initialData?.photoIds ?? [],
  );
  const [removedPhotoIds, setRemovedPhotoIds] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  /* ── handlers ───────────────────────────────── */
  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleRemoveExisting = (id) => {
    setExistingPhotoIds((prev) => prev.filter((p) => p !== id));
    setRemovedPhotoIds((prev) => [...prev, id]);
  };

  /* ── validation ─────────────────────────────── */
  const validate = () => {
    const errs = {};
    if (!form.year) errs.year = 'Required';
    else if (Number(form.year) < 1900 || Number(form.year) > 2030)
      errs.year = 'Enter a valid year';
    if (!form.make) errs.make = 'Required';
    if (!form.model) errs.model = 'Required';
    if (!form.price) errs.price = 'Required';
    else if (Number(form.price) <= 0) errs.price = 'Must be > 0';
    if (!form.mileage && form.mileage !== 0) errs.mileage = 'Required';
    if (!form.exteriorColor) errs.exteriorColor = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ── submit ─────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      // 1) Delete removed existing photos
      for (const id of removedPhotoIds) {
        try {
          await deleteImage(id);
        } catch (err) {
          console.error('Failed to delete photo:', id, err);
        }
      }

      // 2) Upload new files
      let newPhotoIds = [];
      if (newFiles.length > 0) {
        const uploaded = await uploadImages(newFiles);
        newPhotoIds = uploaded.map((f) => f.$id);
      }

      // 3) Merge photo IDs
      const allPhotoIds = [...existingPhotoIds, ...newPhotoIds];

      // 4) Call parent onSubmit
      await onSubmit({ ...form, photoIds: allPhotoIds });
    } catch (err) {
      console.error('Submit error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ── render helpers ─────────────────────────── */
  const Field = ({ label, field, required, type = 'text', className = '' }) => (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        type={type}
        value={form[field]}
        onChange={set(field)}
        className={styles.input}
      />
      {errors[field] && <span className={styles.errorText}>{errors[field]}</span>}
    </div>
  );

  const Select = ({ label, field, options, required }) => (
    <div className={styles.field}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <select
        value={form[field]}
        onChange={set(field)}
        className={styles.select}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* ── Vehicle Info ──────────────────────── */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Vehicle Information</h3>
        <div className={styles.fieldRow}>
          <Field label="Year" field="year" type="number" required />
          <Field label="Make" field="make" required />
        </div>
        <div className={styles.fieldRow}>
          <Field label="Model" field="model" required />
          <Field label="Trim" field="trim" />
        </div>
        <div className={styles.fieldRow}>
          <Field label="VIN" field="vin" />
          <Select
            label="Status"
            field="status"
            options={['active', 'sold']}
            required
          />
        </div>
      </div>

      {/* ── Pricing & Mileage ─────────────────── */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Pricing &amp; Mileage</h3>
        <div className={styles.fieldRow}>
          <Field label="Price ($)" field="price" type="number" required />
          <Field label="Mileage" field="mileage" type="number" required />
        </div>
      </div>

      {/* ── Details ───────────────────────────── */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Details</h3>
        <div className={styles.fieldRow}>
          <Field label="Exterior Color" field="exteriorColor" required />
          <Field label="Interior Color" field="interiorColor" />
        </div>
        <div className={styles.fieldRow}>
          <Select
            label="Transmission"
            field="transmission"
            options={['Automatic', 'Manual']}
            required
          />
          <Select
            label="Drivetrain"
            field="drivetrain"
            options={['FWD', 'RWD', 'AWD', '4WD']}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea
            value={form.description}
            onChange={set('description')}
            className={styles.textarea}
            rows={5}
          />
        </div>
      </div>

      {/* ── Photos ────────────────────────────── */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Photos</h3>
        <ImageUploader
          onChange={setNewFiles}
          existingPhotoIds={existingPhotoIds}
          onRemoveExisting={handleRemoveExisting}
        />
      </div>

      {/* ── Submit ────────────────────────────── */}
      <div className={styles.actions}>
        <button
          type="submit"
          disabled={submitting}
          className={styles.submitBtn}
        >
          {submitting && <span className={styles.btnSpinner} />}
          {submitting
            ? isEdit
              ? 'Saving…'
              : 'Creating…'
            : isEdit
              ? 'Save Changes'
              : 'Create Listing'}
        </button>
      </div>
    </form>
  );
}
