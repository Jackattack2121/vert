import { getTranslations } from 'next-intl/server'
import AnimatedSection from '@/components/ui/AnimatedSection'
import NewsCard from '@/components/ui/NewsCard'
import EmptyState from '@/components/ui/EmptyState'
import { HiOutlineDocumentText } from 'react-icons/hi'

const companyASXCode = 'YUG'

async function getAnnouncements() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/announcements?limit=50`, {
      next: { revalidate: 900 }, // Revalidate every 15 minutes
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch announcements')
    }
    
    const data = await res.json()
    return data.announcements || []
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return []
  }
}

export default async function ASXAnnouncements() {
  const t = await getTranslations('investors.announcements')
  const announcements = await getAnnouncements()
  
  return (
    <>
      {/* Hero Section - Minimal */}
      <section className="relative bg-secondary-900 py-32 md:py-40 overflow-hidden">
        {/* Background Image with fade */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/aerial-view-motor-grader-civil-at-construction-sit-2025-07-08-16-02-40-utc.jpg)' }}
        />
        
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-primary-600/60"></div>
        
        <div className="container relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="text-heading-lg text-white mb-4">
                {t('heroTitle')}
              </h1>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-6">
                {t('heroSubtitle')}
              </p>
              <a
                href={`https://www.asx.com.au/markets/company/${companyASXCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wider hover:gap-4 transition-all hover:text-white/80"
              >
                <span>{t('viewOnAsx')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Announcements Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          {announcements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {announcements.map((announcement: any, index: number) => (
                <AnimatedSection key={announcement.id || index} delay={index * 0.1}>
                  <NewsCard
                    title={announcement.title}
                    date={announcement.date}
                    category={announcement.category}
                    excerpt={announcement.excerpt || announcement.summary}
                    downloadUrl={announcement.url || announcement.file}
                  />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection>
              <EmptyState
                icon={HiOutlineDocumentText}
                title={t('comingSoon')}
                description={t('comingSoonDescription')}
                action={{
                  label: t('viewOnAsx'),
                  href: `https://www.asx.com.au/markets/company/${companyASXCode}`
                }}
              />
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding-small bg-white">
        <div className="container">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-heading-lg text-secondary-900 mb-6">
                {t('subscribeTitle')}
              </h2>
              <p className="text-lg text-gray-600 mb-8 font-josefin">
                {t('subscribeDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder={t('searchPlaceholder')}
                  className="flex-1 max-w-md px-4 py-3 border-2 border-gray-300 focus:border-primary-600 focus:outline-none transition-colors"
                />
                <button className="btn-primary whitespace-nowrap">
                  <span>{t('subscribeTitle')}</span>
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
