'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import {
  Type, Link2, Shield, Save, Loader2,
  CheckCircle, AlertCircle, Eye, Package
} from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminHeroPage() {
  const [heroData, setHeroData] = useState({
    title_line1: '',
    title_line2: '',
    title_highlight: '',
    subtitle: '',
    btn1_text: '',
    btn1_link: '',
    btn2_text: '',
    btn2_link: '',
    trust1: '',
    trust2: '',
    trust3: '',
    feature1_title: '',
    feature1_desc: '',
    feature2_title: '',
    feature2_desc: '',
    feature3_title: '',
    feature3_desc: '',
    feature4_title: '',
    feature4_desc: '',
    title_line1_ru: '',
    title_line2_ru: '',
    title_highlight_ru: '',
    subtitle_ru: '',
    btn1_text_ru: '',
    btn2_text_ru: '',
    trust1_ru: '',
    trust2_ru: '',
    trust3_ru: '',
    feature1_title_ru: '',
    feature1_desc_ru: '',
    feature2_title_ru: '',
    feature2_desc_ru: '',
    feature3_title_ru: '',
    feature3_desc_ru: '',
    feature4_title_ru: '',
    feature4_desc_ru: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [recordId, setRecordId] = useState(null);

  useEffect(() => {
    async function fetchHero() {
      const { data, error } = await supabase
        .from('hero_settings')
        .select('*')
        .limit(1)
        .single();

      if (!error && data) {
        setHeroData({
          title_line1: data.title_line1 || '',
          title_line2: data.title_line2 || '',
          title_highlight: data.title_highlight || '',
          subtitle: data.subtitle || '',
          btn1_text: data.btn1_text || '',
          btn1_link: data.btn1_link || '',
          btn2_text: data.btn2_text || '',
          btn2_link: data.btn2_link || '',
          trust1: data.trust1 || '',
          trust2: data.trust2 || '',
          trust3: data.trust3 || '',
          feature1_title: data.feature1_title || '',
          feature1_desc: data.feature1_desc || '',
          feature2_title: data.feature2_title || '',
          feature2_desc: data.feature2_desc || '',
          feature3_title: data.feature3_title || '',
          feature3_desc: data.feature3_desc || '',
          feature4_title: data.feature4_title || '',
          feature4_desc: data.feature4_desc || '',
          title_line1_ru: data.title_line1_ru || '',
          title_line2_ru: data.title_line2_ru || '',
          title_highlight_ru: data.title_highlight_ru || '',
          subtitle_ru: data.subtitle_ru || '',
          btn1_text_ru: data.btn1_text_ru || '',
          btn2_text_ru: data.btn2_text_ru || '',
          trust1_ru: data.trust1_ru || '',
          trust2_ru: data.trust2_ru || '',
          trust3_ru: data.trust3_ru || '',
          feature1_title_ru: data.feature1_title_ru || '',
          feature1_desc_ru: data.feature1_desc_ru || '',
          feature2_title_ru: data.feature2_title_ru || '',
          feature2_desc_ru: data.feature2_desc_ru || '',
          feature3_title_ru: data.feature3_title_ru || '',
          feature3_desc_ru: data.feature3_desc_ru || '',
          feature4_title_ru: data.feature4_title_ru || '',
          feature4_desc_ru: data.feature4_desc_ru || '',
        });
        setRecordId(data.id);
      }
      setLoading(false);
    }
    fetchHero();
  }, []);

  const handleChange = (field, value) => {
    setHeroData(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');

    const updateData = {
      ...heroData,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (recordId) {
      result = await supabase
        .from('hero_settings')
        .update(updateData)
        .eq('id', recordId);
    } else {
      result = await supabase
        .from('hero_settings')
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
              <Eye size={20} />
            </div>
            <h1 className={styles.pageTitle}>Hero bo&apos;limi</h1>
          </div>
          <p className={styles.pageSubtitle}>
            Bosh sahifadagi asosiy banner matnlarini boshqaring
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

      {/* Hero preview */}
      <div className={styles.heroPreview}>
        <div className={styles.heroPreviewLabel}>Ko&apos;rinishi (preview)</div>
        <h2 className={styles.heroPreviewTitle}>
          {heroData.title_line1 || 'Sarlavha 1-qator'} <br />
          {heroData.title_line2 || 'Sarlavha 2-qator'} <br />
          <em style={{ color: '#2E7D32', fontStyle: 'italic' }}>
            {heroData.title_highlight || 'Ajratilgan matn'}
          </em>
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.5rem' }}>
          {heroData.subtitle || 'Subtitle matni'}
        </p>
      </div>

      {/* Form cards */}
      <div className={styles.contactFormGrid}>
        {/* Sarlavha */}
        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconGreen}>
              <Type size={18} />
            </div>
            <h3>Sarlavha (3 qator)</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>1-qator (UZ)</label>
              <input type="text" value={heroData.title_line1} onChange={(e) => handleChange('title_line1', e.target.value)} placeholder="Sog'lom hayvonlar" />
            </div>
            <div className={styles.contactField}>
              <label>1-qator (RU)</label>
              <input type="text" value={heroData.title_line1_ru} onChange={(e) => handleChange('title_line1_ru', e.target.value)} placeholder="Здоровые животные" />
            </div>
            
            <div className={styles.contactField}>
              <label>2-qator (UZ)</label>
              <input type="text" value={heroData.title_line2} onChange={(e) => handleChange('title_line2', e.target.value)} placeholder="va mo'l hosil uchun" />
            </div>
            <div className={styles.contactField}>
              <label>2-qator (RU)</label>
              <input type="text" value={heroData.title_line2_ru} onChange={(e) => handleChange('title_line2_ru', e.target.value)} placeholder="и для богатого урожая" />
            </div>
            
            <div className={styles.contactField}>
              <label>Ajratilgan matn (yashil, kursiv) (UZ)</label>
              <input type="text" value={heroData.title_highlight} onChange={(e) => handleChange('title_highlight', e.target.value)} placeholder="ishonchli tanlov!" />
            </div>
            <div className={styles.contactField}>
              <label>Ajratilgan matn (RU)</label>
              <input type="text" value={heroData.title_highlight_ru} onChange={(e) => handleChange('title_highlight_ru', e.target.value)} placeholder="надежный выбор!" />
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconBlue}>
              <Type size={18} />
            </div>
            <h3>Subtitle</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>Banner ostidagi matn (UZ)</label>
              <textarea value={heroData.subtitle} onChange={(e) => handleChange('subtitle', e.target.value)} placeholder="Veterinariya va agro preparatlarining keng assortimenti..." rows={3} />
            </div>
            <div className={styles.contactField}>
              <label>Banner ostidagi matn (RU)</label>
              <textarea value={heroData.subtitle_ru} onChange={(e) => handleChange('subtitle_ru', e.target.value)} placeholder="Широкий ассортимент..." rows={3} />
            </div>
          </div>
        </div>

        {/* Tugmalar */}
        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconAmber}>
              <Link2 size={18} />
            </div>
            <h3>Tugmalar</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>1-tugma matni (yashil) (UZ)</label>
              <input type="text" value={heroData.btn1_text} onChange={(e) => handleChange('btn1_text', e.target.value)} placeholder="Veterinariya mahsulotlari" />
            </div>
            <div className={styles.contactField}>
              <label>1-tugma matni (RU)</label>
              <input type="text" value={heroData.btn1_text_ru} onChange={(e) => handleChange('btn1_text_ru', e.target.value)} placeholder="Ветеринарные препараты" />
            </div>
            <div className={styles.contactField}>
              <label>1-tugma havolasi</label>
              <input type="text" value={heroData.btn1_link} onChange={(e) => handleChange('btn1_link', e.target.value)} placeholder="/catalog/veterinariya" />
            </div>
            
            <div className={styles.contactField}>
              <label>2-tugma matni (oq) (UZ)</label>
              <input type="text" value={heroData.btn2_text} onChange={(e) => handleChange('btn2_text', e.target.value)} placeholder="Agro preparatlar" />
            </div>
            <div className={styles.contactField}>
              <label>2-tugma matni (RU)</label>
              <input type="text" value={heroData.btn2_text_ru} onChange={(e) => handleChange('btn2_text_ru', e.target.value)} placeholder="Агро препараты" />
            </div>
            <div className={styles.contactField}>
              <label>2-tugma havolasi</label>
              <input type="text" value={heroData.btn2_link} onChange={(e) => handleChange('btn2_link', e.target.value)} placeholder="/catalog/agro-preparatlar" />
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconRed}>
              <Shield size={18} />
            </div>
            <h3>Ishonch belgilari (3 ta)</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>1-belgi (UZ)</label>
              <input type="text" value={heroData.trust1} onChange={(e) => handleChange('trust1', e.target.value)} placeholder="100% original mahsulotlar" />
            </div>
            <div className={styles.contactField}>
              <label>1-belgi (RU)</label>
              <input type="text" value={heroData.trust1_ru} onChange={(e) => handleChange('trust1_ru', e.target.value)} placeholder="100% оригинальная продукция" />
            </div>
            
            <div className={styles.contactField}>
              <label>2-belgi (UZ)</label>
              <input type="text" value={heroData.trust2} onChange={(e) => handleChange('trust2', e.target.value)} placeholder="Sertifikatlangan sifat" />
            </div>
            <div className={styles.contactField}>
              <label>2-belgi (RU)</label>
              <input type="text" value={heroData.trust2_ru} onChange={(e) => handleChange('trust2_ru', e.target.value)} placeholder="Сертифицированное качество" />
            </div>
            
            <div className={styles.contactField}>
              <label>3-belgi (UZ)</label>
              <input type="text" value={heroData.trust3} onChange={(e) => handleChange('trust3', e.target.value)} placeholder="Mutaxasis yordami" />
            </div>
            <div className={styles.contactField}>
              <label>3-belgi (RU)</label>
              <input type="text" value={heroData.trust3_ru} onChange={(e) => handleChange('trust3_ru', e.target.value)} placeholder="Помощь специалиста" />
            </div>
          </div>
        </div>
      </div>

      {/* ====== FEATURES BAR ====== */}
      <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0b1120', margin: '2rem 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Package size={20} color="#2E7D32" />
        Afzalliklar (Features bar)
      </h2>

      <div className={styles.contactFormGrid}>
        {[1, 2, 3, 4].map(num => (
          <div key={num} className={styles.contactCard}>
            <div className={styles.contactCardHeader}>
              <div className={styles.contactCardIconGreen}>
                <Shield size={18} />
              </div>
              <h3>{num}-afzallik</h3>
            </div>
            <div className={styles.contactCardBody}>
              <div className={styles.contactField}>
                <label>Sarlavha (UZ)</label>
                <input type="text" value={heroData[`feature${num}_title`]} onChange={(e) => handleChange(`feature${num}_title`, e.target.value)} />
              </div>
              <div className={styles.contactField}>
                <label>Sarlavha (RU)</label>
                <input type="text" value={heroData[`feature${num}_title_ru`]} onChange={(e) => handleChange(`feature${num}_title_ru`, e.target.value)} />
              </div>
              <div className={styles.contactField}>
                <label>Tavsif (UZ)</label>
                <input type="text" value={heroData[`feature${num}_desc`]} onChange={(e) => handleChange(`feature${num}_desc`, e.target.value)} />
              </div>
              <div className={styles.contactField}>
                <label>Tavsif (RU)</label>
                <input type="text" value={heroData[`feature${num}_desc_ru`]} onChange={(e) => handleChange(`feature${num}_desc_ru`, e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
