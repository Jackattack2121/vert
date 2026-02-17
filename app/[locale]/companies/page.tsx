'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { Link } from '@/i18n/navigation'
import { HiArrowRight } from 'react-icons/hi'

export default function CompaniesPage() {
  const t = useTranslations('companies')

  // Placeholder companies - will be populated with real data later
  const companies = [
    {
      id: 1,
      name: t('company1Name'),
      industry: t('company1Industry'),
      description: t('company1Description'),
      image: '/images/open-pit-mine-with-machines-2024-09-16-10-43-35-utc.jpg'
    },
    {
      id: 2,
      name: t('company2Name'),
      industry: t('company2Industry'),
      description: t('company2Description'),
      image: '/images/flying-over-open-pit-gold-mine-quarry-in-rosia-m-2025-03-09-07-21-03-utc.jpg'
    },
    {
      id: 3,
      name: t('company3Name'),
      industry: t('company3Industry'),
      description: t('company3Description'),
      image: '/images/aerial-view-over-the-sand-pit-2025-10-13-02-21-23-utc.jpg'
    }
  ]

  return (
    <>
      {/* Hero Section - Montfort deep teal */}
      <section className="relative bg-primary-500 py-40 md:py-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(/images/the-truck-transports-the-minerals-from-the-top-vie-2025-10-16-12-14-08-utc.jpg)' }}
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

      {/* Companies Grid - Montfort-style cream background */}
      <section className="section-padding bg-cream-100">
        <div className="container">
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="font-serif font-light text-display text-primary-500 mb-2">{t('portfolioTitle')}</h2>
              <div className="w-16 h-0.5 bg-accent-gold mt-4 mb-8"></div>
              <p className="font-sans text-lg text-secondary-500 max-w-3xl leading-relaxed">
                {t('portfolioSubtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company) => (
              <AnimatedSection key={company.id}>
                <div className="group bg-white rounded-md overflow-hidden shadow-elegant hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${company.image})` }}
                    />
                  </div>
                  <div className="p-8">
                    <span className="font-sans text-xs tracking-[0.1em] uppercase text-accent-gold mb-2 block">
                      {company.industry}
                    </span>
                    <h3 className="font-serif text-xl font-normal text-primary-500 mb-3">{company.name}</h3>
                    <p className="font-sans text-secondary-500 leading-relaxed mb-4">
                      {company.description}
                    </p>
                    <span className="inline-flex items-center gap-2 font-sans text-sm font-medium text-accent-gold tracking-wide group-hover:gap-4 transition-all duration-300">
                      {t('learnMore')} <HiArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Montfort deep teal */}
      <section className="section-padding bg-primary-500">
        <div className="container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif font-light text-display text-cream-100 mb-6">{t('ctaTitle')}</h2>
              <p className="font-sans text-lg text-cream-200 opacity-80 mb-10 max-w-2xl mx-auto leading-relaxed">
                {t('ctaDescription')}
              </p>
              <Button href="/contact" variant="gold">
                {t('ctaButton')}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
