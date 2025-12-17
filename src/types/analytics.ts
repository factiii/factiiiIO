export interface UserSession {
  username: string;
  loginTime: string;
  ipAddress: string;
  userAgent: string;
  referrer?: string;
  pageViews: Array<{
    path: string;
    timestamp: string;
    timeSpent: number; // seconds
  }>;
  totalTimeSpent: number;
  lastActivity: string;
}

export interface User {
  username: string;
  password: string;
  createdAt: string;
  createdBy: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface AdminCredentials {
  username: string;
  totpSecret: string;
  createdAt: string;
}

export interface DailyAnalytics {
  date: string;
  totalLogins: number;
  uniqueUsers: number;
  totalPageViews: number;
  avgTimeSpent: number;
}

export interface AuditLog {
  admin: string;
  action: string;
  target: string;
  timestamp: string;
}
