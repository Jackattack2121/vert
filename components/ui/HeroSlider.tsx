'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

interface Slide {
  title: string
  subtitle: string
  image?: string
  video?: string
  description?: string
}

interface HeroSliderProps {
  slides: Slide[]
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const titleElements = document.querySelectorAll('.hero-title')
    const subtitleElements = document.querySelectorAll('.hero-subtitle')

    if (titleElements[activeIndex] && subtitleElements[activeIndex]) {
      const tl = gsap.timeline()

      tl.fromTo(
        titleElements[activeIndex],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.3 }
      ).fromTo(
        subtitleElements[activeIndex],
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )

      return () => {
        tl.kill()
      }
    }
  }, [activeIndex])

  return (
    <div className="relative h-screen">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1200}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              {/* Background Video or Image */}
              {slide.video ? (
                <div className="absolute inset-0">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={slide.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-primary-500/60"></div>
                </div>
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-primary-500/60"></div>
                </div>
              )}

              {/* Content */}
              <div className="relative h-full flex items-center justify-center text-center text-cream-100">
                <div className="container max-w-5xl px-6">
                  <div className="hero-title opacity-0">
                    <h1 className="font-serif font-light text-4xl md:text-5xl lg:text-7xl leading-tight tracking-tight mb-6">
                      {slide.title}
                    </h1>
                  </div>
                  <div className="hero-subtitle opacity-0">
                    <p className="font-sans text-lg md:text-xl lg:text-2xl font-light tracking-wide mb-4 opacity-90">
                      {slide.subtitle}
                    </p>
                    {slide.description && (
                      <p className="font-sans text-base md:text-lg max-w-3xl mx-auto opacity-80">
                        {slide.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Styles - Montfort aesthetic */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 40px !important;
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(250, 249, 246, 0.5);
          opacity: 1;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .swiper-pagination-bullet-active {
          width: 36px;
          border-radius: 5px;
          background: #C9A961;
        }
      `}</style>
    </div>
  )
}
