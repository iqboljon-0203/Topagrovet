'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Search, ChevronDown, X, Menu } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Header.module.css';

function LogoImage({ width = 260, height = 75 }) {
  return (
    <Image
      src="/logo.png"
      alt="Top Agro Vet logo"
      width={width}
      height={height}
      className={styles.logoImg}
      priority
      unoptimized
    />
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { label: t('header.home'), href: '/' },
    { label: t('header.about'), href: '/about' },
    { label: t('header.news'), href: '/news' },
    { label: t('header.contact'), href: '/contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerTop}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <LogoImage width={230} height={65} />
          </Link>

          <div className={styles.searchBar}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder={t('header.search_placeholder')}
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
            />
            <button className={styles.searchBtn} aria-label="Qidirish">
              <Search size={15} />
            </button>
          </div>

          <div className={styles.phoneBlock}>
            <div className={styles.phoneIconWrap}>
              <Phone size={19} />
            </div>
            <div>
              <div className={styles.phoneNumber}>+998 90 123 45 67</div>
              <div className={styles.phoneHours}>Har kuni 08:00 - 18:00</div>
            </div>
          </div>

          <button className={styles.hamburger} onClick={() => setMobileOpen(true)} aria-label="Menyu">
            <Menu size={22} />
          </button>
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.container}>
          <Link
            href="/catalog"
            className={`${styles.navLink} ${pathname.startsWith('/catalog') ? styles.active : ''}`}
          >
            {t('header.catalog')}
            <ChevronDown size={13} className={styles.chevron} />
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)}>
          <div className={styles.mobilePanel} onClick={e => e.stopPropagation()}>
            <div className={styles.mobilePanelHeader}>
              <Link href="/" className={styles.logo}>
                <LogoImage width={160} height={45} />
              </Link>
              <button onClick={() => setMobileOpen(false)} className={styles.mobileClose}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.mobileSearch}>
              <input type="text" placeholder={t('header.search_placeholder')} className={styles.searchInput} style={{width:'100%'}} />
            </div>
            <nav className={styles.mobileLinks}>
              <Link
                href="/catalog"
                className={`${styles.mobileLink} ${pathname.startsWith('/catalog') ? styles.mobileLinkActive : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {t('header.catalog')}
              </Link>
              {navItems.map(item => (
                <Link key={item.label} href={item.href}
                  className={`${styles.mobileLink} ${pathname === item.href ? styles.mobileLinkActive : ''}`}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className={styles.mobileFoot}>
              <div className={styles.phoneBlock}>
                <div className={styles.phoneIconWrap}><Phone size={17} /></div>
                <div>
                  <div className={styles.phoneNumber}>+998 90 123 45 67</div>
                  <div className={styles.phoneHours}>Har kuni 08:00 - 18:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
