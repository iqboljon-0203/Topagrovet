'use client';

import Link from 'next/link';
import { ArrowRight, Pill, Shield, Heart, Thermometer, SprayCan, Grid3X3, Bug, Leaf, Sprout, Droplets, FlaskConical } from 'lucide-react';
import styles from './CategoriesSection.module.css';

const vetItems = [
  { icon: Pill, label: 'Antibiotiklar' },
  { icon: Shield, label: 'Antiparazitar' },
  { icon: Heart, label: 'Vitaminlar' },
  { icon: Thermometer, label: "Yallig'lanishga qarshi" },
  { icon: SprayCan, label: 'Dezinfeksiya vositalari' },
  { icon: Grid3X3, label: 'Barchasi' },
];

const agroItems = [
  { icon: Bug, label: 'Insektisodlar' },
  { icon: Leaf, label: 'Fungisidlar' },
  { icon: Sprout, label: 'Gerbisidlar' },
  { icon: Droplets, label: "Urug' dorilagichlar" },
  { icon: FlaskConical, label: "O'g'itlar" },
  { icon: Grid3X3, label: 'Barchasi' },
];

export default function CategoriesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* Veterinariya card */}
          <div className={styles.vetCard} style={{ backgroundImage: 'url(/vet-card.png)' }}>
            <div className={styles.vetOverlay} />

            {/* Content */}
            <div className={styles.vetContent}>
              <div className={styles.vetTitle}>
                Veterinariya<br/>preparatlari
              </div>
              <div className={styles.cardDesc}>
                Hayvonlar salomatligi bizning g'amxo'rligimizda
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

              <Link href="/catalog/veterinariya" className={styles.vetBtn}>
                Katalogni ko'rish <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Agro card */}
          <div className={styles.agroCard} style={{ backgroundImage: 'url(/agro-card.png)' }}>
            <div className={styles.agroOverlay} />

            {/* Content */}
            <div className={styles.agroContent}>
              <div className={styles.agroTitle}>
                Agro<br/>preparatlari
              </div>
              <div className={styles.cardDesc}>
                Mo'l hosil va yuqori sifat uchun eng yaxshi yechimlar
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

              <Link href="/catalog/agro-preparatlar" className={styles.agroBtn}>
                Katalogni ko'rish <ArrowRight size={15} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
