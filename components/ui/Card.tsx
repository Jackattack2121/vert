import { cn } from '@/lib/utils'
import { Link } from '@/i18n/navigation'

interface CardProps {
  title: string
  description?: string
  image?: string
  href?: string
  className?: string
  children?: React.ReactNode
}

export default function Card({ title, description, image, href, className, children }: CardProps) {
  const content = (
    <div
      className={cn(
        'relative overflow-hidden bg-white rounded-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group',
        'hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)]',
        'shadow-[0_4px_20px_rgba(0,0,0,0.08)]',
        className
      )}
    >
      {image && (
        <div className="relative h-64 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
      )}

      <div className="p-8 lg:p-10">
        <h3 className="font-serif text-xl lg:text-2xl font-normal mb-3 text-primary-500 group-hover:text-primary-400 transition-colors duration-300">
          {title}
        </h3>
        {description && (
          <p className="font-sans text-secondary-500 leading-relaxed text-base">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}
