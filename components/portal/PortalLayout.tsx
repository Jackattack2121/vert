'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  FiHome,
  FiPieChart,
  FiFileText,
  FiMail,
  FiCalendar,
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
  FiBriefcase,
  FiTrendingUp,
} from 'react-icons/fi';

interface PortalLayoutProps {
  children: React.ReactNode;
  portalType: 'investor' | 'institutional';
}

const investorNavigation = [
  { name: 'Dashboard', href: '/portal/investor/dashboard', icon: FiHome },
  { name: 'Portfolio', href: '/portal/investor/portfolio', icon: FiPieChart },
  { name: 'Documents', href: '/portal/investor/documents', icon: FiFileText },
  { name: 'Messages', href: '/portal/investor/messages', icon: FiMail },
  { name: 'Calendar', href: '/portal/investor/calendar', icon: FiCalendar },
  { name: 'Profile', href: '/portal/investor/profile', icon: FiUser },
];

const institutionalNavigation = [
  { name: 'Dashboard', href: '/portal/institutional/dashboard', icon: FiHome },
  { name: 'Projects', href: '/portal/institutional/projects', icon: FiTrendingUp },
  { name: 'Documents', href: '/portal/institutional/documents', icon: FiFileText },
  { name: 'Messages', href: '/portal/institutional/messages', icon: FiMail },
  { name: 'Calendar', href: '/portal/institutional/calendar', icon: FiCalendar },
  { name: 'Profile', href: '/portal/institutional/profile', icon: FiUser },
];

export default function PortalLayout({ children, portalType }: PortalLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const navigation = portalType === 'investor' ? investorNavigation : institutionalNavigation;

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/portal/login' });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <span className="text-xl font-bold text-primary-600">
              {portalType === 'investor' ? 'Investor Portal' : 'Institutional Portal'}
            </span>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
              <FiX className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FiLogOut className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 bg-white border-r">
          <div className="flex items-center h-16 px-6 border-b">
            <span className="text-xl font-bold text-primary-600">
              {portalType === 'investor' ? 'Investor Portal' : 'Institutional Portal'}
            </span>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FiLogOut className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center h-16 px-4 bg-white border-b lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 lg:hidden hover:text-gray-700"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {portalType === 'investor' ? 'Shareholder' : 'Institutional Client'}
            </span>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
