import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { CompetitorTable } from '@/components/sections/pitch/competitor-table';
import { HeroPitch } from '@/components/sections/pitch/hero-pitch';
import { MarketAnalysis } from '@/components/sections/pitch/market-analysis';
import { Problem } from '@/components/sections/pitch/problem';
import { Roadmap } from '@/components/sections/pitch/roadmap';
import { Solution } from '@/components/sections/pitch/solution';
import { Strategy } from '@/components/sections/pitch/strategy';
import { PitchTracker } from '@/components/pitch-tracker';
import { validateSessionToken } from '@/lib/redis-store';

export const metadata: Metadata = {
  title: 'factiii.io - Investor Pitch Deck',
  description: 'Configless infrastructure platform for modern developers',
  robots: {
    index: false,
    follow: false,
  },
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function PitchPage() {
  // Get session token from cookie
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('pitch_auth')?.value;
  
  // Validate token and get username
  let username = '';
  if (sessionToken) {
    try {
      const session = await validateSessionToken(sessionToken);
      username = session?.username || '';
    } catch (error) {
      console.error('Session validation error:', error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#0a0a0a]">
      {username && <PitchTracker username={username} />}
      <section id="hero"><HeroPitch /></section>
      <section id="problem"><Problem /></section>
      <section id="solution"><Solution /></section>
      <section id="competitors"><CompetitorTable /></section>
      <section id="market"><MarketAnalysis /></section>
      <section id="strategy"><Strategy /></section>
      <section id="roadmap"><Roadmap /></section>
    </main>
  );
}
