import Link from 'next/link';
import { Search, Tag, TrendingUp, FileText, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

// Mock SEO health data
const seoHealth = {
  score: 78,
  status: 'good' as const,
  issues: {
    critical: 2,
    warning: 5,
    passed: 18,
  },
};

const pages = [
  {
    path: '/',
    title: 'Yugo Metals - European Metals Exploration and Development',
    metaDescription: 'Yugo Metals Limited owns 100% of mineral exploration projects in Bosnia and Herzegovina, prospective for nickel, copper, cobalt, and precious metals.',
    score: 85,
    issues: ['Missing Open Graph image'],
  },
  {
    path: '/projects/doboj',
    title: 'Doboj Project - Yugo Metals',
    metaDescription: 'Nickel-copper-cobalt exploration project in Bosnia and Herzegovina targeting critical metals for the energy transition.',
    score: 92,
    issues: [],
  },
  {
    path: '/investors/asx-announcements',
    title: 'ASX Announcements - Yugo Metals',
    metaDescription: null,
    score: 65,
    issues: ['Missing meta description', 'Title too short'],
  },
  {
    path: '/contact',
    title: 'Contact Us - Yugo Metals',
    metaDescription: 'Get in touch with the Yugo Metals team...',
    score: 88,
    issues: ['Missing structured data'],
  },
];

export default function SEOOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">SEO Management</h1>
          <p className="text-slate-600 mt-1">Optimize your website for search engines</p>
        </div>
        <Link
          href="/admin/seo/meta-tags"
          className="flex items-center gap-2 px-4 py-2 bg-[#FF7B42] text-white font-semibold rounded-lg hover:bg-[#D14D15] transition-colors"
        >
          <Tag className="w-5 h-5" />
          Edit Meta Tags
        </Link>
      </div>

      {/* SEO Health Score */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/90 mb-2">Overall SEO Health</p>
            <div className="flex items-baseline gap-3">
              <p className="text-6xl font-bold">{seoHealth.score}</p>
              <p className="text-2xl text-white/80">/100</p>
            </div>
            <p className="mt-2 text-white/90">
              {seoHealth.issues.critical} critical • {seoHealth.issues.warning} warnings • {seoHealth.issues.passed} passed
            </p>
          </div>
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-20 h-20 text-white" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/seo/meta-tags"
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-[#FF7B42] transition-all group"
        >
          <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4 group-hover:bg-blue-500 transition-colors">
            <Tag className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-1">Meta Tags</h3>
          <p className="text-sm text-slate-600">Edit titles and descriptions</p>
        </Link>

        <Link
          href="/admin/seo/performance"
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-[#FF7B42] transition-all group"
        >
          <div className="bg-green-100 p-3 rounded-lg w-fit mb-4 group-hover:bg-green-500 transition-colors">
            <TrendingUp className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-1">Performance</h3>
          <p className="text-sm text-slate-600">Speed and Core Web Vitals</p>
        </Link>

        <button className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-[#FF7B42] transition-all group text-left">
          <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4 group-hover:bg-purple-500 transition-colors">
            <FileText className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-1">Sitemap</h3>
          <p className="text-sm text-slate-600">Generate XML sitemap</p>
        </button>

        <button className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-[#FF7B42] transition-all group text-left">
          <div className="bg-orange-100 p-3 rounded-lg w-fit mb-4 group-hover:bg-orange-500 transition-colors">
            <Search className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-1">Schema</h3>
          <p className="text-sm text-slate-600">Structured data markup</p>
        </button>
      </div>

      {/* Issues Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <p className="font-semibold text-slate-900">Critical Issues</p>
          </div>
          <p className="text-3xl font-bold text-red-600">{seoHealth.issues.critical}</p>
          <p className="text-sm text-slate-600 mt-1">Require immediate attention</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <p className="font-semibold text-slate-900">Warnings</p>
          </div>
          <p className="text-3xl font-bold text-orange-600">{seoHealth.issues.warning}</p>
          <p className="text-sm text-slate-600 mt-1">Should be improved</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="font-semibold text-slate-900">Passed</p>
          </div>
          <p className="text-3xl font-bold text-green-600">{seoHealth.issues.passed}</p>
          <p className="text-sm text-slate-600 mt-1">Working correctly</p>
        </div>
      </div>

      {/* Pages SEO Status */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Page SEO Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Issues
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {pages.map((page, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{page.path}</p>
                      <p className="text-sm text-slate-600 truncate max-w-md">{page.title}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            page.score >= 80 ? 'bg-green-500' : page.score >= 60 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${page.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{page.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {page.issues.length > 0 ? (
                      <div className="space-y-1">
                        {page.issues.map((issue, i) => (
                          <p key={i} className="text-sm text-red-600 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {issue}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        No issues
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <Link
                        href={`/admin/seo/meta-tags?page=${encodeURIComponent(page.path)}`}
                        className="text-sm text-[#FF7B42] hover:text-[#D14D15] font-medium"
                      >
                        Edit SEO
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

