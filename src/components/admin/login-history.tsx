'use client';

import { useState, Fragment } from 'react';
import { ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import type { UserSession } from '@/types/analytics';
import { revokeSessionToken } from '@/lib/redis-store';

interface LoginHistoryProps {
  sessions: UserSession[];
  sessionTokens: Array<{ token: string; username: string; sessionId: string }>;
}

export function LoginHistory({ sessions, sessionTokens }: LoginHistoryProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'loginTime' | 'username' | 'totalTimeSpent'>('loginTime');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Sort sessions
  const sortedSessions = [...sessions].sort((a, b) => {
    let aVal, bVal;
    
    if (sortField === 'loginTime') {
      aVal = new Date(a.loginTime).getTime();
      bVal = new Date(b.loginTime).getTime();
    } else if (sortField === 'username') {
      aVal = a.username;
      bVal = b.username;
    } else {
      aVal = a.totalTimeSpent || 0;
      bVal = b.totalTimeSpent || 0;
    }
    
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleForceLogout = async (sessionId: string) => {
    // Find token for this session
    const tokenData = sessionTokens.find(t => t.sessionId === sessionId);
    if (tokenData && confirm(`Force logout session for ${tokenData.username}?`)) {
      try {
        await revokeSessionToken(tokenData.token);
        window.location.reload();
      } catch (error) {
        console.error('Force logout error:', error);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Login History</h2>
      
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-card/30">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-card/50"
                  onClick={() => handleSort('username')}
                >
                  Username {sortField === 'username' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-card/50"
                  onClick={() => handleSort('loginTime')}
                >
                  Login Time {sortField === 'loginTime' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  IP Address
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Pages Viewed
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-card/50"
                  onClick={() => handleSort('totalTimeSpent')}
                >
                  Time Spent {sortField === 'totalTimeSpent' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedSessions.map((session, i) => {
                const sessionKey = `${session.username}-${session.loginTime}`;
                const isExpanded = expandedRow === sessionKey;
                
                return (
                  <Fragment key={sessionKey}>
                    <tr className="hover:bg-card/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {session.username}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(session.loginTime).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground font-mono">
                        {session.ipAddress}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {session.pageViews?.length || 0}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {formatTime(session.totalTimeSpent || 0)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setExpandedRow(isExpanded ? null : sessionKey)}
                            className="p-1 hover:bg-background rounded transition-colors"
                            title="View details"
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                          <button
                            onClick={() => handleForceLogout(sessionKey)}
                            className="p-1 hover:bg-background rounded transition-colors"
                            title="Force logout"
                          >
                            <LogOut className="h-4 w-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 bg-background/50">
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-foreground mb-2">User Agent:</p>
                              <p className="text-xs text-muted-foreground font-mono">{session.userAgent}</p>
                            </div>
                            {session.pageViews && session.pageViews.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold text-foreground mb-2">Page Views:</p>
                                <div className="space-y-1">
                                  {session.pageViews.map((pv, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs">
                                      <span className="text-muted-foreground">
                                        {pv.path} - {new Date(pv.timestamp).toLocaleTimeString()}
                                      </span>
                                      <span className="text-primary font-mono">
                                        {formatTime(pv.timeSpent)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div>
                              <p className="text-xs font-semibold text-foreground mb-1">Last Activity:</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(session.lastActivity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {sessions.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No login sessions yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Sessions will appear here after users log in
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
