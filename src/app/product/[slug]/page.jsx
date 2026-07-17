'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ChevronRight, Star, CheckCircle2, ShoppingCart, Zap, Download, Phone, Send, MessageCircle, Heart, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/3d/ScrollReveal';
import products from '@/data/products.json';
import { formatPrice, getSubcategoryBadgeClass, getSimilarProducts } from '@/lib/utils';
import styles from './product.module.css';

const tabs = [
  { id: 'description', label: 'Tavsif' },
  { id: 'usage', label: "Qo'llanilishi" },
  { id: 'dosage', label: 'Dozasi' },
  { id: 'safety', label: 'Xavfsizlik' },
  { id: 'docs', label: 'Hujjatlar' },
  { id: 'reviews', label: 'Sharhlar' },
];

export default function ProductPage() {
  const params = useParams();
  const product = products.find(p => p.slug === params.slug);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedVolume, setSelectedVolume] = useState(product?.selectedVolume || '');

  if (!product) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Mahsulot topilmadi</h2>
        <Link href="/" style={{ color: 'var(--color-primary)', marginTop: '1rem', display: 'inline-block' }}>
          Bosh sahifaga qaytish
        </Link>
      </div>
    );
  }

  const similar = getSimilarProducts(products, product);
  const categoryPath = product.category === 'veterinariya' ? 'veterinariya' : 'agro-preparatlar';

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill={i <= Math.floor(rating) ? '#F5A623' : 'none'}
          stroke={i <= Math.floor(rating) ? '#F5A623' : '#CED4DA'}
        />
      );
    }
    return stars;
  };

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/">Bosh sahifa</Link>
        <ChevronRight size={14} className={styles.breadcrumbSep} />
        <Link href={`/catalog/${categoryPath}`}>{product.categoryLabel} preparatlari</Link>
        <ChevronRight size={14} className={styles.breadcrumbSep} />
        <Link href={`/catalog/${categoryPath}`}>{product.subcategoryLabel}</Link>
        <ChevronRight size={14} className={styles.breadcrumbSep} />
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <motion.div
            className={styles.productTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Image Gallery */}
            <div className={styles.gallery}>
              <div className={styles.mainImage}>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={250}
                  height={300}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className={styles.thumbnails}>
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className={`${styles.thumbnail} ${i === 0 ? styles.active : ''}`}>
                    <Image
                      src={product.images[0]}
                      alt={`${product.name} - ${i + 1}`}
                      width={50}
                      height={50}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className={styles.info}>
              <span className={`badge ${getSubcategoryBadgeClass(product.subcategory)} ${styles.infoBadge}`}>
                {product.subcategoryLabel}
              </span>

              <h1 className={styles.infoTitle}>{product.name}</h1>
              <p className={styles.infoIngredient}>{product.activeIngredient}</p>

              <div className={styles.ratingRow}>
                <div className={styles.ratingStars}>
                  <span className={styles.ratingValue}>{product.rating}</span>
                  {renderStars(product.rating)}
                  <span className={styles.ratingCount}>({product.reviewCount} ta sharh)</span>
                </div>
                <span className={styles.regNumber}>Nashr: {product.regNumber}</span>
              </div>

              <div className={styles.priceBlock}>
                <span className={styles.price}>{formatPrice(product.price)}</span>
                <span className={styles.stockBadge}>
                  <CheckCircle2 size={16} />
                  Mavjud
                </span>
              </div>

              {/* Volume Selector */}
              {product.volumes.length > 1 && (
                <div className={styles.volumeSection}>
                  <div className={styles.volumeLabel}>Qadoqlash:</div>
                  <div className={styles.volumeOptions}>
                    {product.volumes.map((vol) => (
                      <button
                        key={vol}
                        className={`${styles.volumeBtn} ${selectedVolume === vol ? styles.active : ''}`}
                        onClick={() => setSelectedVolume(vol)}
                      >
                        {vol}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className={styles.actionBtns}>
                <button className={styles.addToCartBtn}>
                  <ShoppingCart size={18} />
                  Savatchaga qo'shish
                </button>
                <button className={styles.quickOrderBtn}>
                  <Zap size={18} />
                  Tez buyurtma
                </button>
              </div>

              {/* PDF Download */}
              <button className={styles.pdfBtn}>
                <Download size={16} />
                PDF yo'riqnomani yuklash
              </button>

              {/* Specifications */}
              <table className={styles.specsTable}>
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className={styles.tabsArea}>
            <div className={styles.tabListWrap}>
              <div className={styles.tabList}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                    {tab.id === 'reviews' && ` (${product.reviewCount})`}
                  </button>
                ))}
              </div>
            </div>
            
            <div className={styles.tabsBottom}>
              <div className={styles.tabContent}>
                {activeTab === 'description' && (
                <div className={styles.descContent}>
                  <p>{product.tabContent.description.split('\n\n•')[0]}</p>
                  {product.tabContent.description.includes('•') && (
                    <ul className={styles.benefitsList}>
                      {product.tabContent.description
                        .split('\n')
                        .filter(line => line.startsWith('•'))
                        .map((line, i) => (
                          <li key={i}>
                            <Check size={18} className={styles.checkIcon} />
                            <span>{line.replace('• ', '')}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                  {product.tabContent.crops && (
                    <div className={styles.cropsSection}>
                      <h4 className={styles.cropsTitle}>Mos ekinlar:</h4>
                      <div className={styles.cropTags}>
                        {product.tabContent.crops.map((crop, i) => (
                          <span key={i} className={styles.cropTag}>{crop}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
                {activeTab === 'usage' && (
                  <div>
                    <h4>Qo'llanilishi:</h4>
                    <p>{product.tabContent.usage}</p>
                  </div>
                )}
                {activeTab === 'dosage' && <p>Dozasi haqida ma'lumot tez orada qo'shiladi.</p>}
                {activeTab === 'safety' && <p>Xavfsizlik bo'yicha ko'rsatmalar tez orada qo'shiladi.</p>}
                {activeTab === 'docs' && <p>Hujjatlar tez orada yuklanadi.</p>}
                {activeTab === 'reviews' && <p>{product.reviewCount} ta sharh mavjud. Sharhlar bo'limi tez orada ishga tushadi.</p>}
              </div>
              
              {/* Contact Sidebar */}
              <div className={styles.contactSidebar}>
                <div className={styles.contactCard}>
                  <h3 className={styles.contactTitle}>Mutaxassis bilan bog'lanish</h3>
                  <p className={styles.contactDesc}>
                    Mahsulot haqida savollaringiz bormi? Mutaxassislarimiz sizga yordam beradilar.
                  </p>
                  <div className={styles.contactPhone}>
                    <Phone size={20} />
                    +998 90 123 45 67
                  </div>
                  <button className={styles.telegramBtn}>
                    <Send size={16} />
                    Telegram orqali yozing
                  </button>
                  <button className={styles.whatsappBtn}>
                    <MessageCircle size={16} />
                    WhatsApp orqali yozing
                  </button>
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* Similar Products */}
      {similar.length > 0 && (
        <section className={styles.similarSection}>
          <ScrollReveal direction="up">
            <h2 className={styles.similarTitle}>
              O'xshash mahsulotlar
              <Link href={`/catalog/${categoryPath}`} style={{ fontSize: '0.875rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                Barchasini ko'rish <ArrowRight size={14} />
              </Link>
            </h2>
            <div className={styles.similarGrid}>
              {similar.map((item) => (
                <Link key={item.id} href={`/product/${item.slug}`} className={styles.similarCard}>
                  <div className={styles.similarImageWrap}>
                    <button className={styles.wishlistBtn} style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', width: '28px', height: '28px', borderRadius: '50%', background: 'white', border: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', cursor: 'pointer', zIndex: 1 }}>
                      <Heart size={14} />
                    </button>
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      width={80}
                      height={120}
                      className={styles.similarImage}
                    />
                  </div>
                  <div className={styles.similarInfo}>
                    <h3 className={styles.similarName}>{item.name}</h3>
                    <p className={styles.similarDesc}>{item.activeIngredient}</p>
                    <p className={styles.similarPrice}>{formatPrice(item.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </section>
      )}
    </div>
  );
}
