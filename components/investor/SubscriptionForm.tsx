'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { HiOutlineMail, HiOutlineCheckCircle } from 'react-icons/hi'

interface SubscriptionFormProps {
  variant?: 'inline' | 'card'
  className?: string
}

export default function SubscriptionForm({ variant = 'inline', className = '' }: SubscriptionFormProps) {
  const t = useTranslations('forms.subscription')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [preferences, setPreferences] = useState({
    announcements: true,
    reports: true,
    news: true,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, preferences }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle 503 (service unavailable) specifically
        if (response.status === 503) {
          throw new Error(t('launchingSoon'))
        }
        throw new Error(data.error || t('errorMessage'))
      }

      setStatus('success')
      setMessage(data.message || t('successMessage'))
      setEmail('')
      setName('')
    } catch (error) {
      setStatus('error')
      const errorMessage = error instanceof Error ? error.message : t('errorMessage')
      setMessage(errorMessage)
    }
  }

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`} aria-label="Email subscription form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          required
          aria-label="Email address for subscription"
          className="flex-1 px-4 py-3 bg-white border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-sans"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          aria-label={status === 'success' ? 'Successfully subscribed' : 'Subscribe to investor updates'}
          className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {status === 'loading' ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{t('subscribingButton')}</span>
            </>
          ) : status === 'success' ? (
            <>
              <HiOutlineCheckCircle className="w-5 h-5" />
              <span>{t('subscribedButton')}</span>
            </>
          ) : (
            <>
              <HiOutlineMail className="w-5 h-5" />
              <span>{t('subscribeButton')}</span>
            </>
          )}
        </button>
        {status === 'success' && (
          <div className="sm:hidden text-green-600 text-sm mt-2">{message}</div>
        )}
        {status === 'error' && (
          <div className="sm:hidden text-red-600 text-sm mt-2">{message}</div>
        )}
      </form>
    )
  }

  // Card variant - full form with preferences
  return (
    <div className={`bg-white rounded-md shadow-elegant border border-primary-500 p-8 h-full flex flex-col ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-cream-100 p-3 rounded-md">
          <HiOutlineMail className="w-7 h-7 text-primary-500" />
        </div>
        <div>
          <h3 className="text-2xl font-serif font-light text-primary-500">Email Updates</h3>
          <p className="text-sm font-sans text-secondary-500">Receive notifications for:</p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="bg-cream-100 border border-primary-200 rounded-md p-6 text-center flex-1 flex flex-col items-center justify-center" role="status" aria-live="polite">
          <HiOutlineCheckCircle className="w-16 h-16 text-primary-500 mx-auto mb-3" aria-hidden="true" />
          <p className="text-primary-500 font-serif font-light text-lg mb-2">Successfully Subscribed!</p>
          <p className="text-sm font-sans text-secondary-500">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col" aria-label="Email subscription form">
          <div>
            <label htmlFor="name" className="block text-sm font-sans font-medium text-primary-500 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              aria-required="true"
              className="w-full px-4 py-3 bg-white border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-sans text-primary-500 placeholder-secondary-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-sans font-medium text-primary-500 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              aria-required="true"
              className="w-full px-4 py-3 bg-white border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-sans text-primary-500 placeholder-secondary-400"
            />
          </div>

          <fieldset>
            <legend className="block text-sm font-sans font-medium text-primary-500 mb-3">
              Email Preferences
            </legend>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="preferences-announcements"
                  checked={preferences.announcements}
                  onChange={() => togglePreference('announcements')}
                  aria-label="Subscribe to ASX Announcements"
                  className="w-5 h-5 text-primary-500 bg-white border-secondary-300 rounded focus:ring-primary-500 focus:ring-offset-0"
                />
                <span className="text-sm font-sans text-secondary-600 group-hover:text-primary-500 transition-colors">ASX Announcements</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="preferences-reports"
                  checked={preferences.reports}
                  onChange={() => togglePreference('reports')}
                  aria-label="Subscribe to Quarterly & Annual Reports"
                  className="w-5 h-5 text-primary-500 bg-white border-secondary-300 rounded focus:ring-primary-500 focus:ring-offset-0"
                />
                <span className="text-sm font-sans text-secondary-600 group-hover:text-primary-500 transition-colors">Quarterly & Annual Reports</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="preferences-news"
                  checked={preferences.news}
                  onChange={() => togglePreference('news')}
                  aria-label="Subscribe to Company News & Updates"
                  className="w-5 h-5 text-primary-500 bg-white border-secondary-300 rounded focus:ring-primary-500 focus:ring-offset-0"
                />
                <span className="text-sm font-sans text-secondary-600 group-hover:text-primary-500 transition-colors">Company News & Updates</span>
              </label>
            </div>
          </fieldset>

          {status === 'error' && (
            <div className="bg-red-50 border border-red-300 rounded-md p-3 text-red-700 text-sm font-sans" role="alert" aria-live="polite">
              {message}
            </div>
          )}

          <div className="mt-auto pt-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              aria-label={status === 'loading' ? 'Subscribing to updates' : 'Subscribe to investor updates'}
              className="w-full bg-primary-500 text-white font-sans font-medium py-4 px-6 rounded-md hover:bg-primary-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-elegant hover:shadow-elegant-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <HiOutlineMail className="w-5 h-5" aria-hidden="true" />
                  <span>Subscribe to Updates</span>
                </>
              )}
            </button>

            <p className="text-xs font-sans text-secondary-400 text-center mt-3" role="note">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </form>
      )}
    </div>
  )
}
