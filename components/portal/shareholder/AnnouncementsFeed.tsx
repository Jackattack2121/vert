'use client';

import { useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';

interface Announcement {
  id: string;
  title: string;
  date: string;
  url: string;
}

export default function AnnouncementsFeed() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      // Fetch from existing ASX API
      const response = await fetch('/api/announcements?limit=3');
      const data = await response.json();
      
      setAnnouncements(data.announcements || []);
    } catch (error) {
      console.error('Failed to fetch announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-2">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-900">Latest Announcements</h3>
      </div>

      <div className="divide-y">
        {announcements.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            No announcements
          </div>
        ) : (
          announcements.slice(0, 3).map((announcement) => (
            <a
              key={announcement.id}
              href={announcement.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 line-clamp-2">{announcement.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(announcement.date).toLocaleDateString()}
                  </p>
                </div>
                <FiExternalLink className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
