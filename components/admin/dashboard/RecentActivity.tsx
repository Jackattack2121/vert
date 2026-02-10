import { Activity } from 'lucide-react';

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
          <Activity className="w-8 h-8 text-slate-400" />
        </div>
        <p className="text-sm font-medium text-slate-900 mb-1">No Recent Activity</p>
        <p className="text-xs text-slate-500">
          Activity tracking will appear here once enabled
        </p>
      </div>
    </div>
  );
}

