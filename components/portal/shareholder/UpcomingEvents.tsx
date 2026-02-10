'use client';

import { useEffect, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location?: string;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // TODO: Fetch from API
      // const response = await fetch('/api/portal/calendar?upcoming=true&limit=3');
      // const data = await response.json();
      
      // Mock data
      const mockData: Event[] = [
        { id: '1', title: 'Annual General Meeting', eventType: 'AGM', eventDate: '2024-03-15', location: 'Virtual' },
        { id: '2', title: 'Q1 Results Webinar', eventType: 'Webinar', eventDate: '2024-04-20', location: 'Online' },
      ];
      
      setEvents(mockData);
    } catch (error) {
      console.error('Failed to fetch events:', error);
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
            <div className="h-16 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
          <Link
            href="/portal/investor/calendar"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View Calendar →
          </Link>
        </div>
      </div>

      <div className="divide-y">
        {events.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            No upcoming events
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex flex-col items-center justify-center">
                    <div className="text-xs font-semibold text-primary-600">
                      {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                    </div>
                    <div className="text-lg font-bold text-primary-700">
                      {new Date(event.eventDate).getDate()}
                    </div>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{event.eventType}</p>
                  {event.location && (
                    <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
