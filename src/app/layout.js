import '@/styles/globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata = {
  metadataBase: new URL('https://topagrovet.uz'),
  title: {
    default: 'Top Agro Vet — Veterinariya va agro preparatlar',
    template: '%s | Top Agro Vet',
  },
  description: "O'zbekistonda veterinariya va agro preparatlarning ishonchli yetkazib beruvchisi. 1000+ dan ortiq sifatli mahsulotlar, sertifikatlangan brendlar va mutaxassis maslahatlar.",
  keywords: [
    'veterinariya', 
    'agro preparatlar', 
    'insektisid', 
    'fungisid', 
    'antibiotik', 
    'ozbekiston', 
    'toshkent',
    "qishloq xo'jaligi", 
    'chorvachilik',
    'parrandachilik',
    'fermerlarga',
    'top agro vet',
    'topagrovet'
  ],
  authors: [{ name: 'Top Agro Vet' }],
  creator: 'Top Agro Vet',
  publisher: 'Top Agro Vet',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'uz-UZ': '/',
    },
  },
  openGraph: {
    title: 'Top Agro Vet — Veterinariya va agro preparatlar',
    description: "O'zbekistonda eng keng veterinariya va agro preparatlar assortimenti. Ishonchli hamkoringiz.",
    url: 'https://topagrovet.uz',
    siteName: 'Top Agro Vet',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Top Agro Vet - Veterinariya va agro preparatlar',
      },
    ],
    locale: 'uz_UZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Agro Vet — Veterinariya',
    description: "Veterinariya va agro preparatlarning ishonchli yetkazib beruvchisi.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
