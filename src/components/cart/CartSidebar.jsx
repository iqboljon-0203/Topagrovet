'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice } from '@/lib/utils';
import styles from './CartSidebar.module.css';

export default function CartSidebar() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { language } = useLanguage();
  const isRu = language === 'ru';
  
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const val = (uzStr, ruStr) => isRu && ruStr ? ruStr : uzStr;

  if (!isCartOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return alert(isRu ? 'Заполните все поля' : 'Barcha maydonlarni to\'ldiring');
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'cart',
          name: formData.name,
          phone: formData.phone,
          items: cartItems,
          total: cartTotal
        })
      });
      if (res.ok) {
        alert(isRu ? 'Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.' : 'Buyurtma qabul qilindi! Tez orada siz bilan bog\'lanamiz.');
        clearCart();
        setIsCartOpen(false);
        setFormData({ name: '', phone: '' });
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
    <div className={styles.overlay} onClick={() => setIsCartOpen(false)}>
      <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{isRu ? 'Корзина' : 'Savatcha'}</h2>
          <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <ShoppingBag size={48} className={styles.emptyIcon} />
            <p>{isRu ? 'Ваша корзина пуста' : 'Savatchangiz bo\'sh'}</p>
            <button className={styles.continueBtn} onClick={() => setIsCartOpen(false)}>
              {isRu ? 'Продолжить покупки' : 'Xaridni davom ettirish'}
            </button>
          </div>
        ) : (
          <div className={styles.cartContent}>
            <div className={styles.itemsList}>
              {cartItems.map((item, idx) => (
                <div key={`${item.id}-${item.volume || idx}`} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <Image src={item.images[0]} alt={item.name} width={60} height={60} style={{ objectFit: 'contain' }} />
                  </div>
                  <div className={styles.itemInfo}>
                    <h4 className={styles.itemName}>{val(item.name, item.name_ru)}</h4>
                    {item.volume && <span className={styles.itemVolume}>{item.volume}</span>}
                    <div className={styles.itemPrice}>{formatPrice(item.price)}</div>
                    
                    <div className={styles.quantityControls}>
                      <button onClick={() => updateQuantity(item.id, item.volume, item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.volume, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button className={styles.removeBtn} onClick={() => removeFromCart(item.id, item.volume)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.checkoutSection}>
              <div className={styles.totalRow}>
                <span>{isRu ? 'Итого:' : 'Jami:'}</span>
                <span className={styles.totalPrice}>{formatPrice(cartTotal)}</span>
              </div>
              
              <form onSubmit={handleSubmit} className={styles.checkoutForm}>
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
        )}
      </div>
    </div>
  );
}
