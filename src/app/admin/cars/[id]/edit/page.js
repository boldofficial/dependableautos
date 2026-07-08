'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import CarForm from '@/components/CarForm';
import { getCar, updateCar } from '@/lib/cars';
import styles from './page.module.css';

export default function EditCarPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await getCar(id);
        if (data) {
          setCar(data);
        } else {
          setError('Car not found');
        }
      } catch (err) {
        setError('Failed to load car details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      setError(null);
      await updateCar(id, data);
      router.push('/admin');
      router.refresh();
    } catch (err) {
      console.error('Error updating car:', err);
      setError(err.message || 'Failed to update listing. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading vehicle details...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => router.back()} className={styles.backButton}>
          &larr; Back to Dashboard
        </button>
        <h1>Edit Listing</h1>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {car && (
        <div className={styles.formCard}>
          <CarForm initialData={car} onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
}
