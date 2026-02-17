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
      {/* Hero Section - Montfort-style deep teal */}
      <section className="relative bg-primary-500 py-40 md:py-48 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: 'url(/images/aerial-view-motor-grader-civil-at-construction-sit-2025-07-08-16-02-40-utc.jpg)' }}
        />
        <div className="absolute inset-0 bg-primary-500/70"></div>

        <div className="container relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl">
              <h1 className="font-serif font-light text-hero text-cream-100 mb-6">
                {t('heroTitle')}
              </h1>
              <p className="font-sans text-xl text-cream-200 opacity-90 max-w-2xl leading-relaxed mb-6">
                {t('heroSubtitle')}
              </p>
              <a
                href={`https://www.asx.com.au/markets/company/${companyASXCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-sm font-medium text-accent-gold tracking-wide hover:gap-4 transition-all duration-300"
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
      <section className="section-padding bg-cream-100">
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

      {/* Subscribe CTA */}
      <section className="section-padding bg-primary-500 text-cream-100">
        <div className="container">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif font-light text-display mb-6">
                {t('subscribeTitle')}
              </h2>
              <p className="font-sans text-lg opacity-80 mb-8 leading-relaxed">
                {t('subscribeDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <input
                  type="email"
                  placeholder={t('searchPlaceholder')}
                  className="px-5 py-3 bg-white/10 border border-cream-100/20 rounded-md font-sans text-sm text-cream-100
                             placeholder:text-cream-100/50 focus:border-accent-gold focus:outline-none
                             transition-colors duration-300 w-full sm:w-72"
                />
                <button className="px-8 py-3 bg-accent-gold text-white font-sans font-medium text-sm
                                   tracking-wide rounded-md transition-all duration-300
                                   hover:bg-accent-goldDark hover:scale-[1.02] whitespace-nowrap">
                  {t('subscribeTitle')}
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
