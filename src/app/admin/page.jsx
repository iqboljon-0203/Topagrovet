'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { Package, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, inStock: 0, outOfStock: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const { data, error } = await supabase
        .from('products')
        .select('inStock');

      if (!error && data) {
        const total = data.length;
        const inStock = data.filter((p) => p.inStock).length;
        setStats({ total, inStock, outOfStock: total - inStock });
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  const today = new Date().toLocaleDateString('uz-UZ', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const availPct =
    stats.total > 0 ? Math.round((stats.inStock / stats.total) * 100) : 0;

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.tableSpinner} />
        <span>Ma&apos;lumotlar yuklanmoqda...</span>
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <div className={styles.pageTitleRow}>
            <div className={styles.pageTitleIcon}>
              <BarChart3 size={20} />
            </div>
            <h1 className={styles.pageTitle}>Dashboard</h1>
          </div>
          <p className={styles.pageSubtitle}>{today}</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className={styles.statsGrid}>
        {/* Total */}
        <div className={styles.statCard}>
          <div className={styles.statCardTop}>
            <div className={styles.statCardBody}>
              <div className={styles.statCardLabel}>Jami mahsulotlar</div>
              <div className={styles.statCardValue}>{stats.total}</div>
            </div>
            <div className={`${styles.statCardIcon} ${styles.statCardIconBlue}`}>
              <Package size={21} />
            </div>
          </div>
          <div className={styles.statCardBottom}>
            <Link href="/admin/products" className={styles.statCardLink}>
              Barchasini ko&apos;rish →
            </Link>
          </div>
        </div>

        {/* In stock */}
        <div className={styles.statCard}>
          <div className={styles.statCardTop}>
            <div className={styles.statCardBody}>
              <div className={styles.statCardLabel}>Mavjud</div>
              <div className={styles.statCardValue}>{stats.inStock}</div>
            </div>
            <div className={`${styles.statCardIcon} ${styles.statCardIconGreen}`}>
              <CheckCircle size={21} />
            </div>
          </div>
          <div className={styles.statCardBottom}>
            <Link href="/admin/products" className={styles.statCardLink}>
              Ro&apos;yxatni ko&apos;rish →
            </Link>
          </div>
        </div>

        {/* Out of stock */}
        <div className={styles.statCard}>
          <div className={styles.statCardTop}>
            <div className={styles.statCardBody}>
              <div className={styles.statCardLabel}>Tugagan</div>
              <div className={styles.statCardValue}>{stats.outOfStock}</div>
            </div>
            <div className={`${styles.statCardIcon} ${styles.statCardIconRed}`}>
              <XCircle size={21} />
            </div>
          </div>
          <div className={styles.statCardBottom}>
            <Link href="/admin/products" className={styles.statCardLink}>
              Ko&apos;rish →
            </Link>
          </div>
        </div>

        {/* Availability % */}
        <div className={styles.statCard}>
          <div className={styles.statCardTop}>
            <div className={styles.statCardBody}>
              <div className={styles.statCardLabel}>Mavjudlik</div>
              <div className={styles.statCardValue}>{availPct}%</div>
            </div>
            <div className={`${styles.statCardIcon} ${styles.statCardIconAmber}`}>
              <BarChart3 size={21} />
            </div>
          </div>
          <div className={styles.statCardBottom}>
            <span className={styles.statCardText}>Ombor to&apos;liqlik darajasi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
