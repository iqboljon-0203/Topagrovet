'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import {
  Info, Save, Loader2, CheckCircle, AlertCircle, FileText, List, Image as ImageIcon
} from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminAboutPage() {
  const [aboutData, setAboutData] = useState({
    hero_title: '',
    hero_subtitle: '',
    mission_title: '',
    mission_text: '',
    why_title: '',
    why_item1: '',
    why_item2: '',
    why_item3: '',
    why_item4: '',
    hero_title_ru: '',
    hero_subtitle_ru: '',
    mission_title_ru: '',
    mission_text_ru: '',
    why_title_ru: '',
    why_item1_ru: '',
    why_item2_ru: '',
    why_item3_ru: '',
    why_item4_ru: '',
    image_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [recordId, setRecordId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    async function fetchAbout() {
      const { data, error } = await supabase
        .from('about_settings')
        .select('*')
        .limit(1)
        .single();

      if (!error && data) {
        setAboutData({
          hero_title: data.hero_title || '',
          hero_subtitle: data.hero_subtitle || '',
          mission_title: data.mission_title || '',
          mission_text: data.mission_text || '',
          why_title: data.why_title || '',
          why_item1: data.why_item1 || '',
          why_item2: data.why_item2 || '',
          why_item3: data.why_item3 || '',
          why_item4: data.why_item4 || '',
          hero_title_ru: data.hero_title_ru || '',
          hero_subtitle_ru: data.hero_subtitle_ru || '',
          mission_title_ru: data.mission_title_ru || '',
          mission_text_ru: data.mission_text_ru || '',
          why_title_ru: data.why_title_ru || '',
          why_item1_ru: data.why_item1_ru || '',
          why_item2_ru: data.why_item2_ru || '',
          why_item3_ru: data.why_item3_ru || '',
          why_item4_ru: data.why_item4_ru || '',
          image_url: data.image_url || '',
        });
        setRecordId(data.id);
      }
      setLoading(false);
    }
    fetchAbout();
  }, []);

  const handleChange = (field, value) => {
    setAboutData(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');

    let finalImageUrl = aboutData.image_url;
    if (imageFile) {
      const fileName = `${Date.now()}_${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const { data, error } = await supabase.storage
        .from('products')
        .upload(`uploads/${fileName}`, imageFile);

      if (!error) {
        const { data: publicUrlData } = supabase.storage
          .from('products')
          .getPublicUrl(`uploads/${fileName}`);
        finalImageUrl = publicUrlData.publicUrl;
      }
    }

    const updateData = { ...aboutData, image_url: finalImageUrl, updated_at: new Date().toISOString() };

    let result;
    if (recordId) {
      result = await supabase.from('about_settings').update(updateData).eq('id', recordId);
    } else {
      result = await supabase.from('about_settings').insert([updateData]).select().single();
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
        <span>Ma'lumotlar yuklanmoqda...</span>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <div className={styles.pageTitleRow}>
            <div className={styles.pageTitleIcon}>
              <Info size={20} />
            </div>
            <h1 className={styles.pageTitle}>Biz haqimizda (About)</h1>
          </div>
          <p className={styles.pageSubtitle}>
            "Biz haqimizda" sahifasining matnlarini o'zgartiring
          </p>
        </div>
        <div>
          <button onClick={handleSave} disabled={saving} className={styles.addButton}>
            {saving ? <Loader2 size={16} className={styles.spinnerIcon} /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
            {saving ? 'Saqlanmoqda...' : saved ? 'Saqlandi!' : 'Saqlash'}
          </button>
        </div>
      </div>

      {error && <div className={styles.alertError}><AlertCircle size={16} />{error}</div>}
      {saved && <div className={styles.alertSuccess}><CheckCircle size={16} />Ma'lumotlar muvaffaqiyatli saqlandi!</div>}

      <div className={styles.contactFormGrid}>
        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconBlue}><FileText size={18} /></div>
            <h3>Sarlavha qismi (Hero)</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>Asosiy sarlavha (UZ)</label>
              <input type="text" value={aboutData.hero_title} onChange={(e) => handleChange('hero_title', e.target.value)} />
            </div>
            <div className={styles.contactField}>
              <label>Asosiy sarlavha (RU)</label>
              <input type="text" value={aboutData.hero_title_ru} onChange={(e) => handleChange('hero_title_ru', e.target.value)} />
            </div>
            <div className={styles.contactField}>
              <label>Qisqa matn (Subtitle - UZ)</label>
              <textarea rows={3} value={aboutData.hero_subtitle} onChange={(e) => handleChange('hero_subtitle', e.target.value)} />
            </div>
            <div className={styles.contactField}>
              <label>Qisqa matn (Subtitle - RU)</label>
              <textarea rows={3} value={aboutData.hero_subtitle_ru} onChange={(e) => handleChange('hero_subtitle_ru', e.target.value)} />
            </div>
          </div>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconGreen}><FileText size={18} /></div>
            <h3>Missiyamiz</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>Missiya sarlavhasi (UZ)</label>
              <input type="text" value={aboutData.mission_title} onChange={(e) => handleChange('mission_title', e.target.value)} />
            </div>
            <div className={styles.contactField}>
              <label>Missiya sarlavhasi (RU)</label>
              <input type="text" value={aboutData.mission_title_ru} onChange={(e) => handleChange('mission_title_ru', e.target.value)} />
            </div>
            <div className={styles.contactField}>
              <label>Missiya matni (UZ)</label>
              <textarea rows={3} value={aboutData.mission_text} onChange={(e) => handleChange('mission_text', e.target.value)} />
            </div>
            <div className={styles.contactField}>
              <label>Missiya matni (RU)</label>
              <textarea rows={3} value={aboutData.mission_text_ru} onChange={(e) => handleChange('mission_text_ru', e.target.value)} />
            </div>
          </div>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconAmber}><List size={18} /></div>
            <h3>Nima uchun biz?</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>Sarlavha (UZ)</label>
              <input type="text" value={aboutData.why_title} onChange={(e) => handleChange('why_title', e.target.value)} />
            </div>
            <div className={styles.contactField}>
              <label>Sarlavha (RU)</label>
              <input type="text" value={aboutData.why_title_ru} onChange={(e) => handleChange('why_title_ru', e.target.value)} />
            </div>
            <div className={styles.contactField}>
              <label>Sabab 1 (UZ)</label>
              <input type="text" value={aboutData.why_item1} onChange={(e) => handleChange('why_item1', e.target.value)} />
            </div>
            <div className={styles.contactField}>
              <label>Sabab 1 (RU)</label>
              <input type="text" value={aboutData.why_item1_ru} onChange={(e) => handleChange('why_item1_ru', e.target.value)} />
            </div>
            <div className={styles.contactField}>
              <label>Sabab 2 (UZ)</label>
              <input type="text" value={aboutData.why_item2} onChange={(e) => handleChange('why_item2', e.target.value)} />
            </div>
            <div className={styles.contactField}>
              <label>Sabab 2 (RU)</label>
              <input type="text" value={aboutData.why_item2_ru} onChange={(e) => handleChange('why_item2_ru', e.target.value)} />
            </div>
            <div className={styles.contactField}>
              <label>Sabab 3 (UZ)</label>
              <input type="text" value={aboutData.why_item3} onChange={(e) => handleChange('why_item3', e.target.value)} />
            </div>
            <div className={styles.contactField}>
              <label>Sabab 3 (RU)</label>
              <input type="text" value={aboutData.why_item3_ru} onChange={(e) => handleChange('why_item3_ru', e.target.value)} />
            </div>
            <div className={styles.contactField}>
              <label>Sabab 4 (UZ)</label>
              <input type="text" value={aboutData.why_item4} onChange={(e) => handleChange('why_item4', e.target.value)} />
            </div>
            <div className={styles.contactField}>
              <label>Sabab 4 (RU)</label>
              <input type="text" value={aboutData.why_item4_ru} onChange={(e) => handleChange('why_item4_ru', e.target.value)} />
            </div>
          </div>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconRed}><ImageIcon size={18} /></div>
            <h3>Rasm yuklash (Xotiradan)</h3>
          </div>
          <div className={styles.contactCardBody}>
            {aboutData.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={aboutData.image_url}
                alt="Joriy rasm"
                style={{ width: '100%', maxWidth: '200px', borderRadius: '8px', marginBottom: '10px' }}
              />
            )}
            <div className={styles.contactField}>
              <label>Yangi rasm yuklash</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange} 
                style={{ padding: '8px 0' }}
              />
            </div>
            <div className={styles.contactField}>
              <label>Yoki URL manzilini kiriting</label>
              <input type="text" value={aboutData.image_url} onChange={(e) => handleChange('image_url', e.target.value)} placeholder="/hero-bg.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
