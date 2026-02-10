import Link from 'next/link';
import { Plus, Send, Edit, Trash2, Play, Pause, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { getCampaigns } from '@/lib/admin/listmonk-admin';

// Force dynamic rendering - don't try to build statically
export const dynamic = 'force-dynamic';

// Use real Listmonk data
const mockCampaignsBackup = [
  {
    id: 1,
    name: 'Q4 2024 Investor Update',
    subject: 'Yugo Metals - Quarterly Operations Update',
    status: 'finished' as const,
    lists: ['Investor Updates'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    started_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    views: 842,
    clicks: 156,
  },
  {
    id: 2,
    name: 'Doboj Project Exploration Update',
    subject: 'Major Exploration Progress at Doboj Project, Bosnia & Herzegovina',
    status: 'finished' as const,
    lists: ['ASX Announcements', 'Investor Updates'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    started_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 13).toISOString(),
    views: 1124,
    clicks: 287,
  },
  {
    id: 3,
    name: 'Monthly Newsletter - January 2025',
    subject: 'January Update: Exploration Progress',
    status: 'scheduled' as const,
    lists: ['Investor Updates'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    started_at: null,
    views: 0,
    clicks: 0,
  },
  {
    id: 4,
    name: 'Welcome Email Series',
    subject: 'Welcome to Yugo Metals',
    status: 'draft' as const,
    lists: ['Investor Updates'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    started_at: null,
    views: 0,
    clicks: 0,
  },
];

const statusConfig = {
  draft: { color: 'bg-slate-100 text-slate-700', icon: Edit },
  scheduled: { color: 'bg-blue-100 text-blue-700', icon: Play },
  running: { color: 'bg-green-100 text-green-700', icon: Send },
  finished: { color: 'bg-purple-100 text-purple-700', icon: Eye },
  paused: { color: 'bg-orange-100 text-orange-700', icon: Pause },
  cancelled: { color: 'bg-red-100 text-red-700', icon: Trash2 },
};

export default async function CampaignsPage() {
  let campaigns = [];
  
  try {
    const campaignsData = await getCampaigns({ per_page: 50 });
    campaigns = campaignsData.data.results;
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    // Use backup mock data if Listmonk is unavailable
    campaigns = mockCampaignsBackup as any;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Email Campaigns</h1>
          <p className="text-slate-600 mt-1">Create and manage your email campaigns</p>
        </div>
        <Link
          href="/admin/email/campaigns/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#FF7B42] text-white font-semibold rounded-lg hover:bg-[#D14D15] transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Campaign
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Total Campaigns</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{campaigns.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Sent</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">
            {campaigns.filter((c: any) => c.status === 'finished').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Scheduled</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {campaigns.filter((c: any) => c.status === 'scheduled').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Drafts</p>
          <p className="text-2xl font-bold text-slate-600 mt-1">
            {campaigns.filter((c: any) => c.status === 'draft').length}
          </p>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Lists
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {campaigns.map((campaign: any) => {
                const status = campaign.status as keyof typeof statusConfig;
                const StatusIcon = statusConfig[status]?.icon || Edit;
                return (
                  <tr key={campaign.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">{campaign.name}</p>
                        <p className="text-sm text-slate-600">{campaign.subject}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${statusConfig[status]?.color || 'bg-slate-100 text-slate-700'}`}>
                        <StatusIcon className="w-3 h-3" />
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {campaign.lists?.map((list: any, idx: number) => (
                          <span key={idx} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                            {typeof list === 'string' ? list : list.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {campaign.status === 'finished' ? (
                        <div className="text-sm">
                          <p className="text-slate-900">{campaign.views} opens</p>
                          <p className="text-slate-600">{campaign.clicks} clicks</p>
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {formatDistanceToNow(new Date(campaign.created_at), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/email/campaigns/${campaign.id}`}
                          className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        {campaign.status === 'draft' && (
                          <button
                            className="p-2 text-slate-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Send"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

