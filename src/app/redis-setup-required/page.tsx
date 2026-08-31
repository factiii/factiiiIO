import { Database, ExternalLink, Terminal } from 'lucide-react';
import type { Metadata } from 'next';

import { Container } from '@/components/ui/container';

// An operational error page. It must stay crawlable so the noindex is seen,
// but it should never appear in results — it previously returned 200 while
// inheriting the homepage title and canonical.
export const metadata: Metadata = {
  title: 'Setup required - factiii.io',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RedisSetupRequired() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <Container className="max-w-3xl">
        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 md:p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-500/10 rounded-full">
              <Database className="h-12 w-12 text-red-400" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Upstash Redis Setup Required
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            The pitch deck system requires Upstash Redis to be configured. Follow these steps to get started:
          </p>

          <div className="bg-background/50 border border-border rounded-xl p-6 text-left space-y-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Add Upstash Redis in Vercel
                </h3>
              </div>
              <p className="text-sm text-muted-foreground ml-11">
                Go to your Vercel project → Storage/Marketplace → Search "Upstash Redis" → Add Integration
              </p>
              <a
                href="https://vercel.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 ml-11 mt-2 text-sm text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Open Vercel Dashboard
              </a>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">2</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Install Vercel CLI (if not installed)
                </h3>
              </div>
              <div className="ml-11 bg-background rounded-lg p-4 font-mono text-sm text-foreground">
                npm install -g vercel
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Link Project and Pull Environment Variables
                </h3>
              </div>
              <div className="ml-11 space-y-2">
                <div className="bg-background rounded-lg p-4 font-mono text-sm text-foreground">
                  vercel link
                </div>
                <div className="bg-background rounded-lg p-4 font-mono text-sm text-foreground">
                  vercel env pull
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">4</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Restart Development Server
                </h3>
              </div>
              <div className="ml-11 bg-background rounded-lg p-4 font-mono text-sm text-foreground">
                npm run dev
              </div>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Terminal className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground mb-2">
                  Alternative: Manual Setup
                </p>
                <p className="text-sm text-muted-foreground">
                  If you prefer not to use Vercel CLI, you can manually copy the environment variables from your Vercel dashboard (Settings → Environment Variables) and add them to <code className="bg-background px-2 py-0.5 rounded">.env.local</code>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
