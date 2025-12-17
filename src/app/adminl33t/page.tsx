import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { LogOut } from 'lucide-react';
import { getAllUsers, getAllSlugs, getDefaultSlug, getAdminCredentials, getAllSessions, getAllSessionTokens } from '@/lib/redis-store';
import { UserManagement } from '@/components/admin/user-management';
import { SlugManagement } from '@/components/admin/slug-management';
import { AnalyticsStats } from '@/components/admin/analytics-stats';
import { LoginHistory } from '@/components/admin/login-history';
import { ExportAnalytics } from '@/components/admin/export-analytics';
import { adminLogout } from './actions';
import { Button } from '@/components/ui/button';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Check if admin is set up
  const adminCreds = await getAdminCredentials();
  if (!adminCreds) {
    // Generate setup token and redirect
    const { generateSetupToken } = await import('@/lib/redis-store');
    const token = await generateSetupToken();
    
    // Log token to console
    console.log('\n' + '='.repeat(60));
    console.log('🔐 ADMIN SETUP REQUIRED');
    console.log('='.repeat(60));
    console.log(`\nSetup URL: ${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/adminl33t/setup?token=${token}`);
    console.log('\nThis token expires in 24 hours.');
    console.log('='.repeat(60) + '\n');
    
    redirect(`/adminl33t/setup?token=${token}`);
  }

  // Check authentication
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get('admin_auth');
  if (!adminAuth) {
    redirect('/adminl33t/login');
  }

  // Fetch data
  const users = await getAllUsers();
  const slugs = await getAllSlugs();
  const defaultSlug = await getDefaultSlug();
  const sessions = await getAllSessions();
  const sessionTokens = await getAllSessionTokens();

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Pitch Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage users, slugs, and view analytics
            </p>
          </div>
          <form action={adminLogout}>
            <Button
              type="submit"
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>

        {/* Analytics Stats */}
        <AnalyticsStats sessions={sessions} />

        {/* Login History */}
        <div className="mb-8">
          <LoginHistory sessions={sessions} sessionTokens={sessionTokens} />
        </div>

        {/* Slug Management */}
        <div className="mb-8">
          <SlugManagement slugs={slugs} defaultSlug={defaultSlug} />
        </div>

        {/* User Management */}
        <div className="mb-8">
          <UserManagement users={users} />
        </div>

        {/* Export Analytics */}
        <div>
          <ExportAnalytics sessions={sessions} />
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            Admin Dashboard • factiii.io • Powered by Upstash Redis
          </p>
        </div>
      </div>
    </div>
  );
}
