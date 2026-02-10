import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CampaignForm from '@/components/admin/email/CampaignForm';
import { getCampaignById, getLists } from '@/lib/admin/listmonk-admin';

// Force dynamic rendering - don't try to build statically
export const dynamic = 'force-dynamic';

export default async function EditCampaignPage({ params }: { params: { id: string } }) {
  try {
    const [campaignRes, listsData] = await Promise.all([
      getCampaignById(parseInt(params.id)),
      getLists()
    ]);

    const campaign = campaignRes.data;
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
            <h1 className="text-3xl font-bold text-slate-900">Edit Campaign</h1>
            <p className="text-slate-600 mt-1">{campaign.name}</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <CampaignForm campaign={campaign} mode="edit" availableLists={lists} />
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}

