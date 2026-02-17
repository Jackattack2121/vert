'use client'

import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import StatsBar from '@/components/ui/StatsBar'
import { Link } from '@/i18n/navigation'
import { HiArrowRight } from 'react-icons/hi'

export default function HomePage() {
  const locale = useLocale()
  const t = useTranslations('homepage')
  const [isVisible, setIsVisible] = useState(true)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const rotatingTexts = [
    t('hero.rotatingText1'),
    t('hero.rotatingText2'),
    t('hero.rotatingText3'),
  ]

  // Rotating text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length)
        setIsVisible(true)
      }, 500)
    }, 3500)

    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 overflow-hidden">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="container relative z-10 text-center text-white py-32">
          <AnimatedSection>
            <div className="max-w-5xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-wider mb-4 opacity-90">
                {t('hero.companyName')}
              </p>
              <h1 className="text-hero mb-8">
                {t('hero.titleLine1')}<br />
                {t('hero.titleLine2')}<br />
                {t('hero.titleLine3')}
              </h1>
              <div 
                className="h-16 flex items-center justify-center mb-12"
                style={{
                  transition: 'opacity 500ms ease-in-out',
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <p className="text-2xl font-light opacity-90">
                  {rotatingTexts[currentTextIndex]}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="primary" className="bg-white text-primary-600 hover:bg-gray-100">
                  {t('hero.cta')}
                </Button>
                <Button href="/services" variant="secondary" className="border-white text-white hover:bg-white hover:text-primary-600">
                  View Services
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section>
        <StatsBar
          stats={[
            {
              value: t('stats.stat1Value'),
              label: t('stats.stat1Label'),
              sublabel: t('stats.stat1Sublabel'),
            },
            {
              value: t('stats.stat2Value'),
              label: t('stats.stat2Label'),
              sublabel: t('stats.stat2Sublabel'),
            },
            {
              value: t('stats.stat3Value'),
              label: t('stats.stat3Label'),
              sublabel: t('stats.stat3Sublabel'),
            },
            {
              value: t('stats.stat4Value'),
              label: t('stats.stat4Label'),
              sublabel: t('stats.stat4Sublabel'),
            },
          ]}
        />
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div>
                <h2 className="text-heading-lg mb-6">
                  {t('intro.titleLine1')}<br />
                  {t('intro.titleLine2')}<br />
                  {t('intro.titleLine3')}<br />
                  {t('intro.titleLine4')}
                </h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div>
                <p className="text-lg text-gray-600 mb-8">
                  {t('intro.description')}
                </p>
                <Button href="/about" variant="primary">
                  {t('intro.cta')}
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-heading-xl mb-4">
                {t('servicesSection.titleLine1')} {t('servicesSection.titleLine2')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('servicesSection.subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <AnimatedSection>
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('servicesSection.service1Title')}</h3>
                <p className="text-gray-600 mb-6">
                  {t('servicesSection.service1Description')}
                </p>
                <Link href="/services" className="text-primary-600 font-semibold uppercase tracking-wider text-sm inline-flex items-center gap-2 hover:gap-4 transition-all">
                  Learn More <HiArrowRight />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('servicesSection.service2Title')}</h3>
                <p className="text-gray-600 mb-6">
                  {t('servicesSection.service2Description')}
                </p>
                <Link href="/services" className="text-primary-600 font-semibold uppercase tracking-wider text-sm inline-flex items-center gap-2 hover:gap-4 transition-all">
                  Learn More <HiArrowRight />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('servicesSection.service3Title')}</h3>
                <p className="text-gray-600 mb-6">
                  {t('servicesSection.service3Description')}
                </p>
                <Link href="/services" className="text-primary-600 font-semibold uppercase tracking-wider text-sm inline-flex items-center gap-2 hover:gap-4 transition-all">
                  Learn More <HiArrowRight />
                </Link>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <div className="text-center">
              <Button href="/services" variant="primary">
                {t('servicesSection.viewAllServices')}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-heading-xl mb-6">
                {t('aboutSection.titleLine1')} {t('aboutSection.titleLine2')}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {t('aboutSection.description')}
              </p>
              <Button href="/about" variant="secondary" className="border-white text-white hover:bg-white hover:text-primary-600">
                {t('aboutSection.learnMore')}
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-heading-xl mb-4">
                {t('companiesSection.titleLine1')} {t('companiesSection.titleLine2')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('companiesSection.subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((num) => (
              <AnimatedSection key={num}>
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center text-gray-400">
                  Company {num}
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="text-center">
              <Button href="/companies" variant="primary">
                {t('companiesSection.viewAllCompanies')}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* News Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-heading-xl mb-4">
                {t('newsSection.titleLine1')} {t('newsSection.titleLine2')}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((num) => (
              <AnimatedSection key={num}>
                <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700"></div>
                  <div className="p-6">
                    <div className="text-sm text-primary-600 font-semibold mb-2">Company News</div>
                    <h3 className="text-xl font-bold mb-3">News Article {num}</h3>
                    <p className="text-gray-600 mb-4">Brief excerpt of the news article...</p>
                    <div className="text-primary-600 font-semibold uppercase tracking-wider text-sm">
                      Read More →
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="text-center">
              <Button href="/news" variant="primary">
                {t('newsSection.viewAllNews')}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-heading-xl mb-6">
                {t('ctaSection.titleLine1')}<br />
                {t('ctaSection.titleLine2')}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {t('ctaSection.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100">
                  {t('ctaSection.contactButton')}
                </Button>
                <Button href="/services" variant="secondary" className="border-white text-white hover:bg-white hover:text-primary-600">
                  {t('ctaSection.servicesButton')}
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  )
}
