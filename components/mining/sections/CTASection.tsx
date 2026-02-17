'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { CTASection as CTASectionType } from '@/lib/admin/section-types';

interface CTASectionProps {
  section: CTASectionType;
  index: number;
}

export default function CTASection({ section, index }: CTASectionProps) {
  const bgClass = {
    gradient: 'bg-gradient-to-r from-primary-700 to-primary-500',
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-600',
  }[section.backgroundColor || 'gradient'];

  return (
    <section className={`section-padding ${bgClass} text-white`}>
      <div className="container">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">
              {section.heading}
            </h2>
            <p className="text-xl font-sans mb-8 opacity-90">{section.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {section.buttons.map((button, idx) => (
                <Button
                  key={idx}
                  href={button.href}
                  variant={button.variant}
                >
                  {button.text}
                </Button>
              ))}
            </div>

            {section.showReferences && section.references && section.references.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/20 text-sm font-sans opacity-75">
                <p className="mb-2">
                  <strong>References:</strong>
                </p>
                {section.references.map((ref, idx) => (
                  <p key={idx}>{ref}</p>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
