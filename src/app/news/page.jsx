import Image from 'next/image';
import Link from 'next/link';
import styles from './news.module.css';
import { Calendar, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Yangiliklar | Top Agro Vet',
  description: 'Top Agro Vet yangiliklari va maqolalari.',
};

const DUMMY_NEWS = [
  {
    id: 1,
    title: 'Yangi "Agro Gaucho" preparati sotuvga chiqdi',
    excerpt: 'Dehqonlarimiz uchun maxsus zararkunandalarga qarshi yangi samarali vosita endi omborlarimizda mavjud.',
    date: '2026-07-15',
    image: '/catalog-agro-bg.png',
  },
  {
    id: 2,
    title: 'Chorvachilik fermalarida profilaktika ahamiyati',
    excerpt: 'Kuz-qish mavsumi oldidan chorva mollarini kasalliklardan asrash bo`yicha mutaxassislar maslahati.',
    date: '2026-07-10',
    image: '/catalog-vet-bg.png',
  },
  {
    id: 3,
    title: 'Toshkentda yirik agro ko`rgazma bo`lib o`tdi',
    excerpt: 'Bizning kompaniyamiz xalqaro qishloq xo`jaligi ko`rgazmasida o`zining yangi mahsulotlarini namoyish etdi.',
    date: '2026-07-02',
    image: '/hero-bg.png',
  }
];

export default function NewsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>So'nggi yangiliklar</h1>
          <p className={styles.subtitle}>Kompaniyamiz faoliyati va sohadagi yangiliklardan xabardor bo'ling.</p>
        </div>

        <div className={styles.newsGrid}>
          {DUMMY_NEWS.map(news => (
            <article key={news.id} className={styles.newsCard}>
              <div className={styles.imageWrap}>
                <div className={styles.imagePlaceholder}>
                  <Image src={news.image} alt={news.title} fill style={{objectFit: 'cover'}} unoptimized />
                </div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.date}>
                  <Calendar size={14} />
                  <span>{news.date}</span>
                </div>
                <h3 className={styles.newsTitle}>{news.title}</h3>
                <p className={styles.newsExcerpt}>{news.excerpt}</p>
                <Link href={`/news/${news.id}`} className={styles.readMore}>
                  Batafsil o'qish <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
