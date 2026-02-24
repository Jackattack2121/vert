'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FaLinkedin } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { LOGO } from '@/lib/images'

export default function Footer() {
  const t = useTranslations('footer')
  const tExplore = useTranslations('footer.explore')
  const tLocation = useTranslations('footer.location')
  const currentYear = new Date().getFullYear()

  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setNewsletterStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setNewsletterStatus('success')
        setEmail('')
      } else if (res.status === 409) {
        setNewsletterStatus('duplicate')
      } else {
        setNewsletterStatus('error')
      }
    } catch {
      setNewsletterStatus('error')
    }
  }

  return (
    <footer className="bg-primary-500 text-cream-100">
      <div className="container section-padding-small">
        {/* Newsletter Section */}
        <div className="mb-16 pb-16 border-b border-cream-100/10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-serif font-light text-3xl lg:text-4xl mb-4">{t('newsletter.title')}</h3>
              <p className="font-sans text-cream-200 opacity-80 text-base">
                {t('newsletter.subtitle')}
              </p>
            </div>
            <div>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter.placeholder')}
                  required
                  className="flex-1 px-5 py-4 bg-cream-100/10 text-cream-100 placeholder:text-cream-300/50
                             border border-cream-100/20 rounded-md font-sans text-sm
                             focus:border-accent-gold focus:outline-none transition-colors duration-300"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="px-8 py-4 bg-accent-gold text-white font-sans font-medium text-sm
                             tracking-wide rounded-md transition-all duration-300
                             hover:bg-accent-goldDark hover:scale-[1.02] whitespace-nowrap
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('newsletter.button')}
                </button>
              </form>
              {newsletterStatus === 'success' && (
                <p className="mt-3 font-sans text-sm text-accent-gold">{t('newsletter.success')}</p>
              )}
              {newsletterStatus === 'duplicate' && (
                <p className="mt-3 font-sans text-sm text-cream-200 opacity-80">{t('newsletter.duplicate')}</p>
              )}
              {newsletterStatus === 'error' && (
                <p className="mt-3 font-sans text-sm text-red-400">{t('newsletter.error')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <div className="relative h-11 w-auto mb-6">
              <Image
                src={LOGO.main}
                alt="Vert Capital"
                width={150}
                height={44}
                className="h-11 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="font-sans text-sm text-cream-200 opacity-70 max-w-sm leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* What We Do */}
          <div>
            <h4 className="font-sans text-xs font-medium tracking-[0.1em] uppercase mb-6 text-accent-gold">
              {t('navigation.whatWeDoTitle')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about#corporate-advisory" className="font-sans text-sm text-cream-200 opacity-80 hover:text-accent-gold hover:opacity-100 transition-colors duration-300">
                  {t('services.corporateAdvisory')}
                </Link>
              </li>
              <li>
                <Link href="/about#capital-raising" className="font-sans text-sm text-cream-200 opacity-80 hover:text-accent-gold hover:opacity-100 transition-colors duration-300">
                  {t('services.capitalRaising')}
                </Link>
              </li>
              <li>
                <Link href="/about#asset-management" className="font-sans text-sm text-cream-200 opacity-80 hover:text-accent-gold hover:opacity-100 transition-colors duration-300">
                  {t('services.assetManagement')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-sans text-xs font-medium tracking-[0.1em] uppercase mb-6 text-accent-gold">
              {t('navigation.exploreTitle')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="font-sans text-sm text-cream-200 opacity-80 hover:text-accent-gold hover:opacity-100 transition-colors duration-300">
                  {tExplore('about')}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="font-sans text-sm text-cream-200 opacity-80 hover:text-accent-gold hover:opacity-100 transition-colors duration-300">
                  {tExplore('portfolio')}
                </Link>
              </li>
              <li>
                <Link href="/news" className="font-sans text-sm text-cream-200 opacity-80 hover:text-accent-gold hover:opacity-100 transition-colors duration-300">
                  {tExplore('news')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs font-medium tracking-[0.1em] uppercase mb-6 text-accent-gold">
              {t('navigation.contactTitle')}
            </h4>
            <div className="space-y-3 font-sans text-sm text-cream-200 opacity-80">
              <p>{tLocation('city')}</p>
              <p>{tLocation('country')}</p>
              <p className="mt-4">
                <a href="tel:+61894810389" className="hover:text-accent-gold hover:opacity-100 transition-colors duration-300">
                  +61 8 9481 0389
                </a>
              </p>
              <p>
                <a href="mailto:info@vertcapital.com.au" className="hover:text-accent-gold hover:opacity-100 transition-colors duration-300">
                  info@vertcapital.com.au
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream-100/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
            <div className="flex items-center gap-6">
              <a
                href="https://au.linkedin.com/company/vert-capital-australia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-200 opacity-60 hover:text-accent-gold hover:opacity-100 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@vertcapital.com.au"
                className="text-cream-200 opacity-60 hover:text-accent-gold hover:opacity-100 transition-all duration-300"
                aria-label="Email"
              >
                <HiMail className="w-5 h-5" />
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="font-sans text-xs text-cream-200 opacity-50">
                {t('copyright', { year: currentYear })}
              </p>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
            <span className="font-sans text-xs text-cream-200 opacity-40">{t('legal.customNotice')}</span>
            <span className="font-sans text-xs text-cream-200 opacity-40">{t('legal.disclosurePolicy')}</span>
            <span className="font-sans text-xs text-cream-200 opacity-40">{t('legal.financialServicesGuide')}</span>
            <span className="font-sans text-xs text-cream-200 opacity-40">{t('legal.privacyPolicy')}</span>
          </div>

          {/* AFSL Disclaimer */}
          <p className="font-sans text-xs text-cream-200 opacity-40 text-center mb-4">
            {t('disclaimer')}
          </p>

          {/* General Advice Warning */}
          <p className="font-sans text-[11px] text-cream-200 opacity-30 text-center max-w-4xl mx-auto leading-relaxed">
            {t('generalAdviceWarning')}
          </p>
        </div>
      </div>
    </footer>
  )
}
