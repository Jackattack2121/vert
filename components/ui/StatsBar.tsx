import { cn } from '@/lib/utils'

interface Stat {
  value: string
  label: string
  sublabel?: string
}

interface StatsBarProps {
  stats: Stat[]
  variant?: 'horizontal' | 'grid'
  background?: 'dark' | 'light' | 'blue'
  className?: string
}

export default function StatsBar({ stats, variant = 'horizontal', background = 'dark', className }: StatsBarProps) {
  const backgrounds = {
    dark: 'bg-secondary-900 text-white',
    light: 'bg-gray-50 text-gray-900',
    blue: 'bg-primary-600 text-white',
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
              <div className="text-5xl md:text-6xl lg:text-7xl font-black mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm md:text-base uppercase tracking-wider font-semibold opacity-80">
                {stat.label}
              </div>
              {stat.sublabel && (
                <div className="text-xs md:text-sm mt-1 opacity-60">
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

