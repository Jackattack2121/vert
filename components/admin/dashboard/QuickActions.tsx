import Link from 'next/link';
import { Send, FileEdit } from 'lucide-react';

const actions = [
  {
    name: 'Create Campaign',
    description: 'Send email to subscribers',
    href: '/admin/email/campaigns?action=new',
    icon: Send,
    color: 'bg-green-500',
  },
  {
    name: 'View Analytics',
    description: 'Check website performance',
    href: '/admin/analytics',
    icon: FileEdit,
    color: 'bg-blue-500',
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 hover:border-[#FF7B42] hover:bg-slate-50 transition-all group"
          >
            <div className={`${action.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 group-hover:text-[#FF7B42] transition-colors">
                {action.name}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

