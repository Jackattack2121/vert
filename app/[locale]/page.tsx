'use client'

import { useEffect, useRef, useState } from 'react'
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
  const fullbleedRef = useRef<HTMLElement>(null)
  const parallaxImgRef = useRef<HTMLDivElement>(null)

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

  // Parallax scroll — writes directly to DOM to avoid re-renders
  useEffect(() => {
    const handleScroll = () => {
      if (!fullbleedRef.current || !parallaxImgRef.current) return
      const rect = fullbleedRef.current.getBoundingClientRect()
      const viewH = window.innerHeight
      if (rect.bottom < 0 || rect.top > viewH) return
      // progress: 0 when section bottom enters viewport, 1 when top leaves
      const progress = (viewH - rect.top) / (viewH + rect.height)
      const offset = (progress - 0.5) * 160
      parallaxImgRef.current.style.transform = `translateY(${offset}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main>
      {/* Hero Section - Montfort-style with video background */}
      <section className="relative min-h-screen flex items-end pb-32 overflow-hidden">
        {/* Full-cover background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero_lrg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Semi-transparent primary colour overlay */}
        <div className="absolute inset-0 bg-primary-500/70" />

        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(250,249,246,0.8) 1px, transparent 0)', backgroundSize: '48px 48px' }}></div>
        </div>

        {/* Content aligned left, Montfort style */}
        <div className="container relative z-10 text-cream-100">
          <AnimatedSection>
            <div className="max-w-3xl">
              <h1 className="font-serif font-light text-hero mb-8 leading-tight">
                {t('hero.titleLine1')}{' '}
                {t('hero.titleLine2')}{' '}
                {t('hero.titleLine3')}
              </h1>
              <div
                className="h-12 flex items-center mb-10"
                style={{
                  transition: 'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <p className="font-sans text-xl font-light opacity-80 tracking-wide">
                  {rotatingTexts[currentTextIndex]}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contact" variant="gold">
                  {t('hero.cta')}
                </Button>
                <Button href="/services" variant="outline" className="border-cream-100/40 text-cream-100 hover:bg-cream-100 hover:text-primary-500 hover:border-cream-100">
                  View Services
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator - minimal Montfort style */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-5 h-8 border border-cream-100/30 rounded-full flex items-start justify-center p-1.5">
            <div className="w-0.5 h-2 bg-cream-100/50 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Email Signup Bar - Montfort-style cream section */}
      <section className="bg-cream-200 py-12 lg:py-16">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="font-serif font-light text-xl lg:text-2xl text-primary-500">
              Keep up to date on all announcements from Vert Capital.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3 bg-white border border-primary-500/20 rounded-md font-sans text-sm text-primary-500
                           placeholder:text-secondary-400 focus:border-accent-gold focus:outline-none
                           transition-colors duration-300 w-full sm:w-72"
              />
              <button className="px-8 py-3 bg-primary-500 text-cream-100 font-sans font-medium text-sm
                                 tracking-wide rounded-md transition-all duration-300
                                 hover:bg-primary-600 hover:scale-[1.02] whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section - Montfort style with cream background */}
      <section className="section-padding bg-cream-100">
        <div className="container">
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="font-serif font-light text-display text-primary-500 mb-2">
                {t('servicesSection.titleLine1')} {t('servicesSection.titleLine2')}
              </h2>
              <div className="w-16 h-0.5 bg-accent-gold mt-4"></div>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Illustration placeholder */}
            <AnimatedSection>
              <div className="rounded-lg aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/services.jpg"
                  alt="Our Services"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>

            {/* Right: Value propositions grid */}
            <div className="grid sm:grid-cols-2 gap-10">
              {[1, 2, 3, 4].map((num) => (
                <AnimatedSection key={num}>
                  <div className="group">
                    <div className="w-10 h-10 mb-4 flex items-center justify-center">
                      <svg className="w-8 h-8 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        {num === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />}
                        {num === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
                        {num === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />}
                        {num === 3 && <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />}
                        {num === 4 && <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />}
                      </svg>
                    </div>
                    <h3 className="font-serif text-lg font-normal text-primary-500 mb-2">
                      {t(`servicesSection.service${num === 4 ? 3 : num}Title`)}
                    </h3>
                    <p className="font-sans text-sm text-secondary-500 leading-relaxed">
                      {t(`servicesSection.service${num === 4 ? 3 : num}Description`)}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Model Section - Montfort-style split layout */}
      <section className="section-padding bg-white">
        <div className="container">
          <AnimatedSection>
            <div className="mb-16 text-right">
              <h2 className="font-serif font-light text-display text-primary-500">
                {t('aboutSection.titleLine1')} {t('aboutSection.titleLine2')}
              </h2>
              <div className="w-16 h-0.5 bg-accent-gold mt-4 ml-auto"></div>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <div>
                <h3 className="font-serif font-light text-heading-lg text-primary-500 mb-6 leading-snug">
                  {t('intro.titleLine1')} {t('intro.titleLine2')} {t('intro.titleLine3')} {t('intro.titleLine4')}
                </h3>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div>
                <p className="font-sans text-base lg:text-lg text-secondary-500 leading-relaxed mb-8">
                  {t('intro.description')}
                </p>
                <p className="font-sans text-base lg:text-lg text-secondary-500 leading-relaxed mb-10">
                  {t('aboutSection.description')}
                </p>
                <Button href="/about" variant="primary">
                  {t('intro.cta')}
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section - Montfort style with serif numbers */}
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
          background="teal"
        />
      </section>

      {/* Full-bleed Image Section - Montfort style with parallax */}
      <section ref={fullbleedRef} className="relative max-h-[600px] h-[60vw] overflow-hidden">
        {/* Parallax image — oversized vertically so there is room to travel */}
        <div
          ref={parallaxImgRef}
          className="absolute inset-x-0 w-full"
          style={{ top: '-10%', height: '120%', willChange: 'transform' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/fullbleed.jpg"
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
        {/* Semi-transparent primary tint — much softer than the hero */}
        <div className="absolute inset-0 bg-primary-500/20 pointer-events-none" />
        {/* Subtle top/bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15 pointer-events-none" />
      </section>

      {/* Our Companies Section - Montfort style cream background */}
      <section className="section-padding bg-cream-200">
        <div className="container">
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="font-serif font-light text-display text-primary-500 mb-2">
                {t('companiesSection.titleLine1')} {t('companiesSection.titleLine2')}
              </h2>
              <div className="w-16 h-0.5 bg-accent-gold mt-4"></div>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            <AnimatedSection>
              <p className="font-sans text-base lg:text-lg text-secondary-500 leading-relaxed">
                {t('companiesSection.subtitle')}
              </p>
            </AnimatedSection>
            <AnimatedSection>
              <div className="flex justify-end">
                <Button href="/companies" variant="secondary">
                  {t('companiesSection.viewAllCompanies')}
                </Button>
              </div>
            </AnimatedSection>
          </div>

          {/* Company logos grid - clean Montfort style */}
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { src: '/images/companies/imgi_9_Logo-MSM-Corporation-International-MSM-1.png', alt: 'MSM Corporation International' },
                { src: '/images/companies/imgi_10_Logo-Raiden-Resources-Ltd-RDN-1.png', alt: 'Raiden Resources Ltd' },
                { src: '/images/companies/imgi_11_Logo-Minbos-Resources-Ltd-MNB-1.png', alt: 'Minbos Resources Ltd' },
                { src: '/images/companies/imgi_7_Logo-Province-Resources-Ltd-PRL-1.png', alt: 'Province Resources Ltd' },
              ].map((company) => (
                <div key={company.src} className="bg-white rounded-md p-8 flex items-center justify-center h-32 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-elegant transition-shadow duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={company.src} alt={company.alt} className="max-h-16 max-w-full object-contain" />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Investment Opportunities - Montfort split card style */}
      <section className="section-padding bg-white">
        <div className="container">
          <AnimatedSection>
            <div className="mb-16 text-right">
              <h2 className="font-serif font-light text-display text-primary-500">
                Investment Opportunities
              </h2>
              <div className="w-16 h-0.5 bg-accent-gold mt-4 ml-auto"></div>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="group relative overflow-hidden rounded-md bg-cream-100 p-10 lg:p-14 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
                <div className="w-12 h-12 mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl lg:text-3xl font-light text-primary-500 mb-4">Stock</h3>
                <p className="font-sans text-secondary-500 leading-relaxed mb-8">
                  Access equity investment opportunities through our carefully curated portfolio companies.
                </p>
                <Link href="/portal" className="inline-flex items-center gap-2 font-sans text-sm font-medium text-accent-gold tracking-wide group-hover:gap-4 transition-all duration-300">
                  Learn More <HiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="group relative overflow-hidden rounded-md bg-cream-100 p-10 lg:p-14 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300">
                <div className="w-12 h-12 mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl lg:text-3xl font-light text-primary-500 mb-4">Funds</h3>
                <p className="font-sans text-secondary-500 leading-relaxed mb-8">
                  Diversified fund investments managed by our experienced team of capital market professionals.
                </p>
                <Link href="/portal" className="inline-flex items-center gap-2 font-sans text-sm font-medium text-accent-gold tracking-wide group-hover:gap-4 transition-all duration-300">
                  Learn More <HiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Latest News Section - Montfort clean list style */}
      <section className="section-padding bg-cream-100">
        <div className="container">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-16">
              <div>
                <h2 className="font-serif font-light text-display text-primary-500">
                  {t('newsSection.titleLine1')} {t('newsSection.titleLine2')}
                </h2>
                <div className="w-16 h-0.5 bg-accent-gold mt-4"></div>
              </div>
              <Link href="/news" className="hidden md:inline-flex items-center gap-2 font-sans text-sm font-medium text-accent-gold tracking-wide hover:gap-4 transition-all duration-300">
                View All <HiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>

          {/* News list - Montfort style with dividers */}
          <div className="divide-y divide-primary-500/10">
            {[1, 2, 3, 4].map((num) => (
              <AnimatedSection key={num}>
                <article className="group py-6 lg:py-8">
                  <Link href="/news" className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-serif text-lg lg:text-xl font-normal text-primary-500 group-hover:text-accent-gold transition-colors duration-300 mb-1">
                        News Article Headline {num}
                      </h3>
                      <p className="font-sans text-sm text-secondary-400">
                        Brief excerpt of the latest news from Vert Capital...
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-sans text-xs text-secondary-400 whitespace-nowrap">
                        {num === 1 ? '15 February 2026' : num === 2 ? '10 February 2026' : num === 3 ? '5 February 2026' : '28 January 2026'}
                      </span>
                      <HiArrowRight className="w-4 h-4 text-accent-gold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </article>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="text-center mt-12 md:hidden">
              <Button href="/news" variant="secondary">
                {t('newsSection.viewAllNews')}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section - Montfort deep teal */}
      <section className="section-padding bg-primary-500 text-cream-100">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="font-serif font-light text-display mb-6">
                {t('ctaSection.titleLine1')}<br />
                {t('ctaSection.titleLine2')}
              </h2>
              <p className="font-sans text-lg mb-10 opacity-80 max-w-2xl mx-auto leading-relaxed">
                {t('ctaSection.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="gold">
                  {t('ctaSection.contactButton')}
                </Button>
                <Button href="/services" variant="outline" className="border-cream-100/40 text-cream-100 hover:bg-cream-100 hover:text-primary-500 hover:border-cream-100">
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
