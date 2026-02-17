'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SubscriptionForm from '@/components/investor/SubscriptionForm'
import Button from '@/components/ui/Button'
import { HiOutlineGlobe, HiOutlineUserGroup, HiOutlineShieldCheck } from 'react-icons/hi'

export default function ESGPage() {
  const t = useTranslations('investors.esg')

  return (
    <>
      {/* Hero Section - Montfort-style deep teal */}
      <section className="relative bg-primary-500 py-40 md:py-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(/images/green-dense-forests-surround-old-mining-factory-wi-2025-08-28-11-53-12-utc.jpg)' }}
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

      {/* ESG Pillars */}
      <section className="section-padding bg-cream-100">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-serif font-light text-display text-primary-500 mb-2">
                {t('frameworkHeading')}
              </h2>
              <div className="w-16 h-0.5 bg-accent-gold mt-4 mx-auto mb-8"></div>
              <p className="font-sans text-lg text-secondary-500 max-w-3xl mx-auto leading-relaxed">
                {t('frameworkDescription')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Environmental */}
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-md p-10 hover:-translate-y-1 hover:shadow-elegant-lg transition-all duration-300 h-full">
                <div className="w-14 h-14 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                  <HiOutlineGlobe className="w-7 h-7 text-primary-500" />
                </div>
                <h3 className="font-serif text-xl font-normal text-primary-500 mb-3">{t('environmentTitle')}</h3>
                <p className="font-sans text-secondary-500 leading-relaxed">
                  {t('environmentalDescription')}
                </p>
              </div>
            </AnimatedSection>

            {/* Social */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-md p-10 hover:-translate-y-1 hover:shadow-elegant-lg transition-all duration-300 h-full">
                <div className="w-14 h-14 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                  <HiOutlineUserGroup className="w-7 h-7 text-primary-500" />
                </div>
                <h3 className="font-serif text-xl font-normal text-primary-500 mb-3">{t('socialTitle')}</h3>
                <p className="font-sans text-secondary-500 leading-relaxed">
                  {t('socialDescription')}
                </p>
              </div>
            </AnimatedSection>

            {/* Governance */}
            <AnimatedSection delay={0.3}>
              <div className="bg-white rounded-md p-10 hover:-translate-y-1 hover:shadow-elegant-lg transition-all duration-300 h-full">
                <div className="w-14 h-14 bg-primary-500/10 rounded-full flex items-center justify-center mb-6">
                  <HiOutlineShieldCheck className="w-7 h-7 text-primary-500" />
                </div>
                <h3 className="font-serif text-xl font-normal text-primary-500 mb-3">{t('governanceTitle')}</h3>
                <p className="font-sans text-secondary-500 leading-relaxed">
                  {t('governanceDescription')}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-cream-100 rounded-md p-12 text-center">
                <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="font-serif font-light text-display text-primary-500 mb-6">
                  {t('comingSoonTitle')}
                </h2>
                <p className="font-sans text-lg text-secondary-500 mb-8 leading-relaxed max-w-2xl mx-auto">
                  {t('comingSoonIntro')}
                </p>
                <p className="font-sans text-sm tracking-[0.1em] uppercase text-primary-500 mb-6">
                  {t('reportWillInclude')}
                </p>
                <ul className="text-left max-w-2xl mx-auto space-y-3 mb-10">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <li key={num} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-gold"></div>
                      </div>
                      <span className="font-sans text-secondary-500">{t(`reportItem${num}`)}</span>
                    </li>
                  ))}
                </ul>

                <div className="max-w-md mx-auto">
                  <p className="font-sans text-xs tracking-[0.1em] uppercase text-secondary-400 mb-4">
                    {t('subscribePrompt')}
                  </p>
                  <SubscriptionForm variant="inline" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="section-padding bg-primary-500 text-cream-100 text-center">
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif font-light text-display mb-8">
              {t('commitmentTitle')}
            </h2>
            <p className="font-sans text-xl leading-relaxed mb-12 opacity-90">
              {t('commitmentQuote')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/company/corporate-governance" variant="gold">
                {t('governanceButton')}
              </Button>
              <Button href="/company/corporate-responsibility" variant="outline" className="border-cream-100/40 text-cream-100 hover:bg-cream-100 hover:text-primary-500 hover:border-cream-100">
                {t('responsibilityButton')}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
