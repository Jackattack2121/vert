'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import { TwoColumnSection as TwoColumnSectionType } from '@/lib/admin/section-types'

interface Props {
  section: TwoColumnSectionType
}

export default function TwoColumnSection({ section }: Props) {
  return (
    <AnimatedSection>
      <div>
        {section.heading && (
          <>
            <h2 className="font-serif font-light text-display text-primary-500 mb-2 text-center">
              {section.heading}
            </h2>
            <div className="w-16 h-0.5 bg-accent-gold mt-4 mx-auto mb-10"></div>
          </>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div
            className="prose prose-lg max-w-none text-secondary-500 font-sans leading-relaxed"
            dangerouslySetInnerHTML={{ __html: section.leftContent }}
          />
          <div
            className="prose prose-lg max-w-none text-secondary-500 font-sans leading-relaxed"
            dangerouslySetInnerHTML={{ __html: section.rightContent }}
          />
        </div>
      </div>
    </AnimatedSection>
  )
}
