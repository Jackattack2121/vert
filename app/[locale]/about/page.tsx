'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import StatsBar from '@/components/ui/StatsBar'
import { HERO_IMAGES, SERVICE_IMAGES } from '@/lib/images'
import { HiArrowRight } from 'react-icons/hi'
import { FaLinkedin } from 'react-icons/fa'

export default function AboutPage() {
  const t = useTranslations('about')
  const tStats = useTranslations('homepage.stats')

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-500 py-40 md:py-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${HERO_IMAGES.about})` }}
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

      {/* Company Story Section */}
      <section className="section-padding bg-cream-100">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <div>
                <h2 className="font-serif font-light text-display text-primary-500 mb-2">{t('introTitle')}</h2>
                <div className="w-16 h-0.5 bg-accent-gold mt-4 mb-8"></div>
                <div className="space-y-6 font-sans text-base lg:text-lg text-secondary-500 leading-relaxed">
                  <p>{t('introDescription1')}</p>
                  <p>{t('introDescription2')}</p>
                  <p>{t('introDescription3')}</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-white rounded-md p-10 shadow-elegant">
                <h3 className="font-serif text-xl font-normal text-primary-500 mb-6">{t('companyInfoTitle')}</h3>
                <div className="space-y-5">
                  <div className="border-b border-primary-500/10 pb-4">
                    <p className="font-sans text-xs tracking-[0.1em] uppercase text-secondary-400 mb-1">{t('companyName')}</p>
                    <p className="font-sans font-medium text-primary-500">{t('companyNameValue')}</p>
                  </div>
                  <div className="border-b border-primary-500/10 pb-4">
                    <p className="font-sans text-xs tracking-[0.1em] uppercase text-secondary-400 mb-1">{t('carNumber')}</p>
                    <p className="font-sans font-medium text-primary-500">{t('carNumberValue')}</p>
                  </div>
                  <div className="border-b border-primary-500/10 pb-4">
                    <p className="font-sans text-xs tracking-[0.1em] uppercase text-secondary-400 mb-1">{t('afsl')}</p>
                    <p className="font-sans font-medium text-primary-500">{t('afslValue')}</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-[0.1em] uppercase text-secondary-400 mb-1">{t('location')}</p>
                    <p className="font-sans font-medium text-primary-500">{t('locationValue')}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section>
        <StatsBar
          stats={[
            { value: tStats('stat1Value'), label: tStats('stat1Label'), sublabel: tStats('stat1Sublabel') },
            { value: tStats('stat2Value'), label: tStats('stat2Label'), sublabel: tStats('stat2Sublabel') },
            { value: tStats('stat3Value'), label: tStats('stat3Label'), sublabel: tStats('stat3Sublabel') },
            { value: tStats('stat4Value'), label: tStats('stat4Label'), sublabel: tStats('stat4Sublabel') },
          ]}
          background="teal"
        />
      </section>

      {/* Services Section */}
      <section id="our-services" className="bg-white">
        <div className="container">
          <div className="section-padding">
            <AnimatedSection>
              <div className="mb-16">
                <h2 className="font-serif font-light text-display text-primary-500 mb-2">{t('servicesTitle')}</h2>
                <div className="w-16 h-0.5 bg-accent-gold mt-4 mb-8"></div>
                <p className="font-sans text-lg text-secondary-500 max-w-3xl leading-relaxed">
                  {t('servicesSubtitle')}
                </p>
              </div>
            </AnimatedSection>
          </div>

          <div className="divide-y divide-primary-500/10">
            {/* Corporate Advisory */}
            <div id="corporate-advisory" className="section-padding scroll-mt-24">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <AnimatedSection>
                  <div>
                    <h3 className="font-serif font-light text-display text-primary-500 mb-6">{t('service1Title')}</h3>
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
                  </div>
                </AnimatedSection>
                <AnimatedSection>
                  <div className="h-96 rounded-md overflow-hidden">
                    <Image
                      src={SERVICE_IMAGES.corporateAdvisory}
                      alt={t('service1Title')}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </AnimatedSection>
              </div>
            </div>

            {/* Capital Raising */}
            <div id="capital-raising" className="section-padding scroll-mt-24">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <AnimatedSection>
                  <div className="h-96 rounded-md overflow-hidden lg:order-first">
                    <Image
                      src={SERVICE_IMAGES.capitalRaising}
                      alt={t('service2Title')}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </AnimatedSection>
                <AnimatedSection>
                  <div>
                    <h3 className="font-serif font-light text-display text-primary-500 mb-6">{t('service2Title')}</h3>
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
                  </div>
                </AnimatedSection>
              </div>
            </div>

            {/* Asset Management */}
            <div id="asset-management" className="section-padding scroll-mt-24">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <AnimatedSection>
                  <div>
                    <h3 className="font-serif font-light text-display text-primary-500 mb-6">{t('service3Title')}</h3>
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
                  </div>
                </AnimatedSection>
                <AnimatedSection>
                  <div className="h-96 rounded-md overflow-hidden">
                    <Image
                      src={SERVICE_IMAGES.assetManagement}
                      alt={t('service3Title')}
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

      {/* Team Section */}
      <section id="our-team" className="section-padding bg-cream-100">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-serif font-light text-display text-primary-500 mb-2">{t('teamTitle')}</h2>
              <div className="w-16 h-0.5 bg-accent-gold mt-4 mx-auto mb-8"></div>
              <p className="font-sans text-lg text-secondary-500 max-w-3xl mx-auto leading-relaxed">
                {t('teamSubtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[1, 2].map((num) => (
              <AnimatedSection key={num}>
                <div className="bg-white rounded-md p-10 shadow-elegant hover:-translate-y-1 hover:shadow-elegant-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                    <span className="font-serif text-2xl text-primary-500">
                      {t(`team${num}Name`).split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-normal text-primary-500 mb-1">
                    {t(`team${num}Name`)}
                  </h3>
                  <p className="font-sans text-sm text-accent-gold tracking-wide mb-4">
                    {t(`team${num}Role`)}
                  </p>
                  <p className="font-sans text-secondary-500 leading-relaxed mb-6">
                    {t(`team${num}Bio`)}
                  </p>
                  <a
                    href="https://au.linkedin.com/company/vert-capital-australia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent-gold hover:text-accent-goldDark transition-colors duration-300"
                  >
                    <FaLinkedin className="w-4 h-4" />
                    <span className="font-sans text-sm">LinkedIn</span>
                  </a>
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
                  <div className="w-10 h-10 mb-6">
                    <svg className="w-8 h-8 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      {num === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />}
                      {num === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />}
                      {num === 3 && <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.502-4.688-4.502-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />}
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl font-normal text-primary-500 mb-3">{t(`value${num}Title`)}</h3>
                  <p className="font-sans text-secondary-500 leading-relaxed">{t(`value${num}Description`)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Section */}
      <section id="regulatory" className="section-padding bg-cream-200">
        <div className="container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif font-light text-display text-primary-500 mb-2">{t('regulatoryTitle')}</h2>
              <div className="w-16 h-0.5 bg-accent-gold mt-4 mb-8"></div>
              <p className="font-sans text-base text-secondary-500 leading-relaxed mb-8">
                {t('regulatoryDescription')}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <span className="font-sans text-sm text-secondary-400">{t('regulatoryFSG')}</span>
                <span className="font-sans text-sm text-secondary-400">{t('regulatoryDisclosure')}</span>
                <span className="font-sans text-sm text-secondary-400">{t('regulatoryPrivacy')}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-500 text-cream-100">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="font-serif font-light text-display mb-6">{t('ctaTitle')}</h2>
              <p className="font-sans text-lg opacity-80 mb-10 leading-relaxed">
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
