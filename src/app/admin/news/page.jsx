'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { Plus, Search, Pencil, Trash2, Newspaper, Calendar } from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      q
        ? news.filter((n) => n.title?.toLowerCase().includes(q))
        : news
    );
  }, [search, news]);

  async function fetchNews() {
    setLoading(true);
    const { data, error } = await supabase
      .from('news')
      .select('id, title, excerpt, published_at, image_url')
      .order('published_at', { ascending: false });

    if (!error && data) {
      setNews(data);
      setFiltered(data);
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Rostdan ham bu yangilikni o'chirmoqchimisiz?")) return;
    
    // Rasm URL ini olish
    const { data: newsItem } = await supabase.from('news').select('image_url').eq('id', id).single();
    
    const { error } = await supabase.from('news').delete().eq('id', id);
    if (!error) {
      const updated = news.filter((n) => n.id !== id);
      setNews(updated);
      
      // Rasmni storage dan o'chirish
      if (newsItem && newsItem.image_url) {
        const parts = newsItem.image_url.split('/');
        const bucketIndex = parts.indexOf('products'); // Biz news rasmlarini ham 'products' bucketga saqlayapmiz
        if (bucketIndex !== -1 && parts.length > bucketIndex + 1) {
          const fileName = parts.slice(bucketIndex + 1).join('/');
          await supabase.storage.from('products').remove([fileName]);
        }
      }
    } else {
      alert("O'chirishda xatolik yuz berdi");
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  return (
    <div>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <div className={styles.pageTitleRow}>
            <div className={`${styles.pageTitleIcon}`} style={{ background: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', color: '#0284c7' }}>
              <Newspaper size={20} />
            </div>
            <h1 className={styles.pageTitle}>Yangiliklar</h1>
          </div>
          <p className={styles.pageSubtitle}>
            Jami {news.length} ta yangilik boshqaruvi
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.tableToolbar}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>
            <Search size={15} />
          </span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Sarlavha bo'yicha qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Link href="/admin/news/new" className={styles.addBtn} style={{ background: 'linear-gradient(135deg,#0284c7,#0369a1)' }}>
          <Plus size={15} />
          Yangi yangilik
        </Link>
      </div>

      {/* Table card */}
      <div className={styles.tableCard}>
        <div className={styles.tableCardHeader}>
          <span className={styles.tableCardTitle}>Yangiliklar ro&apos;yxati</span>
          <span className={styles.tableCardCount}>{filtered.length} ta</span>
        </div>

        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.tableSpinner} />
            <span>Yuklanmoqda...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Newspaper size={28} />
            </div>
            <p className={styles.emptyTitle}>
              {search ? 'Hech narsa topilmadi' : "Yangiliklar yo'q"}
            </p>
            <p className={styles.emptyDesc}>
              {search
                ? `"${search}" bo'yicha natija topilmadi`
                : "Birinchi yangilikni qo'shing"}
            </p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th>Sarlavha</th>
                  <th>Qisqacha</th>
                  <th>Sana</th>
                  <th>Harakatlar</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.productName} style={{ maxWidth: '280px' }}>
                        {item.title}
                      </div>
                      <div className={styles.productId}>#{item.id?.toString().slice(0, 8)}</div>
                    </td>
                    <td>
                      <div style={{ maxWidth: '320px', fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.5 }}>
                        {item.excerpt
                          ? item.excerpt.length > 80
                            ? item.excerpt.slice(0, 80) + '...'
                            : item.excerpt
                          : '—'}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#64748b', fontSize: '0.8125rem', fontWeight: 500 }}>
                        <Calendar size={13} />
                        {formatDate(item.published_at)}
                      </div>
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        <Link
                          href={`/admin/news/${item.id}`}
                          className={styles.editBtn}
                        >
                          <Pencil size={12} />
                          Tahrirlash
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className={styles.deleteBtn}
                        >
                          <Trash2 size={12} />
                          O&apos;chirish
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
