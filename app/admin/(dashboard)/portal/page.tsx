import { Metadata } from 'next';
import Link from 'next/link';
import { FiUsers, FiFileText, FiMail, FiCalendar } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Portal Management | Admin',
  description: 'Manage portal users and content',
};

export default function PortalManagementPage() {
  const sections = [
    {
      title: 'User Management',
      description: 'Manage portal user accounts and permissions',
      href: '/admin/portal/users',
      icon: FiUsers,
      color: 'bg-blue-500',
    },
    {
      title: 'Document Management',
      description: 'Upload and manage client documents',
      href: '/admin/portal/documents',
      icon: FiFileText,
      color: 'bg-green-500',
    },
    {
      title: 'Message Management',
      description: 'View and respond to client messages',
      href: '/admin/portal/messages',
      icon: FiMail,
      color: 'bg-purple-500',
    },
    {
      title: 'Calendar Management',
      description: 'Manage events and meetings',
      href: '/admin/portal/calendar',
      icon: FiCalendar,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Portal Management</h1>
        <p className="text-gray-600 mt-2">
          Manage portal users, documents, messages, and calendar events
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start">
              <div className={`${section.color} p-3 rounded-lg`}>
                <section.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {section.title}
                </h3>
                <p className="text-gray-600 text-sm">{section.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Portal Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <div className="text-3xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">0</div>
            <div className="text-sm text-gray-600">Documents</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">0</div>
            <div className="text-sm text-gray-600">Open Messages</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600">0</div>
            <div className="text-sm text-gray-600">Upcoming Events</div>
          </div>
        </div>
      </div>
    </div>
  );
}
