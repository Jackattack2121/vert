import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SplitSection from '@/components/ui/SplitSection';
import StatsBar from '@/components/ui/StatsBar';
import Button from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';

export async function generateStaticParams() {
  return [
    { slug: 'doboj' },
    { slug: 'jezero' },
    { slug: 'sockovac' },
    { slug: 'sinjakovo' },
    { slug: 'cajnice' },
  ];
}

export async function generateMetadata({ params }: { params: { slug: string; locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: `projects.${params.slug}` });
  
  try {
    return {
      title: `${t('title')} | Yugo Metals`,
      description: t('description'),
    };
  } catch {
    return {
      title: 'Project Not Found',
    };
  }
}

async function getProjectData(slug: string, locale: string) {
  const validProjects = ['doboj', 'jezero', 'sockovac', 'sinjakovo', 'cajnice'];
  if (!validProjects.includes(slug)) {
    return null;
  }

  const t = await getTranslations({ locale, namespace: `projects.${slug}` });
  const tGeneral = await getTranslations({ locale, namespace: 'projects' });
  
  const heroImages: Record<string, string> = {
    'doboj': '/images/open-pit-mine-with-machines-2024-09-16-10-43-35-utc.jpg',
    'jezero': '/images/flying-over-open-pit-gold-mine-quarry-in-rosia-m-2025-03-09-07-21-03-utc.jpg',
    'sockovac': '/images/the-truck-transports-the-minerals-from-the-top-vie-2025-10-16-12-14-08-utc.jpg',
    'sinjakovo': '/images/green-dense-forests-surround-old-mining-factory-wi-2025-08-28-11-53-12-utc.jpg',
    'cajnice': '/images/lush-mountain-forest-in-bosnia-aerial-shot-2025-09-09-00-26-14-utc.jpg',
  };

  return {
    title: t('title'),
    subtitle: t('subtitle'),
    description: t('description'),
    heroImage: heroImages[slug],
    commodityBadge: t('commodityBadge'),
    number: t('number'),
    overview: {
      heading: t('overviewHeading'),
      content: t('overviewContent'),
    },
    stats: [
      { value: t('stat1Value'), label: t('stat1Label') },
      { value: t('stat2Value'), label: t('stat2Label') },
      { value: t('stat3Value'), label: t('stat3Label') },
    ],
    highlights: [
      t('highlight1'),
      t('highlight2'),
      t('highlight3'),
      t('highlight4'),
    ],
    advantages: [
      {
        icon: t('advantage1Icon'),
        title: t('advantage1Title'),
        description: t('advantage1Description'),
      },
      {
        icon: t('advantage2Icon'),
        title: t('advantage2Title'),
        description: t('advantage2Description'),
      },
      {
        icon: t('advantage3Icon'),
        title: t('advantage3Title'),
        description: t('advantage3Description'),
      },
    ],
    explorationProgram: {
      heading: t('explorationProgramHeading'),
      content: t('explorationProgramContent'),
    },
    tGeneral,
  };
}

export default async function ProjectPage({ params }: { params: { slug: string; locale: string } }) {
  const project = await getProjectData(params.slug, params.locale);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Hero Section - Full Width Image with Minimal Text */}
      <section className="relative h-[80vh] flex items-end bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
        <div className="relative container pb-16 text-white">
          <AnimatedSection>
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-wider opacity-80 mb-4">
                {project.tGeneral('projectNumber', { number: project.number })}
              </div>
              <h1 className="text-display mb-4">
                {project.title}
              </h1>
              <p className="text-xl md:text-2xl font-josefin opacity-90 mb-2">
                {project.commodityBadge}
              </p>
              <p className="text-base opacity-80">
                {project.subtitle}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Bar */}
      <StatsBar background="teal" stats={project.stats} />

      {/* Overview Split Section */}
      <SplitSection
        fullHeight={false}
        leftContent={
          <div className="max-w-xl">
            <AnimatedSection>
              <h2 className="text-heading-lg text-secondary-900 mb-8">
                {project.overview.heading}
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-josefin">
                {project.overview.content.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </AnimatedSection>
          </div>
        }
        rightContent={
          <div className="p-12 bg-primary-50 flex items-center">
            <div>
              <h3 className="text-2xl font-bold uppercase tracking-wider mb-6 text-secondary-900">
                {project.tGeneral('explorationHighlights')}
              </h3>
              <ul className="space-y-4">
                {project.highlights.map((highlight: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <svg className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
      />

      {/* Project Advantages - Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-heading-lg text-secondary-900 mb-4">
                {project.tGeneral('projectAdvantages')}
              </h2>
              <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {project.advantages.map((advantage: any, index: number) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-6xl mb-6">{advantage.icon}</div>
                  <h3 className="text-xl font-bold uppercase tracking-wider mb-4 text-secondary-900">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Exploration Program Split */}
      <SplitSection
        fullHeight={false}
        reverse={true}
        leftContent={
          <div className="p-12 bg-secondary-900 text-white flex items-center">
            <div className="max-w-xl">
              <AnimatedSection>
                <h2 className="text-heading-lg mb-8">
                  {project.explorationProgram.heading}
                </h2>
                <div className="space-y-6 text-lg leading-relaxed font-josefin opacity-90">
                  {project.explorationProgram.content.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        }
        rightContent={
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.heroImage})` }}
          >
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        }
      />

      {/* Explore More Projects */}
      <section className="section-padding bg-primary-600 text-white text-center">
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-heading-lg mb-4">
              {project.tGeneral('exploreMoreProjects')}
            </h2>
            <p className="text-xl font-josefin mb-12 opacity-90">
              {project.tGeneral('exploreMoreDescription')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/investors/asx-announcements">
                <Button variant="secondary" className="w-full sm:w-auto">
                  {project.tGeneral('latestAnnouncements')}
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-primary-600">
                  {project.tGeneral('allProjects')}
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
