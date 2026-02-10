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
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-8">
            {section.heading}
          </h2>
        )}
        <div className="space-y-4">
          {section.files.map((file, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold uppercase tracking-wider mb-1">
                  {file.title}
                </h3>
                {file.description && (
                  <p className="text-gray-600 text-sm mb-2">
                    {file.description}
                  </p>
                )}
                {file.date && (
                  <p className="text-gray-500 text-xs">
                    {file.date}
                  </p>
                )}
              </div>
              {file.fileId && (
                <a
                  href={file.fileId.startsWith('/') ? file.fileId : `/documents/${file.fileId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md font-semibold uppercase tracking-wider text-sm transition-colors"
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

