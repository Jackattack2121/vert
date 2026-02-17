'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlinePaperAirplane } from 'react-icons/hi'
import { HERO_IMAGES } from '@/lib/images'

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
      {/* Hero Section - Montfort-style deep teal */}
      <section className="relative bg-primary-500 py-40 md:py-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${HERO_IMAGES.investorContact})` }}
        />
        <div className="absolute inset-0 bg-primary-500/70"></div>

        <div className="container relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="font-serif font-light text-hero text-cream-100 mb-6">
                {t('heroTitle')}
              </h1>
              <p className="font-sans text-xl text-cream-200 opacity-90 max-w-2xl leading-relaxed">
                {t('heroSubtitle')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-cream-100">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information Cards */}
            <div className="space-y-6">
              <AnimatedSection>
                <div className="bg-white rounded-md p-8 shadow-elegant">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-500/10 rounded-full flex items-center justify-center">
                      <HiOutlineMail className="w-5 h-5 text-primary-500" />
                    </div>
                    <h3 className="font-serif text-lg font-normal text-primary-500">{t('emailTitle')}</h3>
                  </div>
                  <a
                    href="mailto:info@vertcapital.com.au"
                    className="font-sans text-secondary-500 hover:text-accent-gold transition-colors duration-300"
                  >
                    info@vertcapital.com.au
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="bg-white rounded-md p-8 shadow-elegant">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-500/10 rounded-full flex items-center justify-center">
                      <HiOutlinePhone className="w-5 h-5 text-primary-500" />
                    </div>
                    <h3 className="font-serif text-lg font-normal text-primary-500">{t('phoneTitle')}</h3>
                  </div>
                  <a
                    href="tel:+61894810389"
                    className="font-sans text-secondary-500 hover:text-accent-gold transition-colors duration-300"
                  >
                    +61 8 9481 0389
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="bg-white rounded-md p-8 shadow-elegant">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary-500/10 rounded-full flex items-center justify-center">
                      <HiOutlineLocationMarker className="w-5 h-5 text-primary-500" />
                    </div>
                    <h3 className="font-serif text-lg font-normal text-primary-500">{t('officeTitle')}</h3>
                  </div>
                  <address className="font-sans text-secondary-500 not-italic leading-relaxed" dangerouslySetInnerHTML={{ __html: t('officeAddress').replace(/\n/g, '<br />') }} />
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.1}>
                <div className="bg-white rounded-md p-10 shadow-elegant">
                  <h2 className="font-serif font-light text-display text-primary-500 mb-2">{t('messageTitle')}</h2>
                  <div className="w-16 h-0.5 bg-accent-gold mt-4 mb-10"></div>

                  {status === 'success' ? (
                    <div className="bg-cream-100 rounded-md p-10 text-center">
                      <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <HiOutlinePaperAirplane className="w-8 h-8 text-accent-gold" />
                      </div>
                      <h3 className="font-serif text-xl font-normal text-primary-500 mb-2">{t('successTitle')}</h3>
                      <p className="font-sans text-secondary-500 mb-6">{t('successDescription')}</p>
                      <Button onClick={() => setStatus('idle')} variant="primary">
                        {t('anotherMessage')}
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block font-sans text-xs tracking-[0.1em] uppercase text-secondary-500 mb-2">
                          {t('fullNameLabel')}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-0 py-3 bg-transparent border-0 border-b border-primary-500/20
                                     font-sans text-primary-500 focus:border-accent-gold focus:outline-none
                                     transition-colors duration-300 text-base"
                          placeholder={t('fullNamePlaceholder')}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block font-sans text-xs tracking-[0.1em] uppercase text-secondary-500 mb-2">
                            {t('emailLabel')}
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-primary-500/20
                                       font-sans text-primary-500 focus:border-accent-gold focus:outline-none
                                       transition-colors duration-300 text-base"
                            placeholder={t('emailPlaceholder')}
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block font-sans text-xs tracking-[0.1em] uppercase text-secondary-500 mb-2">
                            {t('phoneLabel')}
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-primary-500/20
                                       font-sans text-primary-500 focus:border-accent-gold focus:outline-none
                                       transition-colors duration-300 text-base"
                            placeholder={t('phonePlaceholder')}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block font-sans text-xs tracking-[0.1em] uppercase text-secondary-500 mb-2">
                          {t('subjectLabel')}
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-0 py-3 bg-transparent border-0 border-b border-primary-500/20
                                     font-sans text-primary-500 focus:border-accent-gold focus:outline-none
                                     transition-colors duration-300 text-base appearance-none cursor-pointer"
                        >
                          <option value="">{t('subjectPlaceholder')}</option>
                          <option value="general">{t('subjectGeneral')}</option>
                          <option value="reports">{t('subjectFinancial')}</option>
                          <option value="share-registry">{t('subjectShare')}</option>
                          <option value="media">{t('subjectMedia')}</option>
                          <option value="other">{t('subjectOther')}</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block font-sans text-xs tracking-[0.1em] uppercase text-secondary-500 mb-2">
                          {t('messageLabel')}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-0 py-3 bg-transparent border-0 border-b border-primary-500/20
                                     font-sans text-primary-500 focus:border-accent-gold focus:outline-none
                                     transition-colors duration-300 resize-none text-base"
                          placeholder={t('messagePlaceholder')}
                        />
                      </div>

                      {status === 'error' && (
                        <div className="bg-cream-200 rounded-md p-4 font-sans text-sm text-primary-500">
                          {message}
                        </div>
                      )}

                      <div className="pt-4">
                        <Button type="submit" variant="primary" disabled={status === 'loading'}>
                          {status === 'loading' ? (
                            <span className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-cream-100 border-t-transparent rounded-full animate-spin"></div>
                              {t('sending')}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <HiOutlinePaperAirplane className="w-4 h-4" />
                              {t('sendButton')}
                            </span>
                          )}
                        </Button>
                      </div>

                      <p className="font-sans text-xs text-secondary-400 text-center">
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
      <section className="section-padding bg-white">
        <div className="container max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-serif font-light text-display text-primary-500 mb-2">
              {t('lookingForTitle')}
            </h2>
            <div className="w-16 h-0.5 bg-accent-gold mt-4 mx-auto mb-8"></div>
            <p className="font-sans text-secondary-500 mb-8 leading-relaxed">
              {t('lookingForDescription')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { href: '/investors/asx-announcements', label: t('asxLink') },
                { href: '/investors/financial-reports', label: t('reportsLink') },
                { href: '/investors/share-information', label: t('shareLink') },
                { href: '/investors/fact-sheet', label: t('factSheetLink') },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="p-4 bg-cream-100 rounded-md hover:bg-primary-500 hover:text-cream-100 transition-all duration-300 group"
                >
                  <h3 className="font-sans text-sm font-medium text-primary-500 group-hover:text-cream-100 transition-colors duration-300">{link.label}</h3>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
