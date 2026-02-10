import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SplitSectionProps {
  leftContent: ReactNode
  rightContent: ReactNode
  leftBg?: string
  rightBg?: string
  reverse?: boolean
  className?: string
  fullHeight?: boolean
}

export default function SplitSection({
  leftContent,
  rightContent,
  leftBg = 'bg-white',
  rightBg = 'bg-white',
  reverse = false,
  className,
  fullHeight = true,
}: SplitSectionProps) {
  return (
    <section
      className={cn(
        'grid md:grid-cols-2',
        fullHeight && 'min-h-screen',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center p-8 md:p-12 lg:p-20',
          leftBg,
          reverse && 'md:order-2'
        )}
      >
        {leftContent}
      </div>
      <div
        className={cn(
          'relative min-h-[50vh] md:min-h-full',
          rightBg,
          reverse && 'md:order-1'
        )}
      >
        {rightContent}
      </div>
    </section>
  )
}

