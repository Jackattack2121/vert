'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FaLinkedin } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { LOGO } from '@/lib/images'

export default function Footer() {
  const t = useTranslations('footer')
  const tCompany = useTranslations('footer.company')
  const tInvestors = useTranslations('footer.investors')
  const tLocation = useTranslations('footer.location')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-500 text-cream-100">
      <div className="container section-padding-small">
        {/* Newsletter Section - Montfort style top of footer */}
        <div className="mb-16 pb-16 border-b border-cream-100/10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-serif font-light text-3xl lg:text-4xl mb-4">{t('newsletter.title')}</h3>
              <p className="font-sans text-cream-200 opacity-80 text-base">
                {t('newsletter.subtitle')}
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  className="flex-1 px-5 py-4 bg-cream-100/10 text-cream-100 placeholder:text-cream-300/50
                             border border-cream-100/20 rounded-md font-sans text-sm
                             focus:border-accent-gold focus:outline-none transition-colors duration-300"
                />
                <button className="px-8 py-4 bg-accent-gold text-white font-sans font-medium text-sm
                                   tracking-wide rounded-md transition-all duration-300
                                   hover:bg-accent-goldDark hover:scale-[1.02] whitespace-nowrap">
                  {t('newsletter.button')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content - Multi-column Montfort style */}
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

          {/* Services */}
          <div>
            <h4 className="font-sans text-xs font-medium tracking-[0.1em] uppercase mb-6 text-accent-gold">
              {t('navigation.servicesTitle')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="font-sans text-sm text-cream-200 opacity-80 hover:text-accent-gold hover:opacity-100 transition-colors duration-300">
                  {t('services.corporateAdvisory')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="font-sans text-sm text-cream-200 opacity-80 hover:text-accent-gold hover:opacity-100 transition-colors duration-300">
                  {t('services.capitalRaising')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="font-sans text-sm text-cream-200 opacity-80 hover:text-accent-gold hover:opacity-100 transition-colors duration-300">
                  {t('services.assetManagement')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-sans text-xs font-medium tracking-[0.1em] uppercase mb-6 text-accent-gold">
              {t('navigation.companyTitle')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="font-sans text-sm text-cream-200 opacity-80 hover:text-accent-gold hover:opacity-100 transition-colors duration-300">
                  {tCompany('about')}
                </Link>
              </li>
              <li>
                <Link href="/companies" className="font-sans text-sm text-cream-200 opacity-80 hover:text-accent-gold hover:opacity-100 transition-colors duration-300">
                  {tCompany('companies')}
                </Link>
              </li>
              <li>
                <Link href="/sponsorships" className="font-sans text-sm text-cream-200 opacity-80 hover:text-accent-gold hover:opacity-100 transition-colors duration-300">
                  {tCompany('sponsorships')}
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-cream-100/10 pt-8">
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com"
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
      </div>
    </footer>
  )
}
