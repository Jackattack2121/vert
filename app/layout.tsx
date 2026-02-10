import { Montserrat, Josefin_Sans, Merriweather, Noto_Sans_SC, Noto_Sans_JP } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { headers } from 'next/headers';
import './globals.css';

// Latin fonts
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin',
  display: 'swap',
  weight: ['100', '300', '400', '600', '700'],
});

const merriweather = Merriweather({
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
  weight: ['300', '400', '700', '900'],
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
      className={`${montserrat.variable} ${josefin.variable} ${merriweather.variable} ${notoSansSC.variable} ${notoSansJP.variable}`}
      suppressHydrationWarning
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
