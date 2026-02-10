import { ContentSection } from '@/lib/admin/section-types';
import TextImageSection from './sections/TextImageSection';
import FullTextSection from './sections/FullTextSection';
import DataCardsSection from './sections/DataCardsSection';
import AdvantagesGridSection from './sections/AdvantagesGridSection';
import CTASection from './sections/CTASection';

interface ProjectSectionProps {
  section: ContentSection;
  index: number;
}

export default function ProjectSection({ section, index }: ProjectSectionProps) {
  switch (section.type) {
    case 'text_image':
      return <TextImageSection section={section} index={index} />;
    case 'full_text':
      return <FullTextSection section={section} index={index} />;
    case 'data_cards':
      return <DataCardsSection section={section} index={index} />;
    case 'advantages_grid':
      return <AdvantagesGridSection section={section} index={index} />;
    case 'cta_section':
      return <CTASection section={section} index={index} />;
    default:
      console.warn(`Unknown section type: ${(section as any).type}`);
      return null;
  }
}

