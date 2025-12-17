'use client';

import { TrendingUp, Users, Clock, Eye } from 'lucide-react';
import type { UserSession } from '@/types/analytics';

interface AnalyticsStatsProps {
  sessions: UserSession[];
}

export function AnalyticsStats({ sessions }: AnalyticsStatsProps) {
  // Calculate metrics
  const totalLogins = sessions.length;
  const uniqueUsers = new Set(sessions.map(s => s.username)).size;
  const avgTimeSpent = sessions.length > 0
    ? Math.round(sessions.reduce((sum, s) => sum + (s.totalTimeSpent || 0), 0) / sessions.length / 60)
    : 0;
  const totalPageViews = sessions.reduce((sum, s) => sum + (s.pageViews?.length || 0), 0);

  const stats = [
    {
      icon: TrendingUp,
      label: 'Total Logins',
      value: totalLogins,
      color: 'from-blue-400 to-cyan-400',
    },
    {
      icon: Users,
      label: 'Unique Users',
      value: uniqueUsers,
      color: 'from-green-400 to-emerald-400',
    },
    {
      icon: Clock,
      label: 'Avg Time (min)',
      value: avgTimeSpent,
      color: 'from-purple-400 to-pink-400',
    },
    {
      icon: Eye,
      label: 'Total Page Views',
      value: totalPageViews,
      color: 'from-orange-400 to-red-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">
            {stat.value}
          </p>
          <p className="text-sm text-muted-foreground">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
