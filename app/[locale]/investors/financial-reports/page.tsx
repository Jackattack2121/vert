'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import EmptyState from '@/components/ui/EmptyState'
import { HiOutlineDocumentReport } from 'react-icons/hi'

export default function FinancialReportsPage() {
  const t = useTranslations('investors.financialReports')

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-500 py-32 md:py-40 overflow-hidden">
        {/* Background Image with fade */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/natural-quarry-is-located-near-road-against-backdr-2025-01-29-05-43-49-utc.jpg)' }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-primary-500/70"></div>

        <div className="container relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="font-serif font-light text-hero text-cream-100 mb-4">
                {t('heroTitle')}
              </h1>
              <p className="font-sans text-xl text-cream-200 opacity-90">
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
              icon={HiOutlineDocumentReport}
              title={t('comingSoon')}
              description={t('comingSoonDescription')}
              action={{
                label: t('viewAnnouncementsAction'),
                href: '/investors/asx-announcements'
              }}
            />
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
