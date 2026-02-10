'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { DataCardsSection as DataCardsSectionType } from '@/lib/admin/section-types';

interface DataCardsSectionProps {
  section: DataCardsSectionType;
  index: number;
}

export default function DataCardsSection({ section, index }: DataCardsSectionProps) {
  const bgColorClass = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50',
  }[section.backgroundColor || 'white'];

  const getBadgeColorClass = (color?: string) => {
    switch (color) {
      case 'yellow':
        return 'bg-accent-yellow text-black';
      case 'primary':
        return 'bg-primary-500 text-white';
      case 'secondary':
        return 'bg-secondary-500 text-white';
      default:
        return 'bg-accent-yellow text-black';
    }
  };

  return (
    <section className={`section-padding ${bgColorClass}`}>
      <div className="container">
        <AnimatedSection>
          <SectionTitle title={section.heading} centered />
          {section.subheading && (
            <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              {section.subheading}
            </p>
          )}
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="max-w-5xl mx-auto mt-12 space-y-4">
            {section.cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-primary-200 rounded-lg p-6 hover:border-accent-yellow transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-primary-900 mb-2">{card.title}</h4>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Main Intercept:</span> {card.mainResult}
                    </p>
                    {card.includingResult && (
                      <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Including:</span> {card.includingResult}
                      </p>
                    )}
                  </div>
                  {card.badge && (
                    <div className="mt-4 md:mt-0 md:ml-4">
                      <span
                        className={`inline-block px-4 py-2 text-xs font-bold rounded-full ${getBadgeColorClass(card.badgeColor)}`}
                      >
                        {card.badge}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

