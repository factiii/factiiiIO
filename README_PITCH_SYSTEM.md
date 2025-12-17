# factiii.io Pitch Deck System

## 🎯 Overview

A complete multi-user pitch deck system with admin dashboard, analytics tracking, and zero configuration. Everything is managed through a secure admin UI with TOTP authentication.

## 🌟 Features

### Pitch Deck
- ✅ 7 comprehensive sections (Hero, Problem, Solution, Competitors, Market, Strategy, Roadmap)
- ✅ webAI-inspired dark design
- ✅ Smooth Framer Motion animations
- ✅ Responsive mobile-first layout
- ✅ Competitor comparison table (11 competitors)
- ✅ Market analysis with TAM/SAM/SOM
- ✅ Multi-user authentication

### Admin Dashboard
- ✅ TOTP two-factor authentication
- ✅ User management (add/edit/delete)
- ✅ Slug management (create/delete/set default)
- ✅ Analytics tracking
- ✅ Audit logging
- ✅ Rate limiting
- ✅ Password generation

### Zero Configuration
- ✅ No `.env.local` for app settings
- ✅ All data in Upstash Redis
- ✅ Admin manages everything via UI
- ✅ Permanent storage

## 📖 Documentation

### Quick Starts
1. **`QUICKSTART_MULTI_USER.md`** ⭐ **START HERE!**
   - 5-minute setup guide
   - Perfect for first-time setup

2. **`PITCH_QUICKSTART.md`**
   - Original pitch deck quick start
   - Still relevant for pitch content

### Setup Guides
3. **`ADMIN_SETUP_GUIDE.md`**
   - Complete admin setup instructions
   - Security best practices
   - Troubleshooting

4. **`UPSTASH_SETUP_GUIDE.md`**
   - Upstash Redis configuration
   - Data structure details
   - Cost optimization

### Technical Documentation
5. **`MULTI_USER_IMPLEMENTATION.md`**
   - Full technical overview
   - Architecture diagrams
   - Feature list

6. **`PITCH_DECK_README.md`**
   - Original pitch deck documentation
   - Content strategy
   - Competitor analysis

7. **`IMPLEMENTATION_COMPLETE.md`**
   - Implementation summary
   - Success metrics
   - Next steps

### Checklists
8. **`PITCH_CHECKLIST.md`**
   - Pre-presentation checklist
   - Testing checklist
   - Q&A preparation

## 🚀 Quick Start

```bash
# 1. Add Upstash Redis in Vercel Marketplace
# 2. Pull environment variables
vercel env pull

# 3. Start development server
npm run dev

# 4. Initialize admin
open http://localhost:3000/api/setup-check

# 5. Follow setup URL from logs
# 6. Login to admin dashboard
open http://localhost:3000/adminl33t/login
```

## 🔐 Access Points

### For Admins
- **Dashboard**: `/adminl33t`
- **Login**: `/adminl33t/login`
- **Setup**: `/adminl33t/setup?token={token}`
- **Auth**: TOTP code from authenticator app

### For Investors
- **Pitch Deck**: `/p/{slug}`
- **Login**: `/p/{slug}/login`
- **Auth**: Username + password (provided by admin)

### API Endpoints
- **Setup Check**: `/api/setup-check` (generates setup token)
- **Track View**: `/api/track-view` (analytics endpoint)

## 📊 What Gets Tracked

### Per User Session
- Login timestamp
- IP address
- User agent (browser/device)
- Referrer
- Page views by section
- Time spent per section
- Total session duration
- Last activity

### Aggregated Metrics
- Total users
- Active users
- Total logins
- Unique visitors
- Most viewed sections
- Peak usage times

## 🎨 Pitch Deck Content

### 7 Sections

1. **Hero** - "The End of Config Hell"
   - $8.2B TAM, 20M+ developers, 30% time wasted

2. **Problem** - Config Hell Pain Points
   - 4 major problems with stats
   - $12B lost productivity

3. **Solution** - Configless Approach
   - 5-step adapter flow
   - "The Viper for Node.js, but better"

4. **Competitor Analysis** - Comprehensive Table
   - 11 competitors compared
   - 11 comparison dimensions
   - Clear differentiation

5. **Market Analysis** - TAM/SAM/SOM
   - $8.2B TAM, $2.1B SAM, $180M SOM
   - Target audiences
   - Market trends

6. **Go-to-Market Strategy** - 4 Pillars
   - Open source first
   - Developer adoption
   - Enterprise monetization
   - Revenue model (Free/Pro/Enterprise)

7. **Roadmap** - 4 Phases to $10M+ ARR
   - Phase 1: Configless Stack (Current)
   - Phase 2: Adapter Marketplace (6 months)
   - Phase 3: Cloudless Platform (12 months)
   - Phase 4: Global Infrastructure (2027+)

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, Framer Motion
- **Backend**: Next.js Server Actions, Middleware
- **Storage**: Upstash Redis (permanent)
- **Auth**: bcryptjs, otpauth, HTTP-only cookies
- **Deployment**: Vercel (optimized)

### Key Files

**Core Libraries** (3 files):
- `src/lib/redis-store.ts` - Redis utilities (200+ lines)
- `src/lib/totp.ts` - TOTP authentication
- `src/types/analytics.ts` - TypeScript types

**Admin System** (8 files):
- `src/app/adminl33t/page.tsx` - Dashboard
- `src/app/adminl33t/login/page.tsx` - TOTP login
- `src/app/adminl33t/setup/page.tsx` - Initial setup
- `src/app/adminl33t/actions.ts` - Server actions
- `src/app/adminl33t/layout.tsx` - Layout
- `src/components/admin/user-management.tsx` - User CRUD
- `src/components/admin/slug-management.tsx` - Slug CRUD
- `src/middleware.ts` - Auth middleware

**Pitch Deck** (11 files):
- `src/app/p/[slug]/page.tsx` - Main pitch page
- `src/app/p/[slug]/login/page.tsx` - Login page
- `src/app/p/actions.ts` - Auth actions
- 7 pitch section components
- `src/hooks/usePageTracking.ts` - Analytics hook

**API Routes** (2 files):
- `src/app/api/setup-check/route.ts` - Setup token
- `src/app/api/track-view/route.ts` - Analytics

## 🎯 Use Cases

### Scenario 1: Single Investor Pitch
1. Create one user: "investor1"
2. Create one slug: "series-a-2025"
3. Share URL + credentials
4. Monitor their activity
5. Deactivate after pitch

### Scenario 2: Multiple Investors
1. Create users: "investor1", "investor2", "investor3"
2. Use same slug or different slugs
3. Track who viewed what
4. Compare engagement

### Scenario 3: Demo Access
1. Create user: "demo"
2. Create slug: "demo"
3. Share publicly (with caution)
4. Monitor demo usage

## 🔧 Maintenance

### Regular Tasks
- Review audit logs weekly
- Clean up inactive users
- Rotate slugs for security
- Export analytics data
- Monitor Redis usage

### Security Tasks
- Review login attempts
- Check for suspicious activity
- Update TOTP if compromised
- Rotate slugs after major pitches

## 📈 Scaling

### Current Capacity
- 100+ concurrent users
- 10,000 Redis commands/day (free)
- Fast response times

### When to Upgrade
- Approaching 10K commands/day
- Need more storage (>256MB)
- Want global replication
- Need advanced analytics

### Upgrade Options
- Upstash paid tier ($0.20/100K commands)
- Add database for long-term storage
- Implement caching layer
- Add CDN for assets

## 🎉 Success!

You now have a complete, production-ready pitch deck system with:
- ✅ Multi-user authentication
- ✅ Admin dashboard with TOTP
- ✅ Analytics tracking
- ✅ Zero configuration
- ✅ Permanent storage
- ✅ Security features
- ✅ Comprehensive documentation

## 🚀 Next Steps

1. **Read**: `QUICKSTART_MULTI_USER.md`
2. **Setup**: Upstash Redis + Admin
3. **Create**: First user and slug
4. **Test**: Login flow
5. **Share**: With investors
6. **Monitor**: Via admin dashboard

---

**Need help?** Check the documentation files or review the implementation guides.

**Ready to pitch?** Follow `QUICKSTART_MULTI_USER.md` and you'll be live in 5 minutes!

**Happy pitching! 🎊**
