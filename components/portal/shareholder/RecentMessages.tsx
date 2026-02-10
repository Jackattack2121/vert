'use client';

import { useEffect, useState } from 'react';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';

interface Message {
  id: string;
  subject: string;
  status: 'open' | 'replied' | 'resolved';
  createdAt: string;
  read: boolean;
}

interface RecentMessagesProps {
  userId?: string;
}

export default function RecentMessages({ userId }: RecentMessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  const fetchMessages = async () => {
    try {
      // TODO: Fetch from API
      // const response = await fetch(`/api/portal/messages?userId=${userId}&limit=3`);
      // const data = await response.json();
      
      // Mock data
      const mockData: Message[] = [
        { id: '1', subject: 'Question about dividend', status: 'replied', createdAt: '2024-02-08', read: true },
        { id: '2', subject: 'Share certificate request', status: 'open', createdAt: '2024-02-05', read: false },
      ];
      
      setMessages(mockData);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: Message['status']) => {
    switch (status) {
      case 'open': return 'text-blue-600 bg-blue-100';
      case 'replied': return 'text-purple-600 bg-purple-100';
      case 'resolved': return 'text-green-600 bg-green-100';
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
          <h3 className="font-semibold text-gray-900">Recent Messages</h3>
          <Link
            href="/portal/investor/messages"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View All →
          </Link>
        </div>
      </div>

      <div className="divide-y">
        {messages.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            No messages
          </div>
        ) : (
          messages.map((message) => (
            <Link
              key={message.id}
              href={`/portal/investor/messages/${message.id}`}
              className="block p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start">
                <FiMail className={`w-4 h-4 mt-1 ${message.read ? 'text-gray-400' : 'text-primary-600'}`} />
                <div className="ml-3 flex-1">
                  <p className={`text-sm ${message.read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                    {message.subject}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      <div className="p-4 border-t">
        <Link
          href="/portal/investor/messages/new"
          className="block w-full text-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          New Message
        </Link>
      </div>
    </div>
  );
}
