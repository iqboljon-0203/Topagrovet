'use client';

import Link from 'next/link';
import { ArrowRight, Pill, Shield, Heart, Thermometer, SprayCan, Grid3X3, Bug, Leaf, Sprout, Droplets, FlaskConical } from 'lucide-react';
import styles from './CategoriesSection.module.css';

const vetItems = [
  { icon: Shield, label: 'Паразидларга қарши воситалар' },
  { icon: Pill, label: 'Антибактериал ва яллиғланишга қарши воситалар' },
  { icon: Heart, label: 'Акушерлик-гинекологик воситалар' },
  { icon: Droplets, label: 'Витамин-минерал воситалар' },
  { icon: SprayCan, label: 'Бошқа фарм-гурухлар ва дезинфекция воситалар' },
  { icon: Thermometer, label: 'Кокцидиозга қарши воситалар' },
];

const agroItems = [
  { icon: Bug, label: 'Инсектоцид' },
  { icon: Shield, label: 'Инсектоакарацид' },
  { icon: Leaf, label: 'Фунгицид' },
  { icon: Sprout, label: 'Гербицид' },
  { icon: FlaskConical, label: 'Микроэлементлар' },
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
