'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import {
  Layers, Save, Loader2, CheckCircle, AlertCircle,
  Link2, Type, List
} from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminCategoriesPage() {
  const [catData, setCatData] = useState({
    vet_title: '', vet_desc: '', vet_btn_text: '', vet_btn_link: '',
    vet_item1: '', vet_item2: '', vet_item3: '',
    vet_item4: '', vet_item5: '', vet_item6: '',
    agro_title: '', agro_desc: '', agro_btn_text: '', agro_btn_link: '',
    agro_item1: '', agro_item2: '', agro_item3: '',
    agro_item4: '', agro_item5: '', agro_item6: '',
    vet_title_ru: '', vet_desc_ru: '', vet_btn_text_ru: '',
    vet_item1_ru: '', vet_item2_ru: '', vet_item3_ru: '',
    vet_item4_ru: '', vet_item5_ru: '', vet_item6_ru: '',
    agro_title_ru: '', agro_desc_ru: '', agro_btn_text_ru: '',
    agro_item1_ru: '', agro_item2_ru: '', agro_item3_ru: '',
    agro_item4_ru: '', agro_item5_ru: '', agro_item6_ru: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [recordId, setRecordId] = useState(null);

  useEffect(() => {
    async function fetchCat() {
      const { data, error } = await supabase
        .from('categories_settings')
        .select('*')
        .limit(1)
        .single();

      if (!error && data) {
        setCatData({
          vet_title: data.vet_title || '',
          vet_desc: data.vet_desc || '',
          vet_btn_text: data.vet_btn_text || '',
          vet_btn_link: data.vet_btn_link || '',
          vet_item1: data.vet_item1 || '',
          vet_item2: data.vet_item2 || '',
          vet_item3: data.vet_item3 || '',
          vet_item4: data.vet_item4 || '',
          vet_item5: data.vet_item5 || '',
          vet_item6: data.vet_item6 || '',
          agro_title: data.agro_title || '',
          agro_desc: data.agro_desc || '',
          agro_btn_text: data.agro_btn_text || '',
          agro_btn_link: data.agro_btn_link || '',
          agro_item1: data.agro_item1 || '',
          agro_item2: data.agro_item2 || '',
          agro_item3: data.agro_item3 || '',
          agro_item4: data.agro_item4 || '',
          agro_item5: data.agro_item5 || '',
          agro_item6: data.agro_item6 || '',
          vet_title_ru: data.vet_title_ru || '',
          vet_desc_ru: data.vet_desc_ru || '',
          vet_btn_text_ru: data.vet_btn_text_ru || '',
          vet_item1_ru: data.vet_item1_ru || '',
          vet_item2_ru: data.vet_item2_ru || '',
          vet_item3_ru: data.vet_item3_ru || '',
          vet_item4_ru: data.vet_item4_ru || '',
          vet_item5_ru: data.vet_item5_ru || '',
          vet_item6_ru: data.vet_item6_ru || '',
          agro_title_ru: data.agro_title_ru || '',
          agro_desc_ru: data.agro_desc_ru || '',
          agro_btn_text_ru: data.agro_btn_text_ru || '',
          agro_item1_ru: data.agro_item1_ru || '',
          agro_item2_ru: data.agro_item2_ru || '',
          agro_item3_ru: data.agro_item3_ru || '',
          agro_item4_ru: data.agro_item4_ru || '',
          agro_item5_ru: data.agro_item5_ru || '',
          agro_item6_ru: data.agro_item6_ru || '',
        });
        setRecordId(data.id);
      }
      setLoading(false);
    }
    fetchCat();
  }, []);

  const handleChange = (field, value) => {
    setCatData(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');

    const updateData = { ...catData, updated_at: new Date().toISOString() };

    let result;
    if (recordId) {
      result = await supabase.from('categories_settings').update(updateData).eq('id', recordId);
    } else {
      result = await supabase.from('categories_settings').insert([updateData]).select().single();
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
              <Layers size={20} />
            </div>
            <h1 className={styles.pageTitle}>Kategoriyalar bo&apos;limi</h1>
          </div>
          <p className={styles.pageSubtitle}>
            Bosh sahifadagi Veterinariya va Agro kartochkalar matnlarini boshqaring
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
      {saved && <div className={styles.alertSuccess}><CheckCircle size={16} />Ma&apos;lumotlar muvaffaqiyatli saqlandi!</div>}

      {/* ====== VETERINARIYA ====== */}
      <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0b1120', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        🐄 Veterinariya kartasi
      </h2>

      <div className={styles.contactFormGrid}>
        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconGreen}><Type size={18} /></div>
            <h3>Sarlavha va tavsif</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>Sarlavha (UZ)</label>
              <input type="text" value={catData.vet_title} onChange={(e) => handleChange('vet_title', e.target.value)} placeholder="Veterinariya preparatlari" />
            </div>
            <div className={styles.contactField}>
              <label>Sarlavha (RU)</label>
              <input type="text" value={catData.vet_title_ru} onChange={(e) => handleChange('vet_title_ru', e.target.value)} placeholder="Ветеринарные препараты" />
            </div>
            <div className={styles.contactField}>
              <label>Tavsif (UZ)</label>
              <input type="text" value={catData.vet_desc} onChange={(e) => handleChange('vet_desc', e.target.value)} placeholder="Hayvonlar salomatligi..." />
            </div>
            <div className={styles.contactField}>
              <label>Tavsif (RU)</label>
              <input type="text" value={catData.vet_desc_ru} onChange={(e) => handleChange('vet_desc_ru', e.target.value)} placeholder="Здоровье животных..." />
            </div>
            <div className={styles.contactField}>
              <label>Tugma matni (UZ)</label>
              <input type="text" value={catData.vet_btn_text} onChange={(e) => handleChange('vet_btn_text', e.target.value)} placeholder="Katalogni ko'rish" />
            </div>
            <div className={styles.contactField}>
              <label>Tugma matni (RU)</label>
              <input type="text" value={catData.vet_btn_text_ru} onChange={(e) => handleChange('vet_btn_text_ru', e.target.value)} placeholder="Смотреть каталог" />
            </div>
            <div className={styles.contactField}>
              <label>Tugma havolasi</label>
              <input type="text" value={catData.vet_btn_link} onChange={(e) => handleChange('vet_btn_link', e.target.value)} placeholder="/catalog/veterinariya" />
            </div>
          </div>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconBlue}><List size={18} /></div>
            <h3>Subkategoriyalar (6 ta)</h3>
          </div>
          <div className={styles.contactCardBody}>
            {[1,2,3,4,5,6].map(n => (
              <div key={n} className={styles.contactField}>
                <label>{n}-element</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="text" value={catData[`vet_item${n}`]} onChange={(e) => handleChange(`vet_item${n}`, e.target.value)} placeholder="UZ" />
                  <input type="text" value={catData[`vet_item${n}_ru`]} onChange={(e) => handleChange(`vet_item${n}_ru`, e.target.value)} placeholder="RU" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====== AGRO ====== */}
      <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0b1120', margin: '2rem 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        🌱 Agro kartasi
      </h2>

      <div className={styles.contactFormGrid}>
        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconGreen}><Type size={18} /></div>
            <h3>Sarlavha va tavsif</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>Sarlavha (UZ)</label>
              <input type="text" value={catData.agro_title} onChange={(e) => handleChange('agro_title', e.target.value)} placeholder="Agro preparatlari" />
            </div>
            <div className={styles.contactField}>
              <label>Sarlavha (RU)</label>
              <input type="text" value={catData.agro_title_ru} onChange={(e) => handleChange('agro_title_ru', e.target.value)} placeholder="Агро препараты" />
            </div>
            <div className={styles.contactField}>
              <label>Tavsif (UZ)</label>
              <input type="text" value={catData.agro_desc} onChange={(e) => handleChange('agro_desc', e.target.value)} placeholder="Mo'l hosil va yuqori sifat..." />
            </div>
            <div className={styles.contactField}>
              <label>Tavsif (RU)</label>
              <input type="text" value={catData.agro_desc_ru} onChange={(e) => handleChange('agro_desc_ru', e.target.value)} placeholder="Богатый урожай..." />
            </div>
            <div className={styles.contactField}>
              <label>Tugma matni (UZ)</label>
              <input type="text" value={catData.agro_btn_text} onChange={(e) => handleChange('agro_btn_text', e.target.value)} placeholder="Katalogni ko'rish" />
            </div>
            <div className={styles.contactField}>
              <label>Tugma matni (RU)</label>
              <input type="text" value={catData.agro_btn_text_ru} onChange={(e) => handleChange('agro_btn_text_ru', e.target.value)} placeholder="Смотреть каталог" />
            </div>
            <div className={styles.contactField}>
              <label>Tugma havolasi</label>
              <input type="text" value={catData.agro_btn_link} onChange={(e) => handleChange('agro_btn_link', e.target.value)} placeholder="/catalog/agro-preparatlar" />
            </div>
          </div>
        </div>

        <div className={styles.contactCard}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconAmber}><List size={18} /></div>
            <h3>Subkategoriyalar (6 ta)</h3>
          </div>
          <div className={styles.contactCardBody}>
            {[1,2,3,4,5,6].map(n => (
              <div key={n} className={styles.contactField}>
                <label>{n}-element</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="text" value={catData[`agro_item${n}`]} onChange={(e) => handleChange(`agro_item${n}`, e.target.value)} placeholder="UZ" />
                  <input type="text" value={catData[`agro_item${n}_ru`]} onChange={(e) => handleChange(`agro_item${n}_ru`, e.target.value)} placeholder="RU" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
