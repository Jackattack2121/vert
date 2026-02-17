'use client'

import { useState, useEffect, useRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import gsap from 'gsap'

interface Project {
  title: string
  slug: string
  location: string
  type: string
  image: string
}

interface ProjectPickerProps {
  isSolid?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function ProjectPicker({ isSolid = true, onOpenChange }: ProjectPickerProps) {
  const locale = useLocale()
  const t = useTranslations('projects')

  const projects: Project[] = [
    {
      title: t('doboj.name'),
      slug: 'doboj',
      location: t('doboj.location'),
      type: t('doboj.type'),
      image: '/images/open-pit-mine-with-machines-2024-09-16-10-43-35-utc.jpg',
    },
    {
      title: t('jezero.name'),
      slug: 'jezero',
      location: t('jezero.location'),
      type: t('jezero.type'),
      image: '/images/flying-over-open-pit-gold-mine-quarry-in-rosia-m-2025-03-09-07-21-03-utc.jpg',
    },
    {
      title: t('sockovac.name'),
      slug: 'sockovac',
      location: t('sockovac.location'),
      type: t('sockovac.type'),
      image: '/images/aerial-view-over-the-sand-pit-2025-10-13-02-21-23-utc.jpg',
    },
    {
      title: t('sinjakovo.name'),
      slug: 'sinjakovo',
      location: t('sinjakovo.location'),
      type: t('sinjakovo.type'),
      image: '/images/yellow-excavator-digging-rocks-at-the-quarry-doin-2025-01-29-03-01-59-utc.jpg',
    },
    {
      title: t('cajnice.name'),
      slug: 'cajnice',
      location: t('cajnice.location'),
      type: t('cajnice.type'),
      image: '/images/natural-quarry-is-located-near-road-against-backdr-2025-01-29-05-43-49-utc.jpg',
    },
  ]
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<string>(projects[0].slug)
  const panelRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Notify parent when dropdown state changes
  useEffect(() => {
    onOpenChange?.(isOpen)
  }, [isOpen, onOpenChange])

  // Reset to first project when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setHoveredProject(projects[0].slug)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useEffect(() => {
    if (panelRef.current) {
      if (isOpen) {
        gsap.to(panelRef.current, {
          height: 'auto',
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
        })
      } else {
        gsap.to(panelRef.current, {
          height: 0,
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: 'power3.in',
        })
      }
    }
  }, [isOpen])

  // Smooth image transition on hover change
  useEffect(() => {
    if (imageRef.current && isOpen) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0.7 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
    }
  }, [hoveredProject, isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const currentProject = projects.find((p) => p.slug === hoveredProject) || projects[0]

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-[400ms] hover:text-primary-400',
          isOpen ? 'text-white' : (isSolid ? 'text-gray-900' : 'text-white')
        )}
      >
        <span>{t('picker.title')}</span>
        <svg
          className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Panel */}
      <div
        ref={panelRef}
        className="fixed left-0 right-0 top-[72px] md:top-[96px] bg-secondary-900 text-white overflow-hidden shadow-2xl z-40"
        style={{ height: 0, opacity: 0, transform: 'translateY(-20px)' }}
      >
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p className="text-xs uppercase tracking-wider opacity-60 mb-6">
            {t('picker.subtitle')}
          </p>
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column - Project List */}
            <div className="space-y-2">
              {projects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                onClick={() => setIsOpen(false)}
                  onMouseEnter={() => setHoveredProject(project.slug)}
                  className={cn(
                    'block p-4 rounded transition-all duration-300 group',
                    hoveredProject === project.slug
                      ? 'bg-white/10 border-l-4 border-primary-400'
                      : 'bg-transparent border-l-4 border-transparent hover:bg-white/5'
                  )}
              >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-primary-400 opacity-60">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3
                          className={cn(
                            'text-base font-bold uppercase tracking-tight transition-colors',
                            hoveredProject === project.slug
                              ? 'text-white'
                              : 'text-gray-300 group-hover:text-white'
                          )}
                        >
                          {project.title}
                        </h3>
                        <p
                          className={cn(
                            'text-xs transition-colors mt-0.5',
                            hoveredProject === project.slug
                              ? 'text-primary-400'
                              : 'text-gray-400 group-hover:text-primary-400'
                          )}
                        >
                          {project.type}
                        </p>
                      </div>
                    </div>
                    <svg
                      className={cn(
                        'w-4 h-4 transition-all flex-shrink-0',
                        hoveredProject === project.slug
                          ? 'text-primary-400 translate-x-1'
                          : 'text-gray-500 group-hover:text-white group-hover:translate-x-1'
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Column - Preview Image */}
            <div className="relative h-[380px] rounded overflow-hidden">
              <div
                ref={imageRef}
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{ backgroundImage: `url(${currentProject.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-2xl font-bold mb-1">{currentProject.title}</h4>
                  <p className="text-primary-400 font-semibold text-sm mb-1">{currentProject.type}</p>
                  <p className="text-xs text-gray-300">{currentProject.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay - positioned below header */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 top-[72px] md:top-[96px]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

