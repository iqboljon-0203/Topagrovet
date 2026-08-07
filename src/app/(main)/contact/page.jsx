'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './contact.module.css';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { language, t } = useLanguage();
  const isRu = language === 'ru';
  const val = (uzStr, ruStr) => isRu && ruStr ? ruStr : uzStr;

  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchContactInfo() {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single();

      if (!error && data) {
        setContactInfo(data);
      }
      setLoading(false);
    }
    fetchContactInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    // Save to database
    const { error } = await supabase
      .from('contact_messages')
      .insert([{
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
      }]);

    if (error) {
      setError(isRu ? 'Ошибка при отправке. Попробуйте еще раз.' : 'Xabar yuborishda xatolik yuz berdi. Qayta urinib ko\'ring.');
    } else {
      // Send to Telegram
      try {
        await fetch('/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'contact_message',
            name: formData.name,
            phone: formData.phone,
            message: formData.message,
          })
        });
      } catch (tgError) {
        console.error('Failed to send Telegram notification:', tgError);
      }

      setSent(true);
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }
    setSending(false);
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner} />
          <span>{isRu ? 'Загрузка...' : 'Yuklanmoqda...'}</span>
        </div>
      </div>
    );
  }

  // Fallback qiymatlar agar bazadan olinmasa
  const info = contactInfo || {
    phone1: '+998 90 123 45 67',
    phone2: '+998 71 123 45 67',
    email1: 'info@topagrovet.uz',
    email2: 'support@topagrovet.uz',
    address_line1: 'Toshkent shahri, Chilonzor tumani,',
    address_line2: 'Bunyodkor shoh ko\'chasi, 42-uy',
    work_hours: 'Dushanba - Shanba: 08:00 - 18:00',
    day_off: 'Yakshanba: Dam olish kuni',
    map_embed_url: '',
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('contactPage.title')}</h1>
          <p className={styles.subtitle}>
            {t('contactPage.subtitle')}
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
                  <h3>{t('contactPage.phone')}</h3>
                  <p>{info.phone1}</p>
                  {info.phone2 && <p>{info.phone2}</p>}
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.iconWrap}>
                  <Mail size={24} />
                </div>
                <div>
                  <h3>{t('contactPage.email')}</h3>
                  <p>{info.email1}</p>
                  {info.email2 && <p>{info.email2}</p>}
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.iconWrap}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h3>{t('contactPage.address')}</h3>
                  <p>{val(info.address_line1, info.address_line1_ru)}</p>
                  {val(info.address_line2, info.address_line2_ru) && <p>{val(info.address_line2, info.address_line2_ru)}</p>}
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.iconWrap}>
                  <Clock size={24} />
                </div>
                <div>
                  <h3>{t('contactPage.work_hours')}</h3>
                  <p>{val(info.work_hours, info.work_hours_ru)}</p>
                  {val(info.day_off, info.day_off_ru) && <p>{val(info.day_off, info.day_off_ru)}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>{t('contactPage.form_title')}</h2>

            {sent && (
              <div className={styles.successMessage}>
                <CheckCircle size={18} />
                {t('contactPage.success')}
              </div>
            )}

            {error && (
              <div className={styles.errorMessage}>
                {t('contactPage.error')}
              </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">{t('contactPage.name_label')}</label>
                <input
                  type="text"
                  id="name"
                  placeholder={t('contactPage.name_placeholder')}
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">{t('contactPage.phone_label')}</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+998"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">{t('contactPage.message_label')}</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder={t('contactPage.message_placeholder')}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button type="submit" className={styles.submitBtn} disabled={sending}>
                {sending ? (
                  <>
                    <Loader2 size={18} className={styles.spinIcon} />
                    {t('contactPage.submitting')}
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {t('contactPage.submit')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        {info.map_embed_url && (
          <div className={styles.mapSection}>
            <iframe
              src={info.map_embed_url}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}
