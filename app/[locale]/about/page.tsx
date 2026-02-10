'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Image from 'next/image'

export default function AboutPage() {
  const t = useTranslations('about')
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-secondary-900 py-32 md:py-40 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/beautiful-nature-of-bosnia-and-herzegovina-travel-2025-08-29-06-16-13-utc.jpg)' }}
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

      {/* About Content */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div>
                <h2 className="text-heading-xl mb-6">{t('introTitle')}</h2>
                <div className="prose prose-lg max-w-none">
                  <p>{t('introDescription')}</p>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <div className="bg-gray-100 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">{t('companyInfoTitle')}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">{t('companyName')}</p>
                    <p className="font-semibold">{t('companyNameValue')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('carNumber')}</p>
                    <p className="font-semibold">{t('carNumberValue')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('afsl')}</p>
                    <p className="font-semibold">{t('afslValue')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('location')}</p>
                    <p className="font-semibold">{t('locationValue')}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
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
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold mb-4">{t(`value${num}Title`)}</h3>
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
