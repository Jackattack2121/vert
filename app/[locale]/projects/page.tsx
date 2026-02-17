'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Image from 'next/image'
import { HERO_IMAGES, PROJECT_IMAGES } from '@/lib/images'

export default function ProjectsPage() {
  const locale = useLocale()
  const t = useTranslations('projects')

  const projects = [
    {
      title: t('doboj.name'),
      slug: 'doboj',
      location: t('doboj.location'),
      type: t('doboj.type'),
      image: PROJECT_IMAGES.doboj,
      number: t('doboj.number'),
      description: t('doboj.shortDescription'),
    },
    {
      title: t('jezero.name'),
      slug: 'jezero',
      location: t('jezero.location'),
      type: t('jezero.type'),
      image: PROJECT_IMAGES.jezero,
      number: t('jezero.number'),
      description: t('jezero.shortDescription'),
    },
    {
      title: t('sockovac.name'),
      slug: 'sockovac',
      location: t('sockovac.location'),
      type: t('sockovac.type'),
      image: PROJECT_IMAGES.sockovac,
      number: t('sockovac.number'),
      description: t('sockovac.shortDescription'),
    },
    {
      title: t('sinjakovo.name'),
      slug: 'sinjakovo',
      location: t('sinjakovo.location'),
      type: t('sinjakovo.type'),
      image: PROJECT_IMAGES.sinjakovo,
      number: t('sinjakovo.number'),
      description: t('sinjakovo.shortDescription'),
    },
    {
      title: t('cajnice.name'),
      slug: 'cajnice',
      location: t('cajnice.location'),
      type: t('cajnice.type'),
      image: PROJECT_IMAGES.cajnice,
      number: t('cajnice.number'),
      description: t('cajnice.shortDescription'),
    },
  ]
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-primary-500 text-cream-100 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMAGES.projects})` }}
        />
        <div className="relative z-10 container text-center">
          <AnimatedSection>
            <p className="text-sm uppercase tracking-wider text-cream-300 mb-4">
              {t('pageTitle')}
            </p>
            <h1 className="font-serif font-light text-hero text-cream-100 mb-6">
              {t('heading')}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto font-serif">
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
                      <div className="inline-block px-4 py-2 bg-primary-500 text-cream-100 text-xs uppercase tracking-wider font-semibold mb-4">
                        {project.type}
                      </div>
                      <h2 className="text-4xl font-serif font-light tracking-tight text-primary-500 mb-4 group-hover:text-primary-600 transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-sm text-secondary-400 uppercase tracking-wider mb-4">
                        {project.location}
                      </p>
                      <p className="font-sans text-base text-secondary-500 leading-relaxed mb-6">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2 text-primary-500 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
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
      <section className="section-padding bg-primary-500 text-cream-100">
        <div className="container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif font-light text-display text-cream-100 mb-8">
                {t('cta.titleLine1')}<br />
                {t('cta.titleLine2')}
              </h2>
              <p className="text-xl mb-12 font-serif opacity-90">
                {t('cta.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/investors/asx-announcements`}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary-700 text-cream-100 font-semibold transition-all duration-300 hover:bg-primary-800 hover:shadow-elegant text-sm"
                >
                  <span>{t('cta.viewAnnouncements')}</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-cream-100 font-semibold transition-all duration-300 hover:bg-white hover:text-primary-500 text-sm"
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
