'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import { HERO_IMAGES } from '@/lib/images'
import { FaLinkedin } from 'react-icons/fa'

export default function Contact() {
  const t = useTranslations('contact')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = t('validation.nameRequired')
    if (!formData.email.trim()) {
      newErrors.email = t('validation.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('validation.emailInvalid')
    }
    if (!formData.subject) newErrors.subject = t('validation.subjectRequired')
    if (!formData.message.trim()) {
      newErrors.message = t('validation.messageRequired')
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('validation.messageMinLength')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    const subjectMap: Record<string, string> = {
      general: 'General Enquiry',
      investor: 'Investor Relations',
      media: 'Media Enquiry',
      partnership: 'Partnership Opportunity',
    }

    const subject = `${subjectMap[formData.subject] || formData.subject} - ${formData.name}`
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.phone ? `Phone: ${formData.phone}` : '',
      '',
      formData.message,
    ].filter(Boolean).join('\n')

    window.location.href = `mailto:info@vertcapital.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-500 py-40 md:py-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${HERO_IMAGES.contact})` }}
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

      {/* Contact Section */}
      <section className="section-padding bg-cream-100">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <AnimatedSection>
              <h2 className="font-serif font-light text-display text-primary-500 mb-2">
                {t('formTitle')}
              </h2>
              <div className="w-16 h-0.5 bg-accent-gold mt-4 mb-10"></div>

              {submitted && (
                <div className="mb-6 p-4 bg-accent-gold/10 border border-accent-gold/20 rounded-md">
                  <p className="font-sans text-sm text-primary-500">{t('formSuccess')}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-primary-500/20
                               font-sans text-primary-500 focus:border-accent-gold focus:outline-none
                               transition-colors duration-300 text-base"
                  />
                  {errors.name && <p className="mt-1 font-sans text-xs text-red-500">{errors.name}</p>}
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
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-primary-500/20
                               font-sans text-primary-500 focus:border-accent-gold focus:outline-none
                               transition-colors duration-300 text-base"
                  />
                  {errors.email && <p className="mt-1 font-sans text-xs text-red-500">{errors.email}</p>}
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
                  {errors.subject && <p className="mt-1 font-sans text-xs text-red-500">{errors.subject}</p>}
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
                    rows={5}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-primary-500/20
                               font-sans text-primary-500 focus:border-accent-gold focus:outline-none
                               transition-colors duration-300 resize-none text-base"
                  />
                  {errors.message && <p className="mt-1 font-sans text-xs text-red-500">{errors.message}</p>}
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
                <div className="bg-white rounded-md p-8 shadow-elegant">
                  <h3 className="font-serif text-lg font-normal text-primary-500 mb-4">
                    {t('registeredOffice')}
                  </h3>
                  <div className="space-y-2 font-sans text-secondary-500">
                    <p>Perth, WA 6000</p>
                    <p>Australia</p>
                  </div>
                </div>

                <div className="bg-white rounded-md p-8 shadow-elegant">
                  <h3 className="font-serif text-lg font-normal text-primary-500 mb-4">
                    {t('phoneEmail')}
                  </h3>
                  <div className="space-y-2 font-sans text-secondary-500">
                    <p><span className="text-xs tracking-[0.1em] uppercase text-secondary-400">{t('phone')}:</span> <a href="tel:+61894810389" className="hover:text-accent-gold transition-colors duration-300">+61 8 9481 0389</a></p>
                    <p><span className="text-xs tracking-[0.1em] uppercase text-secondary-400">{t('email')}:</span> <a href="mailto:info@vertcapital.com.au" className="hover:text-accent-gold transition-colors duration-300">info@vertcapital.com.au</a></p>
                  </div>
                </div>

                <div className="bg-white rounded-md p-8 shadow-elegant">
                  <h3 className="font-serif text-lg font-normal text-primary-500 mb-4">
                    {t('businessHours')}
                  </h3>
                  <div className="font-sans text-secondary-500">
                    <p>{t('businessHoursValue')}</p>
                  </div>
                </div>

                <div className="bg-white rounded-md p-8 shadow-elegant">
                  <h3 className="font-serif text-lg font-normal text-primary-500 mb-4">
                    {t('followUs')}
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://au.linkedin.com/company/vert-capital-australia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-gold hover:text-accent-goldDark transition-colors duration-300"
                    >
                      <FaLinkedin className="w-5 h-5" />
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
