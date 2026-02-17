'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import { FileListSection as FileListSectionType } from '@/lib/admin/section-types'

interface Props {
  section: FileListSectionType
}

export default function FileListSection({ section }: Props) {
  return (
    <AnimatedSection>
      <div>
        {section.heading && (
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-8">
            {section.heading}
          </h2>
        )}
        <div className="space-y-4">
          {section.files.map((file, index) => (
            <div
              key={index}
              className="bg-white rounded-md p-6 shadow-elegant hover:shadow-card-hover transition-shadow flex items-center justify-between"
            >
              <div className="flex-1">
                <h3 className="text-lg font-serif font-light mb-1">
                  {file.title}
                </h3>
                {file.description && (
                  <p className="text-secondary-500 font-sans text-sm mb-2">
                    {file.description}
                  </p>
                )}
                {file.date && (
                  <p className="text-secondary-400 font-sans text-xs">
                    {file.date}
                  </p>
                )}
              </div>
              {file.fileId && (
                <a
                  href={file.fileId.startsWith('/') ? file.fileId : `/documents/${file.fileId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-md font-sans font-medium tracking-wide text-sm transition-colors"
                >
                  Download
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
