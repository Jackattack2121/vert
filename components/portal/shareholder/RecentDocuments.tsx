'use client';

import { useEffect, useState } from 'react';
import { FiFileText, FiDownload } from 'react-icons/fi';
import Link from 'next/link';

interface Document {
  id: string;
  title: string;
  category: string;
  date: string;
  fileUrl: string;
}

interface RecentDocumentsProps {
  userId?: string;
}

export default function RecentDocuments({ userId }: RecentDocumentsProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, [userId]);

  const fetchDocuments = async () => {
    try {
      // TODO: Fetch from API
      // const response = await fetch(`/api/portal/documents?userId=${userId}&limit=5`);
      // const data = await response.json();
      
      // Mock data
      const mockData: Document[] = [
        { id: '1', title: 'Annual Report 2024', category: 'Financial Report', date: '2024-01-15', fileUrl: '#' },
        { id: '2', title: 'Tax Statement 2023', category: 'Tax Document', date: '2024-01-10', fileUrl: '#' },
        { id: '3', title: 'Shareholding Certificate', category: 'Certificate', date: '2024-01-05', fileUrl: '#' },
      ];
      
      setDocuments(mockData);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Recent Documents</h2>
          <Link
            href="/portal/investor/documents"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View All →
          </Link>
        </div>
      </div>

      <div className="divide-y">
        {documents.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No documents available
          </div>
        ) : (
          documents.map((doc) => (
            <div key={doc.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FiFileText className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{doc.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>{doc.category}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(doc.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <button className="ml-4 p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <FiDownload className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
