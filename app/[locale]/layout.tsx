import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import SessionProvider from '@/components/providers/SessionProvider';
import ConditionalLayout from '@/components/layout/ConditionalLayout';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata.homepage' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: 'investment advisory, corporate advisory, capital raising, asset management, Vert Capital, Perth, Western Australia, financial services, boutique investment, ASX',
    metadataBase: new URL('https://vertcapital.com.au'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'fr': '/fr',
        'zh': '/zh',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://vertcapital.com.au/${locale}`,
      siteName: 'Vert Capital',
      locale: locale,
      type: 'website',
      images: [
        {
          url: '/images/vert_logo.png',
          width: 400,
          height: 400,
          alt: 'Vert Capital',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Vert Capital Pty Ltd',
    description: 'Boutique investment and corporate advisory firm specialising in corporate advisory, capital raising, and asset management.',
    url: 'https://vertcapital.com.au',
    telephone: '+61 8 9481 0389',
    email: 'info@vertcapital.com.au',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Subiaco',
      addressRegion: 'WA',
      postalCode: '6008',
      addressCountry: 'AU',
    },
    areaServed: 'Australia',
    sameAs: [
      'https://au.linkedin.com/company/vert-capital-australia',
    ],
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <SessionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ConditionalLayout>{children}</ConditionalLayout>
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
