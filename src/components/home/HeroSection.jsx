'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, ShieldCheck, Headphones } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './HeroSection.module.css';

export default function HeroSection({ heroData }) {
  const { language } = useLanguage();
  const hero = heroData;

  // Fallback qiymatlar
  const h = hero || {
    title_line1: 'Sog\'lom hayvonlar',
    title_line2: 'va mo\'l hosil uchun',
    title_highlight: 'ishonchli tanlov!',
    subtitle: 'Veterinariya va agro preparatlarining keng assortimenti faqat Top Agro Vet\'da.',
    btn1_text: 'Veterinariya mahsulotlari',
    btn1_link: '/catalog/veterinariya',
    btn2_text: 'Agro preparatlar',
    btn2_link: '/catalog/agro-preparatlar',
    trust1: '100% original mahsulotlar',
    trust2: 'Sertifikatlangan sifat',
    trust3: 'Mutaxasis yordami',
  };

  const isRu = language === 'ru';
  const val = (uzStr, ruStr) => isRu && ruStr ? ruStr : uzStr;

  return (
    <section className={styles.hero}>
      {/* Full-width background image */}
      <Image
        src="/herobg.png"
        alt="Veterinariya va agro mahsulotlar"
        fill
        className={styles.heroBg}
        priority
        sizes="100vw"
      />

      {/* Left gradient overlay so text is readable */}
      <div className={styles.overlay} />

      {/* Text content on top */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          {val(h.title_line1, h.title_line1_ru)} <br />
          {val(h.title_line2, h.title_line2_ru)} <br />
          <em className={styles.heroHighlight}>{val(h.title_highlight, h.title_highlight_ru)}</em>
        </h1>

        <p className={styles.heroSubtitle}>
          {val(h.subtitle, h.subtitle_ru)}
        </p>

        <div className={styles.heroButtons}>
          <Link href={h.btn1_link} className={styles.btnPrimary}>
            {val(h.btn1_text, h.btn1_text_ru)}
            <ArrowRight size={18} />
          </Link>
          <Link href={h.btn2_link} className={styles.btnOutline}>
            {val(h.btn2_text, h.btn2_text_ru)}
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className={styles.heroTrust}>
          <div className={styles.trustItem}>
            <CheckCircle size={16} className={styles.trustIcon} />
            <span>{val(h.trust1, h.trust1_ru)}</span>
          </div>
          <div className={styles.trustItem}>
            <ShieldCheck size={16} className={styles.trustIcon} />
            <span>{val(h.trust2, h.trust2_ru)}</span>
          </div>
          <div className={styles.trustItem}>
            <Headphones size={16} className={styles.trustIcon} />
            <span>{val(h.trust3, h.trust3_ru)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
