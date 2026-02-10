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
    keywords: 'investment advisory, corporate advisory, capital raising, asset management, Vert Capital, Perth, Western Australia, financial services, boutique investment',
    metadataBase: new URL('https://vertcapital.com.au'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'de': '/de',
        'bs': '/bs',
        'zh': '/zh',
        'ja': '/ja',
        'fr': '/fr',
        'it': '/it',
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

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <SessionProvider>
        <ConditionalLayout>{children}</ConditionalLayout>
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
