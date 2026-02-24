'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { HiArrowRight } from 'react-icons/hi'
import { HERO_IMAGES, COMPANY_CARD_IMAGES } from '@/lib/images'

export default function PortfolioPage() {
  const t = useTranslations('portfolio')

  const companies = [
    { id: 1, image: COMPANY_CARD_IMAGES.meteoricResources },
    { id: 2, image: COMPANY_CARD_IMAGES.techGenMetals },
    { id: 3, image: COMPANY_CARD_IMAGES.provinceResources },
    { id: 4, image: COMPANY_CARD_IMAGES.peakMinerals },
    { id: 5, image: COMPANY_CARD_IMAGES.msmCorporation },
    { id: 6, image: COMPANY_CARD_IMAGES.raidenResources },
    { id: 7, image: COMPANY_CARD_IMAGES.minbosResources },
    { id: 8, image: COMPANY_CARD_IMAGES.ragusaMinerals },
  ]

  const sponsorships = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-500 py-40 md:py-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${HERO_IMAGES.portfolio})` }}
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

      {/* Portfolio Companies Section */}
      <section id="portfolio-companies" className="section-padding bg-cream-100">
        <div className="container">
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="font-serif font-light text-display text-primary-500 mb-2">{t('companiesTitle')}</h2>
              <div className="w-16 h-0.5 bg-accent-gold mt-4 mb-8"></div>
              <p className="font-sans text-lg text-secondary-500 max-w-3xl leading-relaxed">
                {t('companiesSubtitle')}
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
                      alt={t(`company${company.id}Name`)}
                      width={300}
                      height={150}
                      className="max-h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="font-sans text-xs tracking-[0.1em] uppercase text-accent-gold mb-2 block">
                      {t(`company${company.id}Ticker`)}
                    </span>
                    <h3 className="font-serif text-lg font-normal text-primary-500 mb-2">
                      {t(`company${company.id}Name`)}
                    </h3>
                    <p className="font-sans text-xs tracking-[0.08em] uppercase text-secondary-400 mb-3">
                      {t(`company${company.id}Sector`)}
                    </p>
                    <p className="font-sans text-sm text-secondary-500 leading-relaxed">
                      {t(`company${company.id}Description`)}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorships Section */}
      <section id="sponsorships" className="section-padding bg-white">
        <div className="container">
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="font-serif font-light text-display text-primary-500 mb-2">{t('sponsorshipsTitle')}</h2>
              <div className="w-16 h-0.5 bg-accent-gold mt-4 mb-8"></div>
              <p className="font-sans text-lg text-secondary-500 max-w-3xl leading-relaxed">
                {t('sponsorshipsSubtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sponsorships.map((s) => (
              <AnimatedSection key={s.id}>
                <div className="bg-cream-100 rounded-md p-8 hover:-translate-y-1 hover:shadow-elegant-lg transition-all duration-300">
                  <span className="inline-block font-sans text-xs tracking-[0.1em] uppercase text-accent-gold mb-4">
                    {t(`sponsorship${s.id}Category`)}
                  </span>
                  <h3 className="font-serif text-xl font-normal text-primary-500">
                    {t(`sponsorship${s.id}Name`)}
                  </h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-500 text-cream-100">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="font-serif font-light text-display mb-6">{t('ctaTitle')}</h2>
              <p className="font-sans text-lg opacity-80 mb-10 leading-relaxed max-w-2xl mx-auto">
                {t('ctaDescription')}
              </p>
              <Button href="/contact" variant="gold">
                {t('ctaButton')}
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
