'use client';

import { useEffect, useState } from 'react';
import { FiMapPin, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';

interface ProjectUpdate {
  id: string;
  name: string;
  location: string;
  status: 'on-track' | 'attention' | 'completed';
  progress: number;
  lastUpdate: string;
  nextMilestone: string;
}

export default function ProjectUpdatesPanel() {
  const [projects, setProjects] = useState<ProjectUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // TODO: Fetch from API
      // Mock data
      const mockData: ProjectUpdate[] = [
        {
          id: '1',
          name: 'Doboj REE Project',
          location: 'Bosnia and Herzegovina',
          status: 'on-track',
          progress: 75,
          lastUpdate: '2024-02-05',
          nextMilestone: 'Phase 3 Drilling - Q2 2024'
        },
        {
          id: '2',
          name: 'Jezero Lithium Project',
          location: 'Bosnia and Herzegovina',
          status: 'on-track',
          progress: 60,
          lastUpdate: '2024-02-03',
          nextMilestone: 'Resource Estimation - Q2 2024'
        },
        {
          id: '3',
          name: 'Sinjakovo Base Metals',
          location: 'Bosnia and Herzegovina',
          status: 'attention',
          progress: 45,
          lastUpdate: '2024-02-01',
          nextMilestone: 'Environmental Assessment - Q3 2024'
        },
      ];
      
      setProjects(mockData);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: ProjectUpdate['status']) => {
    switch (status) {
      case 'on-track': return 'text-green-600 bg-green-100';
      case 'attention': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
    }
  };

  const getStatusIcon = (status: ProjectUpdate['status']) => {
    switch (status) {
      case 'on-track': return <FiTrendingUp className="w-4 h-4" />;
      case 'attention': return <FiAlertCircle className="w-4 h-4" />;
      case 'completed': return <FiTrendingUp className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Project Updates</h2>
          <Link
            href="/portal/institutional/projects"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View All Projects →
          </Link>
        </div>
      </div>

      <div className="divide-y">
        {projects.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No project updates available
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <FiMapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </div>
                </div>
                <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {getStatusIcon(project.status)}
                  <span className="ml-1 capitalize">{project.status.replace('-', ' ')}</span>
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Next Milestone */}
              <div className="text-sm">
                <span className="text-gray-600">Next Milestone: </span>
                <span className="font-medium text-gray-900">{project.nextMilestone}</span>
              </div>

              {/* Last Update */}
              <div className="text-xs text-gray-500 mt-2">
                Last updated: {new Date(project.lastUpdate).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
