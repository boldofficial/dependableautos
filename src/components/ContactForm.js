'use client';

import { useState } from 'react';
import { databases, DATABASE_ID, INQUIRIES_COLLECTION_ID, ID } from '@/lib/appwrite';
import styles from './ContactForm.module.css';

export default function ContactForm({ carId = null }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        message: formData.message.trim(),
      };

      if (carId) {
        payload.carId = carId;
      }

      await databases.createDocument(
        DATABASE_ID,
        INQUIRIES_COLLECTION_ID,
        ID.unique(),
        payload
      );

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setErrorMsg('Something went wrong. Please try again or call us directly.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.successMsg}>
        <span className={styles.statusIcon}>✅</span>
        <div>
          <strong>Thank you!</strong> Your inquiry has been submitted. We&apos;ll get back to you shortly.
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {status === 'error' && (
        <div className={styles.errorMsg}>
          <span className={styles.statusIcon}>⚠️</span>
          <span>{errorMsg}</span>
        </div>
      )}

      <div className={styles.row}>
        <div className={styles.fieldGroup}>
          <label htmlFor="contact-name" className={styles.label}>
            Name <span className={styles.required}>*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            className={styles.input}
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="contact-email" className={styles.label}>
            Email <span className={styles.required}>*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            className={styles.input}
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="contact-phone" className={styles.label}>
          Phone <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          name="phone"
          className={styles.input}
          placeholder="(555) 123-4567"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="contact-message" className={styles.label}>
          Message <span className={styles.required}>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          className={styles.textarea}
          placeholder={
            carId
              ? "I'm interested in this vehicle. Please send me more information..."
              : 'How can we help you?'
          }
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <span className={styles.spinner} />
            Sending...
          </>
        ) : (
          'Send Inquiry'
        )}
      </button>
    </form>
  );
}
