'use client';

import { useEffect, useState } from 'react';
import { FiCalendar, FiVideo } from 'react-icons/fi';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'in-person' | 'virtual';
  location?: string;
  meetingUrl?: string;
}

interface UpcomingMeetingsProps {
  userId?: string;
}

export default function UpcomingMeetings({ userId }: UpcomingMeetingsProps) {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeetings();
  }, [userId]);

  const fetchMeetings = async () => {
    try {
      // TODO: Fetch from API
      // Mock data
      const mockData: Meeting[] = [
        {
          id: '1',
          title: 'Quarterly Review',
          date: '2024-02-15',
          time: '10:00 AM',
          type: 'virtual',
          meetingUrl: 'https://meet.example.com/abc123'
        },
        {
          id: '2',
          title: 'Project Site Visit',
          date: '2024-02-20',
          time: '2:00 PM',
          type: 'in-person',
          location: 'Doboj, Bosnia and Herzegovina'
        },
      ];
      
      setMeetings(mockData);
    } catch (error) {
      console.error('Failed to fetch meetings:', error);
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
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-900">Upcoming Meetings</h3>
      </div>

      <div className="divide-y">
        {meetings.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            No upcoming meetings
          </div>
        ) : (
          meetings.map((meeting) => (
            <div key={meeting.id} className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex flex-col items-center justify-center">
                    <div className="text-xs font-semibold text-primary-600">
                      {new Date(meeting.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                    </div>
                    <div className="text-lg font-bold text-primary-700">
                      {new Date(meeting.date).getDate()}
                    </div>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">{meeting.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{meeting.time}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    {meeting.type === 'virtual' ? (
                      <>
                        <FiVideo className="w-3 h-3 mr-1" />
                        <span>Virtual Meeting</span>
                      </>
                    ) : (
                      <>
                        <FiCalendar className="w-3 h-3 mr-1" />
                        <span>{meeting.location}</span>
                      </>
                    )}
                  </div>
                  {meeting.meetingUrl && (
                    <a
                      href={meeting.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Join Meeting →
                    </a>
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
