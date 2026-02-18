'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { LOGO } from '@/lib/images'
import { HiOutlineMail, HiOutlineCheckCircle, HiOutlineXCircle, HiX } from 'react-icons/hi'
import { createPortal } from 'react-dom'
import gsap from 'gsap'

interface PortalLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PortalLoginModal({ isOpen, onClose }: PortalLoginModalProps) {
  const t = useTranslations('portal')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [mounted, setMounted] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!modalRef.current || !overlayRef.current) return

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden'

      // Animate in
      gsap.set(modalRef.current, { x: '100%' })
      gsap.set(overlayRef.current, { opacity: 0 })

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })

      gsap.to(modalRef.current, {
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.1,
      })
    } else {
      // Animate out
      gsap.to(modalRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
      })

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        delay: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          document.body.style.overflow = 'unset'
        },
      })
    }
  }, [isOpen])

  const handleClose = () => {
    onClose()
    // Reset form after animation completes
    setTimeout(() => {
      setEmail('')
      setStatus('idle')
      setMessage('')
    }, 600)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')
    setMessage('')

    try {
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(t('successMessage'))
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || t('errorMessage'))
      }
    } catch (error) {
      setStatus('error')
      setMessage(t('errorMessage'))
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="absolute top-0 right-0 bottom-0 w-full max-w-2xl bg-white shadow-2xl overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-primary-500 text-cream-100 hover:bg-primary-600 transition-colors duration-300 shadow-lg"
          aria-label="Close portal login"
        >
          <HiX className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="min-h-full flex flex-col">
          {/* Top Brand Section - Compact */}
          <div className="bg-primary-500 px-8 lg:px-12 py-12">
            <Image
              src={LOGO.main}
              alt="Vert Capital"
              width={180}
              height={54}
              className="h-12 w-auto object-contain brightness-0 invert"
              priority
            />
          </div>

          {/* Form Section */}
          <div className="flex-1 px-8 lg:px-12 py-12">
            <div className="max-w-md mx-auto space-y-8">
              <div className="space-y-3">
                <h2 className="font-serif font-light text-4xl text-primary-500">
                  {t('loginTitle')}
                </h2>
                <p className="font-sans text-base text-secondary-500 leading-relaxed">
                  {t('loginSubtitle')}
                </p>
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-md">
                  <HiOutlineCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="font-sans text-sm text-green-800 leading-relaxed">
                    {message}
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-md">
                  <HiOutlineXCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="font-sans text-sm text-red-800 leading-relaxed">
                    {message}
                  </p>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="portal-email"
                    className="block font-sans text-sm font-medium text-primary-500 mb-2"
                  >
                    {t('emailLabel')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <HiOutlineMail className="h-5 w-5 text-secondary-500" />
                    </div>
                    <input
                      id="portal-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('emailPlaceholder')}
                      required
                      disabled={loading}
                      className="block w-full pl-12 pr-4 py-3 border border-primary-500/20 rounded-md font-sans text-base text-primary-500 placeholder-secondary-500/50 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full px-8 py-4 bg-primary-500 text-cream-100 font-sans font-medium text-base tracking-wide rounded-md transition-all duration-300 ease-montfort hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-500"
                >
                  {loading ? t('sendingButton') : t('submitButton')}
                </button>
              </form>

              {/* Help Text */}
              <div className="pt-6 border-t border-primary-500/10">
                <p className="font-sans text-xs text-secondary-500 leading-relaxed text-center">
                  {t('helpText')}
                </p>
              </div>

              {/* Brand Footer */}
              <div className="pt-8 border-t border-primary-500/10">
                <div className="space-y-4">
                  <h3 className="font-serif font-light text-2xl text-primary-500">
                    {t('title')}
                  </h3>
                  <p className="font-sans text-sm text-secondary-500 leading-relaxed">
                    {t('subtitle')}
                  </p>
                  <p className="font-sans text-xs text-secondary-400 italic">
                    {t('disclaimer')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom padding */}
          <div className="h-8" />
        </div>
      </div>
    </div>,
    document.body
  )
}
