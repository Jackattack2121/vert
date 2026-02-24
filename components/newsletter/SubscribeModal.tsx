'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { LOGO } from '@/lib/images'
import { HiX } from 'react-icons/hi'
import { createPortal } from 'react-dom'
import gsap from 'gsap'

const COOKIE_NAME = 'vc_newsletter_seen'
const COOKIE_DAYS = 30
const SHOW_DELAY_MS = 3000

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value};expires=${expires};path=/;SameSite=Lax`
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? match[2] : null
}

export default function SubscribeModal() {
  const t = useTranslations('subscribeModal')
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle')

  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const goldLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-show on first visit after delay
  useEffect(() => {
    if (!mounted) return
    if (getCookie(COOKIE_NAME)) return

    const timer = setTimeout(() => {
      setIsOpen(true)
    }, SHOW_DELAY_MS)

    return () => clearTimeout(timer)
  }, [mounted])

  // Animate in/out
  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return

    if (isOpen) {
      document.body.style.overflow = 'hidden'

      gsap.set(overlayRef.current, { opacity: 0 })
      gsap.set(contentRef.current, { opacity: 0, scale: 0.92, y: 30 })

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })

      gsap.to(contentRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.15,
      })

      // Animate gold line
      if (goldLineRef.current) {
        gsap.set(goldLineRef.current, { scaleY: 0, transformOrigin: 'top' })
        gsap.to(goldLineRef.current, {
          scaleY: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.5,
        })
      }
    }
  }, [isOpen])

  const animateOut = useCallback((onComplete?: () => void) => {
    if (!overlayRef.current || !contentRef.current) return

    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.3,
      ease: 'power2.in',
    })

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      ease: 'power2.in',
      onComplete: () => {
        document.body.style.overflow = 'unset'
        setIsOpen(false)
        onComplete?.()
      },
    })
  }, [])

  const handleClose = useCallback(() => {
    setCookie(COOKIE_NAME, '1', COOKIE_DAYS)
    animateOut()
  }, [animateOut])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
        setCookie(COOKIE_NAME, 'subscribed', COOKIE_DAYS * 12) // 1 year for subscribers
        // Auto-close after success
        setTimeout(() => animateOut(), 3000)
      } else if (res.status === 409) {
        setStatus('duplicate')
        setCookie(COOKIE_NAME, 'subscribed', COOKIE_DAYS * 12)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, handleClose])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div ref={modalRef} className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={t('title')}>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div
          ref={contentRef}
          className="relative w-full max-w-3xl pointer-events-auto rounded-lg overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full
                       bg-white/10 text-white hover:bg-white/20 transition-all duration-300
                       backdrop-blur-sm"
            aria-label="Close"
          >
            <HiX className="w-5 h-5" />
          </button>

          <div className="grid lg:grid-cols-5">
            {/* Left Panel — Brand / Visual */}
            <div className="lg:col-span-2 bg-primary-500 px-8 py-10 lg:py-14 lg:px-10 relative overflow-hidden">
              {/* Decorative gold line */}
              <div
                ref={goldLineRef}
                className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-accent-gold via-accent-gold/60 to-transparent"
              />

              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                }}
              />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <Image
                    src={LOGO.main}
                    alt="Vert Capital"
                    width={140}
                    height={42}
                    className="h-9 w-auto object-contain brightness-0 invert mb-8 lg:mb-12"
                  />

                  <h2 className="font-serif font-light text-3xl lg:text-4xl text-cream-100 leading-tight mb-4">
                    {t('title')}
                  </h2>

                  <p className="font-sans text-sm text-cream-200/80 leading-relaxed">
                    {t('subtitle')}
                  </p>
                </div>

                {/* Decorative element */}
                <div className="hidden lg:flex items-center gap-3 mt-12 pt-8 border-t border-cream-100/10">
                  <div className="w-8 h-[1px] bg-accent-gold" />
                  <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-accent-gold/80">
                    {t('tagline')}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Panel — Form */}
            <div className="lg:col-span-3 bg-white px-8 py-10 lg:py-14 lg:px-12">
              <div className="max-w-sm mx-auto lg:mx-0">
                {/* Success State */}
                {status === 'success' ? (
                  <div className="text-center lg:text-left py-6">
                    <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto lg:mx-0 mb-6">
                      <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-serif font-light text-2xl text-primary-500 mb-3">
                      {t('successTitle')}
                    </h3>
                    <p className="font-sans text-sm text-secondary-500 leading-relaxed">
                      {t('successMessage')}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-accent-gold font-medium">
                        {t('formLabel')}
                      </span>
                      <h3 className="font-serif font-light text-2xl lg:text-3xl text-primary-500 mt-2 mb-3">
                        {t('formTitle')}
                      </h3>
                      <p className="font-sans text-sm text-secondary-500 leading-relaxed">
                        {t('formDescription')}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="subscribe-email" className="sr-only">{t('emailLabel')}</label>
                        <input
                          id="subscribe-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t('emailPlaceholder')}
                          required
                          disabled={status === 'loading'}
                          className="block w-full px-5 py-4 border border-primary-500/15 rounded-md
                                     font-sans text-sm text-primary-500 placeholder-secondary-500/40
                                     focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/30
                                     transition-all duration-300
                                     disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'loading' || !email}
                        className="w-full px-8 py-4 bg-primary-500 text-cream-100 font-sans font-medium text-sm
                                   tracking-wide rounded-md transition-all duration-300 ease-montfort
                                   hover:bg-primary-600 hover:shadow-elegant
                                   focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2
                                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-500"
                      >
                        {status === 'loading' ? t('submitting') : t('submitButton')}
                      </button>

                      {/* Error/Duplicate feedback */}
                      {status === 'duplicate' && (
                        <p className="font-sans text-xs text-secondary-500 text-center">{t('duplicateMessage')}</p>
                      )}
                      {status === 'error' && (
                        <p className="font-sans text-xs text-red-500 text-center">{t('errorMessage')}</p>
                      )}
                    </form>

                    {/* Privacy note */}
                    <p className="mt-6 font-sans text-[11px] text-secondary-400 leading-relaxed">
                      {t('privacyNote')}
                    </p>

                    {/* No thanks */}
                    <button
                      onClick={handleClose}
                      className="mt-4 font-sans text-xs text-secondary-400 hover:text-secondary-600
                                 transition-colors duration-300 underline underline-offset-2"
                    >
                      {t('noThanks')}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
