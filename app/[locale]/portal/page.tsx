'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import PortalLoginModal from '@/components/portal/PortalLoginModal'
import { HiOutlineLockClosed } from 'react-icons/hi'

export default function PortalPage() {
  const t = useTranslations('portal')
  const [portalModalOpen, setPortalModalOpen] = useState(false)

  return (
    <>
      <section className="relative bg-primary-500 py-40 md:py-48 overflow-hidden">
        <div className="absolute inset-0 bg-primary-500"></div>
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(250,249,246,0.8) 1px, transparent 0)', backgroundSize: '48px 48px' }}></div>
        </div>

        <div className="container relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 mx-auto mb-8 bg-cream-100/10 rounded-full flex items-center justify-center">
                <HiOutlineLockClosed className="w-8 h-8 text-accent-gold" />
              </div>
              <h1 className="font-serif font-light text-hero text-cream-100 mb-6">
                {t('title')}
              </h1>
              <p className="font-sans text-xl text-cream-200 opacity-90 mb-4 leading-relaxed">
                {t('subtitle')}
              </p>
              <p className="font-sans text-base text-cream-200 opacity-70 mb-10 leading-relaxed">
                {t('description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gold" onClick={() => setPortalModalOpen(true)}>
                  {t('loginButton')}
                </Button>
                <Button href="/contact" variant="outline" className="border-cream-100/40 text-cream-100 hover:bg-cream-100 hover:text-primary-500 hover:border-cream-100">
                  {t('contactButton')}
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <PortalLoginModal
        isOpen={portalModalOpen}
        onClose={() => setPortalModalOpen(false)}
      />
    </>
  )
}
