'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { HiOutlineDownload } from 'react-icons/hi'

export default function ProspectusPage() {
  const t = useTranslations('prospectus')
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-secondary-900 py-32 md:py-40 overflow-hidden">
        {/* Background Image with fade */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/hero-mining-1.jpg)' }}
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

      {/* Overview Section */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="text-heading-lg text-secondary-900 mb-8">
              {t('overviewHeading')}
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-josefin mb-8">
              <p>{t('descriptionParagraph1')}</p>
              <p>{t('descriptionParagraph2')}</p>
            </div>
            <div className="bg-gray-50 p-8 mb-8">
              <h3 className="text-xl font-bold text-secondary-900 mb-4">{t('fundsTitle')}</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1 font-bold">✓</span>
                  <span>{t('fund1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1 font-bold">✓</span>
                  <span>{t('fund2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1 font-bold">✓</span>
                  <span>{t('fund3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1 font-bold">✓</span>
                  <span>{t('fund4')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1 font-bold">✓</span>
                  <span>{t('fund5')}</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          {/* Important Dates */}
          <AnimatedSection delay={0.2}>
            <h2 className="text-heading-lg text-secondary-900 mb-8">
              {t('datesHeading')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="border-2 border-gray-200 p-6">
                <p className="text-sm font-semibold text-gray-500 mb-2">{t('dateAnnouncementLabel')}</p>
                <p className="text-lg font-bold text-secondary-900">{t('dateAnnouncement')}</p>
              </div>
              <div className="border-2 border-gray-200 p-6">
                <p className="text-sm font-semibold text-gray-500 mb-2">{t('dateExDateLabel')}</p>
                <p className="text-lg font-bold text-secondary-900">{t('dateExDate')}</p>
              </div>
              <div className="border-2 border-gray-200 p-6">
                <p className="text-sm font-semibold text-gray-500 mb-2">{t('dateRecordLabel')}</p>
                <p className="text-lg font-bold text-secondary-900">{t('dateRecord')}</p>
              </div>
              <div className="border-2 border-gray-200 p-6">
                <p className="text-sm font-semibold text-gray-500 mb-2">{t('dateOpeningLabel')}</p>
                <p className="text-lg font-bold text-secondary-900">{t('dateOpening')}</p>
              </div>
              <div className="border-2 border-gray-200 p-6">
                <p className="text-sm font-semibold text-gray-500 mb-2">{t('dateClosingLabel')}</p>
                <p className="text-lg font-bold text-secondary-900">{t('dateClosing')}</p>
              </div>
              <div className="border-2 border-gray-200 p-6">
                <p className="text-sm font-semibold text-gray-500 mb-2">{t('dateIssueLabel')}</p>
                <p className="text-lg font-bold text-secondary-900">{t('dateIssue')}</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Documents */}
          <AnimatedSection delay={0.3}>
            <h2 className="text-heading-lg text-secondary-900 mb-8">
              {t('documentsHeading')}
            </h2>
            <p className="text-gray-600 mb-8">{t('documentsDescription')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <a href="#" className="border-2 border-gray-200 p-8 hover:border-primary-600 transition-all flex items-center gap-4">
                <HiOutlineDownload className="w-8 h-8 text-primary-600" />
                <div>
                  <h3 className="font-bold text-secondary-900 mb-1">{t('prospectusDocument')}</h3>
                  <p className="text-sm text-gray-500">{t('prospectusDescription')}</p>
                </div>
              </a>
              <a href="#" className="border-2 border-gray-200 p-8 hover:border-primary-600 transition-all flex items-center gap-4">
                <HiOutlineDownload className="w-8 h-8 text-primary-600" />
                <div>
                  <h3 className="font-bold text-secondary-900 mb-1">{t('formDocument')}</h3>
                  <p className="text-sm text-gray-500">{t('formDescription')}</p>
                </div>
              </a>
            </div>
          </AnimatedSection>

          {/* Important Notice */}
          <AnimatedSection delay={0.4}>
            <div className="bg-amber-50 border-2 border-amber-200 p-8">
              <h3 className="text-xl font-bold text-secondary-900 mb-4">{t('noticeHeading')}</h3>
              <p className="text-gray-700 leading-relaxed">{t('noticeContent')}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-primary-600 text-white text-center">
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-heading-xl mb-4">
              {t('contactHeading')}
            </h2>
            <a
              href="/investors/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-600 font-semibold uppercase tracking-wider hover:bg-gray-100 transition-colors"
            >
              {t('contactHeading')}
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
