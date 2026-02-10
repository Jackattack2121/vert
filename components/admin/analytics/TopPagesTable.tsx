import { ExternalLink } from 'lucide-react';

interface TopPagesTableProps {
  pages: Array<{
    path: string;
    title: string;
    views: number;
    avgTime: string;
  }>;
}

export default function TopPagesTable({ pages }: TopPagesTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900">Top Pages</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Page
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Avg. Time
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
                    <p className="font-medium text-slate-900">{page.title}</p>
                    <p className="text-sm text-slate-500">{page.path}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-semibold text-slate-900">
                  {page.views.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right text-slate-600">
                  {page.avgTime}
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={page.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

