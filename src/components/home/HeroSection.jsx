'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, ShieldCheck, Headphones } from 'lucide-react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
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
          Sog'lom hayvonlar <br />
          va mo'l hosil uchun <br />
          <em className={styles.heroHighlight}>ishonchli tanlov!</em>
        </h1>

        <p className={styles.heroSubtitle}>
          Veterinariya va agro preparatlarining<br />
          keng assortimenti faqat <strong>Top Agro Vet</strong>'da.
        </p>

        <div className={styles.heroButtons}>
          <Link href="/catalog/veterinariya" className={styles.btnPrimary}>
            Veterinariya mahsulotlari
            <ArrowRight size={18} />
          </Link>
          <Link href="/catalog/agro-preparatlar" className={styles.btnOutline}>
            Agro preparatlar
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className={styles.heroTrust}>
          <div className={styles.trustItem}>
            <CheckCircle size={16} className={styles.trustIcon} />
            <span>100% original mahsulotlar</span>
          </div>
          <div className={styles.trustItem}>
            <ShieldCheck size={16} className={styles.trustIcon} />
            <span>Sertifikatlangan sifat</span>
          </div>
          <div className={styles.trustItem}>
            <Headphones size={16} className={styles.trustIcon} />
            <span>Mutaxasis yordami</span>
          </div>
        </div>
      </div>
    </section>
  );
}
