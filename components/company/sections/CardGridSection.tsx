'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import { CardGridSection as CardGridSectionType } from '@/lib/admin/section-types'
import { Link } from '@/i18n/navigation'

interface Props {
  section: CardGridSectionType
}

export default function CardGridSection({ section }: Props) {
  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[section.columns] || 'md:grid-cols-3'

  return (
    <AnimatedSection>
      <div>
        {section.heading && (
          <>
            <h2 className="font-serif font-light text-display text-primary-500 mb-2 text-center">
              {section.heading}
            </h2>
            <div className="w-16 h-0.5 bg-accent-gold mt-4 mx-auto mb-12"></div>
          </>
        )}
        <div className={`grid grid-cols-1 ${gridColsClass} gap-6`}>
          {section.cards.map((card, index) => {
            const cardContent = (
              <>
                {card.icon && (
                  <div className="text-4xl mb-4">{card.icon}</div>
                )}
                <h3 className="text-xl font-serif font-light mb-3">
                  {card.title}
                </h3>
                <p className="text-secondary-500 font-sans leading-relaxed">
                  {card.content}
                </p>
              </>
            )

            return card.link ? (
              <Link
                key={index}
                href={card.link}
                className="bg-white rounded-md p-6 shadow-elegant hover:shadow-card-hover transition-shadow cursor-pointer"
              >
                {cardContent}
              </Link>
            ) : (
              <div
                key={index}
                className="bg-white rounded-md p-6 shadow-elegant hover:shadow-card-hover transition-shadow"
              >
                {cardContent}
              </div>
            )
          })}
        </div>
      </div>
    </AnimatedSection>
  )
}
