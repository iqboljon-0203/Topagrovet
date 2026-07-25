'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
  LogOut,
  LayoutDashboard,
  Package,
  Newspaper,
  Phone,
  MessageSquare,
  Sparkles,
  Layers,
  Settings,
  FolderTree,
  Info,
  Menu,
  X,
} from 'lucide-react';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
    
    // Sahifa yuklanganda xotiradan emailni o'qish
    const savedEmail = localStorage.getItem('admin_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, [pathname]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setSubmitting(true);
    
    // Eslab qolish tanlangan bo'lsa emailni xotiraga saqlaymiz
    if (rememberMe) {
      localStorage.setItem('admin_email', email);
    } else {
      localStorage.removeItem('admin_email');
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setAuthError(error.message);
    setSubmitting(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  /* ---- Loading state ---- */
  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingSpinner} />
      </div>
    );
  }

  /* ---- Login screen ---- */
  if (!session) {
    return (
      <div className={styles.loginPage}>
        {/* Left decorative panel */}
        <div className={styles.loginLeft}>
          <div className={styles.leaf + ' ' + styles.leaf1} />
          <div className={styles.leaf + ' ' + styles.leaf2} />
          <div className={styles.leaf + ' ' + styles.leaf3} />

          <div className={styles.loginLeftContent}>
            <div className={styles.loginLogo}>
              <Image
                src="/logo.png"
                alt="Top Agro Vet"
                width={240}
                height={70}
                className={styles.loginLogoImg}
                priority
                unoptimized
              />
            </div>
            <h1 className={styles.loginLeftTitle}>
              Boshqaruv paneli
            </h1>
            <p className={styles.loginLeftDesc}>
              Mahsulotlar, buyurtmalar va sayt kontentini boshqarish uchun admin paneliga kiring.
            </p>
          </div>
        </div>

        {/* Right form panel */}
        <div className={styles.loginRight}>
          <div className={styles.loginFormWrapper}>
            <div className={styles.loginFormHeader}>
              <div className={styles.loginFormIcon}>
                <Shield size={26} />
              </div>
              <h2 className={styles.loginFormTitle}>Admin paneliga kirish</h2>
              <p className={styles.loginFormSubtitle}>
                Davom etish uchun hisobingizga kiring
              </p>
            </div>

            {authError && (
              <div className={styles.loginError}>
                <span className={styles.loginErrorIcon}>
                  <AlertCircle size={16} />
                </span>
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className={styles.loginForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email manzil</label>
                <div className={styles.formInputWrapper}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.formInput}
                    placeholder="admin@topagrovet.uz"
                    required
                    autoComplete="email"
                  />
                  <span className={styles.formInputIcon}>
                    <Mail size={18} />
                  </span>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Parol</label>
                <div className={styles.formInputWrapper}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.formInput}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <span className={styles.formInputIcon}>
                    <Lock size={18} />
                  </span>
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Parolni yashirish' : 'Parolni ko\'rsatish'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '-5px', marginBottom: '20px' }}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: '#0ea5e9' }}
                />
                <label htmlFor="rememberMe" style={{ fontSize: '14px', color: '#475569', cursor: 'pointer', userSelect: 'none' }}>
                  Ma'lumotlarimni eslab qolish
                </label>
              </div>

              <button
                type="submit"
                className={styles.loginBtn}
                disabled={submitting}
              >
                {submitting ? (
                  <span className={styles.spinner} />
                ) : (
                  'Kirish'
                )}
              </button>
            </form>

            <Link href="/" className={styles.backLink}>
              <ArrowLeft size={14} />
              Bosh sahifaga qaytish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ---- Authenticated dashboard shell ---- */
  return (
    <div className={styles.adminShell}>
      {/* Mobile Topbar */}
      <div className={styles.mobileTopbar}>
        <div className={styles.sidebarBrand}>
          <span className={styles.sidebarBrandName}>Admin Panel</span>
        </div>
        <button 
          className={styles.mobileMenuBtn} 
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay for mobile sidebar */}
      {mobileMenuOpen && (
        <div className={styles.sidebarOverlay} onClick={() => setMobileMenuOpen(false)} />
      )}

      <aside className={`${styles.sidebar} ${mobileMenuOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarTitle}>
            <span className={styles.sidebarTitleDot} />
            <div className={styles.sidebarBrand}>
              <span className={styles.sidebarBrandName}>Admin Panel</span>
              <span className={styles.sidebarBrandSub}>Top Agro Vet</span>
            </div>
          </div>
          <button 
            className={styles.mobileCloseBtn}
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          <Link
            href="/admin"
            className={`${styles.sidebarLink} ${pathname === '/admin' ? styles.sidebarLinkActive : ''}`}
          >
            <span className={styles.sidebarLinkIcon}>
              <LayoutDashboard size={16} />
            </span>
            Dashboard
          </Link>
          <Link
            href="/admin/hero"
            className={`${styles.sidebarLink} ${pathname.startsWith('/admin/hero') ? styles.sidebarLinkActive : ''}`}
          >
            <span className={styles.sidebarLinkIcon}>
              <Sparkles size={16} />
            </span>
            Hero bo&apos;limi
          </Link>
          <Link
            href="/admin/about"
            className={`${styles.sidebarLink} ${pathname.startsWith('/admin/about') ? styles.sidebarLinkActive : ''}`}
          >
            <span className={styles.sidebarLinkIcon}>
              <Info size={16} />
            </span>
            Biz haqimizda
          </Link>
          <Link
            href="/admin/categories"
            className={`${styles.sidebarLink} ${pathname.startsWith('/admin/categories') ? styles.sidebarLinkActive : ''}`}
          >
            <span className={styles.sidebarLinkIcon}>
              <Layers size={16} />
            </span>
            Kategoriyalar
          </Link>
          <Link
            href="/admin/catalog"
            className={`${styles.sidebarLink} ${pathname === '/admin/catalog' ? styles.sidebarLinkActive : ''}`}
          >
            <span className={styles.sidebarLinkIcon}>
              <FolderTree size={16} />
            </span>
            Kataloglar
          </Link>
          <Link
            href="/admin/products"
            className={`${styles.sidebarLink} ${pathname.startsWith('/admin/products') ? styles.sidebarLinkActive : ''}`}
          >
            <span className={styles.sidebarLinkIcon}>
              <Package size={16} />
            </span>
            Mahsulotlar
          </Link>
          <Link
            href="/admin/news"
            className={`${styles.sidebarLink} ${pathname.startsWith('/admin/news') ? styles.sidebarLinkActive : ''}`}
          >
            <span className={styles.sidebarLinkIcon}>
              <Newspaper size={16} />
            </span>
            Yangiliklar
          </Link>
          <Link
            href="/admin/contact"
            className={`${styles.sidebarLink} ${pathname.startsWith('/admin/contact') ? styles.sidebarLinkActive : ''}`}
          >
            <span className={styles.sidebarLinkIcon}>
              <Phone size={16} />
            </span>
            Aloqa
          </Link>
          <Link
            href="/admin/messages"
            className={`${styles.sidebarLink} ${pathname.startsWith('/admin/messages') ? styles.sidebarLinkActive : ''}`}
          >
            <span className={styles.sidebarLinkIcon}>
              <MessageSquare size={16} />
            </span>
            Xabarlar
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.sidebarUserCard}>
            <div className={styles.sidebarUserAvatar}>A</div>
            <div className={styles.sidebarUserInfo}>
              <div className={styles.sidebarUserName}>Admin</div>
              <div className={styles.sidebarUserRole}>Super Admin</div>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={15} />
            Chiqish
          </button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.mainContentInner}>
          {children}
        </div>
      </main>
    </div>
  );
}

