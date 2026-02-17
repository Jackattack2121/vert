'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import { ContactInfoSection as ContactInfoSectionType } from '@/lib/admin/section-types'

interface Props {
  section: ContactInfoSectionType
}

export default function ContactInfoSection({ section }: Props) {
  return (
    <AnimatedSection>
      <div>
        {section.heading && (
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-8 text-center">
            {section.heading}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.items.map((item, index) => {
            const ItemWrapper = item.link ? 'a' : 'div'
            const wrapperProps = item.link
              ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' }
              : {}

            return (
              <ItemWrapper
                key={index}
                {...wrapperProps}
                className={`bg-white rounded-md p-6 shadow-elegant ${item.link ? 'hover:shadow-card-hover transition-shadow cursor-pointer' : ''}`}
              >
                <div className="flex items-start">
                  {item.icon && (
                    <div className="text-3xl mr-4 flex-shrink-0">
                      {item.icon}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-sans font-medium text-secondary-400 tracking-wide mb-1">
                      {item.label}
                    </p>
                    <p className="text-lg font-serif font-light text-primary-500">
                      {item.value}
                    </p>
                  </div>
                </div>
              </ItemWrapper>
            )
          })}
        </div>
      </div>
    </AnimatedSection>
  )
}
