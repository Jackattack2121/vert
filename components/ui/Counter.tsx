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
        <div className="text-5xl mb-4 text-primary-500 flex justify-center">
          {icon}
        </div>
      )}
      <div className="text-4xl md:text-5xl font-bold text-primary-900 mb-2">
        {prefix}{count}{suffix}
      </div>
      <h6 className="text-sm uppercase tracking-wider text-gray-600 font-semibold">
        {title}
      </h6>
      <div className="w-12 h-0.5 bg-primary-600 mx-auto mt-4"></div>
    </div>
  )
}

