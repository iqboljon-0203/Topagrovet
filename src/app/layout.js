import '@/styles/globals.css';
import LayoutShell from '@/components/layout/LayoutShell';
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
          <LayoutShell>{children}</LayoutShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
