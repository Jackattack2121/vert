import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth/portal-auth';
import PortalLayout from '@/components/portal/PortalLayout';

export default async function InstitutionalPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authorized, redirect: redirectUrl } = await requireAuth('institutional');

  if (!authorized && redirectUrl) {
    redirect(redirectUrl);
  }

  return (
    <PortalLayout portalType="institutional">
      {children}
    </PortalLayout>
  );
}
