'use client'

import { useTranslations } from 'next-intl'
import TradingViewWidget from '@/components/investor/TradingViewWidget'
import SubscriptionForm from '@/components/investor/SubscriptionForm'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { Link } from '@/i18n/navigation'
import {
  HiOutlineDocumentText,
  HiOutlinePresentationChartLine,
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineDownload,
  HiOutlineGlobe
} from 'react-icons/hi'
import { HERO_IMAGES } from '@/lib/images'

export default function InvestorCentre() {
  const t = useTranslations('investors')
  const tQuickLinks = useTranslations('investors.quickLinks')

  const quickLinks = [
    {
      title: tQuickLinks('asxAnnouncements'),
      description: tQuickLinks('asxDescription'),
      icon: HiOutlineDocumentText,
      href: '/investors/asx-announcements',
    },
    {
      title: tQuickLinks('financialReports'),
      description: tQuickLinks('financialDescription'),
      icon: HiOutlineChartBar,
      href: '/investors/financial-reports',
    },
    {
      title: tQuickLinks('presentations'),
      description: tQuickLinks('presentationsDescription'),
      icon: HiOutlinePresentationChartLine,
      href: '/investors/presentations',
    },
    {
      title: tQuickLinks('shareInfo'),
      description: tQuickLinks('shareDescription'),
      icon: HiOutlineChartBar,
      href: '/investors/share-information',
    },
    {
      title: tQuickLinks('calendar'),
      description: tQuickLinks('calendarDescription'),
      icon: HiOutlineCalendar,
      href: '/investors/calendar',
    },
    {
      title: tQuickLinks('esg'),
      description: tQuickLinks('esgDescription'),
      icon: HiOutlineGlobe,
      href: '/investors/esg',
    },
  ]
  return (
    <>
      {/* Hero Section - Minimal */}
      <section className="relative bg-primary-500 py-32 md:py-40 overflow-hidden">
        {/* Background Image with fade */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMAGES.investors})` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-primary-500/70"></div>

        <div className="container relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="font-serif font-light text-hero text-cream-100 mb-4">
                {t('centre.title')}
              </h1>
              <p className="font-sans text-xl text-cream-200 opacity-90">
                {t('centre.subtitle')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Share Price Widget */}
      <section className="section-padding-small bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <AnimatedSection className="lg:col-span-2">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-serif font-normal tracking-wider text-primary-500 mb-2">
                    LIVE MARKET DATA
                  </p>
                </div>
                <div style={{ minHeight: '400px', height: '400px' }}>
                  <TradingViewWidget symbol="ASX:YUG|1M|AUD" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-sans text-secondary-500 leading-relaxed">
                    Share price data provided by TradingView. 20-minute delay. Not financial advice.
                  </p>
                  <a
                    href="https://www.asx.com.au/markets/company/YUG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-accent-gold hover:text-accent-goldDark font-medium transition-colors duration-300"
                    aria-label="View real-time YUG share price on ASX website (opens in new tab)"
                  >
                    View real-time price on ASX.com.au
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <SubscriptionForm variant="card" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="font-serif font-light text-display text-primary-500 mb-4">
                {t('centre.resourcesTitle')}
              </h2>
              <div className="w-16 h-0.5 bg-accent-gold mt-4"></div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <AnimatedSection key={link.title} delay={index * 0.05}>
                  <Link
                    href={link.href}
                    className="block focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 rounded-md"
                    aria-label={`Navigate to ${link.title}`}
                  >
                    <div className="group bg-white border border-primary-500/10 p-8 hover-lift hover:border-primary-500 transition-all h-full rounded-md">
                      <div className="bg-cream-100 p-4 rounded-md inline-block mb-4">
                        <Icon className="w-16 h-16 text-primary-500 transition-transform group-hover:scale-110" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-serif font-normal mb-3 group-hover:text-primary-500 transition-colors tracking-wide">
                        {link.title}
                      </h3>
                      <p className="text-base font-sans text-secondary-500 leading-relaxed mb-4">
                        {link.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-500">
                        <span>{tQuickLinks('view')}</span>
                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact IR Team - Compact Banner */}
      <section className="py-16 bg-primary-500 text-cream-100 text-center">
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl font-serif font-light mb-4">
              {t('centre.questionsTitle')}
            </h2>
            <p className="text-lg mb-8 opacity-90">
              {t('centre.questionsSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/investors/contact" variant="secondary">
                {t('centre.contactIrButton')}
              </Button>
              <a
                href="/investors/fact-sheet"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-transparent border border-cream-100/40 text-cream-100
                           font-sans font-medium tracking-wide text-sm rounded-md
                           transition-all duration-300 ease-montfort
                           hover:bg-cream-100 hover:text-primary-500 hover:border-cream-100"
                aria-label="Download company fact sheet"
              >
                <span>{t('centre.downloadFactSheet')}</span>
                <HiOutlineDownload className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
