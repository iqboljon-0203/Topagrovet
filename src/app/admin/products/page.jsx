'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { Plus, Search, Pencil, Trash2, Package, Star } from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      q
        ? products.filter(
            (p) =>
              p.name?.toLowerCase().includes(q) ||
              p.category?.toLowerCase().includes(q)
          )
        : products
    );
  }, [search, products]);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('id, name, category, price, inStock, is_popular')
      .order('created_at', { ascending: false });

    if (!error) {
      setProducts(data);
      setFiltered(data);
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Rostdan ham ushbu mahsulotni o'chirmoqchimisiz?")) return;
    
    // Rasm URL larini olish
    const { data: product } = await supabase.from('products').select('images').eq('id', id).single();
    
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      
      // Rasmlarni storage dan o'chirish
      if (product && product.images && product.images.length > 0) {
        const fileNames = product.images.map(url => {
          const parts = url.split('/');
          const bucketIndex = parts.indexOf('products');
          if (bucketIndex !== -1 && parts.length > bucketIndex + 1) {
            return parts.slice(bucketIndex + 1).join('/');
          }
          return null;
        }).filter(Boolean);
        
        if (fileNames.length > 0) {
          await supabase.storage.from('products').remove(fileNames);
        }
      }
    } else {
      alert("O'chirishda xatolik yuz berdi");
    }
  }

  async function handleTogglePopular(id, currentStatus) {
    const { error } = await supabase
      .from('products')
      .update({ is_popular: !currentStatus })
      .eq('id', id);

    if (!error) {
      const updated = products.map((p) =>
        p.id === id ? { ...p, is_popular: !currentStatus } : p
      );
      setProducts(updated);
    }
  }

  return (
    <div>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <div className={styles.pageTitleRow}>
            <div className={styles.pageTitleIcon}>
              <Package size={20} />
            </div>
            <h1 className={styles.pageTitle}>Mahsulotlar</h1>
          </div>
          <p className={styles.pageSubtitle}>
            Jami {products.length} ta mahsulot boshqaruvi
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
            placeholder="Nomi yoki toifa bo'yicha qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Link href="/admin/products/new" className={styles.addBtn}>
          <Plus size={15} />
          Yangi qo&apos;shish
        </Link>
      </div>

      {/* Table card */}
      <div className={styles.tableCard}>
        <div className={styles.tableCardHeader}>
          <span className={styles.tableCardTitle}>Mahsulotlar ro&apos;yxati</span>
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
              <Package size={28} />
            </div>
            <p className={styles.emptyTitle}>
              {search ? 'Hech narsa topilmadi' : "Mahsulotlar yo'q"}
            </p>
            <p className={styles.emptyDesc}>
              {search
                ? `"${search}" bo'yicha natija topilmadi`
                : "Birinchi mahsulotingizni qo'shing"}
            </p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th>Mahsulot</th>
                  <th>Toifa</th>
                  <th>Narxi</th>
                  <th>Holati</th>
                  <th>Mashhur</th>
                  <th>Harakatlar</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {filtered.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.productName}>{product.name}</div>
                      <div className={styles.productId}>#{product.id?.toString().slice(0, 8)}</div>
                    </td>
                    <td>
                      <span className={styles.productCategory}>
                        {product.category}
                      </span>
                    </td>
                    <td>
                      <span className={styles.productPrice}>
                        {product.price
                          ? `${product.price.toLocaleString('uz-UZ')} so\u02bcm`
                          : '—'}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${
                          product.inStock ? styles.badgeGreen : styles.badgeRed
                        }`}
                      >
                        <span className={styles.badgeDot} />
                        {product.inStock ? 'Mavjud' : 'Tugagan'}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleTogglePopular(product.id, product.is_popular)}
                        className={styles.actionBtns}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: product.is_popular ? '#f59e0b' : '#94a3b8',
                          padding: '4px',
                        }}
                        title={product.is_popular ? "Mashhurlardan olib tashlash" : "Mashhurlarga qo'shish"}
                      >
                        <Star size={18} fill={product.is_popular ? '#f59e0b' : 'none'} />
                      </button>
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        <Link
                          href={`/admin/products/${product.id}`}
                          className={styles.editBtn}
                        >
                          <Pencil size={12} />
                          Tahrirlash
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
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
