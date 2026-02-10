'use client';

import { useEffect, useState } from 'react';
import { FiTrendingUp, FiUsers, FiTarget, FiAward } from 'react-icons/fi';

interface RelationshipData {
  partnershipDuration: string;
  activeProjects: number;
  investmentValue: string;
  milestonesAchieved: number;
}

interface RelationshipOverviewProps {
  userId?: string;
}

export default function RelationshipOverview({ userId }: RelationshipOverviewProps) {
  const [data, setData] = useState<RelationshipData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      // TODO: Fetch from API
      // Mock data
      const mockData: RelationshipData = {
        partnershipDuration: '2 years, 4 months',
        activeProjects: 3,
        investmentValue: '$2.5M',
        milestonesAchieved: 12,
      };
      
      setData(mockData);
    } catch (error) {
      console.error('Failed to fetch relationship data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-900">Partnership Overview</h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Partnership Duration */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6">
            <div className="flex items-center text-primary-600 mb-2">
              <FiUsers className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Partnership Duration</span>
            </div>
            <div className="text-2xl font-bold text-primary-900">
              {data.partnershipDuration}
            </div>
          </div>

          {/* Active Projects */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
            <div className="flex items-center text-green-600 mb-2">
              <FiTarget className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Active Projects</span>
            </div>
            <div className="text-2xl font-bold text-green-900">
              {data.activeProjects}
            </div>
          </div>

          {/* Investment Value */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
            <div className="flex items-center text-purple-600 mb-2">
              <FiTrendingUp className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Investment Value</span>
            </div>
            <div className="text-2xl font-bold text-purple-900">
              {data.investmentValue}
            </div>
          </div>

          {/* Milestones Achieved */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
            <div className="flex items-center text-orange-600 mb-2">
              <FiAward className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Milestones Achieved</span>
            </div>
            <div className="text-2xl font-bold text-orange-900">
              {data.milestonesAchieved}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
