import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Send, Play, Camera } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        {/* Column 1: About */}
        <div>
          <div className={styles.footerLogo}>
            <Image src="/logo.png" alt="Top Agro Vet logo" width={230} height={65} unoptimized style={{ borderRadius: '10px', objectFit: 'contain' }} />
          </div>
          <p className={styles.footerDesc}>
            O'zbekistonda veterinariya va agro preparatlarning ishonchli yetkazib beruvchisi. 
            1000+ dan ortiq mahsulot, sertifikatlangan sifat va mutaxassis maslahatlar.
          </p>
          <div className={styles.footerSocials}>
            <a href="#" className={styles.footerSocialBtn}><Send size={16} /></a>
            <a href="#" className={styles.footerSocialBtn}><Play size={16} /></a>
            <a href="#" className={styles.footerSocialBtn}><Camera size={16} /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className={styles.footerTitle}>Tezkor havolalar</h4>
          <div className={styles.footerLinks}>
            <Link href="/" className={styles.footerLink}>Bosh sahifa</Link>
            <Link href="/catalog/veterinariya" className={styles.footerLink}>Veterinariya preparatlari</Link>
            <Link href="/catalog/agro-preparatlar" className={styles.footerLink}>Agro preparatlar</Link>
            <Link href="/catalog/barchasi" className={styles.footerLink}>Barcha mahsulotlar</Link>
            <Link href="#" className={styles.footerLink}>Yangiliklar</Link>
            <Link href="#" className={styles.footerLink}>Biz haqimizda</Link>
          </div>
        </div>

        {/* Column 3: Categories */}
        <div>
          <h4 className={styles.footerTitle}>Kategoriyalar</h4>
          <div className={styles.footerLinks}>
            <Link href="/catalog/agro-preparatlar?sub=insektisidlar" className={styles.footerLink}>Insektisidlar</Link>
            <Link href="/catalog/agro-preparatlar?sub=fungisidlar" className={styles.footerLink}>Fungisidlar</Link>
            <Link href="/catalog/agro-preparatlar?sub=gerbisidlar" className={styles.footerLink}>Gerbisidlar</Link>
            <Link href="/catalog/veterinariya?sub=antibiotiklar" className={styles.footerLink}>Antibiotiklar</Link>
            <Link href="/catalog/veterinariya?sub=vitaminlar" className={styles.footerLink}>Vitaminlar</Link>
            <Link href="/catalog/veterinariya?sub=antiparazitar" className={styles.footerLink}>Antiparazitar</Link>
          </div>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h4 className={styles.footerTitle}>Bog'lanish</h4>
          <div className={styles.footerContact}>
            <div className={styles.footerContactItem}>
              <Phone size={16} />
              <div>
                <div style={{ color: 'white', fontWeight: 600 }}>+998 90 123 45 67</div>
                <div>Har kuni 08:00 - 18:00</div>
              </div>
            </div>
            <div className={styles.footerContactItem}>
              <Mail size={16} />
              <span>info@topagrovet.uz</span>
            </div>
            <div className={styles.footerContactItem}>
              <MapPin size={16} />
              <span>Toshkent shahri, Yakkasaroy tumani, Bobur ko'chasi 42</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>© 2026 Top Agro Vet. Barcha huquqlar himoyalangan.</span>
        <span>Sayt Dream Tech IT agency tomonidan ishlab chiqilgan</span>
      </div>
    </footer>
  );
}
