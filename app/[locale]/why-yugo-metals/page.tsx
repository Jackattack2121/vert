'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import SplitSection from '@/components/ui/SplitSection'
import StatsBar from '@/components/ui/StatsBar'
import { HiOutlineCheckCircle } from 'react-icons/hi'
import { LOGO, HERO_IMAGES, SECTION_IMAGES } from '@/lib/images'

export default function WhyYugoMetals() {
  const t = useTranslations('company.about')
  const tButtons = useTranslations('buttons')

  // Build reasons array from translations
  const reasons = [
    {
      icon: t('reason1Icon'),
      title: t('reason1Title'),
      description: t('reason1Description'),
    },
    {
      icon: t('reason2Icon'),
      title: t('reason2Title'),
      description: t('reason2Description'),
    },
    {
      icon: t('reason3Icon'),
      title: t('reason3Title'),
      description: t('reason3Description'),
    },
    {
      icon: t('reason4Icon'),
      title: t('reason4Title'),
      description: t('reason4Description'),
    },
    {
      icon: t('reason5Icon'),
      title: t('reason5Title'),
      description: t('reason5Description'),
    },
    {
      icon: t('reason6Icon'),
      title: t('reason6Title'),
      description: t('reason6Description'),
    },
  ]

  const highlights = [
    t('highlight1'),
    t('highlight2'),
    t('highlight3'),
    t('highlight4'),
    t('highlight5'),
    t('highlight6'),
  ]

  return (
    <>
      {/* Hero Section - Split */}
      <section className="grid md:grid-cols-2 min-h-[70vh]">
        <div className="bg-primary-500 flex items-center justify-center p-12">
          <div className="w-full max-w-sm">
            <Image
              src={LOGO.main}
              alt="Vert Capital"
              width={400}
              height={160}
              className="w-full h-auto brightness-0 invert"
              priority
            />
          </div>
        </div>
        <div className="relative overflow-hidden flex items-center p-8 md:p-12 lg:p-20">
          {/* Background Image with fade */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${HERO_IMAGES.whyYugoMetals})` }}
          />

          {/* Blue Overlay */}
          <div className="absolute inset-0 bg-primary-500/60"></div>

          <div className="relative z-10">
            <AnimatedSection>
              <h1 className="font-serif font-light text-hero text-cream-100 mb-4">
                {t('titleLine1')}<br />
                {t('titleLine2')}
              </h1>
              <p className="font-sans text-sm font-normal tracking-wider text-cream-100/90">
                {t('subtitle')}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Introduction Split */}
      <SplitSection
        fullHeight={false}
        leftContent={
          <div className="max-w-xl">
            <AnimatedSection>
              <h2 className="font-serif font-light text-display text-primary-500 mb-8">
                {t('introTitleLine1')}<br />
                {t('introTitleLine2')}<br />
                {t('introTitleLine3')}<br />
                {t('introTitleLine4')}
              </h2>
              <p className="font-sans text-base text-secondary-500 leading-relaxed">
                {t('introDescription')}
              </p>
            </AnimatedSection>
          </div>
        }
        rightContent={
          <div className="relative overflow-hidden h-full">
            <Image
              src={SECTION_IMAGES.whyYugoBosnia}
              alt="Bosnia and Herzegovina"
              fill
              className="object-cover"
            />
          </div>
        }
      />

      {/* Stats */}
      <StatsBar
        background="teal"
        stats={[
          { value: '5', label: t('stat1') },
          { value: '100%', label: t('stat2') },
          { value: 'EU', label: t('stat3') },
        ]}
      />

      {/* Six Reasons Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="font-serif font-light text-display text-primary-500 mb-4">
                {t('reasonsTitleLine1')}<br />
                {t('reasonsTitleLine2')}
              </h2>
              <div className="w-16 h-0.5 bg-accent-gold mx-auto"></div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {reasons.map((reason, index) => (
              <AnimatedSection key={index} delay={index * 0.1} className="h-full">
                <div className="border border-primary-500/10 rounded-md p-8 hover:border-primary-500 hover:shadow-elegant transition-all h-full flex flex-col">
                  <div className="text-5xl mb-6">{reason.icon}</div>
                  <h3 className="text-xl font-serif font-normal mb-4 text-primary-500">
                    {reason.title}
                  </h3>
                  <p className="text-secondary-500 leading-relaxed flex-grow">
                    {reason.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Exploration Section */}
      <SplitSection
        fullHeight={false}
        reverse={true}
        leftContent={
          <div className="p-12 bg-primary-500 text-cream-100 flex items-center">
            <div className="max-w-xl">
              <AnimatedSection>
                <h2 className="font-serif font-light text-display text-cream-100 mb-8">
                  {t('modernExplorationTitleLine1')}<br />
                  {t('modernExplorationTitleLine2')}<br />
                  {t('modernExplorationTitleLine3')}
                </h2>
                <div className="space-y-6 font-sans text-base leading-relaxed opacity-90">
                  <p>{t('modernExplorationParagraph1')}</p>
                  <p>{t('modernExplorationParagraph2')}</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        }
        rightContent={
          <div className="relative overflow-hidden h-full">
            <Image
              src={SECTION_IMAGES.whyYugoMining}
              alt="Exploration Program"
              fill
              className="object-cover"
            />
          </div>
        }
      />

      {/* Key Highlights */}
      <section className="section-padding bg-cream-100">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="font-serif font-light text-display text-primary-500 text-center mb-12">
              {t('keyHighlights')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <HiOutlineCheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                  <span className="font-sans text-base text-secondary-600">{highlight}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Critical Metals Section */}
      <section className="section-padding bg-primary-500 text-cream-100 text-center">
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif font-light text-display text-cream-100 mb-4">
              {t('criticalMetalsTitle')}
            </h2>
            <p className="text-2xl font-serif opacity-90">
              {t('criticalMetalsSubtitle')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white text-center">
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="font-serif font-light text-display text-primary-500 mb-6">
              {t('ctaTitleLine1')}
            </h2>
            <p className="text-xl font-sans text-secondary-500 mb-12">
              {t('ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/investors/asx-announcements">
                <Button variant="primary" className="w-full sm:w-auto">
                  {t('viewAnnouncements')}
                </Button>
              </a>
              <a href="/projects">
                <Button variant="outline" className="w-full sm:w-auto">
                  {t('exploreProjects')}
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
