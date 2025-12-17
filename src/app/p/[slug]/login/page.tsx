'use client';

import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useActionState } from 'react';

import { validatePassword } from '@/app/p/actions';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [state, formAction, isPending] = useActionState(validatePassword, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2 text-foreground">
            Access Pitch Deck
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Enter your credentials to view the presentation
          </p>

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="slug" value={slug} />
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                required
                disabled={isPending}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground disabled:opacity-50"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                required
                disabled={isPending}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground disabled:opacity-50"
              />
            </div>

            {state?.error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center"
              >
                {state.error}
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isPending ? 'Verifying...' : 'Access Pitch Deck'}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6">
            This is a private presentation. Unauthorized access is prohibited.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
