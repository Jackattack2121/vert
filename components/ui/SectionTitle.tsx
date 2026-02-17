import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
  light?: boolean
}

export default function SectionTitle({ title, subtitle, centered = true, className, light = false }: SectionTitleProps) {
  return (
    <div className={cn(
      'mb-16',
      centered && 'text-center',
      className
    )}>
      <h2 className={cn(
        'font-serif font-light text-display relative inline-block',
        light ? 'text-cream-100' : 'text-primary-500'
      )}>
        {title}
        <span className="absolute -bottom-3 left-0 w-16 h-0.5 bg-accent-gold"></span>
      </h2>
      {subtitle && (
        <p className={cn(
          'text-lg mt-8 font-sans font-normal max-w-2xl leading-relaxed',
          centered && 'mx-auto',
          light ? 'text-cream-200 opacity-90' : 'text-secondary-500'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
