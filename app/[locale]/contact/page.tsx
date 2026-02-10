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
                {t('titleLine1')}<br />
                {t('titleLine2')}
              </h1>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
                {t('subtitle')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection>
              <h2 className="text-heading-lg text-secondary-900 mb-8">
                {t('formTitle')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('nameLabel')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-primary-600 focus:outline-none transition-colors"
                  />
                </div>

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
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-primary-600 focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-primary-600 focus:outline-none transition-colors"
                  />
                </div>

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
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-primary-600 focus:outline-none transition-colors"
                  >
                    <option value="">{t('subjectPlaceholder')}</option>
                    <option value="general">{t('subjectGeneral')}</option>
                    <option value="investor">{t('subjectInvestor')}</option>
                    <option value="media">{t('subjectMedia')}</option>
                    <option value="partnership">{t('subjectPartnership')}</option>
                  </select>
                </div>

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
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:border-primary-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <Button type="submit" variant="primary">
                  {t('sendButton')}
                </Button>
              </form>
            </AnimatedSection>

            {/* Contact Information */}
            <AnimatedSection delay={0.2}>
              <h2 className="text-heading-lg text-secondary-900 mb-8">
                {t('contactInfo')}
              </h2>
              
              <div className="space-y-6">
                {/* Registered Office */}
                <div className="border-2 border-gray-200 p-6">
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-4 text-secondary-900">
                    {t('registeredOffice')}
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p>Perth, WA 6000</p>
                    <p>Australia</p>
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="border-2 border-gray-200 p-6">
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-4 text-secondary-900">
                    {t('phoneEmail')}
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>{t('phone')}:</strong> +61 8 9481 0389</p>
                    <p><strong>{t('email')}:</strong> info@lykosmetals.com</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="border-2 border-gray-200 p-6">
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-4 text-secondary-900">
                    {t('businessHours')}
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p>{t('businessHoursValue')}</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="border-2 border-gray-200 p-6">
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-4 text-secondary-900">
                    {t('followUs')}
                  </h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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

