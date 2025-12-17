# Setup Instructions

## ⚠️ Important: Upstash Redis Required

This application requires Upstash Redis to be configured. Follow these steps:

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

## Step 2: Login to Vercel

```bash
vercel login
```

This will open a browser for authentication.

## Step 3: Link Your Project

```bash
vercel link
```

Answer the prompts:
- **Set up ~/factiiiIO?** → Type `Y`
- **Which scope?** → Select your account
- **Link to existing project?** → Type `Y` if deployed, `N` if new
- **Project name?** → `factiii-io` (or your project name)

## Step 4: Deploy to Vercel (if not already deployed)

```bash
vercel
```

This creates your project on Vercel.

## Step 5: Add Upstash Redis Integration

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (`factiii-io`)
3. Click **"Storage"** or **"Marketplace"**
4. Search for **"Upstash Redis"**
5. Click **"Add Integration"**
6. Select your project
7. Confirm

Vercel will automatically:
- Create an Upstash Redis database
- Add environment variables to your project

## Step 6: Pull Environment Variables

```bash
vercel env pull
```

This creates/updates `.env.local` with:
```bash
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

## Step 7: Start Development Server

```bash
npm run dev
```

## Step 8: Visit Admin Panel

```bash
open http://localhost:3000/adminl33t
```

You'll automatically see the setup page with a QR code to scan!

---

## What If I See "Redis Setup Required" Page?

This means Redis environment variables aren't configured. Follow steps 1-7 above.

---

## Quick Reference

```bash
# Complete setup flow
npm install -g vercel
vercel login
vercel link
vercel
# (Add Upstash Redis in Vercel Dashboard)
vercel env pull
npm run dev
open http://localhost:3000/adminl33t
```

---

## Troubleshooting

### "vercel: command not found"
Install Vercel CLI: `npm install -g vercel`

### "Your codebase isn't linked"
Run: `vercel link`

### "Redis not configured" error
1. Add Upstash Redis in Vercel Dashboard
2. Run: `vercel env pull`
3. Restart: `npm run dev`

### Build fails
The build will pass even without Redis. The app just needs Redis at runtime.

---

## You're Ready!

Once you complete these steps, you'll have:
- ✅ Upstash Redis configured
- ✅ Environment variables set
- ✅ Admin panel accessible
- ✅ Multi-user system working

**Next**: Visit `/adminl33t` to complete admin setup with TOTP!
