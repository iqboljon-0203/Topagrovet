'use client';

import { Package, Award, Truck, Headphones } from 'lucide-react';
import styles from './FeaturesBar.module.css';

const features = [
  {
    icon: Package,
    title: 'Keng assortiment',
    desc: '1000+ mahsulot',
  },
  {
    icon: Award,
    title: 'Ishonchli brendlar',
    desc: "Dunyo bo'ylab ishlab chiqaruvchilar",
  },
  {
    icon: Truck,
    title: 'Tez yetkazib berish',
    desc: "O'zbekistonda barcha viloyatlarga",
  },
  {
    icon: Headphones,
    title: 'Mutaxassis konsultatsiyasi',
    desc: 'Veterinar va agronomlar yordami',
  },
];

export default function FeaturesBar() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {features.map((f, i) => (
          <div key={i} className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <f.icon size={20} strokeWidth={1.5} />
            </div>
            <div>
              <div className={styles.featureTitle}>{f.title}</div>
              <div className={styles.featureDesc}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
