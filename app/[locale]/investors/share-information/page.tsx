'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { HERO_IMAGES } from '@/lib/images'

export default function ShareInformation() {
  const t = useTranslations('investors.shareInfo')

  return (
    <>
      <section className="relative bg-primary-500 py-32 md:py-40 overflow-hidden">
        {/* Background Image with fade */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMAGES.shareInformation})` }}
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

      <section className="section-padding bg-white">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="border-2 border-primary-500/10 p-8">
                <h3 className="text-2xl font-serif font-normal mb-6 text-primary-500">{t('companyDetailsTitle')}</h3>
                <div className="space-y-3 text-secondary-600">
                  <p><strong>{t('companyDetailsASXCode')}</strong> {t('companyDetailsASXValue')}</p>
                  <p><strong>{t('companyDetailsABN')}</strong> {t('companyDetailsABNValue')}</p>
                  <p><strong>{t('companyDetailsRegistry')}</strong> {t('companyDetailsRegistryValue')}</p>
                </div>
              </div>

              <div className="border-2 border-primary-500/10 p-8">
                <h3 className="text-2xl font-serif font-normal mb-6 text-primary-500">{t('registryContactTitle')}</h3>
                <div className="space-y-3 text-secondary-600">
                  <p><strong>{t('registryContactPhone')}</strong> {t('registryContactPhoneValue')}</p>
                  <p><strong>{t('registryContactEmail')}</strong> {t('registryContactEmailValue')}</p>
                  <p><strong>{t('registryContactWebsite')}</strong> {t('registryContactWebsiteValue')}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h2 className="font-serif font-light text-display text-primary-500 mb-8">
              {t('servicesTitle')}
            </h2>
            <div className="bg-white border-2 border-primary-500/10 p-8">
              <p className="font-sans text-secondary-500 leading-relaxed mb-6">
                {t('servicesIntro')}
              </p>
              <ul className="space-y-2 text-secondary-600">
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
