'use client'

import { useEffect, useRef, useState } from 'react'
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
    // Animate text content for the active slide
    const titleElements = document.querySelectorAll('.hero-title')
    const subtitleElements = document.querySelectorAll('.hero-subtitle')
    
    if (titleElements[activeIndex] && subtitleElements[activeIndex]) {
      const tl = gsap.timeline()
      
      tl.fromTo(
        titleElements[activeIndex],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      ).fromTo(
        subtitleElements[activeIndex],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
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
        speed={1000}
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
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
              )}

              {/* Content */}
              <div className="relative h-full flex items-center justify-center text-center text-white">
                <div className="container max-w-4xl px-4">
                  <div className="hero-title opacity-0">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-6 font-montserrat">
                      {slide.title}
                    </h1>
                  </div>
                  <div className="hero-subtitle opacity-0">
                    <p className="text-lg md:text-xl lg:text-2xl font-light italic tracking-widest font-josefin mb-4">
                      {slide.subtitle}
                    </p>
                    {slide.description && (
                      <p className="text-base md:text-lg max-w-3xl mx-auto">
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

      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 40px !important;
        }
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: white;
          opacity: 0.5;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 40px;
          border-radius: 6px;
          background: #2563eb;
        }
      `}</style>
    </div>
  )
}

