import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    positive: boolean;
  };
  icon: LucideIcon;
  iconColor?: string;
  loading?: boolean;
}

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'bg-[#FF7B42]',
  loading = false,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          {loading ? (
            <div className="h-8 w-24 bg-slate-200 animate-pulse rounded"></div>
          ) : (
            <p className="text-3xl font-bold text-slate-900">{value}</p>
          )}
          {change && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  'text-xs font-semibold',
                  change.positive ? 'text-green-600' : 'text-red-600'
                )}
              >
                {change.positive ? '↑' : '↓'} {change.value}
              </span>
              <span className="text-xs text-slate-500">vs last month</span>
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-lg', iconColor)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

