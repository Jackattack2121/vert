'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { FullTextSection as FullTextSectionType } from '@/lib/admin/section-types';

interface FullTextSectionProps {
  section: FullTextSectionType;
  index: number;
}

export default function FullTextSection({ section, index }: FullTextSectionProps) {
  const bgColorClass = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50',
  }[section.backgroundColor || 'white'];

  const maxWidthClass = {
    narrow: 'max-w-3xl',
    medium: 'max-w-4xl',
    wide: 'max-w-5xl',
  }[section.maxWidth || 'medium'];

  return (
    <section className={`section-padding ${bgColorClass}`}>
      <div className="container">
        <AnimatedSection>
          <SectionTitle title={section.heading} centered={section.centered} />
          {section.subheading && (
            <p className={`text-lg text-gray-600 mt-4 ${section.centered ? 'text-center mx-auto max-w-3xl' : ''}`}>
              {section.subheading}
            </p>
          )}
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className={`mt-12 ${section.centered ? 'mx-auto' : ''} ${maxWidthClass}`}>
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

