import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth/auth-config';
import AdminSidebar from '@/components/admin/layout/AdminSidebar';
import AdminHeader from '@/components/admin/layout/AdminHeader';

export const metadata = {
  title: 'CoreConnect Admin - Yugo Metals',
  description: 'Unified admin control panel for Yugo Metals website',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated (except for login page)
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Sidebar */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Admin Header */}
        <AdminHeader user={session.user} />
        
        {/* Page Content */}
        <main className="p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

