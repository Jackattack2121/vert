'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { TextImageSection as TextImageSectionType } from '@/lib/admin/section-types';

interface TextImageSectionProps {
  section: TextImageSectionType;
  index: number;
}

export default function TextImageSection({ section, index }: TextImageSectionProps) {
  const bgColorClass = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50',
  }[section.backgroundColor || 'white'];

  return (
    <section className={`section-padding ${bgColorClass}`}>
      <div className="container">
        <AnimatedSection>
          <SectionTitle title={section.heading} centered={false} />
        </AnimatedSection>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
          section.imagePosition === 'left' ? 'lg:flex-row-reverse' : ''
        }`}>
          <AnimatedSection delay={0.2}>
            <div
              className="prose max-w-none text-gray-600 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            {section.image ? (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={section.image}
                  alt={section.heading}
                  className="w-full h-auto"
                />
              </div>
            ) : section.highlightBox ? (
              <div className={`p-8 rounded-lg ${section.highlightBox.bgColor || 'bg-primary-50'}`}>
                <h3 className="text-2xl font-bold mb-6 uppercase tracking-wider">
                  {section.highlightBox.title}
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {section.highlightBox.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-accent-yellow mr-2">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

