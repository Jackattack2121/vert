'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { HiOutlineDownload } from 'react-icons/hi'

export default function ProspectusPage() {
  const t = useTranslations('prospectus')

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-500 py-32 md:py-40 overflow-hidden">
        {/* Background Image with fade */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/hero-mining-1.jpg)' }}
        />

        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-primary-500/60"></div>

        <div className="container relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="font-serif font-light text-hero text-cream-100 mb-4">
                {t('heroTitle')}
              </h1>
              <p className="font-sans text-sm font-normal tracking-wider text-cream-100/90">
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
            <h2 className="font-serif font-light text-display text-primary-500 mb-8">
              {t('overviewHeading')}
            </h2>
            <div className="space-y-6 font-sans text-base text-secondary-500 leading-relaxed mb-8">
              <p>{t('descriptionParagraph1')}</p>
              <p>{t('descriptionParagraph2')}</p>
            </div>
            <div className="bg-cream-100 p-8 mb-8">
              <h3 className="text-xl font-serif font-normal text-primary-500 mb-4">{t('fundsTitle')}</h3>
              <ul className="space-y-3 text-secondary-600">
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1 font-bold">✓</span>
                  <span>{t('fund1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1 font-bold">✓</span>
                  <span>{t('fund2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1 font-bold">✓</span>
                  <span>{t('fund3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1 font-bold">✓</span>
                  <span>{t('fund4')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-500 mt-1 font-bold">✓</span>
                  <span>{t('fund5')}</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          {/* Important Dates */}
          <AnimatedSection delay={0.2}>
            <h2 className="font-serif font-light text-display text-primary-500 mb-8">
              {t('datesHeading')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="border-2 border-gray-200 p-6">
                <p className="text-sm font-semibold text-secondary-400 mb-2">{t('dateAnnouncementLabel')}</p>
                <p className="text-lg font-serif font-normal text-primary-500">{t('dateAnnouncement')}</p>
              </div>
              <div className="border-2 border-gray-200 p-6">
                <p className="text-sm font-semibold text-secondary-400 mb-2">{t('dateExDateLabel')}</p>
                <p className="text-lg font-serif font-normal text-primary-500">{t('dateExDate')}</p>
              </div>
              <div className="border-2 border-gray-200 p-6">
                <p className="text-sm font-semibold text-secondary-400 mb-2">{t('dateRecordLabel')}</p>
                <p className="text-lg font-serif font-normal text-primary-500">{t('dateRecord')}</p>
              </div>
              <div className="border-2 border-gray-200 p-6">
                <p className="text-sm font-semibold text-secondary-400 mb-2">{t('dateOpeningLabel')}</p>
                <p className="text-lg font-serif font-normal text-primary-500">{t('dateOpening')}</p>
              </div>
              <div className="border-2 border-gray-200 p-6">
                <p className="text-sm font-semibold text-secondary-400 mb-2">{t('dateClosingLabel')}</p>
                <p className="text-lg font-serif font-normal text-primary-500">{t('dateClosing')}</p>
              </div>
              <div className="border-2 border-gray-200 p-6">
                <p className="text-sm font-semibold text-secondary-400 mb-2">{t('dateIssueLabel')}</p>
                <p className="text-lg font-serif font-normal text-primary-500">{t('dateIssue')}</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Documents */}
          <AnimatedSection delay={0.3}>
            <h2 className="font-serif font-light text-display text-primary-500 mb-8">
              {t('documentsHeading')}
            </h2>
            <p className="text-secondary-500 mb-8">{t('documentsDescription')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <a href="#" className="border-2 border-gray-200 p-8 hover:border-primary-500 transition-all flex items-center gap-4">
                <HiOutlineDownload className="w-8 h-8 text-primary-500" />
                <div>
                  <h3 className="font-serif font-normal text-primary-500 mb-1">{t('prospectusDocument')}</h3>
                  <p className="text-sm text-secondary-400">{t('prospectusDescription')}</p>
                </div>
              </a>
              <a href="#" className="border-2 border-gray-200 p-8 hover:border-primary-500 transition-all flex items-center gap-4">
                <HiOutlineDownload className="w-8 h-8 text-primary-500" />
                <div>
                  <h3 className="font-serif font-normal text-primary-500 mb-1">{t('formDocument')}</h3>
                  <p className="text-sm text-secondary-400">{t('formDescription')}</p>
                </div>
              </a>
            </div>
          </AnimatedSection>

          {/* Important Notice */}
          <AnimatedSection delay={0.4}>
            <div className="bg-amber-50 border-2 border-amber-200 p-8">
              <h3 className="text-xl font-serif font-normal text-primary-500 mb-4">{t('noticeHeading')}</h3>
              <p className="text-secondary-600 leading-relaxed">{t('noticeContent')}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-primary-500 text-cream-100 text-center">
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif font-light text-display text-cream-100 mb-4">
              {t('contactHeading')}
            </h2>
            <a
              href="/investors/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-500 font-semibold hover:bg-cream-200 transition-colors"
            >
              {t('contactHeading')}
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
