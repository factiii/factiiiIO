# Upstash Redis Setup Guide

## Quick Start (5 Minutes)

### Step 1: Add Upstash Redis Integration

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (`factiii-io`)
3. Click **"Storage"** tab or **"Marketplace"**
4. Search for **"Upstash Redis"**
5. Click **"Add Integration"**
6. Select your project and confirm
7. Vercel automatically provisions Redis and adds environment variables

### Step 2: Pull Environment Variables

```bash
cd /Users/jon/factiiiIO
vercel env pull
```

This creates `.env.local` with:
```bash
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

### Step 3: Start Development Server

```bash
npm run dev
```

### Step 4: Initialize Admin

Visit: `http://localhost:3000/api/setup-check`

**Server logs will show:**
```
============================================================
🔐 ADMIN SETUP REQUIRED
============================================================

Setup URL: http://localhost:3000/adminl33t/setup?token=abc-123-xyz

This token expires in 24 hours.
============================================================
```

### Step 5: Complete Setup

1. Copy the setup URL from logs
2. Open in browser
3. Scan QR code with authenticator app
4. Enter TOTP code to verify
5. Create initial pitch slug (e.g., "investor-deck")
6. Click "Complete Setup"

### Step 6: Login to Admin

Visit: `http://localhost:3000/adminl33t/login`

Enter your TOTP code → Access dashboard!

## What You Get

### 100% Environment-Free System
- ✅ No `.env.local` for users or slugs
- ✅ Everything managed through admin UI
- ✅ Permanent storage in Upstash Redis
- ✅ Data persists across deployments

### Admin Dashboard Features
- **User Management**: Add/edit/delete investor accounts
- **Slug Management**: Create/manage pitch deck URLs
- **Analytics**: Track logins and page views (basic implementation)
- **Security**: TOTP 2FA, rate limiting, audit logs

## Data Structure in Redis

All data is stored in Upstash Redis with these key patterns:

```
pitch:slugs                    → ["zfm845in", "investor-deck"]
pitch:slug:default             → "zfm845in"
users:{username}               → {password, createdAt, isActive, ...}
sessions:{sessionId}           → {username, loginTime, pageViews, ...}
admin:credentials              → {username, totpSecret, createdAt}
setup:token                    → "one-time-token"
setup:used                     → true/false
ratelimit:{ip}:{action}        → attempt count
audit:{timestamp}              → {admin, action, target, timestamp}
```

## Usage

### Add a New Investor

1. Login to admin dashboard
2. Click "Add User"
3. Enter username (e.g., "investor1")
4. Leave password empty to auto-generate (or enter custom)
5. Save and copy the generated password
6. Share credentials with investor

### Create a New Pitch URL

1. Login to admin dashboard
2. In "Pitch Deck URLs" section:
   - Click "Add Slug" for custom slug
   - Or click "Generate Random" for secure random slug
3. Copy the full URL
4. Share with investors

### Access Pitch Deck

Investors visit: `https://yourdomain.com/p/{slug}`

They login with:
- Username: `investor1`
- Password: `[generated password]`

## Security Features

### TOTP Two-Factor Authentication
- Admin access protected by time-based OTP
- 30-second rotating codes
- Compatible with Google Authenticator, Authy, 1Password

### Password Security
- Bcrypt hashing (10 rounds)
- Auto-generated 16-character passwords
- Special characters included

### Rate Limiting
- Max 5 login attempts per IP per 15 minutes
- Prevents brute force attacks
- Stored in Redis with TTL

### Audit Logging
- All admin actions logged
- 90-day retention
- Track user creation, deletion, password resets

## Production Deployment

### Deploy to Vercel

```bash
vercel --prod
```

### Setup in Production

1. Visit: `https://yourdomain.com/api/setup-check`
2. Check deployment logs for setup token
3. Complete setup at the provided URL
4. Login and create users

### Important Notes

- Upstash Redis integration works automatically in production
- Environment variables are already configured by Vercel
- No manual configuration needed!

## Troubleshooting

### "Redis client was initialized without url or token"

**Solution**: Pull environment variables

```bash
vercel env pull
```

Then restart dev server:
```bash
npm run dev
```

### Can't Access Admin Dashboard

**Check:**
1. Is Upstash Redis integration active in Vercel?
2. Did you run `vercel env pull`?
3. Did you complete the setup at `/adminl33t/setup`?
4. Is your TOTP code current (30-second window)?

### Build Fails

**Solution**: The build needs Redis env vars. Either:
1. Run `vercel env pull` before building
2. Or deploy directly to Vercel (env vars are there)

### Lost TOTP Access

**Recovery:**
1. Delete `admin:credentials` key from Redis (via Upstash dashboard)
2. Visit `/api/setup-check` to generate new setup token
3. Complete setup again with new TOTP secret

## Upstash Redis Dashboard

Access your Redis data directly:
1. Go to [Upstash Console](https://console.upstash.com/)
2. Select your database
3. Use CLI or Data Browser to view/edit keys
4. Useful for debugging or manual data management

## Free Tier Limits

Upstash Redis Free Tier:
- **10,000 commands per day**
- **256 MB storage**
- **Global replication** (optional)

Estimated usage for 50 users:
- ~1,000 commands per day
- ~10 MB storage
- Well within free tier!

## Cost Optimization

If you approach limits:
1. Cache aggregated stats (reduce queries)
2. Clean up old sessions (>30 days)
3. Optimize key structure
4. Or upgrade to paid tier ($0.20 per 100K commands)

## Backup & Recovery

### Export Data
- Use admin dashboard export feature (when implemented)
- Or use Upstash CLI to dump data
- Store backups securely

### Restore Data
- Re-add users through admin UI
- Or use Upstash CLI to restore keys
- Import slugs manually

## Next Steps

After setup:
1. ✅ Create your first investor user
2. ✅ Generate pitch deck URL
3. ✅ Share credentials securely
4. ✅ Monitor access via admin dashboard
5. ✅ Export analytics after presentations

## Support

- **Upstash Docs**: https://docs.upstash.com/redis
- **Vercel Marketplace**: https://vercel.com/integrations/upstash
- **factiii.io Docs**: See `ADMIN_SETUP_GUIDE.md`

**Ready to go! 🚀**
