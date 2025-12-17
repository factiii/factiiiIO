'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useActionState } from 'react';

import { adminLogin } from '../actions';
import { Button } from '@/components/ui/button';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(adminLogin, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
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
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2 text-foreground">
            Admin Login
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Enter your TOTP code to access the dashboard
          </p>

          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="totpCode" className="block text-sm font-medium text-foreground mb-2">
                TOTP Code
              </label>
              <input
                type="text"
                id="totpCode"
                name="totpCode"
                placeholder="000000"
                required
                maxLength={6}
                pattern="[0-9]{6}"
                disabled={isPending}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground text-center text-2xl font-mono tracking-widest disabled:opacity-50"
                autoFocus
              />
              <p className="text-xs text-muted-foreground mt-2">
                Open your authenticator app and enter the 6-digit code
              </p>
            </div>

            {state?.error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm text-center"
              >
                {state.error}
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isPending ? 'Verifying...' : 'Login'}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6">
            Codes refresh every 30 seconds
          </p>
        </div>
      </motion.div>
    </div>
  );
}
