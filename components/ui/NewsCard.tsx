'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface NewsCardProps {
  title: string
  date: string
  category: string
  excerpt?: string
  image?: string
  href?: string
  downloadUrl?: string
  className?: string
}

export default function NewsCard({
  title,
  date,
  category,
  excerpt,
  image,
  href,
  downloadUrl,
  className,
}: NewsCardProps) {
  const t = useTranslations('buttons')

  const CardContent = () => (
    <div
      className={cn(
        'group bg-white rounded-md overflow-hidden shadow-elegant hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300',
        className
      )}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
      )}
      <div className="p-8">
        <div className="flex items-center gap-4 mb-3">
          <span className="font-sans text-xs tracking-[0.1em] uppercase text-accent-gold font-medium">
            {category}
          </span>
          <span className="font-sans text-xs text-secondary-400">{date}</span>
        </div>
        <h3 className="font-serif text-lg font-normal text-primary-500 mb-2 group-hover:text-accent-gold transition-colors duration-300">
          {title}
        </h3>
        {excerpt && (
          <p className="font-sans text-sm text-secondary-500 leading-relaxed mb-4 line-clamp-2">
            {excerpt}
          </p>
        )}
        <div className="flex items-center font-sans text-sm font-medium text-accent-gold tracking-wide">
          {downloadUrl ? (
            <>
              <span>{t('download')}</span>
              <svg className="w-4 h-4 ml-2 hover-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
              </svg>
            </>
          ) : (
            <>
              <span>{t('viewMore')}</span>
              <svg className="w-4 h-4 ml-2 hover-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href}>
        <CardContent />
      </Link>
    )
  }

  if (downloadUrl) {
    return (
      <a href={downloadUrl} download>
        <CardContent />
      </a>
    )
  }

  return <CardContent />
}
