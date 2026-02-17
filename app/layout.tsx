import { Playfair_Display, Inter, Noto_Sans_SC, Noto_Sans_JP } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { headers } from 'next/headers';
import './globals.css';

// Primary fonts - Montfort-inspired elegant typography
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

// CJK fonts for Chinese and Japanese
const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-noto-sc',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-jp',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
});

// Extract locale from URL for setting lang attribute
function getLocaleFromHeaders(): string {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || headersList.get('referer') || '';

  // Extract locale from pathname (format: /en/page or /de/page)
  const localeMatch = pathname.match(/\/(en|de|bs|zh|ja|fr|it)(\/|$)/);

  // Default to 'en' for admin routes and non-localized paths
  return localeMatch ? localeMatch[1] : 'en';
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getLocaleFromHeaders();

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${inter.variable} ${notoSansSC.variable} ${notoSansJP.variable}`}
      suppressHydrationWarning
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
