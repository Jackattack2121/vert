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

  // Animate header background and logo when dropdown opens
  useEffect(() => {
    if (headerRef.current) {
      if (projectsDropdownOpen) {
        // Dropdown opening - go dark
        gsap.to(headerRef.current, {
          backgroundColor: '#0f172a', // secondary-900
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
        // Dropdown closing - return to normal
        const targetBg = scrolled || !isHomepage ? '#ffffff' : 'transparent'
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

  // Determine if header should be solid (scrolled or not on homepage)
  const isSolid = scrolled || !isHomepage
  // When dropdown is open, treat as dark theme
  const isDarkHeader = projectsDropdownOpen || (!isSolid && isHomepage)

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-[60]',
        isSolid && !projectsDropdownOpen && 'shadow-md'
      )}
      style={{ backgroundColor: projectsDropdownOpen ? '#0f172a' : (isSolid ? '#ffffff' : 'transparent') }}
    >
      <div className="container">
        <div className="flex items-center justify-between py-4 md:py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 md:h-12 w-auto">
              <Image
                ref={logoRef}
                src="/vert-logo.svg"
                alt="Vert Capital"
                width={150}
                height={48}
                className="h-10 md:h-12 w-auto object-contain"
                style={{ filter: isDarkHeader ? 'brightness(0) invert(1)' : 'brightness(1) invert(0)' }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className={cn(
                'text-sm font-semibold uppercase tracking-wider transition-colors duration-[400ms] hover:text-primary-400',
                isDarkHeader ? 'text-white' : 'text-gray-900',
                pathname === '/' && 'text-primary-400'
              )}
            >
              {t('homeLink')}
            </Link>
            <div className="relative group">
              <button
                className={cn(
                  'text-sm font-semibold uppercase tracking-wider transition-colors duration-[400ms] hover:text-primary-400',
                  isDarkHeader ? 'text-white' : 'text-gray-900'
                )}
                onMouseEnter={() => setProjectsDropdownOpen(true)}
                onMouseLeave={() => setProjectsDropdownOpen(false)}
              >
                {t('servicesLink')}
              </button>
              {projectsDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50"
                  onMouseEnter={() => setProjectsDropdownOpen(true)}
                  onMouseLeave={() => setProjectsDropdownOpen(false)}
                >
                  <Link href="/services" className="block px-6 py-3 text-gray-900 hover:bg-primary-50 hover:text-primary-600 font-medium">
                    {t('corporateAdvisoryLink')}
                  </Link>
                  <Link href="/services" className="block px-6 py-3 text-gray-900 hover:bg-primary-50 hover:text-primary-600 font-medium">
                    {t('capitalRaisingLink')}
                  </Link>
                  <Link href="/services" className="block px-6 py-3 text-gray-900 hover:bg-primary-50 hover:text-primary-600 font-medium">
                    {t('assetManagementLink')}
                  </Link>
                </div>
              )}
            </div>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-semibold uppercase tracking-wider transition-colors duration-[400ms] hover:text-primary-400',
                  isDarkHeader ? 'text-white' : 'text-gray-900',
                  pathname === item.href && 'text-primary-400'
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
              <HiX className={cn('w-6 h-6 transition-colors duration-[400ms]', isDarkHeader ? 'text-white' : 'text-gray-900')} />
            ) : (
              <HiMenu className={cn('w-6 h-6 transition-colors duration-[400ms]', isDarkHeader ? 'text-white' : 'text-gray-900')} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-menu fixed top-0 right-0 bottom-0 w-full max-w-sm bg-secondary-900 text-white shadow-2xl lg:hidden translate-x-full z-50">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <div className="relative h-10 w-auto">
            <Image
              src="/vert-logo.svg"
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
            <HiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-100px)]">
          <div>
            <p className="text-xs uppercase tracking-wider opacity-60 mb-4">Navigation</p>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block py-3 text-base font-semibold uppercase tracking-wider hover:text-primary-400 transition-colors',
                  pathname === item.href && 'text-primary-400'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-xs uppercase tracking-wider opacity-60 mb-4">{t('servicesLink')}</p>
            <div className="space-y-2">
              <Link
                href="/services"
                className="block py-2 text-sm hover:text-primary-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('corporateAdvisoryLink')}
              </Link>
              <Link
                href="/services"
                className="block py-2 text-sm hover:text-primary-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('capitalRaisingLink')}
              </Link>
              <Link
                href="/services"
                className="block py-2 text-sm hover:text-primary-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('assetManagementLink')}
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="mb-4">
              <LanguageSwitcher isSolid={true} />
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-xs text-gray-400 mb-2">Contact</p>
            <a href="mailto:info@vertcapital.com.au" className="text-sm hover:text-primary-400 transition-colors">
              info@vertcapital.com.au
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}
