import Image from 'next/image';
import styles from './about.module.css';

export const metadata = {
  title: 'Biz haqimizda | Top Agro Vet',
  description: 'Top Agro Vet kompaniyasi haqida ma`lumot.',
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Biz haqimizda</h1>
          <p className={styles.subtitle}>
            "Top Agro Vet" — O'zbekiston qishloq xo'jaligi va veterinariya sohasida ishonchli hamkoringiz. 
            Bizning maqsadimiz fermer va dehqonlarimizga eng sifatli dori vositalari hamda ozuqa qo'shimchalarini yetkazib berishdir.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.imageWrap}>
              <div className={styles.imagePlaceholder}>
                <Image 
                  src="/hero-bg.png" 
                  alt="Top Agro Vet jamoasi" 
                  fill 
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
              </div>
            </div>
            <div className={styles.textContent}>
              <h2>Bizning missiyamiz</h2>
              <p>
                Sog'lom chorva va mo'l hosil yetishtirishda eng ilg'or xorijiy va mahalliy texnologiyalarni yurtimizga olib kirish. 
                Sifat, ishonch va halollik — bizning asosiy tamoyillarimiz.
              </p>
              
              <h2>Nima uchun bizni tanlashadi?</h2>
              <ul className={styles.list}>
                <li><strong>Yuqori sifat:</strong> Barcha mahsulotlarimiz sertifikatlangan va sinovdan o'tgan.</li>
                <li><strong>Keng assortiment:</strong> 100 dan ortiq turdagi veterinariya va agro preparatlar.</li>
                <li><strong>Mutaxassis maslahati:</strong> Tajribali agronom va veterinar shifokorlarimiz sizga bepul maslahat beradi.</li>
                <li><strong>Tezkor yetkazib berish:</strong> Respublika bo'ylab yetkazib berish xizmati.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
