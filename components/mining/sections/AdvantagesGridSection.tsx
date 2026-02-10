'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { AdvantagesGridSection as AdvantagesGridSectionType } from '@/lib/admin/section-types';

interface AdvantagesGridSectionProps {
  section: AdvantagesGridSectionType;
  index: number;
}

export default function AdvantagesGridSection({ section, index }: AdvantagesGridSectionProps) {
  const bgColorClass = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50',
  }[section.backgroundColor || 'white'];

  const gridColsClass = section.columns === 2 ? 'md:grid-cols-2' : 'lg:grid-cols-3';

  const getIconBgColorClass = (color?: string) => {
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
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className={`grid grid-cols-1 ${gridColsClass} gap-8 max-w-6xl mx-auto mt-12`}>
            {section.items.map((item, idx) => (
              <div key={idx} className="text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl ${getIconBgColorClass(item.iconBgColor)}`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

