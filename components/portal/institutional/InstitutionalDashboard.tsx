'use client';

import { useEffect, useState } from 'react';
import RelationshipOverview from './RelationshipOverview';
import ProjectUpdatesPanel from './ProjectUpdatesPanel';
import AccountManagerCard from './AccountManagerCard';
import RecentDocuments from './RecentDocuments';
import RecentMessages from './RecentMessages';
import UpcomingMeetings from './UpcomingMeetings';

interface InstitutionalDashboardProps {
  userId?: string;
}

export default function InstitutionalDashboard({ userId }: InstitutionalDashboardProps) {
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
        {/* Relationship Overview */}
        <RelationshipOverview userId={userId} />

        {/* Project Updates */}
        <ProjectUpdatesPanel />

        {/* Recent Documents */}
        <RecentDocuments userId={userId} />
      </div>

      {/* Right Column - Sidebar */}
      <div className="space-y-6">
        {/* Account Manager */}
        <AccountManagerCard />

        {/* Upcoming Meetings */}
        <UpcomingMeetings userId={userId} />

        {/* Recent Messages */}
        <RecentMessages userId={userId} />
      </div>
    </div>
  );
}
