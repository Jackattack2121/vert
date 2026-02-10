import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';

interface EmptyStateProps {
  icon: LucideIcon | IconType;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="bg-slate-100 p-6 rounded-full mb-6">
          <Icon className="w-16 h-16 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          {title}
        </h2>
        <p className="text-slate-600 mb-6">
          {description}
        </p>
        {action && (
          action.href ? (
            <a
              href={action.href}
              className="px-6 py-3 bg-[#FF7B42] text-white font-medium rounded-lg hover:bg-[#D14D15] transition-colors"
            >
              {action.label}
            </a>
          ) : (
            <button
              onClick={action.onClick}
              className="px-6 py-3 bg-[#FF7B42] text-white font-medium rounded-lg hover:bg-[#D14D15] transition-colors"
            >
              {action.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}
