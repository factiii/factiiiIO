'use client';

import { useEffect, useRef } from 'react';

export function usePageTracking(username: string | undefined, sectionName: string) {
  const startTime = useRef(Date.now());
  const tracked = useRef(false);
  
  useEffect(() => {
    if (!username) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !tracked.current) {
            tracked.current = true;
            const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
            
            // Track page view
            fetch('/api/track-view', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, section: sectionName, timeSpent }),
            }).catch(console.error);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    const element = document.getElementById(sectionName);
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, [username, sectionName]);
}
