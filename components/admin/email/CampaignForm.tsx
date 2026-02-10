'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, Send } from 'lucide-react';

interface Campaign {
  id?: number;
  name: string;
  subject: string;
  from_email: string;
  body: string;
  content_type: 'richtext' | 'html' | 'markdown' | 'plain';
  send_at: string | null;
  status: 'draft' | 'scheduled' | 'running' | 'paused' | 'finished' | 'cancelled';
  lists: Array<{ id: number; name: string }>;
  tags: string[];
}

interface CampaignFormProps {
  campaign?: Campaign;
  mode: 'create' | 'edit';
  availableLists: Array<{ id: number; name: string }>;
}

export default function CampaignForm({ campaign, mode, availableLists }: CampaignFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: campaign?.name || '',
    subject: campaign?.subject || '',
    from_email: campaign?.from_email || 'info@vertcapital.com.au',
    body: campaign?.body || '',
    content_type: campaign?.content_type || 'richtext' as 'richtext' | 'html' | 'markdown' | 'plain',
    send_at: campaign?.send_at || null,
    lists: campaign?.lists.map(l => l.id) || [],
    tags: campaign?.tags || [],
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSaving(true);

    try {
      const endpoint = mode === 'edit'
        ? `/api/admin/listmonk/campaigns/${campaign?.id}`
        : '/api/admin/listmonk/campaigns';
      
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      router.push('/admin/email/campaigns');
      router.refresh();
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save campaign');
      setIsSaving(false);
    }
  }

  function updateField(field: string, value: any) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  function toggleList(listId: number) {
    setFormData(prev => ({
      ...prev,
      lists: prev.lists.includes(listId)
        ? prev.lists.filter(id => id !== listId)
        : [...prev.lists, listId]
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
          Campaign Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B42]"
          placeholder="Internal campaign name"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
          Email Subject *
        </label>
        <input
          type="text"
          id="subject"
          required
          value={formData.subject}
          onChange={(e) => updateField('subject', e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B42]"
          placeholder="Email subject line"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="from_email" className="block text-sm font-semibold text-slate-700 mb-2">
            From Email *
          </label>
          <input
            type="email"
            id="from_email"
            required
            value={formData.from_email}
            onChange={(e) => updateField('from_email', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B42]"
          />
        </div>

        <div>
          <label htmlFor="content_type" className="block text-sm font-semibold text-slate-700 mb-2">
            Content Type *
          </label>
          <select
            id="content_type"
            value={formData.content_type}
            onChange={(e) => updateField('content_type', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B42]"
          >
            <option value="richtext">Rich Text</option>
            <option value="html">HTML</option>
            <option value="markdown">Markdown</option>
            <option value="plain">Plain Text</option>
          </select>
        </div>
      </div>

      {/* Lists */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Send to Lists * (select at least one)
        </label>
        <div className="border border-slate-300 rounded-lg p-4 space-y-2 max-h-48 overflow-y-auto">
          {availableLists.length === 0 ? (
            <p className="text-sm text-slate-500">No lists available</p>
          ) : (
            availableLists.map(list => (
              <label key={list.id} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded">
                <input
                  type="checkbox"
                  checked={formData.lists.includes(list.id)}
                  onChange={() => toggleList(list.id)}
                  className="w-4 h-4 text-[#FF7B42] focus:ring-[#FF7B42]"
                />
                <span className="text-sm text-slate-700">{list.name}</span>
              </label>
            ))
          )}
        </div>
      </div>

      {/* Body */}
      <div>
        <label htmlFor="body" className="block text-sm font-semibold text-slate-700 mb-2">
          Email Content *
        </label>
        <textarea
          id="body"
          required
          value={formData.body}
          onChange={(e) => updateField('body', e.target.value)}
          rows={12}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B42] font-mono text-sm"
          placeholder="Enter email content..."
        />
        <p className="text-xs text-slate-500 mt-1">
          {formData.content_type === 'html' && 'You can use HTML tags'}
          {formData.content_type === 'markdown' && 'You can use Markdown syntax'}
          {formData.content_type === 'richtext' && 'Rich text editor (basic HTML)'}
        </p>
      </div>

      {/* Schedule */}
      <div>
        <label htmlFor="send_at" className="block text-sm font-semibold text-slate-700 mb-2">
          Schedule Send (optional)
        </label>
        <input
          type="datetime-local"
          id="send_at"
          value={formData.send_at || ''}
          onChange={(e) => updateField('send_at', e.target.value || null)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF7B42]"
        />
        <p className="text-xs text-slate-500 mt-1">Leave empty to save as draft</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSaving}
          className="px-6 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving || formData.lists.length === 0}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-[#FF7B42] text-white font-semibold rounded-lg hover:bg-[#D14D15] transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              {mode === 'create' ? 'Create Campaign' : 'Update Campaign'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

