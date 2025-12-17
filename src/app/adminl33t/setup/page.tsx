'use client';

import { motion } from 'framer-motion';
import { Shield, Copy, Check } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useActionState, useEffect, useState, Suspense } from 'react';
import Image from 'next/image';

import { setupAdmin } from '../actions';
import { Button } from '@/components/ui/button';
import { generateTOTPSecret, generateQRCode } from '@/lib/totp';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function SetupContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  
  const [totpSecret, setTotpSecret] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [state, formAction, isPending] = useActionState(setupAdmin, null);

  useEffect(() => {
    // Generate TOTP secret on mount
    const secret = generateTOTPSecret();
    setTotpSecret(secret);
    
    // Generate QR code
    generateQRCode(secret).then(setQrCode);
  }, []);

  useEffect(() => {
    if (state?.success) {
      router.push('/adminl33t/login');
    }
  }, [state, router]);

  const copySecret = () => {
    navigator.clipboard.writeText(totpSecret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Invalid Setup Link</h1>
          <p className="text-muted-foreground">Setup token is missing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-2 text-foreground">
            Admin Setup
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Configure your admin account with TOTP authentication
          </p>

          <form action={formAction} className="space-y-6">
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="totpSecret" value={totpSecret} />

            {/* Step 1: Scan QR Code */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Step 1: Scan QR Code
              </h2>
              <p className="text-sm text-muted-foreground">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
              </p>
              
              {qrCode && (
                <div className="flex justify-center p-4 bg-white rounded-lg">
                  <Image src={qrCode} alt="TOTP QR Code" width={200} height={200} />
                </div>
              )}

              <div className="bg-background/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-2">
                  Or enter this secret manually:
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-background px-3 py-2 rounded text-sm font-mono text-foreground">
                    {totpSecret}
                  </code>
                  <button
                    type="button"
                    onClick={copySecret}
                    className="p-2 hover:bg-background rounded transition-colors"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Verify TOTP */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Step 2: Verify Code
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code from your authenticator app
              </p>
              
              <input
                type="text"
                name="totpCode"
                placeholder="000000"
                required
                maxLength={6}
                pattern="[0-9]{6}"
                disabled={isPending}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground text-center text-2xl font-mono tracking-widest disabled:opacity-50"
                autoFocus
              />
            </div>

            {/* Step 3: Initial Slug */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                Step 3: Initial Pitch Slug
              </h2>
              <p className="text-sm text-muted-foreground">
                Create your first pitch deck URL slug (e.g., "investor-deck")
              </p>
              
              <input
                type="text"
                name="initialSlug"
                placeholder="investor-deck"
                required
                pattern="[a-z0-9-]+"
                disabled={isPending}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground disabled:opacity-50"
              />
              <p className="text-xs text-muted-foreground">
                Only lowercase letters, numbers, and hyphens allowed
              </p>
            </div>

            {state?.error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm"
              >
                {state.error}
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {isPending ? 'Setting up...' : 'Complete Setup'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Important:</strong> Save your TOTP secret in a secure location. You'll need your authenticator app to access the admin panel.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SetupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <SetupContent />
    </Suspense>
  );
}
