# Admin Setup Guide

## Initial Setup

### 1. Add Upstash Redis via Vercel Marketplace

1. Go to your Vercel project dashboard
2. Navigate to **Storage** or **Marketplace**
3. Search for **"Upstash Redis"**
4. Click **"Add Integration"**
5. Select your project
6. Vercel will automatically provision a Redis database and add environment variables

### 2. Pull Environment Variables Locally

```bash
vercel env pull
```

This will create a `.env.local` file with your Upstash Redis connection variables:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### 3. Start Development Server

```bash
npm run dev
```

### 4. Generate Setup Token

Visit: `http://localhost:3000/api/setup-check`

This will:
- Check if admin is already set up
- Generate a one-time setup token
- Display the setup URL in server logs

**Example output:**
```
============================================================
🔐 ADMIN SETUP REQUIRED
============================================================

Setup URL: http://localhost:3000/adminl33t/setup?token=abc-123-xyz

This token expires in 24 hours.
============================================================
```

### 5. Complete Admin Setup

1. Copy the setup URL from the logs
2. Open it in your browser
3. Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.)
4. Enter the 6-digit TOTP code to verify
5. Create your first pitch deck slug (e.g., "investor-deck")
6. Click "Complete Setup"

### 6. Login to Admin Dashboard

1. Visit: `http://localhost:3000/adminl33t/login`
2. Enter your TOTP code from the authenticator app
3. You're in! 🎉

## Admin Dashboard Features

### User Management
- **Add users**: Create investor accounts with auto-generated or custom passwords
- **Manage users**: Activate/deactivate, reset passwords, delete users
- **View activity**: See when users were created and last logged in

### Slug Management
- **Add slugs**: Create custom pitch deck URLs
- **Generate random**: Auto-generate secure random slugs
- **Set default**: Mark a primary slug
- **Copy URLs**: Quick copy to clipboard
- **Delete slugs**: Remove unused URLs (must keep at least one)

### Analytics (Coming Soon)
- Login history
- Page view tracking
- Time spent per section
- User engagement metrics
- Data export (CSV/JSON)

## Security Best Practices

### TOTP Authentication
- Use a secure authenticator app (Google Authenticator, Authy, 1Password)
- Save your TOTP secret in a secure location
- Never share your TOTP codes
- Codes refresh every 30 seconds

### User Passwords
- Auto-generated passwords are 16 characters with special characters
- Save passwords securely when creating users
- Passwords are hashed with bcrypt (10 rounds)
- Reset passwords if compromised

### Slug Security
- Use non-obvious slugs (not "pitch" or "deck")
- Rotate slugs periodically for high-security presentations
- Delete old slugs after presentations
- Monitor access via analytics

## Deployment to Production

### 1. Deploy to Vercel

```bash
vercel --prod
```

### 2. Add Upstash Redis in Production
- The integration will automatically work in production
- Environment variables are already configured

### 3. Generate Production Setup Token

Visit your production URL: `https://yourdomain.com/api/setup-check`

### 4. Complete Setup in Production
Follow the same setup process as local development

## Troubleshooting

### "Admin not configured" Error
- Visit `/api/setup-check` to generate a new setup token
- Check server logs for the setup URL

### TOTP Code Not Working
- Ensure your device time is synced
- Try the previous or next code (30-second window)
- Regenerate TOTP secret if needed

### Redis Connection Errors
- Verify Upstash Redis integration is active in Vercel
- Check environment variables are set: `vercel env pull`
- Restart development server after adding env vars

### Users Can't Login
- Verify user exists and is active in admin dashboard
- Check slug is valid and exists
- Ensure Redis is accessible

## Environment Variables

Only Upstash Redis connection variables are needed (auto-added by Vercel):

```bash
# Upstash Redis (auto-added by Vercel Marketplace)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

**No other environment variables needed!** Everything else is managed in Redis through the admin UI.

## Data Management

### Backup Data
- Use the export feature in the admin dashboard (coming soon)
- Download user list and analytics as JSON
- Store backups securely

### Restore Data
- Re-add users through the admin UI
- Import slugs manually
- Analytics data can be re-imported via API

## Support

For issues or questions:
1. Check this guide
2. Review server logs
3. Verify Redis connection
4. Check Vercel deployment logs

## Next Steps

After setup:
1. ✅ Create your first user
2. ✅ Share pitch deck URL with investors
3. ✅ Monitor access via admin dashboard
4. ✅ Export analytics after presentations

**Happy pitching! 🚀**
