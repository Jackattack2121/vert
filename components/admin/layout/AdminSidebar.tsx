'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Mail,
  BarChart3,
  Search,
  Users,
  Send,
  TrendingUp,
  Tag,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Email Marketing',
    icon: Mail,
    children: [
      { name: 'Campaigns', href: '/admin/email/campaigns', icon: Send },
      { name: 'Subscribers', href: '/admin/email/subscribers', icon: Users },
      { name: 'Templates', href: '/admin/email/templates', icon: FileText },
    ],
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    name: 'SEO',
    icon: Search,
    children: [
      { name: 'Meta Tags', href: '/admin/seo/meta-tags', icon: Tag },
      { name: 'Performance', href: '/admin/seo/performance', icon: TrendingUp },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  
  // Track which sections are open (default to open if current path matches)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navigation.forEach((item) => {
      if (item.children) {
        // Auto-open section if current page is one of its children
        const isActive = item.children.some((child) => pathname.startsWith(child.href));
        initial[item.name] = isActive;
      }
    });
    return initial;
  });

  const toggleSection = (name: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-800 px-6 pb-4">
          {/* Logo */}
          <Link href="/admin" className="flex h-20 shrink-0 items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#FF7B42] to-[#D14D15] rounded-lg">
              <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
                <div className="w-2 h-2 bg-white rounded-full opacity-90"></div>
                <div className="w-2 h-2 bg-white rounded-full opacity-70"></div>
                <div className="w-2 h-2 bg-white rounded-full opacity-70"></div>
                <div className="w-2 h-2 bg-white rounded-full opacity-90"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Core<span className="text-[#FF7B42]">Connect</span>
              </h1>
              <p className="text-xs text-slate-400">Admin Portal</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      {!item.children ? (
                        <Link
                          href={item.href!}
                          className={cn(
                            pathname === item.href
                              ? 'bg-slate-800 text-white'
                              : 'text-slate-300 hover:text-white hover:bg-slate-800/50',
                            'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold transition-colors'
                          )}
                        >
                          <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                          {item.name}
                        </Link>
                      ) : (
                        <div>
                          <button
                            onClick={() => toggleSection(item.name)}
                            className="w-full flex items-center justify-between gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
                          >
                            <div className="flex items-center gap-x-3">
                              <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                              {item.name}
                            </div>
                            {openSections[item.name] ? (
                              <ChevronDown className="h-4 w-4 shrink-0 transition-transform" />
                            ) : (
                              <ChevronRight className="h-4 w-4 shrink-0 transition-transform" />
                            )}
                          </button>
                          <div
                            className={cn(
                              'overflow-hidden transition-all duration-200 ease-in-out',
                              openSections[item.name] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            )}
                          >
                            <ul className="mt-1 px-2 space-y-1">
                              {item.children.map((child) => (
                                <li key={child.name}>
                                  <Link
                                    href={child.href}
                                    className={cn(
                                      pathname === child.href
                                        ? 'bg-slate-800 text-white'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50',
                                      'group flex gap-x-3 rounded-md p-2 pl-9 text-sm leading-6 transition-colors'
                                    )}
                                  >
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </li>

              {/* Footer Info */}
              <li className="mt-auto">
                <div className="rounded-lg bg-slate-800/50 p-4 border border-slate-700">
                  <p className="text-xs text-slate-400 mb-1">Yugo Metals</p>
                  <p className="text-xs text-slate-500">v1.0.0</p>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile menu button - We'll add this later with proper mobile support */}
    </>
  );
}

