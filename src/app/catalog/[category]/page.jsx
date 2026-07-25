'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ChevronRight, Heart, ShoppingCart, Grid3X3, List, Bug, Leaf, Sprout, Droplets, FlaskConical, Pill, Shield, Heart as HeartIcon, Thermometer, SprayCan, Zap, Download } from 'lucide-react';
import ScrollReveal from '@/components/3d/ScrollReveal';
import ProductTilt from '@/components/3d/ProductTilt';
import categories from '@/data/categories.json';
import { formatPrice, getSubcategoryBadgeClass } from '@/lib/utils';
import { supabase } from '@/lib/supabaseClient';
import { useLanguage } from '@/context/LanguageContext';
import styles from './catalog.module.css';

const iconMap = {
  bug: Bug, leaf: Leaf, sprout: Sprout, droplets: Droplets, flask: FlaskConical,
  pill: Pill, shield: Shield, heart: HeartIcon, thermometer: Thermometer, spray: SprayCan,
  zap: Zap, grid: Grid3X3,
};

export default function CatalogPage() {
  const { language, t } = useLanguage();
  const isRu = language === 'ru';
  const val = (uzStr, ruStr) => isRu && ruStr ? ruStr : uzStr;

  const params = useParams();
  const categorySlug = params.category;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mainCategory, setMainCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [activeSubcat, setActiveSubcat] = useState('barchasi');
  const [priceRange, setPriceRange] = useState(1000000);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Fetch categories
      const { data: cats, error: catErr } = await supabase.from('product_categories').select('*');
      if (cats && !catErr) {
        setCategories(cats);
        if (categorySlug !== 'barchasi') {
          const main = cats.find(c => c.slug === categorySlug && !c.parent_id);
          setMainCategory(main || null);
          if (main) {
            setSubcategories(cats.filter(c => c.parent_id === main.id));
          }
        } else {
          setMainCategory(null);
          setSubcategories([]);
        }
      }
      
      // Fetch products
      const { data: prods, error: prodErr } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (prods && !prodErr) {
        setProducts(prods);
      }
      setLoading(false);
    }
    fetchData();
  }, [categorySlug]);

  const catLabel = mainCategory ? val(mainCategory.name, mainCategory.name_ru) : (isRu ? 'Все продукты' : 'Barcha mahsulotlar');
  const bgImage = mainCategory && mainCategory.type === 'agro' ? '/catalog-agro-bg.png' : '/catalog-vet-bg.png';

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (categorySlug !== 'barchasi') {
      filtered = filtered.filter(p => p.category === categorySlug);
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
  }, [products, categorySlug, activeSubcat, priceRange, sortBy]);

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>{isRu ? 'Загрузка...' : 'Yuklanmoqda...'}</div>;
  }

  return (
    <div className={styles.page}>
      {/* Hero Banner */}
      <div className={styles.heroBanner} style={{ backgroundImage: `url(${bgImage})` }}>
        <div className={styles.bannerContentWrap}>
          <svg className={styles.bannerCurve} viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 C80,50 40,80 0,100 Z" fill="#f4f7f5" />
          </svg>
          <div className={styles.bannerInner}>
            <div className={styles.breadcrumb}>
              <Link href="/">{t('header.home')}</Link>
              <ChevronRight size={14} className={styles.breadcrumbSep} />
              <span>{catLabel}</span>
            </div>
            <div className={styles.bannerContent}>
              <h1 className={styles.bannerTitle}>{catLabel}</h1>
              <p className={styles.bannerDesc}>
                {isRu ? 'Самый широкий выбор и качественная продукция в Узбекистане' : 'O\'zbekistonda eng keng tanlash imkoniyati va sifatli mahsulotlar'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {mainCategory && subcategories.length > 0 && (
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>{isRu ? 'Категории' : 'Kategoriyalar'}</h3>
              <div className={styles.categoryList}>
                {subcategories.map((sub) => {
                  const Icon = iconMap[sub.icon] || Grid3X3;
                  // Bu yerda mahsulotlar sonini hisoblash mumkin, hozircha static yoki yo'q qoldirish mumkin.
                  const count = products.filter(p => p.subcategory === sub.slug).length;
                  return (
                    <button
                      key={sub.id}
                      className={`${styles.categoryItem} ${activeSubcat === sub.slug ? styles.active : ''}`}
                      onClick={() => setActiveSubcat(sub.slug)}
                    >
                      <div className={styles.categoryItemLeft}>
                        <Icon size={18} />
                        <span>{val(sub.name, sub.name_ru)}</span>
                      </div>
                      <span className={styles.categoryCount}>({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>{isRu ? 'Фильтр' : 'Filtr'}</h3>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{isRu ? 'Активное вещество' : 'Faol moddasi'}</label>
              <select className={styles.filterSelect}>
                <option>{isRu ? 'Выберите' : 'Tanlang'}</option>
                <option>Imidakloprid</option>
                <option>Oksitetrasiklin</option>
                <option>Glyposate</option>
                <option>Albendazol</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{isRu ? 'Производитель' : 'Ishlab chiqaruvchi'}</label>
              <select className={styles.filterSelect}>
                <option>{isRu ? 'Выберите' : 'Tanlang'}</option>
                <option>MS Pharma</option>
                <option>Syngenta</option>
                <option>Bayer CropScience</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>{isRu ? 'Диапазон цен' : 'Narx oralig\'i'}</label>
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
                  <span>0 {isRu ? 'сум' : 'so\'m'}</span>
                  <span>{formatPrice(priceRange)}</span>
                </div>
              </div>
            </div>

            <div className={styles.filterBtns}>
              <button className={styles.filterBtnApply}>{isRu ? 'Применить' : 'Qo\'llash'}</button>
              <button className={styles.filterBtnReset} onClick={() => { setActiveSubcat('barchasi'); setPriceRange(1000000); }}>
                {isRu ? 'Очистить' : 'Tozalash'}
              </button>
            </div>
          </div>

          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>{isRu ? 'Каталоги (PDF)' : 'Kataloglar (PDF)'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="/uz.pdf" target="_blank" rel="noopener noreferrer" className={styles.filterBtnApply} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}>
                <Download size={16} /> {isRu ? 'На узбекском' : 'O\'zbek tilida'}
              </a>
              <a href="/rus.pdf" target="_blank" rel="noopener noreferrer" className={styles.filterBtnReset} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
                <Download size={16} /> {isRu ? 'На русском' : 'Rus tilida'}
              </a>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className={styles.gridArea}>
          <div className={styles.gridHeader}>
            <span className={styles.productCount}>
              {isRu ? 'Всего ' : 'Jami '} <strong>{filteredProducts.length}</strong> {isRu ? ' товаров' : ' ta mahsulot'}
            </span>
            <div className={styles.sortControls}>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>{isRu ? 'Сортировка:' : 'Saralash:'}</span>
              <select className={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">{isRu ? 'По популярности' : 'Mashhurlikka ko\'ra'}</option>
                <option value="price-asc">{isRu ? 'Сначала дешевые' : 'Narx: arzon → qimmat'}</option>
                <option value="price-desc">{isRu ? 'Сначала дорогие' : 'Narx: qimmat → arzon'}</option>
                <option value="name">{isRu ? 'По названию' : 'Nomi bo\'yicha'}</option>
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
                        {categories.find(c => c.slug === product.subcategory)?.name || product.subcategory || 'Boshqa'}
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
                      <h3 className={styles.productName}>{val(product.name, product.name_ru)}</h3>
                      <p className={styles.productDesc}>{val(product.activeIngredient, product.activeIngredient_ru)}</p>
                      <p className={styles.productPrice}>{formatPrice(product.price)}</p>
                      <div className={styles.productActions}>
                        <Link href={`/product/${product.slug}`} className={styles.detailBtn}>
                          {isRu ? 'Подробнее' : 'Batafsil'}
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
              <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{isRu ? 'Товары не найдены' : 'Mahsulotlar topilmadi'}</p>
              <p style={{ fontSize: '0.875rem' }}>{isRu ? 'Попробуйте изменить фильтры' : 'Filtrlarni o\'zgartirib ko\'ring'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
