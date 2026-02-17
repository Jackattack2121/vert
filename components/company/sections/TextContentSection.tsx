'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import { TextContentSection as TextContentSectionType } from '@/lib/admin/section-types'

interface Props {
  section: TextContentSectionType
}

export default function TextContentSection({ section }: Props) {
  return (
    <AnimatedSection>
      <div className={`${section.centered ? 'text-center max-w-4xl mx-auto' : ''}`}>
        {section.heading && (
          <>
            <h2 className="font-serif font-light text-display text-primary-500 mb-2">
              {section.heading}
            </h2>
            <div className="w-16 h-0.5 bg-accent-gold mt-4 mb-8"></div>
          </>
        )}
        <div
          className="prose prose-lg max-w-none text-secondary-500 font-sans leading-relaxed"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      </div>
    </AnimatedSection>
  )
}
