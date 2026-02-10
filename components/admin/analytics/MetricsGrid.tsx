import { Eye, Users, TrendingDown, Clock } from 'lucide-react';

interface MetricsGridProps {
  summary: {
    totalViews: number;
    totalVisitors: number;
    avgBounceRate: string;
    avgSessionDuration: string;
  };
}

export default function MetricsGrid({ summary }: MetricsGridProps) {
  const metrics = [
    {
      label: 'Total Page Views',
      value: summary.totalViews.toLocaleString(),
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Unique Visitors',
      value: summary.totalVisitors.toLocaleString(),
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Avg. Bounce Rate',
      value: `${summary.avgBounceRate}%`,
      icon: TrendingDown,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      label: 'Avg. Session Duration',
      value: summary.avgSessionDuration,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div key={metric.label} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-slate-600">{metric.label}</p>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{metric.value}</p>
          </div>
        );
      })}
    </div>
  );
}

