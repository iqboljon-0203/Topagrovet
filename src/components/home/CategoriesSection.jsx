'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { ArrowRight, Pill, Shield, Heart, Thermometer, SprayCan, Grid3X3, Bug, Leaf, Sprout, Droplets, FlaskConical } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './CategoriesSection.module.css';

const vetIcons = [Shield, Pill, Heart, Droplets, SprayCan, Thermometer];
const agroIcons = [Bug, Shield, Leaf, Sprout, FlaskConical, Grid3X3];

export default function CategoriesSection({ categoriesData }) {
  const { language } = useLanguage();
  const catData = categoriesData;

  // Fallback
  const c = catData || {
    vet_title: 'Veterinariya\npreparatlari',
    vet_desc: 'Hayvonlar salomatligi bizning g\'amxo\'rligimizda',
    vet_btn_text: 'Katalogni ko\'rish',
    vet_btn_link: '/catalog/veterinariya',
    vet_item1: 'Паразидларга қарши воситалар',
    vet_item2: 'Антибактериал ва яллиғланишга қарши воситалар',
    vet_item3: 'Акушерлик-гинекологик воситалар',
    vet_item4: 'Витамин-минерал воситалар',
    vet_item5: 'Бошқа фарм-гурухлар ва дезинфекция воситалар',
    vet_item6: 'Кокцидиозга қарши воситалар',
    agro_title: 'Agro\npreparatlari',
    agro_desc: 'Mo\'l hosil va yuqori sifat uchun eng yaxshi yechimlar',
    agro_btn_text: 'Katalogni ko\'rish',
    agro_btn_link: '/catalog/agro-preparatlar',
    agro_item1: 'Инсектоцид',
    agro_item2: 'Инсектоакарацид',
    agro_item3: 'Фунгицид',
    agro_item4: 'Гербицид',
    agro_item5: 'Микроэлементлар',
    agro_item6: 'Barchasi',
  };

  const isRu = language === 'ru';
  const val = (uzStr, ruStr) => isRu && ruStr ? ruStr : uzStr;

  const vetItems = [
    { icon: vetIcons[0], label: val(c.vet_item1, c.vet_item1_ru) },
    { icon: vetIcons[1], label: val(c.vet_item2, c.vet_item2_ru) },
    { icon: vetIcons[2], label: val(c.vet_item3, c.vet_item3_ru) },
    { icon: vetIcons[3], label: val(c.vet_item4, c.vet_item4_ru) },
    { icon: vetIcons[4], label: val(c.vet_item5, c.vet_item5_ru) },
    { icon: vetIcons[5], label: val(c.vet_item6, c.vet_item6_ru) },
  ];

  const agroItems = [
    { icon: agroIcons[0], label: val(c.agro_item1, c.agro_item1_ru) },
    { icon: agroIcons[1], label: val(c.agro_item2, c.agro_item2_ru) },
    { icon: agroIcons[2], label: val(c.agro_item3, c.agro_item3_ru) },
    { icon: agroIcons[3], label: val(c.agro_item4, c.agro_item4_ru) },
    { icon: agroIcons[4], label: val(c.agro_item5, c.agro_item5_ru) },
    { icon: agroIcons[5], label: val(c.agro_item6, c.agro_item6_ru) },
  ];

  // Sarlavhani qatorlarga bo'lish
  const vetTitleParts = (val(c.vet_title, c.vet_title_ru) || '').split(/\n|<br\s*\/?>/).filter(Boolean);
  const agroTitleParts = (val(c.agro_title, c.agro_title_ru) || '').split(/\n|<br\s*\/?>/).filter(Boolean);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* Veterinariya card */}
          <div className={styles.vetCard} style={{ backgroundImage: 'url(/vet-card.png)' }}>
            <div className={styles.vetOverlay} />
            <div className={styles.vetContent}>
              <div className={styles.vetTitle}>
                {vetTitleParts.map((part, i) => (
                  <span key={i}>{part}{i < vetTitleParts.length - 1 && <br/>}</span>
                ))}
              </div>
              <div className={styles.cardDesc}>
                {val(c.vet_desc, c.vet_desc_ru)}
              </div>

              <div className={styles.iconGrid}>
                {vetItems.map((item, i) => (
                  <div key={i} className={styles.iconItem}>
                    <div className={`${styles.iconCircle} ${styles.vetIconCircle}`}>
                      <item.icon size={18} strokeWidth={1.5} />
                    </div>
                    <span className={styles.iconLabel}>{item.label}</span>
                  </div>
                ))}
              </div>

              <Link href={c.vet_btn_link} className={styles.vetBtn}>
                {val(c.vet_btn_text, c.vet_btn_text_ru)} <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Agro card */}
          <div className={styles.agroCard} style={{ backgroundImage: 'url(/agro-card.png)' }}>
            <div className={styles.agroOverlay} />
            <div className={styles.agroContent}>
              <div className={styles.agroTitle}>
                {agroTitleParts.map((part, i) => (
                  <span key={i}>{part}{i < agroTitleParts.length - 1 && <br/>}</span>
                ))}
              </div>
              <div className={styles.cardDesc}>
                {val(c.agro_desc, c.agro_desc_ru)}
              </div>

              <div className={styles.iconGrid}>
                {agroItems.map((item, i) => (
                  <div key={i} className={styles.iconItem}>
                    <div className={`${styles.iconCircle} ${styles.agroIconCircle}`}>
                      <item.icon size={18} strokeWidth={1.5} />
                    </div>
                    <span className={styles.iconLabel}>{item.label}</span>
                  </div>
                ))}
              </div>

              <Link href={c.agro_btn_link} className={styles.agroBtn}>
                {val(c.agro_btn_text, c.agro_btn_text_ru)} <ArrowRight size={15} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
