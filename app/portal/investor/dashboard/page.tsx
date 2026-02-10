import { Metadata } from 'next';
import { getCurrentUser } from '@/lib/auth/portal-auth';
import ShareholderDashboard from '@/components/portal/shareholder/ShareholderDashboard';

export const metadata: Metadata = {
  title: 'Dashboard | Investor Portal',
  description: 'Your investment dashboard',
};

export default async function InvestorDashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(' ')[0] || 'Investor'}
        </h1>
        <p className="text-gray-600 mt-1">
          View your portfolio and stay updated with the latest information
        </p>
      </div>

      <ShareholderDashboard userId={user?.userId} />
    </div>
  );
}
