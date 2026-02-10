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
                {t('title')}
              </h1>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
                {t('subtitle')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <p className="text-lg text-gray-600 leading-relaxed font-josefin text-center mb-16">
              {t('description')}
            </p>
          </AnimatedSection>

          {/* Directors */}
          <div className="space-y-12">
            {directors.map((director, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white border-2 border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-secondary-900 mb-2">{director.name}</h3>
                  <p className="text-primary-600 font-semibold uppercase tracking-wider text-sm mb-6">
                    {director.position}
                  </p>
                  <div 
                    className="prose max-w-none text-gray-600"
                    dangerouslySetInnerHTML={{ __html: director.bio }}
                  />
                  <div className="flex gap-4 mt-6">
                    <button className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                      <HiOutlineMail className="w-5 h-5" />
                      <span>{t('emailButton')}</span>
                    </button>
                    <button className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors">
                      <HiOutlineExternalLink className="w-5 h-5" />
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
