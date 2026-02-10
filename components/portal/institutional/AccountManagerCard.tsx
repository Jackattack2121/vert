'use client';

import { FiMail, FiPhone, FiCalendar, FiUser } from 'react-icons/fi';

interface AccountManager {
  name: string;
  title: string;
  email: string;
  phone: string;
  avatar?: string;
}

export default function AccountManagerCard() {
  // TODO: Fetch account manager from user data
  const manager: AccountManager = {
    name: 'Sarah Johnson',
    title: 'Senior Relationship Manager',
    email: 's.johnson@vertcapital.com.au',
    phone: '+61 2 9876 5432',
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-900">Your Account Manager</h3>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <FiUser className="w-8 h-8 text-primary-600" />
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-gray-900">{manager.name}</h4>
            <p className="text-sm text-gray-600">{manager.title}</p>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href={`mailto:${manager.email}`}
            className="flex items-center text-sm text-gray-700 hover:text-primary-600 transition-colors"
          >
            <FiMail className="w-4 h-4 mr-3 text-gray-400" />
            <span className="flex-1">{manager.email}</span>
          </a>

          <a
            href={`tel:${manager.phone}`}
            className="flex items-center text-sm text-gray-700 hover:text-primary-600 transition-colors"
          >
            <FiPhone className="w-4 h-4 mr-3 text-gray-400" />
            <span className="flex-1">{manager.phone}</span>
          </a>
        </div>

        <div className="mt-6 space-y-2">
          <button className="w-full px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center">
            <FiCalendar className="w-4 h-4 mr-2" />
            Schedule Meeting
          </button>
          <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
            <FiMail className="w-4 h-4 mr-2" />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
