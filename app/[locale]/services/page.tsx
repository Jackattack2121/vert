'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { HiArrowRight } from 'react-icons/hi'
import { HERO_IMAGES, SERVICE_IMAGES } from '@/lib/images'

export default function ServicesPage() {
  const t = useTranslations('services')

  return (
    <>
      {/* Hero Section - Montfort-style deep teal */}
      <section className="relative bg-primary-500 py-40 md:py-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${HERO_IMAGES.services})` }}
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

      {/* Services - Montfort-style alternating layouts */}
      <section className="bg-white">
        <div className="container">
          <div className="divide-y divide-primary-500/10">
            {/* Corporate Advisory */}
            <div className="section-padding">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <AnimatedSection>
                  <div>
                    <span className="inline-block font-sans text-xs tracking-[0.1em] uppercase text-accent-gold mb-4">
                      {t('service1Category')}
                    </span>
                    <h2 className="font-serif font-light text-display text-primary-500 mb-6">{t('service1Title')}</h2>
                    <p className="font-sans text-base lg:text-lg text-secondary-500 leading-relaxed mb-8">
                      {t('service1Description')}
                    </p>
                    <ul className="space-y-4 mb-10">
                      {[1, 2, 3, 4].map((num) => (
                        <li key={num} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-gold"></div>
                          </div>
                          <span className="font-sans text-secondary-500">{t(`service1Feature${num}`)}</span>
                        </li>
                      ))}
                    </ul>
                    <Button href="/contact" variant="primary">
                      {t('learnMore')}
                    </Button>
                  </div>
                </AnimatedSection>

                <AnimatedSection>
                  <div className="h-96 rounded-md overflow-hidden">
                    <Image
                      src={SERVICE_IMAGES.corporateAdvisory}
                      alt="Corporate Advisory Services"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </AnimatedSection>
              </div>
            </div>

            {/* Capital Raising - Reversed layout */}
            <div className="section-padding">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <AnimatedSection>
                  <div className="h-96 rounded-md overflow-hidden lg:order-first">
                    <Image
                      src={SERVICE_IMAGES.capitalRaising}
                      alt="Capital Raising Services"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </AnimatedSection>

                <AnimatedSection>
                  <div>
                    <span className="inline-block font-sans text-xs tracking-[0.1em] uppercase text-accent-gold mb-4">
                      {t('service2Category')}
                    </span>
                    <h2 className="font-serif font-light text-display text-primary-500 mb-6">{t('service2Title')}</h2>
                    <p className="font-sans text-base lg:text-lg text-secondary-500 leading-relaxed mb-8">
                      {t('service2Description')}
                    </p>
                    <ul className="space-y-4 mb-10">
                      {[1, 2, 3, 4].map((num) => (
                        <li key={num} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-gold"></div>
                          </div>
                          <span className="font-sans text-secondary-500">{t(`service2Feature${num}`)}</span>
                        </li>
                      ))}
                    </ul>
                    <Button href="/contact" variant="primary">
                      {t('learnMore')}
                    </Button>
                  </div>
                </AnimatedSection>
              </div>
            </div>

            {/* Asset Management */}
            <div className="section-padding">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <AnimatedSection>
                  <div>
                    <span className="inline-block font-sans text-xs tracking-[0.1em] uppercase text-accent-gold mb-4">
                      {t('service3Category')}
                    </span>
                    <h2 className="font-serif font-light text-display text-primary-500 mb-6">{t('service3Title')}</h2>
                    <p className="font-sans text-base lg:text-lg text-secondary-500 leading-relaxed mb-8">
                      {t('service3Description')}
                    </p>
                    <ul className="space-y-4 mb-10">
                      {[1, 2, 3, 4].map((num) => (
                        <li key={num} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-gold"></div>
                          </div>
                          <span className="font-sans text-secondary-500">{t(`service3Feature${num}`)}</span>
                        </li>
                      ))}
                    </ul>
                    <Button href="/contact" variant="primary">
                      {t('learnMore')}
                    </Button>
                  </div>
                </AnimatedSection>

                <AnimatedSection>
                  <div className="h-96 rounded-md overflow-hidden">
                    <Image
                      src={SERVICE_IMAGES.assetManagement}
                      alt="Asset Management Services"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </AnimatedSection>
              </div>
            </div>
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
