'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

export const useGSAP = (animationFn: () => gsap.core.Timeline | gsap.core.Tween | void, dependencies: any[] = []) => {
  useEffect(() => {
    const animation = animationFn()
    return () => {
      if (animation) {
        animation.kill()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

export const fadeIn = (element: HTMLElement | null, delay: number = 0) => {
  if (!element) return
  
  gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power2.out',
    }
  )
}

export const fadeInScrollTrigger = (element: HTMLElement | null, options?: gsap.TweenVars) => {
  if (!element) return
  
  gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    }
  )
}

export const staggerFadeIn = (elements: HTMLElement[] | NodeListOf<Element>, delay: number = 0.1) => {
  gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: delay,
      ease: 'power2.out',
    }
  )
}

export const parallaxEffect = (element: HTMLElement | null, speed: number = 0.5) => {
  if (!element) return
  
  gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

