'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ChevronRight, Star, CheckCircle2, ShoppingCart, Zap, Download, Phone, Send, MessageCircle, Heart, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/3d/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { formatPrice, getSubcategoryBadgeClass } from '@/lib/utils';
import QuickOrderModal from '@/components/product/QuickOrderModal';
import styles from './product.module.css';

const getTabs = (isRu) => [
  { id: 'description', label: isRu ? 'Описание' : 'Tavsif' },
  { id: 'usage', label: isRu ? 'Применение' : "Qo'llanilishi" },
  { id: 'dosage', label: isRu ? 'Дозировка' : 'Dozasi' },
  { id: 'safety', label: isRu ? 'Безопасность' : 'Xavfsizlik' },
  { id: 'docs', label: isRu ? 'Документы' : 'Hujjatlar' },
  { id: 'reviews', label: isRu ? 'Отзывы' : 'Sharhlar' },
];

export default function ProductClient({ initialProduct, initialSimilar }) {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const isRu = language === 'ru';
  const val = (uzStr, ruStr) => isRu && ruStr ? ruStr : uzStr;
  const tabs = getTabs(isRu);
  
  const product = initialProduct;
  const similar = initialSimilar || [];
  
  const [activeTab, setActiveTab] = useState('description');
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false);
  const [selectedVolume, setSelectedVolume] = useState(
    product?.volumes?.length > 0 ? (product.selectedVolume || product.volumes[0]) : ''
  );

  if (!product) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>{isRu ? 'Товар не найден' : 'Mahsulot topilmadi'}</h2>
        <Link href="/" style={{ color: 'var(--color-primary)', marginTop: '1rem', display: 'inline-block' }}>
          {isRu ? 'Вернуться на главную' : 'Bosh sahifaga qaytish'}
        </Link>
      </div>
    );
  }

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
        <Link href="/">{t('header.home')}</Link>
        <ChevronRight size={14} className={styles.breadcrumbSep} />
        <Link href={`/catalog/${categoryPath}`}>{product.categoryLabel}</Link>
        <ChevronRight size={14} className={styles.breadcrumbSep} />
        <Link href={`/catalog/${categoryPath}`}>{product.subcategoryLabel}</Link>
        <ChevronRight size={14} className={styles.breadcrumbSep} />
        <span className={styles.breadcrumbCurrent}>{val(product.name, product.name_ru)}</span>
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

              <h1 className={styles.infoTitle}>{val(product.name, product.name_ru)}</h1>
              <p className={styles.infoIngredient}>{val(product.activeIngredient, product.activeIngredient_ru)}</p>

              <div className={styles.ratingRow}>
                <div className={styles.ratingStars}>
                  <span className={styles.ratingValue}>{product.rating}</span>
                  {renderStars(product.rating)}
                  <span className={styles.ratingCount}>({product.reviewCount} {isRu ? 'отзывов' : 'ta sharh'})</span>
                </div>
                <span className={styles.regNumber}>{isRu ? 'Рег. номер: ' : 'Reg raqam: '}{product.regNumber || '-'}</span>
              </div>

              <div className={styles.priceBlock}>
                <span className={styles.price}>{formatPrice(product.price)}</span>
                <span className={styles.stockBadge}>
                  <CheckCircle2 size={16} />
                  {isRu ? 'В наличии' : 'Mavjud'}
                </span>
              </div>

              {/* Volume Selector */}
              {product.volumes.length > 1 && (
                <div className={styles.volumeSection}>
                  <div className={styles.volumeLabel}>{isRu ? 'Упаковка:' : 'Qadoqlash:'}</div>
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
                <button 
                  className={styles.addToCartBtn}
                  onClick={() => addToCart(product, 1, selectedVolume)}
                >
                  <ShoppingCart size={18} />
                  {t('product.add_to_cart')}
                </button>
                <button 
                  className={styles.quickOrderBtn}
                  onClick={() => setIsQuickOrderOpen(true)}
                >
                  <Zap size={18} />
                  {t('product.quick_order')}
                </button>
              </div>

              {/* Specifications */}
              <table className={styles.specsTable}>
                <tbody>
                  {Object.entries((isRu && Object.keys(product.specifications_ru || {}).length > 0) ? product.specifications_ru : (product.specifications || {}))
                    .filter(([_, value]) => value)
                    .map(([key, value]) => (
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
                {activeTab === 'description' && (() => {
                  const content = isRu && (product.tabContent_ru?.description || product.description_ru) 
                                  ? (product.tabContent_ru?.description || product.description_ru) 
                                  : (product.tabContent?.description || product.description || '');
                  const crops = isRu && product.tabContent_ru?.crops?.length > 0 
                                ? product.tabContent_ru.crops 
                                : (product.tabContent?.crops || []);
                  return (
                    <div className={styles.descContent}>
                      <p>{content.split('\n\n•')[0]}</p>
                      {content.includes('•') && (
                        <ul className={styles.benefitsList}>
                          {content
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
                      {crops.length > 0 && (
                        <div className={styles.cropsSection}>
                          <h4 className={styles.cropsTitle}>{isRu ? 'Подходящие культуры:' : 'Mos ekinlar:'}</h4>
                          <div className={styles.cropTags}>
                            {crops.map((crop, i) => (
                              <span key={i} className={styles.cropTag}>{crop}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
                {activeTab === 'usage' && (
                  <div>
                    <h4>{isRu ? 'Применение:' : 'Qo\'llanilishi:'}</h4>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{(isRu && product.tabContent_ru?.usage ? product.tabContent_ru.usage : product.tabContent?.usage) || (isRu ? "Нет информации о применении." : "Ushbu mahsulot uchun qo'llanilish ma'lumoti kiritilmagan.")}</p>
                  </div>
                )}
                {activeTab === 'dosage' && (
                  <div>
                    <h4>{isRu ? 'Дозировка:' : 'Dozasi:'}</h4>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{(isRu && product.tabContent_ru?.dosage ? product.tabContent_ru.dosage : product.tabContent?.dosage) || (isRu ? "Нет информации о дозировке." : "Dozasi haqida ma'lumot kiritilmagan.")}</p>
                  </div>
                )}
                {activeTab === 'safety' && (
                  <div>
                    <h4>{isRu ? 'Безопасность:' : 'Xavfsizlik:'}</h4>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{(isRu && product.tabContent_ru?.safety ? product.tabContent_ru.safety : product.tabContent?.safety) || (isRu ? "Нет инструкций по безопасности." : "Xavfsizlik bo'yicha ko'rsatmalar kiritilmagan.")}</p>
                  </div>
                )}
                {activeTab === 'docs' && <p>{isRu ? 'Документы скоро будут загружены.' : 'Hujjatlar tez orada yuklanadi.'}</p>}
                {activeTab === 'reviews' && <p>{product.reviewCount || 0} {isRu ? 'отзывов. Раздел отзывов скоро появится.' : 'ta sharh mavjud. Sharhlar bo\'limi tez orada ishga tushadi.'}</p>}
              </div>
              
              {/* Contact Sidebar */}
              <div className={styles.contactSidebar}>
                <div className={styles.contactCard}>
                  <h3 className={styles.contactTitle}>{isRu ? 'Связаться со специалистом' : 'Mutaxassis bilan bog\'lanish'}</h3>
                  <p className={styles.contactDesc} style={{ marginBottom: '1rem' }}>
                    <strong>{isRu ? 'Асатуллаев Музафархон' : 'Asatullaev Muzaffarxon'}</strong><br/>
                    {isRu ? 'Ответит на ваши вопросы и поможет с выбором.' : 'Savollaringizga javob beradilar va tanlashda yordam beradilar.'}
                  </p>
                  <a href="tel:+998997868000" className={styles.contactPhone} style={{ textDecoration: 'none' }}>
                    <Phone size={20} />
                    +998 99 786 80 00
                  </a>
                  <a href="https://t.me/Muzaffarxon098" target="_blank" rel="noopener noreferrer" className={styles.telegramBtn} style={{ textDecoration: 'none' }}>
                    <Send size={16} />
                    {isRu ? 'Написать в Telegram' : 'Telegram orqali yozish'}
                  </a>
                </div>
              </div>
            </div>
          </div>
      </div>

      {isQuickOrderOpen && (
        <QuickOrderModal product={product} volume={selectedVolume} onClose={() => setIsQuickOrderOpen(false)} />
      )}

      {/* Similar Products */}
      {similar.length > 0 && (
        <section className={styles.similarSection}>
          <ScrollReveal direction="up">
            <h2 className={styles.similarTitle}>
              {t('product.similar_products')}
              <Link href={`/catalog/${categoryPath}`} style={{ fontSize: '0.875rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                {isRu ? 'Смотреть все' : 'Barchasini ko\'rish'} <ArrowRight size={14} />
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
                    <h3 className={styles.similarName}>{val(item.name, item.name_ru)}</h3>
                    <p className={styles.similarDesc}>{val(item.activeIngredient, item.activeIngredient_ru)}</p>
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
