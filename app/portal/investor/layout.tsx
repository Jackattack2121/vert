import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth/portal-auth';
import PortalLayout from '@/components/portal/PortalLayout';

export default async function InvestorPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authorized, redirect: redirectUrl } = await requireAuth('shareholder');

  if (!authorized && redirectUrl) {
    redirect(redirectUrl);
  }

  return (
    <PortalLayout portalType="investor">
      {children}
    </PortalLayout>
  );
}
