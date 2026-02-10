import { Suspense } from 'react';
import { Layers, Users, Eye, TrendingUp } from 'lucide-react';
import StatsCard from '@/components/admin/dashboard/StatsCard';
import QuickActions from '@/components/admin/dashboard/QuickActions';
import RecentActivity from '@/components/admin/dashboard/RecentActivity';

// Function to fetch dashboard stats
// In production, these would come from real APIs
async function getDashboardStats() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Note: Projects count should be fetched from actual content management system
  // Other metrics removed until real data sources are available
  return {
    projects: {
      value: 5,
      change: { value: '', positive: true },
    },
    subscribers: {
      value: '-',
      change: { value: '', positive: true },
    },
    pageViews: {
      value: '-',
      change: { value: '', positive: true },
    },
    engagement: {
      value: '-',
      change: { value: '', positive: true },
    },
  };
}

async function DashboardStats() {
  const stats = await getDashboardStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Mining Projects"
        value={stats.projects.value}
        change={stats.projects.change}
        icon={Layers}
        iconColor="bg-blue-500"
      />
      <StatsCard
        title="Email Subscribers"
        value={stats.subscribers.value}
        change={stats.subscribers.change}
        icon={Users}
        iconColor="bg-green-500"
      />
      <StatsCard
        title="Page Views (30d)"
        value={stats.pageViews.value}
        change={stats.pageViews.change}
        icon={Eye}
        iconColor="bg-purple-500"
      />
      <StatsCard
        title="Email Open Rate"
        value={stats.engagement.value}
        change={stats.engagement.change}
        icon={TrendingUp}
        iconColor="bg-orange-500"
      />
    </div>
  );
}

function DashboardStatsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="h-8 w-32 bg-slate-200 animate-pulse rounded mb-2"></div>
          <div className="h-10 w-24 bg-slate-200 animate-pulse rounded"></div>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#FF7B42] to-[#D14D15] rounded-xl shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to CoreConnect</h1>
        <p className="text-white/90">
          Manage your Yugo Metals website from one unified control panel.
        </p>
      </div>

      {/* Stats Overview */}
      <Suspense fallback={<DashboardStatsLoading />}>
        <DashboardStats />
      </Suspense>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        <RecentActivity />
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-slate-900">Listmonk</p>
              <p className="text-xs text-slate-500">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="text-sm font-medium text-slate-900">Website</p>
              <p className="text-xs text-slate-500">Live</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

