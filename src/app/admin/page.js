'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllCars, deleteCar } from '@/lib/cars';
import { deleteImages, getThumbnailUrl } from '@/lib/storage';
import styles from './page.module.css';

export default function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null); // car doc or null
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    setLoading(true);
    const data = await getAllCars();
    setCars(data);
    setLoading(false);
  }

  /* ── stats ──────────────────────────────────── */
  const activeCount = cars.filter((c) => c.status === 'active').length;
  const soldCount = cars.filter((c) => c.status === 'sold').length;
  const totalValue = cars
    .filter((c) => c.status === 'active')
    .reduce((sum, c) => sum + (c.price || 0), 0);

  const fmt = (n) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  /* ── delete flow ────────────────────────────── */
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      // Delete photos from storage
      if (deleteTarget.photoIds && deleteTarget.photoIds.length > 0) {
        await deleteImages(deleteTarget.photoIds);
      }
      // Delete the document
      await deleteCar(deleteTarget.$id);
      setCars((prev) => prev.filter((c) => c.$id !== deleteTarget.$id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete listing. Please try again.');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  /* ── render ─────────────────────────────────── */
  if (loading) {
    return (
      <div className={styles.loaderWrap}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <Link href="/admin/cars/new" className={styles.addBtn}>
          + Add New Car
        </Link>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Active Listings</span>
          <span className={styles.statValueAccent}>{activeCount}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Sold</span>
          <span className={styles.statValue}>{soldCount}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Inventory Value</span>
          <span className={styles.statValueGold}>{fmt(totalValue)}</span>
        </div>
      </div>

      {/* Table */}
      {cars.length === 0 ? (
        <div className={styles.empty}>
          No listings yet.{' '}
          <Link href="/admin/cars/new" style={{ color: '#1a3fa0', fontWeight: 600 }}>
            Add your first car →
          </Link>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Vehicle</th>
                <th>Price</th>
                <th>Mileage</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => {
                const thumbId =
                  car.photoIds && car.photoIds.length > 0
                    ? car.photoIds[0]
                    : null;
                const thumbUrl = thumbId ? getThumbnailUrl(thumbId) : null;

                return (
                  <tr key={car.$id}>
                    {/* Photo */}
                    <td>
                      {thumbUrl ? (
                        <img
                          src={
                            typeof thumbUrl === 'string'
                              ? thumbUrl
                              : thumbUrl.href
                          }
                          alt={`${car.year} ${car.make} ${car.model}`}
                          className={styles.thumb}
                        />
                      ) : (
                        <div className={styles.thumbPlaceholder}>🚗</div>
                      )}
                    </td>

                    {/* Vehicle */}
                    <td>
                      <span className={styles.carName}>
                        {car.year} {car.make} {car.model}
                      </span>
                      {car.trim ? ` ${car.trim}` : ''}
                    </td>

                    {/* Price */}
                    <td>{fmt(car.price || 0)}</td>

                    {/* Mileage */}
                    <td>{(car.mileage || 0).toLocaleString()} mi</td>

                    {/* Status */}
                    <td>
                      <span
                        className={`${styles.badge} ${
                          car.status === 'active'
                            ? styles.badgeActive
                            : styles.badgeSold
                        }`}
                      >
                        {car.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className={styles.actions}>
                        <Link
                          href={`/admin/cars/${car.$id}/edit`}
                          className={styles.editLink}
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          className={styles.deleteBtn}
                          onClick={() => setDeleteTarget(car)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div
          className={styles.modalOverlay}
          onClick={() => !deleting && setDeleteTarget(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Delete Listing</h2>
            <p className={styles.modalText}>
              Are you sure you want to delete the{' '}
              <strong>
                {deleteTarget.year} {deleteTarget.make} {deleteTarget.model}
              </strong>
              ? This action cannot be undone.
            </p>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.modalCancel}
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.modalConfirm}
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
