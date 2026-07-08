'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import styles from './AdminGuard.module.css';

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [status, setStatus] = useState('loading'); // loading | authenticated

  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();
      if (!user) {
        router.replace('/admin/login');
      } else {
        setStatus('authenticated');
      }
    }
    checkAuth();
  }, [router]);

  if (status === 'loading') {
    return (
      <div className={styles.loaderWrap}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return children;
}
