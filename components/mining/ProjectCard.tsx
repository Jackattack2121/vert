import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  title: string
  location: string
  type: string
  description: string
  image: string
  href: string
  className?: string
}

export default function ProjectCard({
  title,
  location,
  type,
  description,
  image,
  href,
  className,
}: ProjectCardProps) {
  return (
    <Link href={href}>
      <div
        className={cn(
          'relative overflow-hidden rounded-md shadow-elegant transition-all duration-500 hover:shadow-card-hover group h-full',
          className
        )}
      >
        {/* Image */}
        <div className="relative h-80 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
              <span className="inline-block px-3 py-1 bg-primary-500 text-white text-xs font-sans font-medium tracking-wide mb-3">
                {type}
              </span>
              <h3 className="text-2xl font-serif font-light mb-2">
                {title}
              </h3>
              <p className="text-sm text-cream-200 mb-4 flex items-center font-sans">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {location}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-6">
          <p className="text-secondary-500 font-sans leading-relaxed line-clamp-3">
            {description}
          </p>
          <div className="mt-4 flex items-center text-primary-500 font-sans font-medium group-hover:text-accent-gold transition-colors">
            <span className="mr-2">Learn More</span>
            <svg
              className="w-4 h-4 transform transition-transform group-hover:translate-x-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
