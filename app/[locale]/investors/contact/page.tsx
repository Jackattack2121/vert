'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlinePaperAirplane } from 'react-icons/hi'

export default function InvestorContact() {
  const t = useTranslations('investors.contact')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('error')
    setMessage(t('formNotAvailable'))
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-secondary-900 py-32 md:py-40 overflow-hidden">
        {/* Background Image with fade */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/three-contemporary-builders-in-uniform-2025-03-16-04-36-05-utc.jpg)' }}
        />
        
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-primary-600/60"></div>
        
        <div className="container relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="text-heading-lg text-white mb-4">
                {t('heroTitle')}
              </h1>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
                {t('heroSubtitle')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information Cards */}
            <div className="space-y-6">
              <AnimatedSection>
                <div className="bg-white border-2 border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-primary-600 p-3">
                      <HiOutlineMail className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary-900 uppercase tracking-wider">{t('emailTitle')}</h3>
                  </div>
                  <a 
                    href="mailto:info@vertcapital.com.au"
                    className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                  >
                    info@vertcapital.com.au
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="bg-white border-2 border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-primary-600 p-3">
                      <HiOutlinePhone className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary-900 uppercase tracking-wider">{t('phoneTitle')}</h3>
                  </div>
                  <a 
                    href="tel:+61894810389"
                    className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                  >
                    +61 8 9481 0389
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="bg-white border-2 border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-primary-600 p-3">
                      <HiOutlineLocationMarker className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary-900 uppercase tracking-wider">{t('officeTitle')}</h3>
                  </div>
                  <address className="text-gray-700 not-italic" dangerouslySetInnerHTML={{ __html: t('officeAddress').replace(/\n/g, '<br />') }} />
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.1}>
                <div className="bg-white border-2 border-gray-200 p-8">
                  <h2 className="text-heading-lg text-secondary-900 mb-8">{t('messageTitle')}</h2>

                  {status === 'success' ? (
                    <div className="bg-green-50 border-2 border-green-200 p-8 text-center">
                      <div className="bg-green-600 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <HiOutlinePaperAirplane className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2 uppercase tracking-wider">{t('successTitle')}</h3>
                      <p className="text-green-700">{t('successDescription')}</p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="mt-6 px-6 py-3 bg-green-600 text-white hover:bg-green-700 transition-colors uppercase tracking-wider font-semibold"
                      >
                        {t('anotherMessage')}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('fullNameLabel')}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-primary-600 transition-colors"
                          placeholder={t('fullNamePlaceholder')}
                        />
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            {t('emailLabel')}
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-primary-600 transition-colors"
                            placeholder={t('emailPlaceholder')}
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                            {t('phoneLabel')}
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-primary-600 transition-colors"
                            placeholder={t('phonePlaceholder')}
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('subjectLabel')}
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-primary-600 transition-colors"
                        >
                          <option value="">{t('subjectPlaceholder')}</option>
                          <option value="general">{t('subjectGeneral')}</option>
                          <option value="reports">{t('subjectFinancial')}</option>
                          <option value="share-registry">{t('subjectShare')}</option>
                          <option value="media">{t('subjectMedia')}</option>
                          <option value="other">{t('subjectOther')}</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('messageLabel')}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-primary-600 transition-colors resize-none"
                          placeholder={t('messagePlaceholder')}
                        />
                      </div>

                      {/* Error Message */}
                      {status === 'error' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
                          {message}
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {status === 'loading' ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>{t('sending')}</span>
                          </>
                        ) : (
                          <>
                            <HiOutlinePaperAirplane className="w-5 h-5" />
                            <span>{t('sendButton')}</span>
                          </>
                        )}
                      </button>

                      <p className="text-xs text-gray-500 text-center">
                        {t('requiredNote')}
                      </p>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-heading-lg text-secondary-900 mb-4">
              {t('lookingForTitle')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('lookingForDescription')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <a
                href="/investors/asx-announcements"
                className="p-4 bg-white border-2 border-gray-200 hover:border-primary-600 transition-all"
              >
                <h3 className="font-semibold text-secondary-900 uppercase tracking-wider">{t('asxLink')}</h3>
              </a>
              <a
                href="/investors/financial-reports"
                className="p-4 bg-white border-2 border-gray-200 hover:border-primary-600 transition-all"
              >
                <h3 className="font-semibold text-secondary-900 uppercase tracking-wider">{t('reportsLink')}</h3>
              </a>
              <a
                href="/investors/share-information"
                className="p-4 bg-white border-2 border-gray-200 hover:border-primary-600 transition-all"
              >
                <h3 className="font-semibold text-secondary-900 uppercase tracking-wider">{t('shareLink')}</h3>
              </a>
              <a
                href="/investors/fact-sheet"
                className="p-4 bg-white border-2 border-gray-200 hover:border-primary-600 transition-all"
              >
                <h3 className="font-semibold text-secondary-900 uppercase tracking-wider">{t('factSheetLink')}</h3>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

