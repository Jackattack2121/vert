'use client'

import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { HiOutlineMail, HiOutlineExternalLink } from 'react-icons/hi'

export default function BoardOfDirectors() {
  const t = useTranslations('company.board')

  const directors = [
    {
      name: t('director1Name'),
      position: t('director1Position'),
      bio: t.raw('director1Bio'),
    },
    {
      name: t('director2Name'),
      position: t('director2Position'),
      bio: t.raw('director2Bio'),
    },
    {
      name: t('director3Name'),
      position: t('director3Position'),
      bio: t.raw('director3Bio'),
    },
  ]

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
                {t('title')}
              </h1>
              <p className="font-sans text-xl text-cream-200 opacity-90 max-w-2xl leading-relaxed">
                {t('subtitle')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Description & Directors */}
      <section className="section-padding bg-cream-100">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <p className="font-sans text-lg text-secondary-500 leading-relaxed text-center mb-16">
              {t('description')}
            </p>
          </AnimatedSection>

          {/* Directors */}
          <div className="space-y-8">
            {directors.map((director, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white rounded-md p-10 shadow-elegant">
                  <h3 className="font-serif text-2xl font-normal text-primary-500 mb-2">{director.name}</h3>
                  <p className="font-sans text-xs tracking-[0.1em] uppercase text-accent-gold mb-6">
                    {director.position}
                  </p>
                  <div
                    className="prose max-w-none font-sans text-secondary-500 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: director.bio }}
                  />
                  <div className="flex gap-4 mt-6 pt-6 border-t border-primary-500/10">
                    <button className="inline-flex items-center gap-2 font-sans text-sm text-primary-500 hover:text-accent-gold transition-colors duration-300">
                      <HiOutlineMail className="w-4 h-4" />
                      <span>{t('emailButton')}</span>
                    </button>
                    <button className="inline-flex items-center gap-2 font-sans text-sm text-primary-500 hover:text-accent-gold transition-colors duration-300">
                      <HiOutlineExternalLink className="w-4 h-4" />
                      <span>{t('linkedinButton')}</span>
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
