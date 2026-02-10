import { BarChart3, ExternalLink } from 'lucide-react';

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600 mt-1">Website traffic and user behavior insights</p>
        </div>
        <a
          href="https://analytics.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Google Analytics
        </a>
      </div>

      {/* Coming Soon State */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="bg-slate-100 p-6 rounded-full mb-6">
            <BarChart3 className="w-16 h-16 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Analytics Coming Soon
          </h2>
          <p className="text-slate-600 mb-6">
            Analytics will be available when Google Analytics integration is complete. 
            This dashboard will display real-time traffic data, user behavior insights, 
            and comprehensive website metrics.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full">
            <p className="text-sm text-blue-800">
              In the meantime, you can access Google Analytics directly using the link above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

