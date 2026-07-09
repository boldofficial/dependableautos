'use client';

import { useState, useMemo } from 'react';
import CarCard from '@/components/CarCard';

/**
 * Client-side filtering UI for the inventory list.
 * Receives the full car list as a prop (fetched server-side) so the vehicle
 * content is present in the initial SSR HTML for search engines.
 */
export default function InventoryBrowser({ cars = [] }) {
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');

  /* Build unique year list */
  const years = useMemo(() => {
    const set = new Set(cars.map((c) => c.year).filter(Boolean));
    return Array.from(set).sort((a, b) => b - a);
  }, [cars]);

  /* Filtered results */
  const filtered = useMemo(() => {
    return cars.filter((car) => {
      const haystack = `${car.year} ${car.make} ${car.model} ${car.trim || ''}`.toLowerCase();
      if (search && !haystack.includes(search.toLowerCase())) return false;

      if (priceRange !== 'all') {
        const p = car.price || 0;
        if (priceRange === 'under10' && p >= 10000) return false;
        if (priceRange === '10to20' && (p < 10000 || p >= 20000)) return false;
        if (priceRange === '20to30' && (p < 20000 || p >= 30000)) return false;
        if (priceRange === '30plus' && p < 30000) return false;
      }

      if (yearFilter !== 'all' && car.year !== parseInt(yearFilter)) return false;

      return true;
    });
  }, [cars, search, priceRange, yearFilter]);

  const hasActiveFilters = search || priceRange !== 'all' || yearFilter !== 'all';

  const clearAll = () => {
    setSearch('');
    setPriceRange('all');
    setYearFilter('all');
  };

  return (
    <>
      {/* ── Filter Bar ───────────────────────────────────── */}
      <div className="container" style={{ marginTop: '-32px', position: 'relative', zIndex: 3 }}>
        <div style={filterBar}>
          <div style={filterField}>
            <label htmlFor="inv-search" style={filterLabel}>Search</label>
            <input
              id="inv-search"
              type="text"
              placeholder="Make, model, year..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={filterInput}
            />
          </div>

          <div style={filterField}>
            <label htmlFor="inv-price" style={filterLabel}>Price Range</label>
            <select
              id="inv-price"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              style={filterSelect}
            >
              <option value="all">Any Price</option>
              <option value="under10">Under $10,000</option>
              <option value="10to20">$10,000 – $20,000</option>
              <option value="20to30">$20,000 – $30,000</option>
              <option value="30plus">$30,000+</option>
            </select>
          </div>

          <div style={filterField}>
            <label htmlFor="inv-year" style={filterLabel}>Year</label>
            <select
              id="inv-year"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              style={filterSelect}
            >
              <option value="all">Any Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button style={clearBtn} onClick={clearAll}>
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Results ──────────────────────────────────────── */}
      <section className="container" style={{ padding: '40px 20px 80px' }}>
        {filtered.length > 0 ? (
          <>
            <p style={resultCount}>
              Showing <strong>{filtered.length}</strong>{' '}
              vehicle{filtered.length !== 1 ? 's' : ''}
            </p>
            <div style={gridStyle} className="stagger">
              {filtered.map((car) => (
                <div key={car.$id} className="animate-fade-in-up">
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={emptyState}>
            <span style={{ fontSize: '3rem' }}>🔍</span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: '12px' }}>
              No vehicles found
            </h3>
            <p style={{ color: 'var(--text-light)', marginTop: '8px' }}>
              {hasActiveFilters
                ? 'Try adjusting your filters to see more results.'
                : "We don't have any vehicles listed right now — check back soon!"}
            </p>
            {hasActiveFilters && (
              <button className="btn btn-outline" style={{ marginTop: '20px' }} onClick={clearAll}>
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </section>
    </>
  );
}

/* ── Style Objects ────────────────────────────────────────── */
const filterBar = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: '16px',
  padding: '24px 28px',
  background: 'rgba(255,255,255,0.85)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--card-shadow)',
  border: '1px solid rgba(255,255,255,0.4)',
  flexWrap: 'wrap',
};

const filterField = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  flex: '1 1 200px',
  minWidth: '160px',
};

const filterLabel = {
  fontSize: '0.78rem',
  fontWeight: 600,
  color: 'var(--text-light)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const filterInput = {
  padding: '12px 14px',
  borderRadius: 'var(--radius-sm)',
  border: '2px solid transparent',
  background: 'var(--bg)',
  fontSize: '0.9rem',
  transition: 'all 0.2s',
  outline: 'none',
};

const filterSelect = {
  padding: '12px 14px',
  borderRadius: 'var(--radius-sm)',
  border: '2px solid transparent',
  background: 'var(--bg)',
  fontSize: '0.9rem',
  cursor: 'pointer',
  outline: 'none',
  appearance: 'auto',
};

const clearBtn = {
  padding: '12px 18px',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: 'var(--text-light)',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  borderRadius: 'var(--radius-sm)',
  transition: 'all 0.2s',
  whiteSpace: 'nowrap',
  alignSelf: 'flex-end',
};

const resultCount = {
  fontSize: '0.9rem',
  color: 'var(--text-light)',
  marginBottom: '20px',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: '28px',
};

const emptyState = {
  textAlign: 'center',
  padding: '80px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
