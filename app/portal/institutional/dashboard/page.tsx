import { Metadata } from 'next';
import { getCurrentUser } from '@/lib/auth/portal-auth';
import InstitutionalDashboard from '@/components/portal/institutional/InstitutionalDashboard';

export const metadata: Metadata = {
  title: 'Dashboard | Institutional Portal',
  description: 'Your partnership dashboard',
};

export default async function InstitutionalDashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user?.name || 'Partner'}
        </h1>
        <p className="text-gray-600 mt-1">
          Your partnership overview and updates
        </p>
      </div>

      <InstitutionalDashboard userId={user?.userId} />
    </div>
  );
}
