'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CarForm from '@/components/CarForm';
import { createCar } from '@/lib/cars';
import styles from './page.module.css';

export default function AddCarPage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    try {
      setError(null);
      await createCar(data);
      router.push('/admin');
      router.refresh();
    } catch (err) {
      console.error('Error creating car:', err);
      setError(err.message || 'Failed to create listing. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => router.back()} className={styles.backButton}>
          &larr; Back to Dashboard
        </button>
        <h1>Add New Listing</h1>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.formCard}>
        <CarForm initialData={null} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
