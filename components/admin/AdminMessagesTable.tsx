'use client';

import { useState, useEffect } from 'react';
import { FiMail, FiSend, FiClock, FiCheckCircle } from 'react-icons/fi';

interface Message {
  id: string;
  user_name: string;
  user_email: string;
  subject: string;
  message: string;
  status: 'open' | 'replied' | 'resolved';
  created_at: string;
  read: boolean;
}

export default function AdminMessagesTable() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'open' | 'replied' | 'resolved'>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    fetchMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchMessages = async () => {
    try {
      // TODO: Fetch from API
      // Mock data
      const mockMessages: Message[] = [
        {
          id: '1',
          user_name: 'John Investor',
          user_email: 'john@example.com',
          subject: 'Question about dividend payments',
          message: 'When is the next dividend payment expected?',
          status: 'open',
          created_at: '2024-02-09T10:30:00Z',
          read: false,
        },
        {
          id: '2',
          user_name: 'Sarah Partner',
          user_email: 'sarah@company.com',
          subject: 'Meeting request',
          message: 'Would like to schedule a meeting to discuss project progress.',
          status: 'replied',
          created_at: '2024-02-08T14:20:00Z',
          read: true,
        },
      ];
      
      const filtered = filter === 'all' 
        ? mockMessages 
        : mockMessages.filter(m => m.status === filter);
      
      setMessages(filtered);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'open': return <FiClock className="w-4 h-4" />;
      case 'replied': return <FiSend className="w-4 h-4" />;
      case 'resolved': return <FiCheckCircle className="w-4 h-4" />;
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
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Messages List */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow">
          {/* Filter Tabs */}
          <div className="border-b">
            <div className="flex space-x-4 px-6 py-3">
              {(['all', 'open', 'replied', 'resolved'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 font-medium transition-colors ${
                    filter === tab
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="divide-y">
            {messages.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No messages found
              </div>
            ) : (
              messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        {!message.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        )}
                        <span className="font-medium text-gray-900">
                          {message.user_name}
                        </span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-sm text-gray-500">
                          {new Date(message.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {message.subject}
                      </div>
                      <div className="text-sm text-gray-600 line-clamp-2">
                        {message.message}
                      </div>
                    </div>
                    <span className={`ml-4 inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(message.status)}`}>
                      {getStatusIcon(message.status)}
                      <span className="ml-1">{message.status}</span>
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Message Detail / Reply */}
      <div className="lg:col-span-1">
        {selectedMessage ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Reply to Message
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-700">From</label>
                <div className="text-sm text-gray-900">{selectedMessage.user_name}</div>
                <div className="text-xs text-gray-500">{selectedMessage.user_email}</div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <div className="text-sm text-gray-900">{selectedMessage.subject}</div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <div className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="reply" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Reply
                </label>
                <textarea
                  id="reply"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Type your reply here..."
                />
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Send Reply
                </button>
                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  Mark Resolved
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center text-gray-500">
              <FiMail className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p>Select a message to reply</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
