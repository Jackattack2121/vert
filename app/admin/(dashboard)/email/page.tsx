import Link from 'next/link';
import { Send, Users, FileText, Plus, TrendingUp, Mail } from 'lucide-react';

// Mock function - in production this would call Listmonk API
async function getEmailStats() {
  return {
    subscribers: {
      total: 1234,
      enabled: 1180,
      disabled: 32,
      blocklisted: 22,
    },
    campaigns: {
      total: 15,
      draft: 3,
      scheduled: 1,
      finished: 11,
    },
    recentCampaigns: {
      avgOpenRate: 68,
      avgClickRate: 12,
    },
    lists: 3,
  };
}

export default async function EmailOverview() {
  const stats = await getEmailStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Email Marketing</h1>
          <p className="text-slate-600 mt-1">Manage campaigns, subscribers, and templates</p>
        </div>
        <Link
          href="/admin/email/campaigns?action=new"
          className="flex items-center gap-2 px-4 py-2 bg-[#FF7B42] text-white font-semibold rounded-lg hover:bg-[#D14D15] transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Campaign
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-1">Total Subscribers</p>
          <p className="text-3xl font-bold text-slate-900">{stats.subscribers.total.toLocaleString()}</p>
          <p className="text-xs text-green-600 mt-2">
            {stats.subscribers.enabled} active
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-500 p-3 rounded-lg">
              <Send className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-1">Campaigns Sent</p>
          <p className="text-3xl font-bold text-slate-900">{stats.campaigns.finished}</p>
          <p className="text-xs text-slate-500 mt-2">
            {stats.campaigns.draft} drafts
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-1">Avg. Open Rate</p>
          <p className="text-3xl font-bold text-slate-900">{stats.recentCampaigns.avgOpenRate}%</p>
          <p className="text-xs text-green-600 mt-2">
            Above industry avg
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-500 p-3 rounded-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-1">Mailing Lists</p>
          <p className="text-3xl font-bold text-slate-900">{stats.lists}</p>
          <p className="text-xs text-slate-500 mt-2">
            Active lists
          </p>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/email/campaigns"
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-[#FF7B42] transition-all group"
        >
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-500 transition-colors">
              <Send className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Campaigns</h3>
              <p className="text-sm text-slate-600 mb-3">Create and manage email campaigns</p>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-slate-500">{stats.campaigns.total} total</span>
                <span className="text-orange-600">{stats.campaigns.draft} drafts</span>
                {stats.campaigns.scheduled > 0 && (
                  <span className="text-blue-600">{stats.campaigns.scheduled} scheduled</span>
                )}
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/email/subscribers"
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-[#FF7B42] transition-all group"
        >
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-500 transition-colors">
              <Users className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Subscribers</h3>
              <p className="text-sm text-slate-600 mb-3">Manage your subscriber list</p>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-slate-500">{stats.subscribers.total} total</span>
                <span className="text-green-600">{stats.subscribers.enabled} active</span>
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/email/templates"
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-[#FF7B42] transition-all group"
        >
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-500 transition-colors">
              <FileText className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Templates</h3>
              <p className="text-sm text-slate-600 mb-3">Create and edit email templates</p>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-slate-500">Reusable templates</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Mailing Lists Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Mailing Lists</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">ASX Announcements</p>
              <p className="text-sm text-slate-600">Official ASX releases and updates</p>
            </div>
            <span className="text-sm font-semibold text-slate-900">842 subscribers</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">Quarterly Reports</p>
              <p className="text-sm text-slate-600">Financial and operational reports</p>
            </div>
            <span className="text-sm font-semibold text-slate-900">756 subscribers</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">Investor Updates</p>
              <p className="text-sm text-slate-600">General company news and updates</p>
            </div>
            <span className="text-sm font-semibold text-slate-900">1,234 subscribers</span>
          </div>
        </div>
      </div>
    </div>
  );
}

