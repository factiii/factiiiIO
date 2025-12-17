import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Initialize Redis client with proper error handling
// Support both Upstash Redis and Vercel KV (legacy) variables
function getRedisClient() {
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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // If Redis not configured, show helpful error page for protected routes
  if (!redis) {
    if (pathname.startsWith('/p/') || pathname.startsWith('/adminl33t')) {
      const errorUrl = new URL('/redis-setup-required', request.url);
      return NextResponse.redirect(errorUrl);
    }
    return NextResponse.next();
  }
  
  // Pitch deck authentication
  if (pathname.startsWith('/p/') && !pathname.includes('/login')) {
    try {
      // Extract slug from URL
      const slug = pathname.split('/')[2];
      
      // Validate slug exists in Redis
      const validSlugs = await redis.get<string[]>('pitch:slugs');
      if (!validSlugs || !validSlugs.includes(slug)) {
        return NextResponse.redirect(new URL('/404', request.url));
      }
      
      const sessionToken = request.cookies.get('pitch_auth')?.value;
      
      if (!sessionToken) {
        const loginUrl = new URL(`${pathname}/login`, request.url);
        return NextResponse.redirect(loginUrl);
      }
      
      // Validate session token and get username
      const session = await redis.get<{ username: string; sessionId: string; expiresAt: number }>(`sessiontoken:${sessionToken}`);
      if (!session || session.expiresAt < Date.now()) {
        const loginUrl = new URL(`${pathname}/login`, request.url);
        return NextResponse.redirect(loginUrl);
      }
      
      // Validate user still exists and is active in Redis
      const user = await redis.get<{ isActive: boolean }>(`users:${session.username}`);
      if (!user || !user.isActive) {
        const loginUrl = new URL(`${pathname}/login`, request.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/redis-setup-required', request.url));
    }
  }
  
  // Admin authentication
  if (pathname.startsWith('/adminl33t') && !pathname.includes('/login') && !pathname.includes('/setup')) {
    try {
      // Check if admin is set up first
      const adminCreds = await redis.get('admin:credentials');
      
      // If admin not set up, allow access to main page (it will redirect to setup)
      if (!adminCreds) {
        return NextResponse.next();
      }
      
      // If admin exists, require authentication
      const adminAuth = request.cookies.get('admin_auth')?.value;
      if (!adminAuth) {
        return NextResponse.redirect(new URL('/adminl33t/login', request.url));
      }
    } catch (error) {
      console.error('Admin middleware error:', error);
      return NextResponse.redirect(new URL('/redis-setup-required', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/p/:path*', '/adminl33t/:path*'],
};
