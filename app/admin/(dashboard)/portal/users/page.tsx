import { Metadata } from 'next';
import Link from 'next/link';
import PortalUsersTable from '@/components/admin/PortalUsersTable';

export const metadata: Metadata = {
  title: 'Portal Users | Admin',
  description: 'Manage portal user accounts',
};

export default function PortalUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portal Users</h1>
          <p className="text-gray-600 mt-2">
            Manage shareholder and institutional client accounts
          </p>
        </div>
        <Link
          href="/admin/portal/users/invite"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Invite New User
        </Link>
      </div>

      <PortalUsersTable />
    </div>
  );
}
