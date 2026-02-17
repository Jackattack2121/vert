'use client'

import { useState, useEffect, useRef } from 'react'
import { Link, usePathname } from '@/i18n/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { HiMenu, HiX } from 'react-icons/hi'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import ProjectPicker from './ProjectPicker'
import LanguageSwitcher from './LanguageSwitcher'
import { LOGO } from '@/lib/images'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const pathname = usePathname()
  const t = useTranslations('navigation.header')

  // Check if we're on the homepage
  const isHomepage = pathname === '/' || pathname === ''

  const navigation = [
    { name: t('aboutLink'), href: '/about' },
    { name: t('companiesLink'), href: '/companies' },
    { name: t('sponsorshipsLink'), href: '/sponsorships' },
    { name: t('newsLink'), href: '/news' },
    { name: t('contactLink'), href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.to('.mobile-menu', {
        x: 0,
        duration: 0.4,
        ease: 'power3.out',
      })
      document.body.style.overflow = 'hidden'
    } else {
      gsap.to('.mobile-menu', {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
      })
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Animate header background when dropdown opens
  useEffect(() => {
    if (headerRef.current) {
      if (projectsDropdownOpen) {
        gsap.to(headerRef.current, {
          backgroundColor: '#0A4D4D',
          duration: 0.4,
          ease: 'power3.out',
        })
        if (logoRef.current) {
          gsap.to(logoRef.current, {
            filter: 'brightness(0) invert(1)',
            duration: 0.4,
            ease: 'power3.out',
          })
        }
      } else {
        const targetBg = scrolled || !isHomepage ? '#FFFFFF' : 'transparent'
        const shouldInvert = !scrolled && isHomepage
        gsap.to(headerRef.current, {
          backgroundColor: targetBg,
          duration: 0.4,
          ease: 'power3.out',
        })
        if (logoRef.current) {
          gsap.to(logoRef.current, {
            filter: shouldInvert ? 'brightness(0) invert(1)' : 'brightness(1) invert(0)',
            duration: 0.4,
            ease: 'power3.out',
          })
        }
      }
    }
  }, [projectsDropdownOpen, scrolled, isHomepage])

  const isSolid = scrolled || !isHomepage
  const isDarkHeader = projectsDropdownOpen || (!isSolid && isHomepage)

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-[60] transition-shadow duration-300',
        isSolid && !projectsDropdownOpen && 'shadow-[0_1px_0_rgba(0,0,0,0.06)]'
      )}
      style={{ backgroundColor: projectsDropdownOpen ? '#0A4D4D' : (isSolid ? '#FFFFFF' : 'transparent') }}
    >
      <div className="container">
        <div className="flex items-center justify-between py-5 md:py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 md:h-11 w-auto">
              <Image
                ref={logoRef}
                src={LOGO.main}
                alt="Vert Capital"
                width={150}
                height={44}
                className="h-10 md:h-11 w-auto object-contain"
                style={{ filter: isDarkHeader ? 'brightness(0) invert(1)' : 'brightness(1) invert(0)' }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation - Montfort-style clean minimal */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={cn(
                'font-sans text-[13px] font-medium tracking-[0.05em] transition-colors duration-300 link-underline',
                isDarkHeader ? 'text-cream-100 hover:text-accent-gold' : 'text-primary-500 hover:text-accent-gold',
                pathname === '/' && 'text-accent-gold'
              )}
            >
              {t('homeLink')}
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setProjectsDropdownOpen(true)}
              onMouseLeave={() => setProjectsDropdownOpen(false)}
            >
              <button
                className={cn(
                  'font-sans text-[13px] font-medium tracking-[0.05em] transition-colors duration-300 flex items-center gap-1',
                  isDarkHeader ? 'text-cream-100 hover:text-accent-gold' : 'text-primary-500 hover:text-accent-gold'
                )}
              >
                {t('servicesLink')}
                <svg
                  className={cn('w-3 h-3 transition-transform duration-300', projectsDropdownOpen && 'rotate-180')}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={cn(
                  'absolute left-0 top-full pt-3 transition-all duration-200',
                  projectsDropdownOpen
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                )}
              >
                <div className="w-64 bg-white shadow-elegant-lg rounded-md py-2">
                  <Link href="/services" className="block px-6 py-3 font-sans text-sm text-primary-500 hover:bg-cream-200 hover:text-accent-gold transition-colors duration-200">
                    {t('corporateAdvisoryLink')}
                  </Link>
                  <Link href="/services" className="block px-6 py-3 font-sans text-sm text-primary-500 hover:bg-cream-200 hover:text-accent-gold transition-colors duration-200">
                    {t('capitalRaisingLink')}
                  </Link>
                  <Link href="/services" className="block px-6 py-3 font-sans text-sm text-primary-500 hover:bg-cream-200 hover:text-accent-gold transition-colors duration-200">
                    {t('assetManagementLink')}
                  </Link>
                </div>
              </div>
            </div>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'font-sans text-[13px] font-medium tracking-[0.05em] transition-colors duration-300 link-underline',
                  isDarkHeader ? 'text-cream-100 hover:text-accent-gold' : 'text-primary-500 hover:text-accent-gold',
                  pathname === item.href && 'text-accent-gold'
                )}
              >
                {item.name}
              </Link>
            ))}
            <LanguageSwitcher isSolid={!isDarkHeader} />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <HiX className={cn('w-6 h-6 transition-colors duration-300', isDarkHeader ? 'text-cream-100' : 'text-primary-500')} />
            ) : (
              <HiMenu className={cn('w-6 h-6 transition-colors duration-300', isDarkHeader ? 'text-cream-100' : 'text-primary-500')} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Montfort-style full-screen overlay */}
      <div className="mobile-menu fixed top-0 right-0 bottom-0 w-full bg-primary-500 text-cream-100 lg:hidden translate-x-full z-50 overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-cream-100/10">
          <div className="relative h-10 w-auto">
            <Image
              src={LOGO.main}
              alt="Vert Capital"
              width={120}
              height={40}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <HiX className="w-6 h-6 text-cream-100" />
          </button>
        </div>

        <nav className="p-8 space-y-8">
          <div className="space-y-1">
            <Link
              href="/"
              className="block py-4 font-serif text-2xl font-light tracking-wide hover:text-accent-gold transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('homeLink')}
            </Link>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block py-4 font-serif text-2xl font-light tracking-wide hover:text-accent-gold transition-colors duration-300',
                  pathname === item.href && 'text-accent-gold'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-cream-100/10 pt-8">
            <p className="text-xs font-sans tracking-[0.1em] opacity-50 mb-4 uppercase">{t('servicesLink')}</p>
            <div className="space-y-1">
              <Link
                href="/services"
                className="block py-3 font-sans text-base text-cream-200 hover:text-accent-gold transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('corporateAdvisoryLink')}
              </Link>
              <Link
                href="/services"
                className="block py-3 font-sans text-base text-cream-200 hover:text-accent-gold transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('capitalRaisingLink')}
              </Link>
              <Link
                href="/services"
                className="block py-3 font-sans text-base text-cream-200 hover:text-accent-gold transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('assetManagementLink')}
              </Link>
            </div>
          </div>

          <div className="border-t border-cream-100/10 pt-8">
            <LanguageSwitcher isSolid={true} />
          </div>

          <div className="border-t border-cream-100/10 pt-8">
            <p className="text-xs font-sans tracking-[0.1em] opacity-50 mb-3 uppercase">Contact</p>
            <a href="mailto:info@vertcapital.com.au" className="font-sans text-sm text-cream-200 hover:text-accent-gold transition-colors duration-300">
              info@vertcapital.com.au
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}
