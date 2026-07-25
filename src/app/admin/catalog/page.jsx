'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FolderTree, Plus, Pencil, Trash2, Save, X, Bug, Leaf, Sprout, Droplets, FlaskConical, Pill, Shield, Heart, Thermometer, SprayCan, Zap, Grid3X3 } from 'lucide-react';
import styles from '../admin.module.css';

const ICON_MAP = {
  bug: Bug, leaf: Leaf, sprout: Sprout, droplets: Droplets, flask: FlaskConical,
  pill: Pill, shield: Shield, heart: Heart, thermometer: Thermometer, spray: SprayCan,
  zap: Zap, grid: Grid3X3,
};

const ICON_OPTIONS = Object.keys(ICON_MAP);

export default function AdminCatalog() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    name_ru: '',
    slug: '',
    parent_id: '',
    icon: 'grid',
    type: 'veterinariya',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .order('id', { ascending: true });

    if (!error && data) {
      setCategories(data);
    }
    setLoading(false);
  }

  function handleEdit(cat) {
    setEditingId(cat.id);
    setFormData({
      name: cat.name,
      name_ru: cat.name_ru || '',
      slug: cat.slug,
      parent_id: cat.parent_id || '',
      icon: cat.icon || 'grid',
      type: cat.type || 'veterinariya',
    });
  }

  function handleCancel() {
    setEditingId(null);
    setFormData({
      name: '',
      name_ru: '',
      slug: '',
      parent_id: '',
      icon: 'grid',
      type: 'veterinariya',
    });
  }

  const generateSlug = (text) => {
    return text.toString().toLowerCase()
      .replace(/o'|o‘|oʻ/g, 'o')
      .replace(/g'|g‘|gʻ/g, 'g')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: newName,
      slug: !editingId ? generateSlug(newName) : prev.slug
    }));
  };

  async function handleSave(e) {
    e.preventDefault();
    const dataToSave = {
      name: formData.name,
      name_ru: formData.name_ru,
      slug: formData.slug,
      parent_id: formData.parent_id ? parseInt(formData.parent_id) : null,
      icon: formData.icon,
      type: formData.type,
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      await supabase.from('product_categories').update(dataToSave).eq('id', editingId);
    } else {
      await supabase.from('product_categories').insert([dataToSave]);
    }

    handleCancel();
    fetchCategories();
  }

  async function handleDelete(id) {
    if (!confirm('Rostdan ham ushbu katalogni o\'chirmoqchimisiz? Agar o\'chirsangiz, uning ichidagi barcha sub-kataloglar ham o\'chib ketadi!')) return;
    await supabase.from('product_categories').delete().eq('id', id);
    fetchCategories();
  }

  // Asosiy kataloglar (parent_id is null)
  const mainCategories = categories.filter(c => !c.parent_id);

  return (
    <div>
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <div className={styles.pageTitleRow}>
            <div className={styles.pageTitleIcon}>
              <FolderTree size={20} />
            </div>
            <h1 className={styles.pageTitle}>Kataloglar</h1>
          </div>
          <p className={styles.pageSubtitle}>Mahsulotlar uchun asosiy katalog va sub-kataloglarni boshqarish</p>
        </div>
      </div>

      <div className={styles.contactFormGrid} style={{ gridTemplateColumns: '1fr 2fr' }}>
        
        {/* Form (Qo'shish / Tahrirlash) */}
        <div className={styles.contactCard} style={{ alignSelf: 'start' }}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconGreen}>
              {editingId ? <Pencil size={18} /> : <Plus size={18} />}
            </div>
            <h3>{editingId ? 'Katalogni tahrirlash' : 'Yangi katalog qo\'shish'}</h3>
          </div>
          <form onSubmit={handleSave} className={styles.contactCardBody}>
            <div className={styles.contactField}>
              <label>Kategoriya nomi (UZ)</label>
              <input type="text" required value={formData.name} onChange={handleNameChange} placeholder="Masalan: Antibiotiklar" />
            </div>
            
            <div className={styles.contactField}>
              <label>Kategoriya nomi (RU)</label>
              <input type="text" required value={formData.name_ru} onChange={e => setFormData({ ...formData, name_ru: e.target.value })} placeholder="Например: Антибиотики" />
            </div>
            

            <div className={styles.contactField}>
              <label>Asosiy Kategoriya (Ixtiyoriy)</label>
              <select
                value={formData.parent_id}
                onChange={e => setFormData({ ...formData, parent_id: e.target.value })}
              >
                <option value="">- Bu o'zi asosiy katalog bo'ladi -</option>
                {mainCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name} ({cat.type})</option>
                ))}
              </select>
            </div>

            <div className={styles.contactField}>
              <label>Turi</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="veterinariya">Veterinariya</option>
                <option value="agro">Agro</option>
              </select>
            </div>

            <div className={styles.contactField}>
              <label>Ikonka nomi</label>
              <select
                value={formData.icon}
                onChange={e => setFormData({ ...formData, icon: e.target.value })}
              >
                {ICON_OPTIONS.map(iconName => (
                  <option key={iconName} value={iconName}>{iconName}</option>
                ))}
              </select>
              <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                <span style={{ fontSize: '0.875rem' }}>Tanlangan ikonka:</span>
                {(() => {
                   const SelectedIcon = ICON_MAP[formData.icon] || Grid3X3;
                   return <SelectedIcon size={20} color="var(--color-primary)" />;
                })()}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button type="submit" className={styles.addButton} style={{ flex: 1 }}>
                <Save size={16} /> Saqlash
              </button>
              {editingId && (
                <button type="button" onClick={handleCancel} className={styles.deleteBtn} style={{ padding: '0.5rem 1rem' }}>
                  <X size={16} /> Bosh tortish
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className={styles.tableCard} style={{ marginTop: 0 }}>
          <div className={styles.tableCardHeader}>
            <span className={styles.tableCardTitle}>Kataloglar daraxti</span>
          </div>

          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.tableSpinner} />
            </div>
          ) : (
            <div className={styles.tableWrapper} style={{ padding: '1rem' }}>
              {mainCategories.length === 0 ? (
                <p style={{ color: '#64748b', textAlign: 'center' }}>Hali hech qanday katalog qo'shilmagan</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {mainCategories.map(mainCat => {
                    const MainIcon = ICON_MAP[mainCat.icon] || Grid3X3;
                    const subCats = categories.filter(c => c.parent_id === mainCat.id);
                    return (
                      <div key={mainCat.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f8fafc', borderBottom: subCats.length > 0 ? '1px solid #e2e8f0' : 'none' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                            <MainIcon size={20} color="var(--color-primary)" />
                            {mainCat.name} 
                            <span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#64748b', padding: '0.1rem 0.4rem', backgroundColor: '#e2e8f0', borderRadius: '4px' }}>
                              {mainCat.type}
                            </span>
                          </div>
                          <div className={styles.actionBtns}>
                            <button onClick={() => handleEdit(mainCat)} className={styles.editBtn}>
                              <Pencil size={14} />
                            </button>
                            <button onClick={() => handleDelete(mainCat.id)} className={styles.deleteBtn}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        {subCats.length > 0 && (
                          <div style={{ padding: '0.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {subCats.map(sub => {
                              const SubIcon = ICON_MAP[sub.icon] || Grid3X3;
                              return (
                                <div key={sub.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', marginLeft: '1.5rem' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                    <SubIcon size={16} color="#64748b" />
                                    {sub.name}
                                  </div>
                                  <div className={styles.actionBtns}>
                                    <button onClick={() => handleEdit(sub)} className={styles.editBtn}>
                                      <Pencil size={14} />
                                    </button>
                                    <button onClick={() => handleDelete(sub.id)} className={styles.deleteBtn}>
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
