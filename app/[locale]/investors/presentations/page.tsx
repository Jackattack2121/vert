import { getTranslations } from 'next-intl/server'
import AnimatedSection from '@/components/ui/AnimatedSection'
import NewsCard from '@/components/ui/NewsCard'
import EmptyState from '@/components/ui/EmptyState'
import { HiOutlineDocumentText } from 'react-icons/hi'

async function getPresentations() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/presentations?limit=50`, {
      next: { revalidate: 600 }, // Revalidate every 10 minutes
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch presentations')
    }
    
    const data = await res.json()
    return data.presentations || []
  } catch (error) {
    console.error('Error fetching presentations:', error)
    return []
  }
}

export default async function Presentations() {
  const t = await getTranslations('investors.presentations')
  const presentations = await getPresentations()
  
  return (
    <>
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
              <p className="text-sm font-semibold uppercase tracking-wider text-white/90">
                {t('heroSubtitle')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          {presentations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {presentations.map((presentation: any, index: number) => (
                <AnimatedSection key={presentation.id || index} delay={index * 0.1}>
                  <NewsCard
                    title={presentation.title}
                    date={presentation.date}
                    category={presentation.category}
                    excerpt={presentation.excerpt || presentation.description || presentation.summary}
                    image={presentation.image || presentation.thumbnail}
                    downloadUrl={presentation.downloadUrl || presentation.file}
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
                  label: t('subscribeButton'),
                  href: "/investors#subscribe"
                }}
              />
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  )
}

