'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ChevronRight, Heart, ShoppingCart, Grid3X3, List, Bug, Leaf, Sprout, Droplets, FlaskConical, Pill, Shield, Heart as HeartIcon, Thermometer, SprayCan, Zap } from 'lucide-react';
import ScrollReveal from '@/components/3d/ScrollReveal';
import ProductTilt from '@/components/3d/ProductTilt';
import products from '@/data/products.json';
import categories from '@/data/categories.json';
import { formatPrice, getSubcategoryBadgeClass } from '@/lib/utils';
import styles from './catalog.module.css';

const iconMap = {
  bug: Bug, leaf: Leaf, sprout: Sprout, droplets: Droplets, flask: FlaskConical,
  pill: Pill, shield: Shield, heart: HeartIcon, thermometer: Thermometer, spray: SprayCan,
  zap: Zap, grid: Grid3X3,
};

const categoryMap = {
  'veterinariya': { data: categories.veterinary, mainCat: 'veterinariya', label: 'Veterinariya preparatlari', bgImage: '/catalog-vet-bg.png' },
  'agro-preparatlar': { data: categories.agro, mainCat: 'agro', label: 'Agro preparatlar', bgImage: '/catalog-agro-bg.png' },
  'barchasi': { data: null, mainCat: 'all', label: 'Barcha mahsulotlar', bgImage: '/catalog-agro-bg.png' },
};

export default function CatalogPage() {
  const params = useParams();
  const categorySlug = params.category;
  const catInfo = categoryMap[categorySlug] || categoryMap['barchasi'];

  const [activeSubcat, setActiveSubcat] = useState('barchasi');
  const [priceRange, setPriceRange] = useState(1000000);
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (catInfo.mainCat !== 'all') {
      filtered = filtered.filter(p => p.category === catInfo.mainCat);
    }

    if (activeSubcat && activeSubcat !== 'barchasi') {
      filtered = filtered.filter(p => p.subcategory === activeSubcat);
    }

    filtered = filtered.filter(p => p.price <= priceRange);

    if (sortBy === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [catInfo.mainCat, activeSubcat, priceRange, sortBy]);

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <div className={styles.heroBanner} style={{ backgroundImage: `url(${catInfo.bgImage})` }}>
        <div className={styles.bannerContentWrap}>
          <svg className={styles.bannerCurve} viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 C80,50 40,80 0,100 Z" fill="#f4f7f5" />
          </svg>
          <div className={styles.bannerInner}>
            <div className={styles.breadcrumb}>
              <Link href="/">Bosh sahifa</Link>
              <ChevronRight size={14} className={styles.breadcrumbSep} />
              <span>{catInfo.label}</span>
            </div>
            <div className={styles.bannerContent}>
              <h1 className={styles.bannerTitle}>{catInfo.label}</h1>
              <p className={styles.bannerDesc}>
                {catInfo.data?.description || "O'zbekistonda eng keng tanlash imkoniyati va sifatli mahsulotlar"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {catInfo.data && (
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>Kategoriyalar</h3>
              <div className={styles.categoryList}>
                {catInfo.data.subcategories.map((sub) => {
                  const Icon = iconMap[sub.icon] || Grid3X3;
                  return (
                    <button
                      key={sub.id}
                      className={`${styles.categoryItem} ${activeSubcat === sub.id ? styles.active : ''}`}
                      onClick={() => setActiveSubcat(sub.id)}
                    >
                      <div className={styles.categoryItemLeft}>
                        <Icon size={18} />
                        <span>{sub.name}</span>
                      </div>
                      <span className={styles.categoryCount}>({sub.count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>Filtr</h3>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Faol moddasi</label>
              <select className={styles.filterSelect}>
                <option>Tanlang</option>
                <option>Imidakloprid</option>
                <option>Oksitetrasiklin</option>
                <option>Glyposate</option>
                <option>Albendazol</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Ishlab chiqaruvchi</label>
              <select className={styles.filterSelect}>
                <option>Tanlang</option>
                <option>MS Pharma</option>
                <option>Syngenta</option>
                <option>Bayer CropScience</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Narx oralig'i</label>
              <div className={styles.priceRange}>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className={styles.rangeSlider}
                />
                <div className={styles.priceLabels}>
                  <span>0 so'm</span>
                  <span>{formatPrice(priceRange)}</span>
                </div>
              </div>
            </div>

            <div className={styles.filterBtns}>
              <button className={styles.filterBtnApply}>Qo'llash</button>
              <button className={styles.filterBtnReset} onClick={() => { setActiveSubcat('barchasi'); setPriceRange(1000000); }}>
                Tozalash
              </button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className={styles.gridArea}>
          <div className={styles.gridHeader}>
            <span className={styles.productCount}>
              Jami <strong>{filteredProducts.length}</strong> ta mahsulot
            </span>
            <div className={styles.sortControls}>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>Saralash:</span>
              <select className={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">Mashhurlikka ko'ra</option>
                <option value="price-asc">Narx: arzon → qimmat</option>
                <option value="price-desc">Narx: qimmat → arzon</option>
                <option value="name">Nomi bo'yicha</option>
              </select>
              <div className={styles.viewToggle}>
                <button className={`${styles.viewBtn} ${styles.active}`} aria-label="Grid ko'rinish">
                  <Grid3X3 size={16} />
                </button>
                <button className={styles.viewBtn} aria-label="List ko'rinish">
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className={styles.productGrid}>
            {filteredProducts.map((product, i) => (
              <ScrollReveal key={product.id} delay={Math.min(i * 0.05, 0.3)} direction="up">
                <ProductTilt>
                  <div className={styles.productCard}>
                    <div className={styles.productImageWrap}>
                      <span className={`badge ${getSubcategoryBadgeClass(product.subcategory)} ${styles.categoryBadge}`}>
                        {product.subcategoryLabel}
                      </span>
                      <button className={styles.wishlistBtn} aria-label="Sevimlilar">
                        <Heart size={16} />
                      </button>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={120}
                        height={160}
                        className={styles.productImage}
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <p className={styles.productDesc}>{product.activeIngredient}</p>
                      <p className={styles.productPrice}>{formatPrice(product.price)}</p>
                      <div className={styles.productActions}>
                        <Link href={`/product/${product.slug}`} className={styles.detailBtn}>
                          Batafsil
                        </Link>
                        <button className={styles.cartBtn} aria-label="Savatcha">
                          <ShoppingCart size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </ProductTilt>
              </ScrollReveal>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--color-gray-500)' }}>
              <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Mahsulotlar topilmadi</p>
              <p style={{ fontSize: '0.875rem' }}>Filtrlarni o'zgartirib ko'ring</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
