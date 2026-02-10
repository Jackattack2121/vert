import { Metadata } from 'next';
import AdminMessagesTable from '@/components/admin/AdminMessagesTable';

export const metadata: Metadata = {
  title: 'Portal Messages | Admin',
  description: 'View and respond to client messages',
};

export default function AdminMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Portal Messages</h1>
        <p className="text-gray-600 mt-2">
          View and respond to messages from portal users
        </p>
      </div>

      <AdminMessagesTable />
    </div>
  );
}
