'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminGuard from '@/components/AdminGuard';
import { logout } from '@/lib/auth';
import styles from './admin-layout.module.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't wrap the login page in AdminGuard
  if (pathname === '/admin/login') {
    return children;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
    router.replace('/admin/login');
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/cars/new', label: 'Add Car', icon: '➕' },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <AdminGuard>
      <div className={styles.shell}>
        {/* Sidebar */}
        <aside
          className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}
        >
          <div className={styles.sidebarBrand}>
            Dependable{' '}
            <span className={styles.sidebarBrandAccent}>Auto Sports</span>
          </div>

          <nav className={styles.nav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={`${styles.navLink} ${
                  pathname === item.href ? styles.navLinkActive : ''
                }`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {item.label}
              </Link>
            ))}

            <div className={styles.navSpacer} />

            <button
              type="button"
              onClick={handleLogout}
              className={styles.logoutBtn}
            >
              <span className={styles.navIcon}>🚪</span>
              Log Out
            </button>
          </nav>
        </aside>

        {/* Overlay */}
        <div
          className={`${styles.overlay} ${sidebarOpen ? styles.overlayVisible : ''}`}
          onClick={closeSidebar}
        />

        {/* Main */}
        <div className={styles.main}>
          <header className={styles.topbar}>
            <button
              type="button"
              className={styles.menuBtn}
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
            <span className={styles.topbarTitle}>
              Dependable Auto Sports — Admin
            </span>
          </header>

          <main className={styles.content}>{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
