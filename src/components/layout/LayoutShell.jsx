'use client';

import { usePathname } from 'next/navigation';
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Footer';

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
