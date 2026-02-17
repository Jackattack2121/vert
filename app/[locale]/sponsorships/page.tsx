'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'

export default function SponsorshipsPage() {
  const t = useTranslations('sponsorships')

  // Placeholder sponsorships - will be populated with real data later
  const sponsorships = [
    {
      id: 1,
      name: t('sponsorship1Name'),
      category: t('sponsorship1Category'),
      description: t('sponsorship1Description'),
      image: '/images/beautiful-nature-of-bosnia-and-herzegovina-travel-2025-08-29-06-16-13-utc.jpg'
    },
    {
      id: 2,
      name: t('sponsorship2Name'),
      category: t('sponsorship2Category'),
      description: t('sponsorship2Description'),
      image: '/images/lush-mountain-forest-in-bosnia-aerial-shot-2025-09-09-00-26-14-utc.jpg'
    },
    {
      id: 3,
      name: t('sponsorship3Name'),
      category: t('sponsorship3Category'),
      description: t('sponsorship3Description'),
      image: '/images/three-contemporary-builders-in-uniform-2025-03-16-04-36-05-utc.jpg'
    }
  ]

  return (
    <>
      {/* Hero Section - Montfort-style deep teal */}
      <section className="relative bg-primary-500 py-40 md:py-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(/images/aerial-drone-view-of-soca-river-in-slovenia-at-sum-2025-03-25-02-59-48-utc.jpg)' }}
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

      {/* Commitment Section */}
      <section className="section-padding bg-cream-100">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <AnimatedSection>
              <h2 className="font-serif font-light text-display text-primary-500 mb-2">{t('commitmentTitle')}</h2>
              <div className="w-16 h-0.5 bg-accent-gold mt-4 mx-auto mb-8"></div>
              <p className="font-sans text-lg text-secondary-500 leading-relaxed">
                {t('commitmentDescription')}
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsorships.map((sponsorship) => (
              <AnimatedSection key={sponsorship.id}>
                <div className="group bg-white rounded-md overflow-hidden shadow-elegant hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${sponsorship.image})` }}
                    />
                  </div>
                  <div className="p-8">
                    <span className="font-sans text-xs tracking-[0.1em] uppercase text-accent-gold mb-2 block">
                      {sponsorship.category}
                    </span>
                    <h3 className="font-serif text-xl font-normal text-primary-500 mb-3">{sponsorship.name}</h3>
                    <p className="font-sans text-secondary-500 leading-relaxed">
                      {sponsorship.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-serif font-light text-display text-primary-500 mb-2">{t('valuesTitle')}</h2>
              <div className="w-16 h-0.5 bg-accent-gold mt-4 mx-auto mb-8"></div>
              <p className="font-sans text-lg text-secondary-500 max-w-3xl mx-auto leading-relaxed">
                {t('valuesSubtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <AnimatedSection key={num}>
                <div className="bg-cream-100 rounded-md p-10 hover:-translate-y-1 hover:shadow-elegant-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-accent-gold/10 rounded-full flex items-center justify-center text-accent-gold text-2xl font-serif mb-6">
                    {num}
                  </div>
                  <h3 className="font-serif text-xl font-normal text-primary-500 mb-3">{t(`value${num}Title`)}</h3>
                  <p className="font-sans text-secondary-500 leading-relaxed">{t(`value${num}Description`)}</p>
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
              <h2 className="font-serif font-light text-display mb-6">Partner With Us</h2>
              <p className="font-sans text-lg opacity-80 mb-10 leading-relaxed">
                Interested in sponsorship opportunities with Vert Capital?
              </p>
              <Button href="/contact" variant="gold">
                Get in Touch
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
