'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import EmptyState from '@/components/ui/EmptyState'
import { HiOutlineDocumentText } from 'react-icons/hi'

export default function FactSheetPage() {
  const t = useTranslations('investors.factSheet')
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-secondary-900 py-32 md:py-40 overflow-hidden">
        {/* Background Image with fade */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/aerial-view-motor-grader-civil-at-construction-sit-2025-07-08-16-02-40-utc.jpg)' }}
        />
        
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-primary-600/60"></div>
        
        <div className="container relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="text-heading-lg text-white mb-4">
                {t('heroTitle')}
              </h1>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
                {t('heroSubtitle')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Empty State */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <EmptyState
              icon={HiOutlineDocumentText}
              title={t('comingSoon')}
              description={t('comingSoonDescription')}
              action={{
                label: t('viewReportsAction'),
                href: '/investors/financial-reports'
              }}
            />
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
