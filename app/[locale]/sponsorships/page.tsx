'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Image from 'next/image'

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
      {/* Hero Section */}
      <section className="relative bg-secondary-900 py-32 md:py-40 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/aerial-view-motor-grader-civil-at-construction-sit-2025-07-08-16-02-40-utc.jpg)' }}
        />
        <div className="absolute inset-0 bg-primary-600/60"></div>
        
        <div className="container relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="text-heading-lg text-white mb-4">
                {t('heroTitle')}
              </h1>
              <p className="text-xl text-white/90">
                {t('heroSubtitle')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <AnimatedSection>
              <h2 className="text-heading-xl mb-6">{t('commitmentTitle')}</h2>
              <p className="text-xl text-gray-600">
                {t('commitmentDescription')}
              </p>
            </AnimatedSection>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsorships.map((sponsorship) => (
              <AnimatedSection key={sponsorship.id}>
                <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
                  <div 
                    className="h-64 bg-cover bg-center"
                    style={{ backgroundImage: `url(${sponsorship.image})` }}
                  />
                  <div className="p-6">
                    <div className="text-sm text-primary-600 font-semibold uppercase tracking-wider mb-2">
                      {sponsorship.category}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{sponsorship.name}</h3>
                    <p className="text-gray-600">
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
      <section className="section-padding bg-gray-50">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-heading-xl mb-4">{t('valuesTitle')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('valuesSubtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <AnimatedSection key={num}>
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                    {num}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{t(`value${num}Title`)}</h3>
                  <p className="text-gray-600">{t(`value${num}Description`)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
