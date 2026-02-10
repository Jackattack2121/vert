'use client';

import { useEffect, useState } from 'react';
import PortfolioSummary from './PortfolioSummary';
import RecentDocuments from './RecentDocuments';
import RecentMessages from './RecentMessages';
import UpcomingEvents from './UpcomingEvents';
import SharePriceWidget from './SharePriceWidget';
import AnnouncementsFeed from './AnnouncementsFeed';

interface ShareholderDashboardProps {
  userId?: string;
}

export default function ShareholderDashboard({ userId }: ShareholderDashboardProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Portfolio Summary */}
        <PortfolioSummary userId={userId} />

        {/* Share Price Widget */}
        <SharePriceWidget />

        {/* Recent Documents */}
        <RecentDocuments userId={userId} />
      </div>

      {/* Right Column - Sidebar */}
      <div className="space-y-6">
        {/* Upcoming Events */}
        <UpcomingEvents />

        {/* Recent Messages */}
        <RecentMessages userId={userId} />

        {/* Latest Announcements */}
        <AnnouncementsFeed />
      </div>
    </div>
  );
}
