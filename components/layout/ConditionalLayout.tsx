'use client';

import { usePathname } from '@/i18n/navigation';
import HeaderWrapper from './HeaderWrapper';
import Footer from './Footer';
import SubscribeModal from '@/components/newsletter/SubscribeModal';
import CoryWidget from '@/components/cory/CoryWidget';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if we're in the admin area
  const isAdminRoute = pathname?.startsWith('/admin');

  // For admin routes, render children without Header/Footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // For public routes, render with Header/Footer
  return (
    <>
      <HeaderWrapper />
      <main>{children}</main>
      <Footer />
      <SubscribeModal />
      <CoryWidget />
    </>
  );
}

