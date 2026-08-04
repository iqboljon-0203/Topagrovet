'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Heart, ShoppingCart } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { getCategoryBadgeClass } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import styles from './PopularProducts.module.css';

export default function PopularProducts({ initialProducts }) {
  const { language, t } = useLanguage();
  const scrollRef = useRef(null);
  const products = initialProducts || [];

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -260 : 260, behavior: 'smooth' });
    }
  };

  if (!products.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('home.popular_title')}</h2>
        <div className={styles.headerRight}>
          <Link href="/catalog/barchasi" className={styles.viewAll}>
            {t('home.view_all')}
          </Link>
          <div className={styles.arrows}>
            <button className={styles.arrowBtn} onClick={() => scroll('left')} aria-label="Oldingi">
              <ChevronLeft size={18} />
            </button>
            <button className={styles.arrowBtn} onClick={() => scroll('right')} aria-label="Keyingi">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.scrollWrap} ref={scrollRef}>
        <div className={styles.row}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              {/* Image area */}
              <div className={styles.imgWrap}>
                <span className={`badge ${getCategoryBadgeClass(product.category)} ${styles.badge}`}>
                  {product.categoryLabel}
                </span>
                <button className={styles.wishBtn} aria-label="Sevimlilar">
                  <Heart size={15} />
                </button>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={90}
                  height={120}
                  className={styles.productImg}
                />
              </div>

              {/* Info area */}
              <div className={styles.info}>
                <div className={styles.productName}>{language === 'ru' && product.name_ru ? product.name_ru : product.name}</div>
                <div className={styles.productDesc}>{language === 'ru' && product.description_ru ? product.description_ru : product.description}</div>
                <div className={styles.footer}>
                  <Link href={`/product/${product.slug}`} className={styles.detailLink}>
                    {language === 'ru' ? 'Подробнее' : 'Batafsil'} <ArrowRight size={13} />
                  </Link>
                  <button className={styles.cartBtn} aria-label="Savatga">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
