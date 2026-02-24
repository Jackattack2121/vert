'use client'

import { useState, useEffect, useRef } from 'react'
import { Link, usePathname } from '@/i18n/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { HiMenu, HiX, HiOutlineLockClosed } from 'react-icons/hi'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import LanguageSwitcher from './LanguageSwitcher'
import PortalLoginModal from '@/components/portal/PortalLoginModal'
import { LOGO } from '@/lib/images'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [portalModalOpen, setPortalModalOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const pathname = usePathname()
  const t = useTranslations('navigation.header')

  // Check if we're on the homepage
  const isHomepage = pathname === '/' || pathname === ''

  const navigation = [
    { name: t('aboutLink'), href: '/about' },
    { name: t('portfolioLink'), href: '/portfolio' },
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

  const isSolid = scrolled || !isHomepage
  const isDarkHeader = !isSolid && isHomepage

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-[60] transition-shadow duration-300',
        isSolid && 'shadow-[0_1px_0_rgba(0,0,0,0.06)]'
      )}
      style={{ backgroundColor: isSolid ? '#FFFFFF' : 'transparent' }}
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

          {/* Desktop Navigation */}
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
            <button
              onClick={() => setPortalModalOpen(true)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-[13px] font-medium tracking-[0.05em] transition-all duration-300',
                isDarkHeader
                  ? 'border-cream-100/40 text-cream-100 hover:bg-cream-100 hover:text-primary-500'
                  : 'border-primary-500/30 text-primary-500 hover:bg-primary-500 hover:text-white'
              )}
            >
              <HiOutlineLockClosed className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
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

      {/* Mobile Menu */}
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
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                setPortalModalOpen(true)
              }}
              className="flex items-center gap-2 px-6 py-3 bg-cream-100/10 hover:bg-cream-100/20 rounded-md text-cream-100 hover:text-accent-gold transition-all duration-300 font-sans text-sm font-medium tracking-[0.05em] w-full"
            >
              <HiOutlineLockClosed className="w-4 h-4" />
              <span>Client Portal Login</span>
            </button>
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

      {/* Portal Login Modal */}
      <PortalLoginModal
        isOpen={portalModalOpen}
        onClose={() => setPortalModalOpen(false)}
      />
    </header>
  )
}
