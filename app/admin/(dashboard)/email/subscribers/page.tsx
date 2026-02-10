import { Plus, Search, Download, Upload, UserCheck, UserX, Ban } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Mock data - in production this would fetch from Listmonk API
const mockSubscribers = [
  {
    id: 1,
    email: 'john.investor@example.com',
    name: 'John Investor',
    status: 'enabled' as const,
    lists: ['ASX Announcements', 'Investor Updates'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: 2,
    email: 'sarah.analyst@example.com',
    name: 'Sarah Analyst',
    status: 'enabled' as const,
    lists: ['Quarterly Reports', 'Investor Updates'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
  },
  {
    id: 3,
    email: 'michael.trader@example.com',
    name: 'Michael Trader',
    status: 'disabled' as const,
    lists: ['ASX Announcements'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
  },
  {
    id: 4,
    email: 'emma.shareholder@example.com',
    name: 'Emma Shareholder',
    status: 'enabled' as const,
    lists: ['Investor Updates'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
  {
    id: 5,
    email: 'spam@example.com',
    name: 'Spam User',
    status: 'blocklisted' as const,
    lists: [],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
  },
];

const statusConfig = {
  enabled: { color: 'bg-green-100 text-green-700', icon: UserCheck, label: 'Active' },
  disabled: { color: 'bg-orange-100 text-orange-700', icon: UserX, label: 'Disabled' },
  blocklisted: { color: 'bg-red-100 text-red-700', icon: Ban, label: 'Blocked' },
};

export default function SubscribersPage() {
  const stats = {
    total: mockSubscribers.length,
    enabled: mockSubscribers.filter(s => s.status === 'enabled').length,
    disabled: mockSubscribers.filter(s => s.status === 'disabled').length,
    blocklisted: mockSubscribers.filter(s => s.status === 'blocklisted').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Subscribers</h1>
          <p className="text-slate-600 mt-1">Manage your email subscriber list</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors">
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#FF7B42] text-white font-semibold rounded-lg hover:bg-[#D14D15] transition-colors">
            <Plus className="w-5 h-5" />
            Add Subscriber
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Total Subscribers</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{stats.enabled}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Disabled</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">{stats.disabled}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Blocked</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{stats.blocklisted}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search subscribers by name or email..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B42] focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B42] focus:border-transparent">
            <option value="">All Status</option>
            <option value="enabled">Active</option>
            <option value="disabled">Disabled</option>
            <option value="blocklisted">Blocked</option>
          </select>
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B42] focus:border-transparent">
            <option value="">All Lists</option>
            <option value="1">ASX Announcements</option>
            <option value="2">Quarterly Reports</option>
            <option value="3">Investor Updates</option>
          </select>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-slate-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Subscriber
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Lists
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Subscribed
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockSubscribers.map((subscriber) => {
                const StatusIcon = statusConfig[subscriber.status].icon;
                return (
                  <tr key={subscriber.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded border-slate-300" />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">{subscriber.name}</p>
                        <p className="text-sm text-slate-600">{subscriber.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${statusConfig[subscriber.status].color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[subscriber.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {subscriber.lists.length > 0 ? (
                          subscriber.lists.slice(0, 2).map((list, idx) => (
                            <span key={idx} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                              {list}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-400">No lists</span>
                        )}
                        {subscriber.lists.length > 2 && (
                          <span className="inline-flex px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded">
                            +{subscriber.lists.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {formatDistanceToNow(new Date(subscriber.created_at), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing 1 to {mockSubscribers.length} of {mockSubscribers.length} subscribers
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

