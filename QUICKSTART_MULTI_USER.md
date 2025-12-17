# Multi-User Pitch Deck - Quick Start

## 🚀 Setup in 5 Minutes

### 1. Add Upstash Redis (1 minute)

Go to [Vercel Dashboard](https://vercel.com/dashboard):
- Storage → Marketplace
- Search "Upstash Redis"
- Click "Add Integration"
- Select your project
- Done! ✅

### 2. Pull Environment Variables (30 seconds)

```bash
vercel env pull
```

### 3. Start Development Server (30 seconds)

```bash
npm run dev
```

### 4. Initialize Admin (1 minute)

Visit: **http://localhost:3000/adminl33t**

This will automatically:
- Check if admin exists
- Generate a setup token
- Show the token in server logs
- Redirect you to the setup page!

**Check your terminal** for the setup token (it's logged automatically).

### 5. Complete Setup (2 minutes)

You'll be on the setup page automatically! Just:
1. Scan QR code with Google Authenticator (or any TOTP app)
2. Enter the 6-digit code to verify
3. Create your first slug (e.g., "investor-deck")
4. Click "Complete Setup"

### 6. Login to Admin

Visit: **http://localhost:3000/adminl33t/login**

Enter your TOTP code → You're in! 🎉

---

## 📋 Admin Tasks

### Add Your First Investor

1. In admin dashboard, click **"Add User"**
2. Enter username: `investor1`
3. Leave password empty (auto-generates)
4. Click "Add User"
5. **Copy the generated password** (shown once!)
6. Share with investor

### Create Pitch URL

In "Pitch Deck URLs" section:
- Click **"Generate Random"** for secure slug
- Or click **"Add Slug"** for custom (e.g., "series-a-2025")
- Click **"Copy URL"** button
- Share with investor

---

## 🎯 Investor Access

Investors visit: **`http://localhost:3000/p/{slug}`**

Login with:
- **Username**: `investor1`
- **Password**: `[generated password you shared]`

They'll see the full pitch deck with 7 sections!

---

## 🔐 Security Notes

### Admin Access
- Protected by TOTP (rotating 6-digit codes)
- 1-hour session timeout
- All actions logged

### Investor Access
- Username + password required
- Passwords are bcrypt hashed
- 7-day session persistence
- Rate limited (5 attempts per 15 min)

### Data Storage
- All data in Upstash Redis (permanent)
- No `.env.local` files needed
- Survives deployments and restarts

---

## 📊 What Gets Tracked

For each investor:
- ✅ Login time
- ✅ IP address
- ✅ User agent (browser/device)
- ✅ Page views per section
- ✅ Time spent on each section
- ✅ Total session duration

View in admin dashboard!

---

## 🛠️ Common Tasks

### Add Another User
Admin Dashboard → "Add User" → Enter username → Copy password

### Create New Pitch URL
Admin Dashboard → "Generate Random" or "Add Slug" → Copy URL

### Deactivate User
Admin Dashboard → User table → Click power icon → User can't login

### Reset Password
Admin Dashboard → User table → Click key icon → Copy new password

### Delete User
Admin Dashboard → User table → Click trash icon → Confirm

---

## 🚨 Troubleshooting

### "Redis client was initialized without url"
**Fix**: Run `vercel env pull` and restart server

### Can't login to admin
**Fix**: Check TOTP code is current (refreshes every 30 seconds)

### Investor can't login
**Fix**: Check user is active in admin dashboard

### Build fails
**Fix**: Ensure `vercel env pull` was run

---

## 📖 Full Documentation

- **`ADMIN_SETUP_GUIDE.md`** - Detailed setup instructions
- **`UPSTASH_SETUP_GUIDE.md`** - Redis configuration
- **`MULTI_USER_IMPLEMENTATION.md`** - Technical overview

---

## ✅ Checklist

Before sharing with investors:

- [ ] Upstash Redis added in Vercel
- [ ] Admin setup completed
- [ ] First user created
- [ ] Pitch slug created
- [ ] Tested investor login flow
- [ ] Verified pitch deck loads
- [ ] Shared credentials securely (not via email!)

---

## 🎉 You're Ready!

**Admin Dashboard**: `http://localhost:3000/adminl33t`
**Pitch Deck**: `http://localhost:3000/p/{your-slug}`

**Happy pitching! 🚀**
