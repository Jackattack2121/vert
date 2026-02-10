'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { Link } from '@/i18n/navigation'

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
      {/* Hero Section */}
      <section className="relative bg-secondary-900 py-32 md:py-40 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/lush-mountain-forest-in-bosnia-aerial-shot-2025-09-09-00-26-14-utc.jpg)' }}
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

      {/* Companies Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-heading-xl mb-4">{t('portfolioTitle')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('portfolioSubtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company) => (
              <AnimatedSection key={company.id}>
                <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div 
                    className="h-64 bg-cover bg-center"
                    style={{ backgroundImage: `url(${company.image})` }}
                  />
                  <div className="p-6">
                    <div className="text-sm text-primary-600 font-semibold uppercase tracking-wider mb-2">
                      {company.industry}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{company.name}</h3>
                    <p className="text-gray-600 mb-4">
                      {company.description}
                    </p>
                    <div className="text-primary-600 font-semibold uppercase tracking-wider text-sm">
                      {t('learnMore')} →
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <AnimatedSection>
            <div className="bg-primary-600 rounded-2xl p-12 text-center text-white">
              <h2 className="text-4xl font-bold mb-6">{t('ctaTitle')}</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                {t('ctaDescription')}
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-600 font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-gray-100"
              >
                {t('ctaButton')}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
