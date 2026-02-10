'use client';

import { Zap, Clock, Eye, Gauge, CheckCircle, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';

// Mock performance data
const performanceMetrics = {
  performance: 85,
  accessibility: 92,
  bestPractices: 88,
  seo: 95,
};

const coreWebVitals = [
  {
    name: 'Largest Contentful Paint',
    abbr: 'LCP',
    value: '1.8s',
    status: 'good' as const,
    threshold: '< 2.5s',
    description: 'Measures loading performance',
  },
  {
    name: 'First Input Delay',
    abbr: 'FID',
    value: '45ms',
    status: 'good' as const,
    threshold: '< 100ms',
    description: 'Measures interactivity',
  },
  {
    name: 'Cumulative Layout Shift',
    abbr: 'CLS',
    value: '0.05',
    status: 'good' as const,
    threshold: '< 0.1',
    description: 'Measures visual stability',
  },
];

const recommendations = [
  {
    title: 'Optimize Images',
    description: 'Use modern image formats (WebP, AVIF) and implement lazy loading',
    impact: 'high',
    effort: 'medium',
    savings: '1.2s',
  },
  {
    title: 'Minimize JavaScript',
    description: 'Remove unused code and defer non-critical scripts',
    impact: 'medium',
    effort: 'high',
    savings: '0.8s',
  },
  {
    title: 'Use CDN',
    description: 'Serve static assets from a Content Delivery Network',
    impact: 'medium',
    effort: 'low',
    savings: '0.5s',
  },
  {
    title: 'Enable Text Compression',
    description: 'Enable gzip or brotli compression for text-based resources',
    impact: 'low',
    effort: 'low',
    savings: '0.3s',
  },
];

const statusConfig = {
  good: { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle },
  needsImprovement: { color: 'text-orange-600', bg: 'bg-orange-100', icon: AlertTriangle },
  poor: { color: 'text-red-600', bg: 'bg-red-100', icon: XCircle },
};

export default function SEOPerformance() {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Performance & Web Vitals</h1>
          <p className="text-slate-600 mt-1">Monitor and improve your website speed</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#FF7B42] text-white font-semibold rounded-lg hover:bg-[#D14D15] transition-colors">
          <Zap className="w-5 h-5" />
          Run Audit
        </button>
      </div>

      {/* Lighthouse Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(performanceMetrics).map(([key, score]) => (
          <div key={key} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-slate-600 capitalize">
                {key === 'bestPractices' ? 'Best Practices' : key}
              </p>
              <Gauge className={`w-5 h-5 ${getScoreColor(score)}`} />
            </div>
            <div className="relative">
              <svg className="w-32 h-32 mx-auto" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${score * 2.51} 251`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  className={getScoreColor(score)}
                />
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dy="7"
                  className={`text-2xl font-bold ${getScoreColor(score)}`}
                >
                  {score}
                </text>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Core Web Vitals */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-[#FF7B42]" />
          <h2 className="text-xl font-semibold text-slate-900">Core Web Vitals</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {coreWebVitals.map((metric) => {
            const StatusIcon = statusConfig[metric.status].icon;
            return (
              <div
                key={metric.abbr}
                className="border border-slate-200 rounded-lg p-5 hover:border-[#FF7B42] transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">{metric.name}</p>
                    <p className={`text-3xl font-bold ${statusConfig[metric.status].color}`}>
                      {metric.value}
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${statusConfig[metric.status].bg}`}>
                    <StatusIcon className={`w-5 h-5 ${statusConfig[metric.status].color}`} />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-2">{metric.description}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-600">Threshold:</span>
                  <span className="font-semibold text-slate-900">{metric.threshold}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Optimization Recommendations</h2>
        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-lg p-5 hover:border-[#FF7B42] transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">{rec.title}</h3>
                  <p className="text-sm text-slate-600">{rec.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-semibold text-green-600">Save {rec.savings}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Impact:</span>
                  <span
                    className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${
                      rec.impact === 'high'
                        ? 'bg-red-100 text-red-700'
                        : rec.impact === 'medium'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {rec.impact}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Effort:</span>
                  <span
                    className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${
                      rec.effort === 'low'
                        ? 'bg-green-100 text-green-700'
                        : rec.effort === 'medium'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {rec.effort}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile vs Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Mobile Performance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Performance Score</span>
              <span className="text-sm font-semibold text-orange-600">78</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">First Contentful Paint</span>
              <span className="text-sm font-semibold text-slate-900">2.1s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Speed Index</span>
              <span className="text-sm font-semibold text-slate-900">3.4s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Time to Interactive</span>
              <span className="text-sm font-semibold text-slate-900">4.2s</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Desktop Performance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Performance Score</span>
              <span className="text-sm font-semibold text-green-600">92</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">First Contentful Paint</span>
              <span className="text-sm font-semibold text-slate-900">0.8s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Speed Index</span>
              <span className="text-sm font-semibold text-slate-900">1.2s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Time to Interactive</span>
              <span className="text-sm font-semibold text-slate-900">1.8s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

