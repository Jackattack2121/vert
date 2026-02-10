import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import CampaignForm from '@/components/admin/email/CampaignForm';
import { getLists } from '@/lib/admin/listmonk-admin';

// Force dynamic rendering - don't try to build statically
export const dynamic = 'force-dynamic';

export default async function NewCampaignPage() {
  const listsData = await getLists();
  const lists = listsData.data.results.map(l => ({ id: l.id, name: l.name }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/email/campaigns"
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Create Email Campaign</h1>
          <p className="text-slate-600 mt-1">Design and schedule a new email campaign</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <CampaignForm mode="create" availableLists={lists} />
      </div>
    </div>
  );
}

