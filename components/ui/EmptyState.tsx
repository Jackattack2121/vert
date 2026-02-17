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
    <div className="bg-cream-100 rounded-md p-12">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
          <Icon className="w-10 h-10 text-primary-500" />
        </div>
        <h2 className="font-serif text-2xl font-normal text-primary-500 mb-3">
          {title}
        </h2>
        <p className="font-sans text-secondary-500 leading-relaxed mb-6">
          {description}
        </p>
        {action && (
          action.href ? (
            <a
              href={action.href}
              className="inline-flex items-center gap-3 px-10 py-4 bg-primary-500 text-cream-100
                         font-sans font-medium tracking-wide text-sm rounded-md
                         transition-all duration-300 ease-montfort
                         hover:bg-primary-600 hover:scale-[1.02] hover:shadow-elegant"
            >
              {action.label}
            </a>
          ) : (
            <button
              onClick={action.onClick}
              className="inline-flex items-center gap-3 px-10 py-4 bg-primary-500 text-cream-100
                         font-sans font-medium tracking-wide text-sm rounded-md
                         transition-all duration-300 ease-montfort
                         hover:bg-primary-600 hover:scale-[1.02] hover:shadow-elegant"
            >
              {action.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}
