'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import EmptyState from '@/components/ui/EmptyState'
import { HiOutlineCalendar } from 'react-icons/hi'

export default function CalendarPage() {
  const t = useTranslations('investors.calendar')

  return (
    <>
      {/* Hero Section - Montfort-style deep teal */}
      <section className="relative bg-primary-500 py-40 md:py-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(/images/bosnia-and-herzegovina-jablanica-2025-08-28-10-01-46-utc.jpg)' }}
        />
        <div className="absolute inset-0 bg-primary-500/70"></div>

        <div className="container relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="font-serif font-light text-hero text-cream-100 mb-6">
                {t('heroTitle')}
              </h1>
              <p className="font-sans text-xl text-cream-200 opacity-90 max-w-2xl leading-relaxed">
                {t('heroSubtitle')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Empty State */}
      <section className="section-padding bg-cream-100">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <EmptyState
              icon={HiOutlineCalendar}
              title={t('comingSoon')}
              description={t('comingSoonDescription')}
              action={{
                label: t('subscribeAction'),
                href: '/investors'
              }}
            />
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
