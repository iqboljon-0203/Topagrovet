'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { use } from 'react';
import { ArrowLeft, Save, Plus, FilePenLine } from 'lucide-react';
import styles from './edit.module.css';

export default function AdminProductEdit({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const isNew = id === 'new';
  const router = useRouter();

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    slug: '',
    category: '',
    subcategory: '',
    price: 0,
    inStock: true,
    description: '',
    shortDesc: '',
    images: [],
    activeIngredient: '',
    regNumber: '',
    volumes: '',
    spec_classification: '',
    spec_packaging: '',
    spec_form: '',
    spec_shelfLife: '',
    spec_manufacturer: '',
    tab_description: '',
    tab_usage: '',
    tab_dosage: '',
    tab_safety: '',
    tab_crops: '',
    name_ru: '',
    description_ru: '',
    shortDesc_ru: '',
    activeIngredient_ru: '',
    spec_classification_ru: '',
    spec_packaging_ru: '',
    spec_form_ru: '',
    spec_shelfLife_ru: '',
    spec_manufacturer_ru: '',
    tab_description_ru: '',
    tab_usage_ru: '',
    tab_dosage_ru: '',
    tab_safety_ru: '',
    tab_crops_ru: '',
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    const { data } = await supabase.from('product_categories').select('*');
    if (data) {
      setCategories(data.filter(c => !c.parent_id));
      setSubCategories(data.filter(c => c.parent_id));
    }
  }

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!isNew) {
      fetchProduct();
    }
  }, [id]);

  async function fetchProduct() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      setProduct({
        ...data,
        volumes: data.volumes ? data.volumes.join(', ') : '',
        spec_classification: data.specifications?.['Tasnifi'] || '',
        spec_packaging: data.specifications?.['Qadoqlash'] || '',
        spec_form: data.specifications?.['Preparat shakli'] || '',
        spec_shelfLife: data.specifications?.['Saqlash muddati'] || '',
        spec_manufacturer: data.specifications?.['Ishlab chiqaruvchi'] || '',
        tab_description: data.tabContent?.description || '',
        tab_usage: data.tabContent?.usage || '',
        tab_dosage: data.tabContent?.dosage || '',
        tab_safety: data.tabContent?.safety || '',
        tab_crops: data.tabContent?.crops ? data.tabContent.crops.join(', ') : '',
        name_ru: data.name_ru || '',
        description_ru: data.description_ru || '',
        shortDesc_ru: data.shortDesc_ru || '',
        activeIngredient_ru: data.activeIngredient_ru || '',
        spec_classification_ru: data.specifications_ru?.['Tasnifi'] || '',
        spec_packaging_ru: data.specifications_ru?.['Qadoqlash'] || '',
        spec_form_ru: data.specifications_ru?.['Preparat shakli'] || '',
        spec_shelfLife_ru: data.specifications_ru?.['Saqlash muddati'] || '',
        spec_manufacturer_ru: data.specifications_ru?.['Ishlab chiqaruvchi'] || '',
        tab_description_ru: data.tabContent_ru?.description || '',
        tab_usage_ru: data.tabContent_ru?.usage || '',
        tab_dosage_ru: data.tabContent_ru?.dosage || '',
        tab_safety_ru: data.tabContent_ru?.safety || '',
        tab_crops_ru: data.tabContent_ru?.crops ? data.tabContent_ru.crops.join(', ') : '',
      });
    }
    setLoading(false);
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'number'
          ? Number(value)
          : value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    let uploadedImages = [...(product.images || [])];

    // Upload image if a new one is selected
    if (imageFile) {
      const fileName = `${Date.now()}_${imageFile.name}`;
      const { data, error } = await supabase.storage
        .from('products')
        .upload(`uploads/${fileName}`, imageFile);

      if (!error) {
        const { data: publicUrlData } = supabase.storage
          .from('products')
          .getPublicUrl(`uploads/${fileName}`);
        uploadedImages = [publicUrlData.publicUrl];
      }
    }

    const productData = {
      ...product,
      volumes: product.volumes ? product.volumes.toString().split(',').map(v => v.trim()).filter(Boolean) : [],
      specifications: {
        'Tasnifi': product.spec_classification,
        'Qadoqlash': product.spec_packaging,
        'Faol moddasi': product.activeIngredient,
        'Preparat shakli': product.spec_form,
        'Saqlash muddati': product.spec_shelfLife,
        'Ishlab chiqaruvchi': product.spec_manufacturer,
      },
      specifications_ru: {
        'Tasnifi': product.spec_classification_ru,
        'Qadoqlash': product.spec_packaging_ru,
        'Faol moddasi': product.activeIngredient_ru,
        'Preparat shakli': product.spec_form_ru,
        'Saqlash muddati': product.spec_shelfLife_ru,
        'Ishlab chiqaruvchi': product.spec_manufacturer_ru,
      },
      tabContent: {
        description: product.tab_description || product.description,
        usage: product.tab_usage,
        dosage: product.tab_dosage,
        safety: product.tab_safety,
        crops: product.tab_crops ? product.tab_crops.toString().split(',').map(c => c.trim()).filter(Boolean) : [],
      },
      tabContent_ru: {
        description: product.tab_description_ru || product.description_ru,
        usage: product.tab_usage_ru,
        dosage: product.tab_dosage_ru,
        safety: product.tab_safety_ru,
        crops: product.tab_crops_ru ? product.tab_crops_ru.toString().split(',').map(c => c.trim()).filter(Boolean) : [],
      },
      images: uploadedImages,
      slug:
        product.slug ||
        product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };
    
    // Backend ga yuborishdan oldin frontend o'zgaruvchilarini o'chiramiz
    delete productData.spec_classification;
    delete productData.spec_packaging;
    delete productData.spec_form;
    delete productData.spec_shelfLife;
    delete productData.spec_manufacturer;
    delete productData.tab_description;
    delete productData.tab_usage;
    delete productData.tab_dosage;
    delete productData.tab_safety;
    delete productData.tab_crops;
    delete productData.spec_classification_ru;
    delete productData.spec_packaging_ru;
    delete productData.spec_form_ru;
    delete productData.spec_shelfLife_ru;
    delete productData.spec_manufacturer_ru;
    delete productData.tab_description_ru;
    delete productData.tab_usage_ru;
    delete productData.tab_dosage_ru;
    delete productData.tab_safety_ru;
    delete productData.tab_crops_ru;

    let response;
    if (isNew) {
      delete productData.id;
      response = await supabase.from('products').insert([productData]);
    } else {
      response = await supabase
        .from('products')
        .update(productData)
        .eq('id', id);
    }

    if (response.error) {
      alert('Xatolik: ' + response.error.message);
    } else {
      router.push('/admin/products');
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
              {isNew ? <Plus size={20} /> : <FilePenLine size={20} />}
            </div>
            <h1 className={styles.pageTitle}>
              {isNew ? 'Yangi mahsulot' : 'Mahsulotni tahrirlash'}
            </h1>
          </div>
          <p className={styles.pageSubtitle}>
            {isNew
              ? "Yangi mahsulot ma'lumotlarini kiriting"
              : `ID: ${id?.toString().slice(0, 16)}...`}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className={styles.formCard}>
        <form onSubmit={handleSubmit}>
          {/* Section 1: Asosiy */}
          <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>Asosiy ma&apos;lumotlar</div>
            <div className={styles.formGrid2}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nomi (UZ) *</label>
                <input type="text" name="name" value={product.name || ''} onChange={handleChange} required placeholder="Mahsulot nomi" className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nomi (RU) *</label>
                <input type="text" name="name_ru" value={product.name_ru || ''} onChange={handleChange} required placeholder="Название продукта" className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Slug (URL)</label>
                <input
                  type="text"
                  name="slug"
                  value={product.slug || ''}
                  onChange={handleChange}
                  placeholder="avtomatik-yaratiladi"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Asosiy Toifa *</label>
                <select
                  name="category"
                  value={product.category || ''}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                >
                  <option value="">- Tanlang -</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Sub-toifa (Ixtiyoriy)</label>
                <select
                  name="subcategory"
                  value={product.subcategory || ''}
                  onChange={handleChange}
                  className={styles.formInput}
                >
                  <option value="">- Tanlang -</option>
                  {subCategories
                    .filter(sub => {
                      const parent = categories.find(c => c.slug === product.category);
                      return parent && sub.parent_id === parent.id;
                    })
                    .map(sub => (
                      <option key={sub.id} value={sub.slug}>{sub.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Narxi (so&apos;m)</label>
                <input
                  type="number"
                  name="price"
                  value={product.price || 0}
                  onChange={handleChange}
                  min="0"
                  className={styles.formInput}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Ta'rif */}
          <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>Ta&apos;rif</div>
            <div className={styles.formGrid2}>
              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.formLabel}>Qisqacha ta&apos;rif (UZ)</label>
                <input type="text" name="shortDesc" value={product.shortDesc || ''} onChange={handleChange} placeholder="Bir qator qisqa tavsif..." className={styles.formInput} />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.formLabel}>Qisqacha ta&apos;rif (RU)</label>
                <input type="text" name="shortDesc_ru" value={product.shortDesc_ru || ''} onChange={handleChange} placeholder="Краткое описание..." className={styles.formInput} />
              </div>
            </div>
            <div className={styles.formGrid2}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>To&apos;liq ta&apos;rif (UZ)</label>
                <textarea name="description" value={product.description || ''} onChange={handleChange} rows="4" className={styles.formTextarea} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>To&apos;liq ta&apos;rif (RU)</label>
                <textarea name="description_ru" value={product.description_ru || ''} onChange={handleChange} rows="4" className={styles.formTextarea} />
              </div>
            </div>
          </div>

          {/* Section: Qo'shimcha */}
          <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>Qo&apos;shimcha ma&apos;lumotlar</div>
            <div className={styles.formGrid2}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Faol moddasi (UZ)</label>
                <input type="text" name="activeIngredient" value={product.activeIngredient || ''} onChange={handleChange} className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Faol moddasi (RU)</label>
                <input type="text" name="activeIngredient_ru" value={product.activeIngredient_ru || ''} onChange={handleChange} className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Davlat raqami / Nashr</label>
                <input
                  type="text"
                  name="regNumber"
                  value={product.regNumber || ''}
                  onChange={handleChange}
                  placeholder="UZ-VET-..."
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                <label className={styles.formLabel}>Qadoqlash (Hajmlar - vergul bilan ajrating)</label>
                <input
                  type="text"
                  name="volumes"
                  value={product.volumes || ''}
                  onChange={handleChange}
                  placeholder="100 ml, 250 ml, 1 L"
                  className={styles.formInput}
                />
              </div>
            </div>
          </div>

          {/* Section: Spetsifikatsiyalar */}
          <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>Spetsifikatsiyalar (Jadval)</div>
            <div className={styles.formGrid2}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Tasnifi (UZ)</label>
                <input type="text" name="spec_classification" value={product.spec_classification || ''} onChange={handleChange} className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Tasnifi (RU)</label>
                <input type="text" name="spec_classification_ru" value={product.spec_classification_ru || ''} onChange={handleChange} className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Qadoqlash (UZ)</label>
                <input type="text" name="spec_packaging" value={product.spec_packaging || ''} onChange={handleChange} className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Qadoqlash (RU)</label>
                <input type="text" name="spec_packaging_ru" value={product.spec_packaging_ru || ''} onChange={handleChange} className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Preparat shakli (UZ)</label>
                <input type="text" name="spec_form" value={product.spec_form || ''} onChange={handleChange} className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Preparat shakli (RU)</label>
                <input type="text" name="spec_form_ru" value={product.spec_form_ru || ''} onChange={handleChange} className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Saqlash muddati (UZ)</label>
                <input type="text" name="spec_shelfLife" value={product.spec_shelfLife || ''} onChange={handleChange} className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Saqlash muddati (RU)</label>
                <input type="text" name="spec_shelfLife_ru" value={product.spec_shelfLife_ru || ''} onChange={handleChange} className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Ishlab chiqaruvchi (UZ)</label>
                <input type="text" name="spec_manufacturer" value={product.spec_manufacturer || ''} onChange={handleChange} className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Ishlab chiqaruvchi (RU)</label>
                <input type="text" name="spec_manufacturer_ru" value={product.spec_manufacturer_ru || ''} onChange={handleChange} className={styles.formInput} />
              </div>
            </div>
          </div>

          {/* Section: Tablar */}
          <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>Tablar mazmuni</div>
            <div className={styles.formGrid2}>
              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.formLabel}>Tavsif (Tab uchun - UZ)</label>
                <textarea name="tab_description" value={product.tab_description || ''} onChange={handleChange} rows="3" className={styles.formTextarea} />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.formLabel}>Tavsif (Tab uchun - RU)</label>
                <textarea name="tab_description_ru" value={product.tab_description_ru || ''} onChange={handleChange} rows="3" className={styles.formTextarea} />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.formLabel}>Mos ekinlar (UZ)</label>
                <input type="text" name="tab_crops" value={product.tab_crops || ''} onChange={handleChange} placeholder="G'o'za, Bug'doy, Pomidor" className={styles.formInput} />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.formLabel}>Mos ekinlar (RU)</label>
                <input type="text" name="tab_crops_ru" value={product.tab_crops_ru || ''} onChange={handleChange} placeholder="Хлопок, Пшеница, Томат" className={styles.formInput} />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.formLabel}>Qo&apos;llanilishi (UZ)</label>
                <textarea name="tab_usage" value={product.tab_usage || ''} onChange={handleChange} rows="3" className={styles.formTextarea} />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.formLabel}>Qo&apos;llanilishi (RU)</label>
                <textarea name="tab_usage_ru" value={product.tab_usage_ru || ''} onChange={handleChange} rows="3" className={styles.formTextarea} />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.formLabel}>Dozasi (UZ)</label>
                <textarea name="tab_dosage" value={product.tab_dosage || ''} onChange={handleChange} rows="3" className={styles.formTextarea} />
              </div>
              <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                <label className={styles.formLabel}>Dozasi (RU)</label>
                <textarea name="tab_dosage_ru" value={product.tab_dosage_ru || ''} onChange={handleChange} rows="3" className={styles.formTextarea} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Xavfsizlik (UZ)</label>
                <textarea name="tab_safety" value={product.tab_safety || ''} onChange={handleChange} rows="3" className={styles.formTextarea} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Xavfsizlik (RU)</label>
                <textarea name="tab_safety_ru" value={product.tab_safety_ru || ''} onChange={handleChange} rows="3" className={styles.formTextarea} />
              </div>
            </div>
          </div>

          {/* Section 3: Rasm */}
          <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>Rasm</div>
            {product.images && product.images.length > 0 && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.images[0]}
                alt="Joriy rasm"
                className={styles.imagePreview}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.fileInput}
            />
          </div>

          {/* Section 4: Mavjudlik */}
          <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>Ombor holati</div>
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                name="inStock"
                checked={product.inStock}
                onChange={handleChange}
                id="inStock"
                className={styles.checkboxInput}
              />
              <span className={styles.checkboxLabel}>Omborda mavjud</span>
              <span className={styles.checkboxDesc}>
                {product.inStock ? '✅ Sotuvda' : '❌ Tugagan'}
              </span>
            </label>
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
              {saving ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
