'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'

export default function Contact() {
  const t = useTranslations('contact')
  const tForms = useTranslations('forms.contact')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission endpoint not configured
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      {/* Hero Section - Montfort-style deep teal */}
      <section className="relative bg-primary-500 py-40 md:py-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(/images/three-contemporary-builders-in-uniform-2025-03-16-04-36-05-utc.jpg)' }}
        />
        <div className="absolute inset-0 bg-primary-500/70"></div>

        <div className="container relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="font-serif font-light text-hero text-cream-100 mb-6">
                {t('titleLine1')}<br />
                {t('titleLine2')}
              </h1>
              <p className="font-sans text-sm tracking-[0.1em] uppercase text-cream-200 opacity-80">
                {t('subtitle')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section - Montfort clean aesthetic */}
      <section className="section-padding bg-cream-100">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <AnimatedSection>
              <h2 className="font-serif font-light text-display text-primary-500 mb-2">
                {t('formTitle')}
              </h2>
              <div className="w-16 h-0.5 bg-accent-gold mt-4 mb-10"></div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block font-sans text-xs tracking-[0.1em] uppercase text-secondary-500 mb-2">
                    {t('nameLabel')}
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
                  />
                </div>

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
                  />
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
                    <option value="investor">{t('subjectInvestor')}</option>
                    <option value="media">{t('subjectMedia')}</option>
                    <option value="partnership">{t('subjectPartnership')}</option>
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
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" variant="primary">
                    {t('sendButton')}
                  </Button>
                </div>
              </form>
            </AnimatedSection>

            {/* Contact Information */}
            <AnimatedSection delay={0.2}>
              <h2 className="font-serif font-light text-display text-primary-500 mb-2">
                {t('contactInfo')}
              </h2>
              <div className="w-16 h-0.5 bg-accent-gold mt-4 mb-10"></div>

              <div className="space-y-6">
                {/* Registered Office */}
                <div className="bg-white rounded-md p-8 shadow-elegant">
                  <h3 className="font-serif text-lg font-normal text-primary-500 mb-4">
                    {t('registeredOffice')}
                  </h3>
                  <div className="space-y-2 font-sans text-secondary-500">
                    <p>Perth, WA 6000</p>
                    <p>Australia</p>
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="bg-white rounded-md p-8 shadow-elegant">
                  <h3 className="font-serif text-lg font-normal text-primary-500 mb-4">
                    {t('phoneEmail')}
                  </h3>
                  <div className="space-y-2 font-sans text-secondary-500">
                    <p><span className="text-xs tracking-[0.1em] uppercase text-secondary-400">{t('phone')}:</span> <a href="tel:+61894810389" className="hover:text-accent-gold transition-colors duration-300">+61 8 9481 0389</a></p>
                    <p><span className="text-xs tracking-[0.1em] uppercase text-secondary-400">{t('email')}:</span> <a href="mailto:info@lykosmetals.com" className="hover:text-accent-gold transition-colors duration-300">info@lykosmetals.com</a></p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-white rounded-md p-8 shadow-elegant">
                  <h3 className="font-serif text-lg font-normal text-primary-500 mb-4">
                    {t('businessHours')}
                  </h3>
                  <div className="font-sans text-secondary-500">
                    <p>{t('businessHoursValue')}</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-md p-8 shadow-elegant">
                  <h3 className="font-serif text-lg font-normal text-primary-500 mb-4">
                    {t('followUs')}
                  </h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-accent-gold hover:text-accent-goldDark transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-accent-gold hover:text-accent-goldDark transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
