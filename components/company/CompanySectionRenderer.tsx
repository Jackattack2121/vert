'use client'

import { CompanyContentSection } from '@/lib/admin/section-types'
import TextContentSection from './sections/TextContentSection'
import TwoColumnSection from './sections/TwoColumnSection'
import CardGridSection from './sections/CardGridSection'
import FileListSection from './sections/FileListSection'
import ContactInfoSection from './sections/ContactInfoSection'

interface Props {
  sections: CompanyContentSection[]
}

export default function CompanySectionRenderer({ sections }: Props) {
  if (!sections || sections.length === 0) {
    return null
  }

  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order)

  return (
    <>
      {sortedSections.map((section) => {
        switch (section.type) {
          case 'text_content':
            return (
              <section key={section.id} className="section-padding bg-white">
                <div className="container">
                  <TextContentSection section={section} />
                </div>
              </section>
            )

          case 'two_column':
            return (
              <section key={section.id} className="section-padding bg-gray-50">
                <div className="container">
                  <TwoColumnSection section={section} />
                </div>
              </section>
            )

          case 'card_grid':
            return (
              <section key={section.id} className="section-padding bg-white">
                <div className="container">
                  <CardGridSection section={section} />
                </div>
              </section>
            )

          case 'file_list':
            return (
              <section key={section.id} className="section-padding bg-gray-50">
                <div className="container">
                  <FileListSection section={section} />
                </div>
              </section>
            )

          case 'contact_info':
            return (
              <section key={section.id} className="section-padding bg-white">
                <div className="container">
                  <ContactInfoSection section={section} />
                </div>
              </section>
            )

          default:
            console.warn(`Unknown section type: ${(section as any).type}`)
            return null
        }
      })}
    </>
  )
}

