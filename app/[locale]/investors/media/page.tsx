'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import EmptyState from '@/components/ui/EmptyState'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { HERO_IMAGES } from '@/lib/images'

export default function MediaPage() {
  const t = useTranslations('investors.media')

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-500 py-32 md:py-40 overflow-hidden">
        {/* Background Image with fade */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMAGES.media})` }}
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
              icon={HiOutlineNewspaper}
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
