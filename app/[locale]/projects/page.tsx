'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Image from 'next/image'

export default function ProjectsPage() {
  const locale = useLocale()
  const t = useTranslations('projects')

  const projects = [
    {
      title: t('doboj.name'),
      slug: 'doboj',
      location: t('doboj.location'),
      type: t('doboj.type'),
      image: '/images/open-pit-mine-with-machines-2024-09-16-10-43-35-utc.jpg',
      number: t('doboj.number'),
      description: t('doboj.shortDescription'),
    },
    {
      title: t('jezero.name'),
      slug: 'jezero',
      location: t('jezero.location'),
      type: t('jezero.type'),
      image: '/images/flying-over-open-pit-gold-mine-quarry-in-rosia-m-2025-03-09-07-21-03-utc.jpg',
      number: t('jezero.number'),
      description: t('jezero.shortDescription'),
    },
    {
      title: t('sockovac.name'),
      slug: 'sockovac',
      location: t('sockovac.location'),
      type: t('sockovac.type'),
      image: '/images/aerial-view-over-the-sand-pit-2025-10-13-02-21-23-utc.jpg',
      number: t('sockovac.number'),
      description: t('sockovac.shortDescription'),
    },
    {
      title: t('sinjakovo.name'),
      slug: 'sinjakovo',
      location: t('sinjakovo.location'),
      type: t('sinjakovo.type'),
      image: '/images/yellow-excavator-digging-rocks-at-the-quarry-doin-2025-01-29-03-01-59-utc.jpg',
      number: t('sinjakovo.number'),
      description: t('sinjakovo.shortDescription'),
    },
    {
      title: t('cajnice.name'),
      slug: 'cajnice',
      location: t('cajnice.location'),
      type: t('cajnice.type'),
      image: '/images/natural-quarry-is-located-near-road-against-backdr-2025-01-29-05-43-49-utc.jpg',
      number: t('cajnice.number'),
      description: t('cajnice.shortDescription'),
    },
  ]
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-secondary-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/open-pit-mine-with-machines-2024-09-16-10-43-35-utc.jpg)' }}
        />
        <div className="relative z-10 container text-center">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-wider text-primary-400 mb-4">
              {t('pageTitle')}
            </p>
            <h1 className="text-display mb-6">
              {t('heading')}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto font-josefin">
              {t('subtitle')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <AnimatedSection key={project.slug} delay={index * 0.1}>
                <Link href={`/projects/${project.slug}`}>
                  <div className="group grid md:grid-cols-2 gap-8 items-center hover-lift">
                    {/* Image */}
                    <div className={`relative h-[400px] overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${project.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                      </div>
                      <div className="absolute bottom-8 left-8">
                        <div className="text-7xl font-black text-white opacity-30">{project.number}</div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                      <div className="inline-block px-4 py-2 bg-primary-600 text-white text-xs uppercase tracking-wider font-semibold mb-4">
                        {project.type}
                      </div>
                      <h2 className="text-4xl font-black uppercase tracking-tight text-secondary-900 mb-4 group-hover:text-primary-600 transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                        {project.location}
                      </p>
                      <p className="text-lg text-gray-600 leading-relaxed mb-6 font-josefin">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2 text-primary-600 font-semibold uppercase tracking-wider text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>{t('exploreProject')}</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-heading-xl mb-8">
                {t('cta.titleLine1')}<br />
                {t('cta.titleLine2')}
              </h2>
              <p className="text-xl mb-12 font-josefin opacity-90">
                {t('cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href={`/${locale}/investors/asx-announcements`}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary-800 text-white font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-secondary-900 hover:shadow-lg text-sm"
                >
                  <span>{t('cta.viewAnnouncements')}</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link 
                  href={`/${locale}/contact`}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-primary-600 text-sm"
                >
                  <span>{t('cta.contactUs')}</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

