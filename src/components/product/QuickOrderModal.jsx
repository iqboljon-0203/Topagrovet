'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './QuickOrderModal.module.css';

export default function QuickOrderModal({ product, onClose }) {
  const { language } = useLanguage();
  const isRu = language === 'ru';
  const val = (uzStr, ruStr) => isRu && ruStr ? ruStr : uzStr;
  
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return alert(isRu ? 'Заполните все поля' : 'Barcha maydonlarni to\'ldiring');
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quick_order',
          name: formData.name,
          phone: formData.phone,
          productName: val(product.name, product.name_ru),
          productId: product.id
        })
      });
      if (res.ok) {
        alert(isRu ? 'Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.' : 'Buyurtma qabul qilindi! Tez orada siz bilan bog\'lanamiz.');
        onClose();
      } else {
        alert(isRu ? 'Произошла ошибка. Попробуйте еще раз.' : 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
      }
    } catch (err) {
      console.error(err);
      alert(isRu ? 'Произошла ошибка. Попробуйте еще раз.' : 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={24} />
        </button>
        <h2 className={styles.title}>{isRu ? 'Быстрый заказ' : 'Tez buyurtma'}</h2>
        <p className={styles.subtitle}>
          {val(product.name, product.name_ru)}
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder={isRu ? 'Ваше имя' : 'Ismingiz'}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={styles.input}
            required
          />
          <input
            type="tel"
            placeholder="+998 __ ___ __ __"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? (isRu ? 'Отправка...' : 'Yuborilmoqda...') : (isRu ? 'Оформить заказ' : 'Buyurtma berish')}
          </button>
        </form>
      </div>
    </div>
  );
}
