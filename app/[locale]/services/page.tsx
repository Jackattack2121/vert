'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { HiArrowRight } from 'react-icons/hi'

export default function ServicesPage() {
  const t = useTranslations('services')
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-secondary-900 py-32 md:py-40 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/three-contemporary-builders-in-uniform-2025-03-16-04-36-05-utc.jpg)' }}
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

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="space-y-24">
            {/* Corporate Advisory */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection>
                <div>
                  <div className="inline-block bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                    {t('service1Category')}
                  </div>
                  <h2 className="text-heading-xl mb-6">{t('service1Title')}</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    {t('service1Description')}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[1, 2, 3, 4].map((num) => (
                      <li key={num} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <HiArrowRight className="w-4 h-4 text-white" />
                        </div>
                        <span>{t(`service1Feature${num}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href="/contact" variant="primary">
                    {t('learnMore')}
                  </Button>
                </div>
              </AnimatedSection>
              
              <AnimatedSection>
                <div className="h-96 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg"></div>
              </AnimatedSection>
            </div>

            {/* Capital Raising */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection>
                <div className="h-96 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg"></div>
              </AnimatedSection>
              
              <AnimatedSection>
                <div>
                  <div className="inline-block bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                    {t('service2Category')}
                  </div>
                  <h2 className="text-heading-xl mb-6">{t('service2Title')}</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    {t('service2Description')}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[1, 2, 3, 4].map((num) => (
                      <li key={num} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <HiArrowRight className="w-4 h-4 text-white" />
                        </div>
                        <span>{t(`service2Feature${num}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href="/contact" variant="primary">
                    {t('learnMore')}
                  </Button>
                </div>
              </AnimatedSection>
            </div>

            {/* Asset Management */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection>
                <div>
                  <div className="inline-block bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                    {t('service3Category')}
                  </div>
                  <h2 className="text-heading-xl mb-6">{t('service3Title')}</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    {t('service3Description')}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[1, 2, 3, 4].map((num) => (
                      <li key={num} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <HiArrowRight className="w-4 h-4 text-white" />
                        </div>
                        <span>{t(`service3Feature${num}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href="/contact" variant="primary">
                    {t('learnMore')}
                  </Button>
                </div>
              </AnimatedSection>
              
              <AnimatedSection>
                <div className="h-96 bg-gradient-to-br from-primary-700 to-primary-900 rounded-lg"></div>
              </AnimatedSection>
            </div>
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
              <Button href="/contact" variant="secondary">
                {t('ctaButton')}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
