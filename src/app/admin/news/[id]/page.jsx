'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { use } from 'react';
import { ArrowLeft, Save, Plus, Newspaper } from 'lucide-react';
import styles from './newsEdit.module.css';

export default function AdminNewsEdit({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const isNew = id === 'new';
  const router = useRouter();

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [news, setNews] = useState({
    title: '',
    content: '',
    title_ru: '',
    excerpt_ru: '',
    content_ru: '',
    image_url: '',
    published_at: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (!isNew) {
      fetchNews();
    }
  }, [id]);

  async function fetchNews() {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      setNews(data);
      if (data.image_url) setPreviewUrl(data.image_url);
    }
    setLoading(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    let image_url = news.image_url || '';

    // Rasm yuklash
    if (imageFile) {
      const fileName = `news/${Date.now()}_${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('products') // mavjud bucket
        .upload(fileName, imageFile);

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from('products')
          .getPublicUrl(fileName);
        image_url = urlData.publicUrl;
      }
    }

    const payload = {
      title: news.title,
      title_ru: news.title_ru,
      excerpt: news.excerpt,
      excerpt_ru: news.excerpt_ru,
      content: news.content,
      content_ru: news.content_ru,
      image_url,
      published_at: news.published_at,
    };

    let response;
    if (isNew) {
      response = await supabase.from('news').insert([payload]);
    } else {
      response = await supabase.from('news').update(payload).eq('id', id);
    }

    if (response.error) {
      alert('Xatolik: ' + response.error.message);
    } else {
      router.push('/admin/news');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.loadingSpinner} />
        <span>Ma&apos;lumotlar yuklanmoqda...</span>
      </div>
    );
  }

  return (
    <div className={styles.formPage}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <div className={styles.pageTitleRow}>
            <div className={styles.pageTitleIcon}>
              {isNew ? <Plus size={20} /> : <Newspaper size={20} />}
            </div>
            <h1 className={styles.pageTitle}>
              {isNew ? 'Yangi yangilik' : 'Yangilikni tahrirlash'}
            </h1>
          </div>
          <p className={styles.pageSubtitle}>
            {isNew
              ? "Yangilik mazmunini kiriting"
              : `ID: ${id?.toString().slice(0, 16)}...`}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className={styles.formCard}>
        <form onSubmit={handleSubmit}>
          {/* Section 1: Asosiy */}
          <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>Sarlavha va sana</div>
            <div className={styles.formGrid2}>
              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.formLabel}>Sarlavha (UZ) *</label>
                <input type="text" name="title" value={news.title} onChange={handleChange} required placeholder="Yangilik sarlavhasi..." className={styles.formInput} />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.formLabel}>Sarlavha (RU) *</label>
                <input type="text" name="title_ru" value={news.title_ru || ''} onChange={handleChange} required placeholder="Заголовок новости..." className={styles.formInput} />
              </div>
            </div>
            <div className={styles.formGrid2}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nashr sanasi</label>
                <input
                  type="date"
                  name="published_at"
                  value={news.published_at}
                  onChange={handleChange}
                  className={styles.formInput}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Mazmun */}
          <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>Mazmun</div>
            <div className={styles.formGrid2}>
              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.formLabel}>Qisqacha ta&apos;rif (UZ)</label>
                <textarea name="excerpt" value={news.excerpt || ''} onChange={handleChange} rows="3" placeholder="Yangilik haqida qisqacha..." className={styles.formTextarea} />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.formLabel}>Qisqacha ta&apos;rif (RU)</label>
                <textarea name="excerpt_ru" value={news.excerpt_ru || ''} onChange={handleChange} rows="3" placeholder="Краткое описание..." className={styles.formTextarea} />
              </div>
            </div>
            <div className={styles.formGrid2}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>To&apos;liq matn (UZ) *</label>
                <textarea name="content" value={news.content || ''} onChange={handleChange} required rows="10" placeholder="Yangilik to'liq matni. Paragraflarni bo'sh satr bilan ajrating..." className={`${styles.formTextarea} ${styles.formTextareaLarge}`} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>To&apos;liq matn (RU) *</label>
                <textarea name="content_ru" value={news.content_ru || ''} onChange={handleChange} required rows="10" placeholder="Полный текст новости..." className={`${styles.formTextarea} ${styles.formTextareaLarge}`} />
              </div>
            </div>
          </div>

          {/* Section 3: Rasm */}
          <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>Muqova rasmi</div>
            {previewUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Preview"
                className={styles.imagePreview}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
            <div className={styles.imageHint}>
              JPG, PNG yoki WebP. Tavsiya etilgan o&apos;lcham: 1200×630 px
            </div>
          </div>

          {/* Actions */}
          <div className={styles.formActions}>
            <button
              type="button"
              onClick={() => router.back()}
              className={styles.cancelBtn}
            >
              <ArrowLeft size={15} />
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={saving}
              className={styles.saveBtn}
            >
              {saving ? (
                <span className={styles.saveBtnSpinner} />
              ) : (
                <Save size={15} />
              )}
              {saving ? 'Saqlanmoqda...' : 'E\'lon qilish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
