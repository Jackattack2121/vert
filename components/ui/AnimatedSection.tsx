'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { fadeInScrollTrigger } from '@/lib/gsap-utils'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      fadeInScrollTrigger(sectionRef.current, { delay })
    }
  }, [delay])

  return (
    <div ref={sectionRef} className={cn('opacity-0', className)}>
      {children}
    </div>
  )
}

