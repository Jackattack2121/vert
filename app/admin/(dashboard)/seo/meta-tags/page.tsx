'use client';

import { useState } from 'react';
import { Save, Loader2, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

interface PageMeta {
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

const defaultPages: PageMeta[] = [
  {
    path: '/',
    title: 'Vert Capital - Boutique Investment & Corporate Advisory',
    description: 'Vert Capital is a Perth-based boutique investment and corporate advisory firm specializing in corporate advisory, capital raising, and asset management services.',
    keywords: 'investment advisory, corporate advisory, capital raising, asset management, Vert Capital, Perth, Western Australia, financial services',
    ogImage: '/og-image.jpg',
  },
  {
    path: '/about',
    title: 'About Vert Capital',
    description: 'Learn about Vert Capital, a boutique investment and corporate advisory firm providing specialized services to high net worth investors and ASX listed companies.',
    keywords: 'about Vert Capital, boutique advisory, Perth financial services, corporate advisory',
    ogImage: '/og-about.jpg',
  },
  {
    path: '/services',
    title: 'Our Services - Vert Capital',
    description: 'Vert Capital provides corporate advisory, capital raising, and asset management services to high net worth investors and ASX listed companies.',
    keywords: 'corporate advisory, capital raising, asset management, financial services, investment advisory',
    ogImage: '/og-services.jpg',
  },
];

export default function MetaTagsEditor() {
  const [selectedPage, setSelectedPage] = useState(defaultPages[0]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const getTitleLength = () => selectedPage.title.length;
  const getDescriptionLength = () => selectedPage.description.length;

  const titleStatus = getTitleLength() >= 30 && getTitleLength() <= 60 ? 'good' : 'warning';
  const descriptionStatus = getDescriptionLength() >= 120 && getDescriptionLength() <= 160 ? 'good' : 'warning';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Meta Tags Editor</h1>
          <p className="text-slate-600 mt-1">Optimize page titles and descriptions for SEO</p>
        </div>
        <a
          href="https://search.google.com/search-console"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Search Console
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Page Selector */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900 mb-3">Select Page</h3>
            <div className="space-y-2">
              {defaultPages.map((page) => (
                <button
                  key={page.path}
                  onClick={() => setSelectedPage(page)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedPage.path === page.path
                      ? 'bg-[#FF7B42] text-white'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <p className="text-sm font-medium truncate">{page.path}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-3 space-y-6">
          {/* Meta Title */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-slate-900">
                Meta Title
              </label>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${
                  titleStatus === 'good' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {getTitleLength()}/60 characters
                </span>
                {titleStatus === 'good' ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                )}
              </div>
            </div>
            <input
              type="text"
              value={selectedPage.title}
              onChange={(e) => setSelectedPage({ ...selectedPage, title: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B42] focus:border-transparent"
              placeholder="Enter page title..."
            />
            <p className="mt-2 text-xs text-slate-600">
              Optimal length: 30-60 characters. Include primary keywords.
            </p>
          </div>

          {/* Meta Description */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-slate-900">
                Meta Description
              </label>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${
                  descriptionStatus === 'good' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {getDescriptionLength()}/160 characters
                </span>
                {descriptionStatus === 'good' ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                )}
              </div>
            </div>
            <textarea
              value={selectedPage.description}
              onChange={(e) => setSelectedPage({ ...selectedPage, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B42] focus:border-transparent resize-none"
              placeholder="Enter meta description..."
            />
            <p className="mt-2 text-xs text-slate-600">
              Optimal length: 120-160 characters. Make it compelling to improve click-through rate.
            </p>
          </div>

          {/* Keywords */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Focus Keywords
            </label>
            <input
              type="text"
              value={selectedPage.keywords}
              onChange={(e) => setSelectedPage({ ...selectedPage, keywords: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B42] focus:border-transparent"
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="mt-2 text-xs text-slate-600">
              Comma-separated keywords. 5-10 keywords recommended.
            </p>
          </div>

          {/* Open Graph Image */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Open Graph Image
            </label>
            <div className="flex items-center gap-4">
              {selectedPage.ogImage && (
                <div className="w-32 h-20 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                  <p className="text-xs text-slate-500">Preview</p>
                </div>
              )}
              <div className="flex-1">
                <input
                  type="text"
                  value={selectedPage.ogImage}
                  onChange={(e) => setSelectedPage({ ...selectedPage, ogImage: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B42] focus:border-transparent"
                  placeholder="/path/to/image.jpg"
                />
                <p className="mt-2 text-xs text-slate-600">
                  Recommended size: 1200x630px. Used when sharing on social media.
                </p>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Search Result Preview</h3>
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <p className="text-blue-600 text-lg font-medium mb-1 hover:underline cursor-pointer">
                {selectedPage.title || 'Page Title'}
              </p>
              <p className="text-green-700 text-sm mb-2">
                https://vertcapital.com.au{selectedPage.path}
              </p>
              <p className="text-slate-700 text-sm">
                {selectedPage.description || 'Meta description will appear here...'}
              </p>
            </div>
          </div>

          {/* Success Message */}
          {saved && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-700 font-medium">Meta tags saved successfully!</p>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-[#FF7B42] text-white font-semibold rounded-lg hover:bg-[#D14D15] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

