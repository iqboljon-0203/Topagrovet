'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import {
  Phone, Mail, MapPin, Clock, Save, Map,
  Loader2, CheckCircle, AlertCircle,
  Send, Play, Camera, FileText, Globe
} from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminContactPage() {
  const [contactInfo, setContactInfo] = useState({
    phone1: '',
    phone2: '',
    email1: '',
    email2: '',
    address_line1: '',
    address_line2: '',
    work_hours: '',
    day_off: '',
    map_embed_url: '',
    footer_description: '',
    social_telegram: '',
    social_youtube: '',
    social_instagram: '',
    footer_copyright: '',
    footer_developer: '',
    topbar_marquee: '',
    address_line1_ru: '',
    address_line2_ru: '',
    work_hours_ru: '',
    day_off_ru: '',
    footer_description_ru: '',
    topbar_marquee_ru: '',
    footer_copyright_ru: '',
    footer_developer_ru: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [recordId, setRecordId] = useState(null);

  useEffect(() => {
    async function fetchContactInfo() {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .single();

      if (!error && data) {
        setContactInfo({
          phone1: data.phone1 || '',
          phone2: data.phone2 || '',
          email1: data.email1 || '',
          email2: data.email2 || '',
          address_line1: data.address_line1 || '',
          address_line2: data.address_line2 || '',
          work_hours: data.work_hours || '',
          day_off: data.day_off || '',
          map_embed_url: data.map_embed_url || '',
          footer_description: data.footer_description || '',
          social_telegram: data.social_telegram || '',
          social_youtube: data.social_youtube || '',
          social_instagram: data.social_instagram || '',
          footer_copyright: data.footer_copyright || '',
          footer_developer: data.footer_developer || '',
          topbar_marquee: data.topbar_marquee || '',
          address_line1_ru: data.address_line1_ru || '',
          address_line2_ru: data.address_line2_ru || '',
          work_hours_ru: data.work_hours_ru || '',
          day_off_ru: data.day_off_ru || '',
          footer_description_ru: data.footer_description_ru || '',
          topbar_marquee_ru: data.topbar_marquee_ru || '',
          footer_copyright_ru: data.footer_copyright_ru || '',
          footer_developer_ru: data.footer_developer_ru || '',
        });
        setRecordId(data.id);
      }
      setLoading(false);
    }
    fetchContactInfo();
  }, []);

  const handleChange = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');

    const updateData = {
      ...contactInfo,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (recordId) {
      result = await supabase
        .from('contact_info')
        .update(updateData)
        .eq('id', recordId);
    } else {
      result = await supabase
        .from('contact_info')
        .insert([updateData])
        .select()
        .single();
      if (result.data) setRecordId(result.data.id);
    }

    if (result.error) {
      setError('Saqlashda xatolik: ' + result.error.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.tableSpinner} />
        <span>Ma&apos;lumotlar yuklanmoqda...</span>
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <div className={styles.pageTitleRow}>
            <div className={styles.pageTitleIcon}>
              <Phone size={20} />
            </div>
            <h1 className={styles.pageTitle}>Aloqa ma&apos;lumotlari</h1>
          </div>
          <p className={styles.pageSubtitle}>
            Saytdagi aloqa sahifasini boshqaring
          </p>
        </div>
        <div>
          <button
            onClick={handleSave}
            disabled={saving}
            className={styles.addButton}
          >
            {saving ? (
              <Loader2 size={16} className={styles.spinnerIcon} />
            ) : saved ? (
              <CheckCircle size={16} />
            ) : (
              <Save size={16} />
            )}
            {saving ? 'Saqlanmoqda...' : saved ? 'Saqlandi!' : 'Saqlash'}
          </button>
        </div>
      </div>

      {/* Status messages */}
      {error && (
        <div className={styles.alertError}>
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {saved && (
        <div className={styles.alertSuccess}>
          <CheckCircle size={16} />
          Ma&apos;lumotlar muvaffaqiyatli saqlandi!
        </div>
      )}

      {/* Contact Info Form */}
      <div className={styles.contactFormGrid}>
        {/* Telefon */}
        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconBlue}>
              <Phone size={18} />
            </div>
            <h3>Telefon raqamlar</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>Asosiy telefon</label>
              <input
                type="text"
                value={contactInfo.phone1}
                onChange={(e) => handleChange('phone1', e.target.value)}
                placeholder="+998 90 123 45 67"
              />
            </div>
            <div className={styles.contactField}>
              <label>Qo&apos;shimcha telefon</label>
              <input
                type="text"
                value={contactInfo.phone2}
                onChange={(e) => handleChange('phone2', e.target.value)}
                placeholder="+998 71 123 45 67"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconGreen}>
              <Mail size={18} />
            </div>
            <h3>Email manzillar</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>Asosiy email</label>
              <input
                type="email"
                value={contactInfo.email1}
                onChange={(e) => handleChange('email1', e.target.value)}
                placeholder="info@topagrovet.uz"
              />
            </div>
            <div className={styles.contactField}>
              <label>Qo&apos;shimcha email</label>
              <input
                type="email"
                value={contactInfo.email2}
                onChange={(e) => handleChange('email2', e.target.value)}
                placeholder="support@topagrovet.uz"
              />
            </div>
          </div>
        </div>

        {/* Manzil */}
        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconRed}>
              <MapPin size={18} />
            </div>
            <h3>Manzil</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>Manzil 1-qator (UZ)</label>
              <input type="text" value={contactInfo.address_line1} onChange={(e) => handleChange('address_line1', e.target.value)} placeholder="Toshkent shahri, Chilonzor tumani," />
            </div>
            <div className={styles.contactField}>
              <label>Manzil 1-qator (RU)</label>
              <input type="text" value={contactInfo.address_line1_ru} onChange={(e) => handleChange('address_line1_ru', e.target.value)} placeholder="г. Ташкент, Чиланзарский район," />
            </div>
            <div className={styles.contactField}>
              <label>Manzil 2-qator (UZ)</label>
              <input type="text" value={contactInfo.address_line2} onChange={(e) => handleChange('address_line2', e.target.value)} placeholder="Bunyodkor shoh ko'chasi, 42-uy" />
            </div>
            <div className={styles.contactField}>
              <label>Manzil 2-qator (RU)</label>
              <input type="text" value={contactInfo.address_line2_ru} onChange={(e) => handleChange('address_line2_ru', e.target.value)} placeholder="проспект Бунёдкор, 42 дом" />
            </div>
          </div>
        </div>

        {/* Ish vaqti */}
        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconAmber}>
              <Clock size={18} />
            </div>
            <h3>Ish vaqti</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>Ish kunlari (UZ)</label>
              <input type="text" value={contactInfo.work_hours} onChange={(e) => handleChange('work_hours', e.target.value)} placeholder="Dushanba - Shanba: 08:00 - 18:00" />
            </div>
            <div className={styles.contactField}>
              <label>Ish kunlari (RU)</label>
              <input type="text" value={contactInfo.work_hours_ru} onChange={(e) => handleChange('work_hours_ru', e.target.value)} placeholder="Понедельник - Суббота: 08:00 - 18:00" />
            </div>
            <div className={styles.contactField}>
              <label>Dam olish kuni (UZ)</label>
              <input type="text" value={contactInfo.day_off} onChange={(e) => handleChange('day_off', e.target.value)} placeholder="Yakshanba: Dam olish kuni" />
            </div>
            <div className={styles.contactField}>
              <label>Dam olish kuni (RU)</label>
              <input type="text" value={contactInfo.day_off_ru} onChange={(e) => handleChange('day_off_ru', e.target.value)} placeholder="Воскресенье: Выходной" />
            </div>
          </div>
        </div>
      </div>

      {/* Xarita */}
      <div className={styles.contactCard} style={{ marginTop: '1.25rem' }}>
        <div className={styles.contactCardHeader}>
          <div className={styles.contactCardIconBlue}>
            <Map size={18} />
          </div>
          <h3>Google Xarita (Embed URL)</h3>
        </div>
        <div className={styles.contactCardBody}>
          <div className={styles.contactField}>
            <label>Xarita embed URL (Google Maps → Share → Embed a map → src=&quot;...&quot; ichidagi URL)</label>
            <textarea
              value={contactInfo.map_embed_url}
              onChange={(e) => handleChange('map_embed_url', e.target.value)}
              placeholder="https://www.google.com/maps/embed?pb=..."
              rows={3}
              style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}
            />
          </div>
          {contactInfo.map_embed_url && (
            <div className={styles.mapPreview}>
              <iframe
                src={contactInfo.map_embed_url}
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div>
      </div>

      {/* ===== TOPBAR BO'LIMI ===== */}
      <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0b1120', margin: '2rem 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Globe size={20} /> TopBar sozlamalari
      </h2>
      <div className={styles.contactFormGrid}>
        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconBlue}>
              <FileText size={18} />
            </div>
            <h3>Yuguruvchi e'lon qatori (Marquee)</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>E'lon matni (UZ)</label>
              <input type="text" value={contactInfo.topbar_marquee} onChange={(e) => handleChange('topbar_marquee', e.target.value)} placeholder="Sifatli veterinariya va agro preparatlar..." />
            </div>
            <div className={styles.contactField}>
              <label>E'lon matni (RU)</label>
              <input type="text" value={contactInfo.topbar_marquee_ru} onChange={(e) => handleChange('topbar_marquee_ru', e.target.value)} placeholder="Качественные ветеринарные и агро препараты..." />
            </div>
          </div>
        </div>
      </div>

      {/* ===== FOOTER BO'LIMI ===== */}
      <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0b1120', margin: '2rem 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Globe size={20} /> Footer sozlamalari
      </h2>

      <div className={styles.contactFormGrid}>
        {/* Footer tavsifi */}
        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconGreen}>
              <FileText size={18} />
            </div>
            <h3>Footer tavsifi</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>Kompaniya haqida qisqa tavsif (UZ)</label>
              <textarea value={contactInfo.footer_description} onChange={(e) => handleChange('footer_description', e.target.value)} placeholder="O'zbekistonda veterinariya va agro preparatlarning ishonchli yetkazib beruvchisi..." rows={3} />
            </div>
            <div className={styles.contactField}>
              <label>Kompaniya haqida qisqa tavsif (RU)</label>
              <textarea value={contactInfo.footer_description_ru} onChange={(e) => handleChange('footer_description_ru', e.target.value)} placeholder="Надежный поставщик ветеринарных и агро препаратов в Узбекистане..." rows={3} />
            </div>
          </div>
        </div>

        {/* Ijtimoiy tarmoqlar */}
        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconBlue}>
              <Send size={18} />
            </div>
            <h3>Ijtimoiy tarmoqlar</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>Telegram URL</label>
              <input
                type="url"
                value={contactInfo.social_telegram}
                onChange={(e) => handleChange('social_telegram', e.target.value)}
                placeholder="https://t.me/topagrovet"
              />
            </div>
            <div className={styles.contactField}>
              <label>YouTube URL</label>
              <input
                type="url"
                value={contactInfo.social_youtube}
                onChange={(e) => handleChange('social_youtube', e.target.value)}
                placeholder="https://youtube.com/@topagrovet"
              />
            </div>
            <div className={styles.contactField}>
              <label>Instagram URL</label>
              <input
                type="url"
                value={contactInfo.social_instagram}
                onChange={(e) => handleChange('social_instagram', e.target.value)}
                placeholder="https://instagram.com/topagrovet"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconAmber}>
              <FileText size={18} />
            </div>
            <h3>Pastki matnlar</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>Copyright matni (UZ)</label>
              <input type="text" value={contactInfo.footer_copyright} onChange={(e) => handleChange('footer_copyright', e.target.value)} placeholder="© 2026 Top Agro Vet. Barcha huquqlar himoyalangan." />
            </div>
            <div className={styles.contactField}>
              <label>Copyright matni (RU)</label>
              <input type="text" value={contactInfo.footer_copyright_ru} onChange={(e) => handleChange('footer_copyright_ru', e.target.value)} placeholder="© 2026 Top Agro Vet. Все права защищены." />
            </div>
            <div className={styles.contactField}>
              <label>Developer matni (UZ)</label>
              <input type="text" value={contactInfo.footer_developer} onChange={(e) => handleChange('footer_developer', e.target.value)} placeholder="Sayt Dream Tech IT agency tomonidan ishlab chiqilgan" />
            </div>
            <div className={styles.contactField}>
              <label>Developer matni (RU)</label>
              <input type="text" value={contactInfo.footer_developer_ru} onChange={(e) => handleChange('footer_developer_ru', e.target.value)} placeholder="Сайт разработан агентством Dream Tech IT" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
