import { cn } from '@/lib/utils'

interface Stat {
  value: string
  label: string
  sublabel?: string
}

interface StatsBarProps {
  stats: Stat[]
  variant?: 'horizontal' | 'grid'
  background?: 'dark' | 'light' | 'teal' | 'cream'
  className?: string
}

export default function StatsBar({ stats, variant = 'horizontal', background = 'teal', className }: StatsBarProps) {
  const backgrounds = {
    dark: 'bg-primary-700 text-cream-100',
    light: 'bg-white text-primary-500',
    teal: 'bg-primary-500 text-cream-100',
    cream: 'bg-cream-200 text-primary-500',
  }

  return (
    <section className={cn('py-16 md:py-20', backgrounds[background], className)}>
      <div className="container">
        <div
          className={cn(
            'grid gap-8 md:gap-12',
            variant === 'horizontal'
              ? 'grid-cols-1 sm:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4'
          )}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-serif text-5xl md:text-6xl lg:text-7xl font-light mb-3 tracking-tight text-accent-gold">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-sans font-medium tracking-wide opacity-90">
                {stat.label}
              </div>
              {stat.sublabel && (
                <div className="text-xs md:text-sm mt-1 font-sans opacity-60">
                  {stat.sublabel}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
