'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { validateUser, logSession, updateLastLogin, checkRateLimit, createSessionToken } from '@/lib/redis-store';

export async function validatePassword(
  prevState: { error: string } | null,
  formData: FormData
) {
  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const slug = formData.get('slug') as string;

    // Get IP for rate limiting
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    
    // Check rate limit
    const rateLimit = await checkRateLimit(ip, 'pitch_login');
    if (!rateLimit.allowed) {
      return { error: 'Too many attempts. Please try again in 15 minutes.' };
    }

    // Validate against Upstash Redis
    const isValid = await validateUser(username, password);

    if (!isValid) {
      return { error: 'Invalid username or password' };
    }

    // Update last login
    await updateLastLogin(username);

    // Log session to Redis and get session ID
    const sessionId = await logSession({
      username,
      loginTime: new Date().toISOString(),
      ipAddress: ip,
      userAgent: headersList.get('user-agent') || 'unknown',
      referrer: headersList.get('referer') || undefined,
    });

    // Create session token (random UUID)
    const sessionToken = await createSessionToken(username, sessionId);

    // Set cookie with session token (not username!)
    const cookieStore = await cookies();
    cookieStore.set('pitch_auth', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // Redirect to the pitch page
    redirect(`/p/${slug}`);
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    console.error('Login error:', error);
    return { error: 'Login failed. Please try again.' };
  }
}

export async function trackPageView(data: {
  username: string;
  section: string;
  timeSpent: number;
}) {
  // This will be implemented with the tracking hook
  // For now, just log it
  console.log('Page view:', data);
}
