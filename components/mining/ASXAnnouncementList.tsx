'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { EnglishOnlyWrapper } from '@/lib/asx-utils'

interface Announcement {
  id: string
  title: string
  date: string
  category: string
  file?: string
}

interface ASXAnnouncementListProps {
  announcements: Announcement[]
  limit?: number
}

export default function ASXAnnouncementList({ announcements, limit }: ASXAnnouncementListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAnnouncements = announcements
    .filter((announcement) =>
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, limit)

  return (
    <div className="space-y-6">
      {/* Search */}
      {!limit && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border-2 border-secondary-300 rounded-md focus:border-primary-500 focus:outline-none transition-colors font-sans"
          />
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white border border-secondary-200 rounded-md p-6 hover:shadow-elegant transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <EnglishOnlyWrapper>
                    <span className="inline-block px-3 py-1 bg-cream-200 text-primary-600 text-xs font-sans font-medium tracking-wide rounded-md">
                      {announcement.category}
                    </span>
                  </EnglishOnlyWrapper>
                  <span className="text-sm font-sans text-secondary-400">{announcement.date}</span>
                </div>
                <EnglishOnlyWrapper>
                  <h3 className="text-lg font-serif font-light text-primary-500 hover:text-accent-gold transition-colors">
                    {announcement.title}
                  </h3>
                </EnglishOnlyWrapper>
              </div>
              {announcement.file && (
                <div className="mt-4 md:mt-0 md:ml-4">
                  <a
                    href={announcement.file}
                    download
                    className="inline-flex items-center px-4 py-2 bg-primary-500 text-white text-sm font-sans font-medium rounded-md hover:bg-primary-600 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-12 text-secondary-400 font-sans">
          No announcements found.
        </div>
      )}
    </div>
  )
}
