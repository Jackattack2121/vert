import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, Copy } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Mock data - in production this would fetch from Listmonk API
const mockTemplates = [
  {
    id: 1,
    name: 'ASX Announcement Template',
    type: 'campaign' as const,
    subject: 'Yugo Metals - ASX Announcement',
    is_default: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: 2,
    name: 'Monthly Newsletter',
    type: 'campaign' as const,
    subject: 'Yugo Metals - Monthly Update',
    is_default: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: 3,
    name: 'Quarterly Report',
    type: 'campaign' as const,
    subject: 'Q{{ quarter }} {{ year }} - Quarterly Report',
    is_default: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 95).toISOString(),
  },
  {
    id: 4,
    name: 'Welcome Email',
    type: 'tx' as const,
    subject: 'Welcome to Yugo Metals Investor Updates',
    is_default: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 150).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120).toISOString(),
  },
];

export default function TemplatesPage() {
  const campaignTemplates = mockTemplates.filter(t => t.type === 'campaign');
  const transactionalTemplates = mockTemplates.filter(t => t.type === 'tx');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Email Templates</h1>
          <p className="text-slate-600 mt-1">Create and manage reusable email templates</p>
        </div>
        <Link
          href="/admin/email/templates/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#FF7B42] text-white font-semibold rounded-lg hover:bg-[#D14D15] transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Template
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Total Templates</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{mockTemplates.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Campaign Templates</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{campaignTemplates.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Transactional</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">{transactionalTemplates.length}</p>
        </div>
      </div>

      {/* Campaign Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Campaign Templates</h2>
          <span className="text-sm text-slate-500">{campaignTemplates.length} templates</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {campaignTemplates.map((template) => (
            <div
              key={template.id}
              className="border border-slate-200 rounded-lg p-4 hover:border-[#FF7B42] hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900">{template.name}</h3>
                    {template.is_default && (
                      <span className="inline-flex px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{template.subject}</p>
                  <p className="text-xs text-slate-500">
                    Updated {formatDistanceToNow(new Date(template.updated_at), { addSuffix: true })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <Link
                  href={`/admin/email/templates/${template.id}`}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Link>
                <button
                  className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transactional Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Transactional Templates</h2>
          <span className="text-sm text-slate-500">{transactionalTemplates.length} templates</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {transactionalTemplates.map((template) => (
            <div
              key={template.id}
              className="border border-slate-200 rounded-lg p-4 hover:border-[#FF7B42] hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900">{template.name}</h3>
                    <span className="inline-flex px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded">
                      Transactional
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">{template.subject}</p>
                  <p className="text-xs text-slate-500">
                    Updated {formatDistanceToNow(new Date(template.updated_at), { addSuffix: true })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <Link
                  href={`/admin/email/templates/${template.id}`}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Link>
                <button
                  className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template Variables Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Template Variables</h3>
        <p className="text-sm text-blue-700 mb-3">
          Use these variables in your templates for dynamic content:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <code className="px-2 py-1 bg-white text-blue-900 rounded">{'{{ email }}'}</code>
          <code className="px-2 py-1 bg-white text-blue-900 rounded">{'{{ name }}'}</code>
          <code className="px-2 py-1 bg-white text-blue-900 rounded">{'{{ unsubscribe_url }}'}</code>
          <code className="px-2 py-1 bg-white text-blue-900 rounded">{'{{ campaign_url }}'}</code>
        </div>
      </div>
    </div>
  );
}

