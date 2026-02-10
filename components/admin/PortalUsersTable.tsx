'use client';

import { useState, useEffect } from 'react';
import { FiMail, FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

interface PortalUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'shareholder' | 'institutional';
  status: 'active' | 'pending' | 'suspended';
  last_login: string | null;
  created_at: string;
}

export default function PortalUsersTable() {
  const [users, setUsers] = useState<PortalUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'shareholder' | 'institutional'>('all');

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const fetchUsers = async () => {
    try {
      // TODO: Fetch from API
      // const response = await fetch(`/api/admin/portal/users?role=${filter !== 'all' ? filter : ''}`);
      // const data = await response.json();
      
      // Mock data
      const mockUsers: PortalUser[] = [
        {
          id: '1',
          email: 'john.investor@example.com',
          first_name: 'John',
          last_name: 'Investor',
          role: 'shareholder',
          status: 'active',
          last_login: '2024-02-09T10:30:00Z',
          created_at: '2024-01-15T08:00:00Z',
        },
        {
          id: '2',
          email: 'sarah.partner@company.com',
          first_name: 'Sarah',
          last_name: 'Partner',
          role: 'institutional',
          status: 'active',
          last_login: '2024-02-08T14:20:00Z',
          created_at: '2024-01-10T12:00:00Z',
        },
      ];
      
      setUsers(mockUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: PortalUser['status']) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800',
    };
    return styles[status] || styles.active;
  };

  const getRoleBadge = (role: PortalUser['role']) => {
    const styles = {
      shareholder: 'bg-blue-100 text-blue-800',
      institutional: 'bg-purple-100 text-purple-800',
    };
    return styles[role];
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Filter Tabs */}
      <div className="border-b">
        <div className="flex space-x-4 px-6 py-3">
          {(['all', 'shareholder', 'institutional'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 font-medium transition-colors ${
                filter === tab
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.first_name} {user.last_name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.last_login 
                      ? new Date(user.last_login).toLocaleDateString()
                      : 'Never'
                    }
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-700">
                        <FiMail className="w-4 h-4" title="Send magic link" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-gray-700">
                        <FiEdit className="w-4 h-4" title="Edit user" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-700">
                        <FiTrash2 className="w-4 h-4" title="Delete user" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
