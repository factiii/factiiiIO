'use client';

import { Download, FileJson, FileSpreadsheet } from 'lucide-react';
import type { UserSession } from '@/types/analytics';
import { Button } from '@/components/ui/button';

interface ExportAnalyticsProps {
  sessions: UserSession[];
}

export function ExportAnalytics({ sessions }: ExportAnalyticsProps) {
  const exportToCSV = () => {
    // CSV headers
    const headers = ['Username', 'Login Time', 'IP Address', 'User Agent', 'Pages Viewed', 'Time Spent (min)', 'Last Activity', 'Sections Viewed'];
    
    // CSV rows
    const rows = sessions.map(session => [
      session.username,
      new Date(session.loginTime).toLocaleString(),
      session.ipAddress,
      session.userAgent.replace(/,/g, ';'), // Escape commas
      session.pageViews?.length || 0,
      Math.round((session.totalTimeSpent || 0) / 60),
      new Date(session.lastActivity).toLocaleString(),
      session.pageViews?.map(pv => pv.path).join(';') || '',
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pitch-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalSessions: sessions.length,
      sessions: sessions.map(session => ({
        username: session.username,
        loginTime: session.loginTime,
        ipAddress: session.ipAddress,
        userAgent: session.userAgent,
        pageViews: session.pageViews || [],
        totalTimeSpent: session.totalTimeSpent || 0,
        lastActivity: session.lastActivity,
      })),
    };

    // Download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pitch-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Export Analytics</h2>
      
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
        <p className="text-sm text-muted-foreground mb-6">
          Export all analytics data including login history, page views, and time spent metrics.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={exportToCSV}
            disabled={sessions.length === 0}
            className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export to CSV
          </Button>
          
          <Button
            onClick={exportToJSON}
            disabled={sessions.length === 0}
            className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20"
          >
            <FileJson className="h-4 w-4" />
            Export to JSON
          </Button>
        </div>

        {sessions.length === 0 && (
          <p className="text-sm text-muted-foreground mt-4">
            No data to export yet. Data will be available after users log in.
          </p>
        )}
      </div>
    </div>
  );
}
