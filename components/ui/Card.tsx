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
        'relative overflow-hidden bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl group',
        className
      )}
    >
      {image && (
        <div className="relative h-64 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold uppercase tracking-wider mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-gray-600 leading-relaxed">
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

