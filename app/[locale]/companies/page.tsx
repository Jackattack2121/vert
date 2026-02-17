'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { Link } from '@/i18n/navigation'
import { HiArrowRight } from 'react-icons/hi'
import Image from 'next/image'
import { HERO_IMAGES, COMPANY_CARD_IMAGES } from '@/lib/images'

export default function CompaniesPage() {
  const t = useTranslations('companies')

  // Portfolio companies
  const companies = [
    {
      id: 1,
      name: 'Meteoric Resources Ltd',
      ticker: 'ASX: MEI',
      industry: 'Mining & Resources',
      description: 'Exploring and developing mineral resources with a focus on sustainable mining practices.',
      image: COMPANY_CARD_IMAGES.meteoricResources
    },
    {
      id: 2,
      name: 'TechGen Metals Ltd',
      ticker: 'ASX: TG1',
      industry: 'Mining & Resources',
      description: 'Advancing technology metals projects for the future of sustainable energy and infrastructure.',
      image: COMPANY_CARD_IMAGES.techGenMetals
    },
    {
      id: 3,
      name: 'Province Resources Ltd',
      ticker: 'ASX: PRL',
      industry: 'Mining & Resources',
      description: 'Developing green hydrogen and helium projects with a commitment to clean energy solutions.',
      image: COMPANY_CARD_IMAGES.provinceResources
    },
    {
      id: 4,
      name: 'Peak Minerals Ltd',
      ticker: 'ASX: PUA',
      industry: 'Mining & Resources',
      description: 'Exploring high-grade mineral deposits with a focus on copper and precious metals.',
      image: COMPANY_CARD_IMAGES.peakMinerals
    },
    {
      id: 5,
      name: 'MSM Corporation International',
      ticker: 'ASX: MSM',
      industry: 'Mining & Resources',
      description: 'International mining corporation specializing in strategic mineral development and partnerships.',
      image: COMPANY_CARD_IMAGES.msmCorporation
    },
    {
      id: 6,
      name: 'Raiden Resources Ltd',
      ticker: 'ASX: RDN',
      industry: 'Mining & Resources',
      description: 'Exploring battery metals and critical minerals for the renewable energy transition.',
      image: COMPANY_CARD_IMAGES.raidenResources
    },
    {
      id: 7,
      name: 'Minbos Resources Ltd',
      ticker: 'ASX: MNB',
      industry: 'Mining & Resources',
      description: 'Developing phosphate projects to support agricultural growth and food security in Africa.',
      image: COMPANY_CARD_IMAGES.minbosResources
    },
    {
      id: 8,
      name: 'Ragusa Minerals Ltd',
      ticker: 'ASX: RAS',
      industry: 'Mining & Resources',
      description: 'Exploring and developing gold and base metal projects with proven geological potential.',
      image: COMPANY_CARD_IMAGES.ragusaMinerals
    }
  ]

  return (
    <>
      {/* Hero Section - Montfort deep teal */}
      <section className="relative bg-primary-500 py-40 md:py-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${HERO_IMAGES.companies})` }}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companies.map((company) => (
              <AnimatedSection key={company.id}>
                <div className="group bg-white rounded-md overflow-hidden shadow-elegant hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
                  <div className="relative h-48 overflow-hidden bg-cream-100 flex items-center justify-center p-8">
                    <Image
                      src={company.image}
                      alt={company.name}
                      width={300}
                      height={150}
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="font-sans text-xs tracking-[0.1em] uppercase text-accent-gold mb-2 block">
                      {company.ticker}
                    </span>
                    <h3 className="font-serif text-lg font-normal text-primary-500 mb-2">{company.name}</h3>
                    <p className="font-sans text-sm text-secondary-500 leading-relaxed mb-4">
                      {company.description}
                    </p>
                    <span className="inline-flex items-center gap-2 font-sans text-xs font-medium text-accent-gold tracking-wide group-hover:gap-4 transition-all duration-300">
                      {t('learnMore')} <HiArrowRight className="w-3 h-3" />
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
