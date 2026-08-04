'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import {
  Users, Plus, Edit2, Trash2, Save, X, Loader2,
  CheckCircle, AlertCircle, Phone, Send, HeartPulse, Leaf
} from 'lucide-react';
import styles from '../admin.module.css';

const EMPTY_SPECIALIST = {
  name: '',
  name_ru: '',
  role: '',
  role_ru: '',
  phone: '',
  telegram_link: '',
  photo_url: '',
  type: 'agro',
  is_active: true,
  sort_order: 0,
};

export default function AdminSpecialistsPage() {
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(EMPTY_SPECIALIST);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSpecialists();
  }, []);

  async function fetchSpecialists() {
    setLoading(true);
    const { data, error } = await supabase
      .from('specialists')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data) setSpecialists(data);
    else if (error) setError(error.message);
    setLoading(false);
  }

  const startAdd = () => {
    setEditingId(null);
    setEditData({ ...EMPTY_SPECIALIST, sort_order: specialists.length + 1 });
    setShowForm(true);
  };

  const startEdit = (spec) => {
    setEditingId(spec.id);
    setEditData({ ...spec });
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setEditData(EMPTY_SPECIALIST);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');

    const payload = {
      name: editData.name,
      name_ru: editData.name_ru,
      role: editData.role,
      role_ru: editData.role_ru,
      phone: editData.phone,
      telegram_link: editData.telegram_link,
      photo_url: editData.photo_url,
      type: editData.type,
      is_active: editData.is_active,
      sort_order: Number(editData.sort_order) || 0,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (editingId) {
      result = await supabase.from('specialists').update(payload).eq('id', editingId);
    } else {
      result = await supabase.from('specialists').insert([payload]);
    }

    if (result.error) {
      setError(result.error.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      cancelForm();
      await fetchSpecialists();
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Bu mutaxassisni o'chirishni tasdiqlaysizmi?")) return;
    const { error } = await supabase.from('specialists').delete().eq('id', id);
    if (!error) await fetchSpecialists();
    else setError(error.message);
  };

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.tableSpinner} />
        <span>Yuklanmoqda...</span>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <div className={styles.pageTitleRow}>
            <div className={styles.pageTitleIcon}><Users size={20} /></div>
            <h1 className={styles.pageTitle}>Mutaxassislar</h1>
          </div>
          <p className={styles.pageSubtitle}>Agronomlar va veterinarlarni boshqaring</p>
        </div>
        <button className={styles.addButton} onClick={startAdd}>
          <Plus size={16} /> Mutaxassis qo&apos;shish
        </button>
      </div>

      {error && (
        <div className={styles.alertError}>
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {saved && (
        <div className={styles.alertSuccess}>
          <CheckCircle size={16} /> Muvaffaqiyatli saqlandi!
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className={styles.contactCard} style={{ marginBottom: '2rem' }}>
          <div className={styles.contactCardHeader}>
            <div className={styles.contactCardIconGreen}>
              <Users size={18} />
            </div>
            <h3>{editingId ? "Tahrirlash" : "Yangi mutaxassis qo'shish"}</h3>
          </div>
          <div className={styles.contactCardBody}>
            <div className={styles.contactFormGrid}>
              <div className={styles.contactField}>
                <label>Ism (UZ)</label>
                <input type="text" value={editData.name} onChange={e => handleChange('name', e.target.value)} placeholder="Ism Familiya" />
              </div>
              <div className={styles.contactField}>
                <label>Ism (RU)</label>
                <input type="text" value={editData.name_ru} onChange={e => handleChange('name_ru', e.target.value)} placeholder="Имя Фамилия" />
              </div>
              <div className={styles.contactField}>
                <label>Lavozimi (UZ)</label>
                <input type="text" value={editData.role} onChange={e => handleChange('role', e.target.value)} placeholder="Bosh agronomist" />
              </div>
              <div className={styles.contactField}>
                <label>Lavozimi (RU)</label>
                <input type="text" value={editData.role_ru} onChange={e => handleChange('role_ru', e.target.value)} placeholder="Главный агроном" />
              </div>
              <div className={styles.contactField}>
                <label>Telefon raqami</label>
                <input type="text" value={editData.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="+998 90 000 00 00" />
              </div>
              <div className={styles.contactField}>
                <label>Telegram havolasi</label>
                <input type="text" value={editData.telegram_link} onChange={e => handleChange('telegram_link', e.target.value)} placeholder="https://t.me/username" />
              </div>
              <div className={styles.contactField}>
                <label>Rasm URL (Supabase Storage)</label>
                <input type="text" value={editData.photo_url} onChange={e => handleChange('photo_url', e.target.value)} placeholder="https://..." />
              </div>
              <div className={styles.contactField}>
                <label>Turi</label>
                <select value={editData.type} onChange={e => handleChange('type', e.target.value)} style={{ width:'100%', padding:'8px', borderRadius:'8px', border:'1px solid #e2e8f0' }}>
                  <option value="agro">Agronomist</option>
                  <option value="vet">Veterinar</option>
                </select>
              </div>
              <div className={styles.contactField}>
                <label>Tartib raqami</label>
                <input type="number" value={editData.sort_order} onChange={e => handleChange('sort_order', e.target.value)} />
              </div>
              <div className={styles.contactField}>
                <label>Holati</label>
                <select value={editData.is_active ? 'true' : 'false'} onChange={e => handleChange('is_active', e.target.value === 'true')} style={{ width:'100%', padding:'8px', borderRadius:'8px', border:'1px solid #e2e8f0' }}>
                  <option value="true">Faol</option>
                  <option value="false">Nofaol</option>
                </select>
              </div>
            </div>

            <div style={{ display:'flex', gap:'12px', marginTop:'1.5rem' }}>
              <button className={styles.addButton} onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 size={16} className={styles.spinnerIcon} /> : <Save size={16} />}
                {saving ? 'Saqlanmoqda...' : 'Saqlash'}
              </button>
              <button 
                onClick={cancelForm}
                style={{ padding:'8px 20px', borderRadius:'8px', border:'1px solid #e2e8f0', background:'white', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px' }}
              >
                <X size={16} /> Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Specialists Table */}
      {specialists.length === 0 ? (
        <div className={styles.emptyState}>
          <Users size={48} className={styles.emptyIcon} />
          <p className={styles.emptyTitle}>Mutaxassislar topilmadi</p>
          <p className={styles.emptyDesc}>Birinchi mutaxassisni qo&apos;shing</p>
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Mutaxassis</th>
                <th>Turi</th>
                <th>Telefon</th>
                <th>Telegram</th>
                <th>Holat</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {specialists.map(spec => (
                <tr key={spec.id}>
                  <td>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                      {spec.photo_url ? (
                        <Image src={spec.photo_url} alt={spec.name} width={36} height={36} style={{ borderRadius:'50%', objectFit:'cover' }} />
                      ) : (
                        <div style={{ width:36, height:36, borderRadius:'50%', background:'#e2e8f0', display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <Users size={16} color="#94a3b8" />
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight:600 }}>{spec.name}</div>
                        <div style={{ fontSize:'0.75rem', color:'#64748b' }}>{spec.role}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ display:'flex', alignItems:'center', gap:'4px', padding:'3px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:600, width:'fit-content', background: spec.type === 'vet' ? '#e8f5e9' : '#fff8e1', color: spec.type === 'vet' ? '#2e7d32' : '#f57f17' }}>
                      {spec.type === 'vet' ? <HeartPulse size={12} /> : <Leaf size={12} />}
                      {spec.type === 'vet' ? 'Veterinar' : 'Agronomist'}
                    </span>
                  </td>
                  <td><a href={`tel:${spec.phone}`} style={{ color:'#2E7D32' }}>{spec.phone}</a></td>
                  <td>
                    {spec.telegram_link ? (
                      <a href={spec.telegram_link} target="_blank" rel="noopener noreferrer" style={{ color:'#2AABEE', display:'flex', alignItems:'center', gap:'4px' }}>
                        <Send size={14} /> Telegram
                      </a>
                    ) : '—'}
                  </td>
                  <td>
                    <span style={{ padding:'3px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:600, background: spec.is_active ? '#dcfce7' : '#fee2e2', color: spec.is_active ? '#16a34a' : '#dc2626' }}>
                      {spec.is_active ? 'Faol' : 'Nofaol'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display:'flex', gap:'8px' }}>
                      <button 
                        className={styles.actionBtn}
                        onClick={() => startEdit(spec)}
                      >
                        <Edit2 size={15} />
                      </button>
                      <button 
                        className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                        onClick={() => handleDelete(spec.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
