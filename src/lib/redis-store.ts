import { Redis } from '@upstash/redis';
import bcrypt from 'bcryptjs';
import type { User, UserSession, AdminCredentials, AuditLog } from '@/types/analytics';

// Initialize Redis client from env vars
// Support both Upstash Redis and Vercel KV (legacy) variables
function getRedisClient(): Redis | null {
  // Try Upstash Redis env vars first
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return Redis.fromEnv();
  }
  
  // Fallback to Vercel KV env vars (legacy)
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    return new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
  }
  
  return null;
}

const redis = getRedisClient();

// Helper to ensure Redis is available
function ensureRedis(): Redis {
  if (!redis) {
    throw new Error('Redis not configured. Please add Upstash Redis in Vercel Marketplace and run: vercel env pull');
  }
  return redis;
}

// Slug management
export async function getAllSlugs(): Promise<string[]> {
  const r = ensureRedis();
  const slugs = await r.get<string[]>('pitch:slugs');
  return slugs || [];
}

export async function addSlug(slug: string): Promise<void> {
  const r = ensureRedis();
  const slugs = await getAllSlugs();
  if (!slugs.includes(slug)) {
    slugs.push(slug);
    await r.set('pitch:slugs', slugs);
  }
}

export async function removeSlug(slug: string): Promise<void> {
  const r = ensureRedis();
  const slugs = await getAllSlugs();
  const filtered = slugs.filter(s => s !== slug);
  await r.set('pitch:slugs', filtered);
}

export async function isValidSlug(slug: string): Promise<boolean> {
  const slugs = await getAllSlugs();
  return slugs.includes(slug);
}

export async function getDefaultSlug(): Promise<string | null> {
  const r = ensureRedis();
  const defaultSlug = await r.get<string>('pitch:slug:default');
  if (defaultSlug) return defaultSlug;
  const slugs = await getAllSlugs();
  return slugs[0] || null;
}

export async function setDefaultSlug(slug: string): Promise<void> {
  const r = ensureRedis();
  await r.set('pitch:slug:default', slug);
}

// User management
export async function createUser(username: string, password: string, createdBy: string): Promise<void> {
  const r = ensureRedis();
  const hashedPassword = await bcrypt.hash(password, 10);
  const user: User = {
    username,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
    createdBy,
    isActive: true,
  };
  await r.set(`users:${username}`, user);
}

export async function validateUser(username: string, password: string): Promise<boolean> {
  const r = ensureRedis();
  const user = await r.get<User>(`users:${username}`);
  if (!user || !user.isActive) return false;
  return await bcrypt.compare(password, user.password);
}

export async function getAllUsers(): Promise<User[]> {
  const r = ensureRedis();
  const keys = await r.keys('users:*');
  const users = await Promise.all(
    keys.map(async (key) => {
      const data = await r.get<User>(key);
      return data;
    })
  );
  return users.filter((user): user is User => user !== null);
}

export async function getUser(username: string): Promise<User | null> {
  const r = ensureRedis();
  return await r.get<User>(`users:${username}`);
}

export async function updateUser(username: string, updates: Partial<User>): Promise<void> {
  const r = ensureRedis();
  const user = await getUser(username);
  if (user) {
    await r.set(`users:${username}`, { ...user, ...updates });
  }
}

export async function deleteUser(username: string): Promise<void> {
  const r = ensureRedis();
  await r.del(`users:${username}`);
}

export async function updateLastLogin(username: string): Promise<void> {
  const r = ensureRedis();
  const user = await getUser(username);
  if (user) {
    user.lastLogin = new Date().toISOString();
    await r.set(`users:${username}`, user);
  }
}

// Analytics
export async function logSession(sessionData: Omit<UserSession, 'pageViews' | 'totalTimeSpent' | 'lastActivity'>): Promise<string> {
  const r = ensureRedis();
  const sessionId = crypto.randomUUID();
  const session: UserSession = {
    ...sessionData,
    pageViews: [],
    totalTimeSpent: 0,
    lastActivity: new Date().toISOString(),
  };
  await r.set(`sessions:${sessionId}`, session);
  await r.expire(`sessions:${sessionId}`, 60 * 60 * 24 * 30); // 30 days
  return sessionId;
}

export async function updateSession(sessionId: string, updates: Partial<UserSession>): Promise<void> {
  const r = ensureRedis();
  const session = await r.get<UserSession>(`sessions:${sessionId}`);
  if (session) {
    await r.set(`sessions:${sessionId}`, { ...session, ...updates, lastActivity: new Date().toISOString() });
  }
}

export async function getAllSessions(): Promise<UserSession[]> {
  const r = ensureRedis();
  const keys = await r.keys('sessions:*');
  const sessions = await Promise.all(
    keys.map(async (key) => {
      const data = await r.get<UserSession>(key);
      return data;
    })
  );
  return sessions.filter((session): session is UserSession => session !== null);
}

export async function getSessionsByUser(username: string): Promise<UserSession[]> {
  const allSessions = await getAllSessions();
  return allSessions.filter(session => session.username === username);
}

// Session token management
export async function createSessionToken(username: string, sessionId: string): Promise<string> {
  const r = ensureRedis();
  const token = crypto.randomUUID();
  await r.set(`sessiontoken:${token}`, {
    username,
    sessionId,
    createdAt: Date.now(),
    expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
  });
  await r.expire(`sessiontoken:${token}`, 60 * 60 * 24 * 7);
  return token;
}

export async function validateSessionToken(token: string): Promise<{ username: string; sessionId: string } | null> {
  const r = ensureRedis();
  const session = await r.get<{ username: string; sessionId: string; expiresAt: number }>(`sessiontoken:${token}`);
  if (!session || session.expiresAt < Date.now()) {
    return null;
  }
  return { username: session.username, sessionId: session.sessionId };
}

export async function revokeSessionToken(token: string): Promise<void> {
  const r = ensureRedis();
  await r.del(`sessiontoken:${token}`);
}

export async function getAllSessionTokens(username?: string): Promise<Array<{ token: string; username: string; sessionId: string; createdAt: number }>> {
  const r = ensureRedis();
  const keys = await r.keys('sessiontoken:*');
  
  const tokens = await Promise.all(
    keys.map(async (key) => {
      const data = await r.get<{ username: string; sessionId: string; createdAt: number }>(key);
      if (!data) return null;
      if (username && data.username !== username) return null;
      return {
        token: key.replace('sessiontoken:', ''),
        username: data.username,
        sessionId: data.sessionId,
        createdAt: data.createdAt,
      };
    })
  );
  
  return tokens.filter((t): t is NonNullable<typeof t> => t !== null);
}

// Admin
export async function getAdminCredentials(): Promise<AdminCredentials | null> {
  const r = ensureRedis();
  return await r.get<AdminCredentials>('admin:credentials');
}

export async function setAdminCredentials(data: AdminCredentials): Promise<void> {
  const r = ensureRedis();
  await r.set('admin:credentials', data);
}

// Setup token
export async function generateSetupToken(): Promise<string> {
  const r = ensureRedis();
  const token = crypto.randomUUID();
  await r.set('setup:token', token);
  await r.set('setup:used', false);
  await r.expire('setup:token', 60 * 60 * 24); // 24 hours
  return token;
}

export async function validateSetupToken(token: string): Promise<boolean> {
  const r = ensureRedis();
  const storedToken = await r.get<string>('setup:token');
  const used = await r.get<boolean>('setup:used');
  return storedToken === token && !used;
}

export async function markSetupComplete(): Promise<void> {
  const r = ensureRedis();
  await r.set('setup:used', true);
}

// Rate limiting
export async function checkRateLimit(ip: string, action: string, maxAttempts = 5): Promise<{ allowed: boolean; remaining: number }> {
  const r = ensureRedis();
  const key = `ratelimit:${ip}:${action}`;
  const attempts = await r.get<number>(key) || 0;
  
  if (attempts >= maxAttempts) {
    return { allowed: false, remaining: 0 };
  }
  
  await r.incr(key);
  await r.expire(key, 60 * 15); // 15 minutes
  
  return { allowed: true, remaining: maxAttempts - attempts - 1 };
}

// Audit logging
export async function logAuditEvent(admin: string, action: string, target: string): Promise<void> {
  const r = ensureRedis();
  const timestamp = Date.now();
  const log: AuditLog = {
    admin,
    action,
    target,
    timestamp: new Date().toISOString(),
  };
  await r.set(`audit:${timestamp}`, log);
  await r.expire(`audit:${timestamp}`, 60 * 60 * 24 * 90); // 90 days
}

export async function getAuditLogs(limit = 100): Promise<AuditLog[]> {
  const r = ensureRedis();
  const keys = await r.keys('audit:*');
  const sortedKeys = keys.sort().reverse().slice(0, limit);
  const logs = await Promise.all(
    sortedKeys.map(async (key) => {
      const data = await r.get<AuditLog>(key);
      return data;
    })
  );
  return logs.filter((log): log is AuditLog => log !== null);
}

// Generate random password
export function generatePassword(length = 16): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }
  return password;
}
