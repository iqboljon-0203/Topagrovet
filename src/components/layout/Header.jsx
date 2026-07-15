'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Search, ChevronDown, Globe, X, Leaf } from 'lucide-react';
import styles from './Header.module.css';

const navItems = [
  { label: 'Bosh sahifa', href: '/' },
  { label: 'Veterinariya', href: '/catalog/veterinariya', hasDropdown: true },
  { label: 'Agro preparatlar', href: '/catalog/agro-preparatlar', hasDropdown: true },
  { label: 'Mahsulotlar', href: '/catalog/barchasi' },
  { label: 'Yangiliklar', href: '#' },
  { label: 'Biz haqimizda', href: '#' },
  { label: 'Aloqa', href: '#' },
];

export default function Header({ showSearch = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerTop}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Leaf size={24} />
          </div>
          <div className={styles.logoText}>
            <h1>TOP AGRO VET</h1>
            <p>Sifatli mahsulotlar – ishonchli natija!</p>
          </div>
        </Link>

        <div className={`${styles.searchBar} ${showSearch ? styles.visible : ''}`}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Mahsulot yoki kategoriya qidiring..."
          />
          <button className={styles.searchBtn}>
            <Search size={18} />
          </button>
        </div>

        <div className={styles.phoneBlock}>
          <div className={styles.phoneIcon}>
            <Phone size={18} />
          </div>
          <div>
            <div className={styles.phoneNumber}>+998 90 123 45 67</div>
            <div className={styles.phoneHours}>Har kuni 08:00 - 18:00</div>
          </div>
        </div>

        <button className={styles.langSelector}>
          <Globe size={14} />
          UZ
          <ChevronDown size={12} />
        </button>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(true)}
          aria-label="Menyu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navInner}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
            >
              {item.label}
              {item.hasDropdown && <ChevronDown size={14} />}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`${styles.mobileNav} ${mobileOpen ? styles.open : ''}`}>
        <button className={styles.mobileNavClose} onClick={() => setMobileOpen(false)}>
          <X size={24} />
        </button>
        <Link href="/" className={styles.logo} style={{ marginBottom: '1rem' }}>
          <div className={styles.logoIcon}>
            <Leaf size={24} />
          </div>
          <div className={styles.logoText}>
            <h1>TOP AGRO VET</h1>
            <p>Sifatli mahsulotlar – ishonchli natija!</p>
          </div>
        </Link>
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} className={styles.mobileNavLink}>
            {item.label}
          </Link>
        ))}
        <div style={{ marginTop: 'auto', padding: '1rem 0', borderTop: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Phone size={18} color="var(--color-primary)" />
            <div>
              <div style={{ fontWeight: 700 }}>+998 90 123 45 67</div>
              <div style={{ fontSize: '12px', color: '#999' }}>Har kuni 08:00 - 18:00</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
