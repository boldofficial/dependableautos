import { getCars } from '@/lib/cars';
import InventoryBrowser from './InventoryBrowser';

// Server-render the inventory with ISR so vehicle content is in the HTML for SEO.
export const revalidate = 300;

export const metadata = {
  title: 'Used Car Inventory in Madison, WI',
  description:
    'Browse our current selection of quality pre-owned cars, trucks, and SUVs for sale in Madison, WI. Filter by price and year to find your next vehicle at Dependable Auto Sports.',
  alternates: { canonical: '/inventory' },
};

export default async function InventoryPage() {
  const cars = await getCars();

  return (
    <div style={{ minHeight: '80vh' }}>
      {/* ── Header ───────────────────────────────────────── */}
      <section style={headerSection}>
        <div style={headerOverlay} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={pageTitle}>Our Inventory</h1>
          <p style={pageSubtitle}>
            Browse our selection of quality pre-owned vehicles for sale in Madison, WI
          </p>
        </div>
      </section>

      <InventoryBrowser cars={cars} />
    </div>
  );
}

/* ── Style Objects ────────────────────────────────────────── */
const headerSection = {
  position: 'relative',
  padding: '80px 0 64px',
  background: 'linear-gradient(135deg, #0f2d7a 0%, #1a3fa0 60%, #2a5fd0 100%)',
  overflow: 'hidden',
};

const headerOverlay = {
  position: 'absolute',
  inset: 0,
  background: 'radial-gradient(ellipse at 70% 30%, rgba(212,160,23,0.08) 0%, transparent 60%)',
};

const pageTitle = {
  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '8px',
};

const pageSubtitle = {
  fontSize: '1.1rem',
  color: 'rgba(255,255,255,0.7)',
};
