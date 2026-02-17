'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  title: string
  icon?: React.ReactNode
}

export default function Counter({ end, duration = 2, suffix = '', prefix = '', title, icon }: CounterProps) {
  const [count, setCount] = useState(0)
  const counterRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!counterRef.current || hasAnimated.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: counterRef.current,
        start: 'top 80%',
        onEnter: () => {
          if (hasAnimated.current) return
          hasAnimated.current = true

          gsap.to({ val: 0 }, {
            val: end,
            duration,
            ease: 'power2.out',
            onUpdate: function() {
              setCount(Math.round(this.targets()[0].val))
            }
          })
        }
      })
    }, counterRef)

    return () => ctx.revert()
  }, [end, duration])

  return (
    <div ref={counterRef} className="text-center">
      {icon && (
        <div className="text-5xl mb-4 text-accent-gold flex justify-center">
          {icon}
        </div>
      )}
      <div className="font-serif text-4xl md:text-5xl font-light text-accent-gold mb-2">
        {prefix}{count}{suffix}
      </div>
      <h6 className="font-sans text-sm tracking-[0.05em] text-secondary-500 font-medium">
        {title}
      </h6>
      <div className="w-12 h-0.5 bg-accent-gold mx-auto mt-4"></div>
    </div>
  )
}
