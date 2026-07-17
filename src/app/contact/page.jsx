import styles from './contact.module.css';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata = {
  title: 'Aloqa | Top Agro Vet',
  description: 'Top Agro Vet bilan bog`lanish uchun aloqa ma`lumotlari.',
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Biz bilan bog'lanish</h1>
          <p className={styles.subtitle}>
            Savollaringiz bormi? Mutaxassislarimiz sizga yordam berishdan mamnun bo'lishadi.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Contact Information */}
          <div className={styles.infoSection}>
            
            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <div className={styles.iconWrap}>
                  <Phone size={24} />
                </div>
                <div>
                  <h3>Telefon</h3>
                  <p>+998 90 123 45 67</p>
                  <p>+998 71 123 45 67</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.iconWrap}>
                  <Mail size={24} />
                </div>
                <div>
                  <h3>Elektron pochta</h3>
                  <p>info@topagrovet.uz</p>
                  <p>support@topagrovet.uz</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.iconWrap}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h3>Manzil</h3>
                  <p>Toshkent shahri, Chilonzor tumani,</p>
                  <p>Bunyodkor shoh ko'chasi, 42-uy</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.iconWrap}>
                  <Clock size={24} />
                </div>
                <div>
                  <h3>Ish vaqti</h3>
                  <p>Dushanba - Shanba: 08:00 - 18:00</p>
                  <p>Yakshanba: Dam olish kuni</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Xabar yuborish</h2>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Ismingiz</label>
                <input type="text" id="name" placeholder="Ism va familiyangiz" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Telefon raqamingiz</label>
                <input type="tel" id="phone" placeholder="+998" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Xabaringiz</label>
                <textarea id="message" rows="5" placeholder="Qanday yordam bera olamiz?" required></textarea>
              </div>
              <button type="submit" className={styles.submitBtn}>
                Xabarni yuborish
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className={styles.mapSection}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2998.073069253112!2d69.2043005!3d41.2855141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8ba578f4f58d%3A0xd7a2ecf23413b7a0!2sBunyodkor%20Shoh%20Ko&#39;chasi%2C%20Tashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
