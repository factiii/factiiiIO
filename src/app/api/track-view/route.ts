import { NextRequest, NextResponse } from 'next/server';
import { updateSession, validateSessionToken } from '@/lib/redis-store';

export async function POST(request: NextRequest) {
  try {
    const { section, timeSpent } = await request.json();

    if (!section) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get session token from cookie
    const sessionToken = request.cookies.get('pitch_auth')?.value;
    if (!sessionToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Validate token and get session ID
    const session = await validateSessionToken(sessionToken);
    if (!session) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    // Update session with page view
    const pageView = {
      path: section,
      timestamp: new Date().toISOString(),
      timeSpent,
    };

    // Get current session data
    const { Redis } = await import('@upstash/redis');
    const redis = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
      ? new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN })
      : Redis.fromEnv();
    
    const currentSession = await redis.get<{ pageViews?: any[]; totalTimeSpent?: number }>(`sessions:${session.sessionId}`);
    if (currentSession) {
      const updatedPageViews = [...(currentSession.pageViews || []), pageView];
      const updatedTotalTime = (currentSession.totalTimeSpent || 0) + timeSpent;

      await updateSession(session.sessionId, {
        pageViews: updatedPageViews,
        totalTimeSpent: updatedTotalTime,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track view error:', error);
    return NextResponse.json({ error: 'Failed to track view' }, { status: 500 });
  }
}
