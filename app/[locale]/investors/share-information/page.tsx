'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function ShareInformation() {
  const t = useTranslations('investors.shareInfo')
  
  return (
    <>
      <section className="relative bg-secondary-900 py-32 md:py-40 overflow-hidden">
        {/* Background Image with fade */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/flying-over-open-pit-gold-mine-quarry-in-rosia-m-2025-03-09-07-21-03-utc.jpg)' }}
        />
        
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-primary-600/60"></div>
        
        <div className="container relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="text-heading-lg text-white mb-4">
                {t('heroTitle')}
              </h1>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
                {t('heroSubtitle')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="border-2 border-gray-200 p-8">
                <h3 className="text-2xl font-bold mb-6 text-secondary-900 uppercase tracking-wider">{t('companyDetailsTitle')}</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>{t('companyDetailsASXCode')}</strong> {t('companyDetailsASXValue')}</p>
                  <p><strong>{t('companyDetailsABN')}</strong> {t('companyDetailsABNValue')}</p>
                  <p><strong>{t('companyDetailsRegistry')}</strong> {t('companyDetailsRegistryValue')}</p>
                </div>
              </div>

              <div className="border-2 border-gray-200 p-8">
                <h3 className="text-2xl font-bold mb-6 text-secondary-900 uppercase tracking-wider">{t('registryContactTitle')}</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>{t('registryContactPhone')}</strong> {t('registryContactPhoneValue')}</p>
                  <p><strong>{t('registryContactEmail')}</strong> {t('registryContactEmailValue')}</p>
                  <p><strong>{t('registryContactWebsite')}</strong> {t('registryContactWebsiteValue')}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2 className="text-heading-lg text-secondary-900 mb-8">
              {t('servicesTitle')}
            </h2>
            <div className="bg-white border-2 border-gray-200 p-8">
              <p className="text-gray-600 leading-relaxed mb-6">
                {t('servicesIntro')}
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• {t('service1')}</li>
                <li>• {t('service2')}</li>
                <li>• {t('service3')}</li>
                <li>• {t('service4')}</li>
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

