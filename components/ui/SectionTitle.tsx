import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export default function SectionTitle({ title, subtitle, centered = true, className }: SectionTitleProps) {
  return (
    <div className={cn(
      'mb-12',
      centered && 'text-center',
      className
    )}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider mb-4 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 w-16 h-1 bg-primary-600"></span>
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 mt-6 font-josefin italic max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}

