'use client';

import { usePageTracking } from '@/hooks/usePageTracking';

interface PitchTrackerProps {
  username: string;
}

export function PitchTracker({ username }: PitchTrackerProps) {
  // Track each section
  usePageTracking(username, 'hero');
  usePageTracking(username, 'problem');
  usePageTracking(username, 'solution');
  usePageTracking(username, 'competitors');
  usePageTracking(username, 'market');
  usePageTracking(username, 'strategy');
  usePageTracking(username, 'roadmap');
  
  return null; // Invisible tracking component
}
