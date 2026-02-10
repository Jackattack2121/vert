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
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-12 text-center">
            {section.heading}
          </h2>
        )}
        <div className={`grid grid-cols-1 ${gridColsClass} gap-6`}>
          {section.cards.map((card, index) => {
            const cardContent = (
              <>
                {card.icon && (
                  <div className="text-4xl mb-4">{card.icon}</div>
                )}
                <h3 className="text-xl font-bold uppercase tracking-wider mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {card.content}
                </p>
              </>
            )

            return card.link ? (
              <Link
                key={index}
                href={card.link}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              >
                {cardContent}
              </Link>
            ) : (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
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

