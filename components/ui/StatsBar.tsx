'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
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

/**
 * Parse a stat value string into its numeric and display parts.
 * Examples:
 *   "15+"     → { prefix: "", number: 15, suffix: "+" }
 *   "$100M+"  → { prefix: "$", number: 100, suffix: "M+" }
 *   "3"       → { prefix: "", number: 3, suffix: "" }
 *   "100%"    → { prefix: "", number: 100, suffix: "%" }
 *   "EU"      → { prefix: "", number: NaN, suffix: "", raw: "EU" }
 *   "5"       → { prefix: "", number: 5, suffix: "" }
 */
function parseStatValue(value: string): { prefix: string; number: number; suffix: string; raw?: string } {
  const match = value.match(/^([^0-9]*)(\d+)(.*)$/)
  if (!match) {
    // Non-numeric value (e.g. "EU") — display as-is, no animation
    return { prefix: '', number: NaN, suffix: '', raw: value }
  }
  return {
    prefix: match[1],
    number: parseInt(match[2], 10),
    suffix: match[3],
  }
}

function AnimatedStat({ stat, isVisible }: { stat: Stat; isVisible: boolean }) {
  const parsed = parseStatValue(stat.value)
  const [displayCount, setDisplayCount] = useState(0)
  const hasAnimated = useRef(false)

  const animate = useCallback(() => {
    if (hasAnimated.current || isNaN(parsed.number)) return
    hasAnimated.current = true

    const target = parsed.number
    const duration = 2000 // 2 seconds
    const startTime = performance.now()

    function step(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)

      setDisplayCount(current)

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [parsed.number])

  useEffect(() => {
    if (isVisible) {
      animate()
    }
  }, [isVisible, animate])

  const displayValue = isNaN(parsed.number)
    ? parsed.raw || stat.value
    : `${parsed.prefix}${displayCount}${parsed.suffix}`

  return (
    <div className="text-center px-2">
      <div className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-3 tracking-tight text-accent-gold">
        {displayValue}
      </div>
      <div className="text-sm md:text-base font-sans font-medium tracking-wide opacity-90 whitespace-nowrap">
        {stat.label}
      </div>
      {stat.sublabel && (
        <div className="text-xs md:text-sm mt-1 font-sans opacity-60 whitespace-nowrap">
          {stat.sublabel}
        </div>
      )}
    </div>
  )
}

export default function StatsBar({ stats, variant = 'horizontal', background = 'teal', className }: StatsBarProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const backgrounds = {
    dark: 'bg-primary-700 text-cream-100',
    light: 'bg-white text-primary-500',
    teal: 'bg-primary-500 text-cream-100',
    cream: 'bg-cream-200 text-primary-500',
  }

  const colsClass = stats.length === 3
    ? 'grid-cols-3'
    : stats.length === 4
      ? 'grid-cols-2 sm:grid-cols-4'
      : `grid-cols-2 sm:grid-cols-${Math.min(stats.length, 4)}`

  return (
    <section
      ref={sectionRef}
      className={cn('py-16 md:py-20', backgrounds[background], className)}
    >
      <div className="container">
        <div
          className={cn(
            'grid gap-8 md:gap-12',
            variant === 'horizontal'
              ? colsClass
              : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4'
          )}
        >
          {stats.map((stat, index) => (
            <AnimatedStat key={index} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
