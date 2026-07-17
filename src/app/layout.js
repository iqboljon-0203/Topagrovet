import '@/styles/globals.css';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata = {
  title: 'Top Agro Vet — Veterinariya va agro preparatlar',
  description: "O'zbekistonda veterinariya va agro preparatlarning ishonchli yetkazib beruvchisi. 1000+ dan ortiq sifatli mahsulotlar, sertifikatlangan brendlar va mutaxassis maslahatlar.",
  keywords: 'veterinariya, agro preparatlar, insektisid, fungisid, antibiotik, Uzbekistan, fermerlarga',
  openGraph: {
    title: 'Top Agro Vet — Veterinariya va agro preparatlar',
    description: "O'zbekistonda eng keng veterinariya va agro preparatlar assortimenti",
    type: 'website',
    locale: 'uz_UZ',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>
        <LanguageProvider>
          <TopBar />
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
