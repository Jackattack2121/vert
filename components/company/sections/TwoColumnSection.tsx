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
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-8 text-center">
            {section.heading}
          </h2>
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
