'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SubscriptionForm from '@/components/investor/SubscriptionForm'
import { HiOutlineGlobe, HiOutlineUserGroup, HiOutlineShieldCheck, HiOutlineLightningBolt } from 'react-icons/hi'

export default function ESGPage() {
  const t = useTranslations('investors.esg')
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-secondary-900 py-32 md:py-40 overflow-hidden">
        {/* Background Image with fade */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/green-dense-forests-surround-old-mining-factory-wi-2025-08-28-11-53-12-utc.jpg)' }}
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

      {/* ESG Pillars */}
      <section className="section-padding bg-white">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-heading-xl text-secondary-900 mb-6">
                {t('frameworkHeading')}
              </h2>
              <p className="text-lg text-gray-600 font-josefin max-w-3xl mx-auto">
                {t('frameworkDescription')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Environmental */}
            <AnimatedSection delay={0.1}>
              <div className="bg-emerald-50 border-2 border-emerald-200 p-8 text-center hover:border-emerald-600 transition-all">
                <div className="bg-emerald-600 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <HiOutlineGlobe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-3 uppercase tracking-wider">{t('environmentTitle')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('environmentalDescription')}
                </p>
              </div>
            </AnimatedSection>

            {/* Social */}
            <AnimatedSection delay={0.2}>
              <div className="bg-blue-50 border-2 border-blue-200 p-8 text-center hover:border-blue-600 transition-all">
                <div className="bg-blue-600 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <HiOutlineUserGroup className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-3 uppercase tracking-wider">{t('socialTitle')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('socialDescription')}
                </p>
              </div>
            </AnimatedSection>

            {/* Governance */}
            <AnimatedSection delay={0.3}>
              <div className="bg-purple-50 border-2 border-purple-200 p-8 text-center hover:border-purple-600 transition-all">
                <div className="bg-purple-600 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <HiOutlineShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-3 uppercase tracking-wider">{t('governanceTitle')}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {t('governanceDescription')}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-white p-12 text-center border-2 border-gray-200">
                <div className="bg-primary-600 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <HiOutlineLightningBolt className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-heading-lg text-secondary-900 mb-6 uppercase tracking-wider">
                  {t('comingSoonTitle')}
                </h2>
                <p className="text-lg text-gray-600 mb-8 font-josefin leading-relaxed">
                  {t('comingSoonIntro')}
                </p>
                <p className="text-gray-700 mb-6 font-semibold uppercase tracking-wider">
                  {t('reportWillInclude')}
                </p>
                <ul className="text-left max-w-2xl mx-auto space-y-2 mb-8 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-600 mt-1 font-bold">✓</span>
                    <span>{t('reportItem1')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-600 mt-1 font-bold">✓</span>
                    <span>{t('reportItem2')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-600 mt-1 font-bold">✓</span>
                    <span>{t('reportItem3')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-600 mt-1 font-bold">✓</span>
                    <span>{t('reportItem4')}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-600 mt-1 font-bold">✓</span>
                    <span>{t('reportItem5')}</span>
                  </li>
                </ul>
                
                <div className="max-w-md mx-auto">
                  <p className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
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
      <section className="section-padding bg-primary-600 text-white text-center">
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-heading-xl mb-8">
              {t('commitmentTitle')}
            </h2>
            <p className="text-xl font-josefin leading-relaxed mb-12 opacity-90">
              {t('commitmentQuote')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/company/corporate-governance"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-600 font-semibold uppercase tracking-wider hover:bg-gray-100 transition-colors"
              >
                {t('governanceButton')}
              </a>
              <a
                href="/company/corporate-responsibility"
                className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold uppercase tracking-wider hover:bg-white hover:text-primary-600 transition-colors"
              >
                {t('responsibilityButton')}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

