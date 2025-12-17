# Pitch Deck Setup

This document describes the password-protected pitch deck implementation.

## Access Information

- **URL**: `http://localhost:3000/p/zfm845in` (development)
- **Production URL**: `https://factiii.io/p/zfm845in`
- **Password**: `factiii2025secure` (stored in `.env.local`)

## Environment Variables

The following environment variables are required in `.env.local`:

```bash
PITCH_SLUG=zfm845in
PITCH_PASSWORD=factiii2025secure
```

**Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

## Architecture

### Authentication Flow

1. User visits `/p/zfm845in`
2. Middleware checks for `pitch_auth` cookie
3. If no valid cookie, redirects to `/p/zfm845in/login`
4. User enters password
5. Server action validates password
6. Sets HTTP-only cookie with 7-day expiry
7. Redirects to pitch deck page

### Security Features

- **HTTP-only cookies**: Prevents XSS attacks
- **Secure flag**: HTTPS-only in production
- **SameSite=Strict**: Prevents CSRF attacks
- **Password in env var**: Never hardcoded
- **Random slug**: Security through obscurity
- **noindex meta tags**: Prevents search engine indexing

## File Structure

```
src/
├── middleware.ts                          # Authentication middleware
├── app/
│   └── p/
│       ├── actions.ts                     # Server actions for auth
│       └── [slug]/
│           ├── page.tsx                   # Main pitch deck page
│           └── login/
│               └── page.tsx               # Password entry page
└── components/
    └── sections/
        └── pitch/
            ├── hero-pitch.tsx             # Hero section
            ├── problem.tsx                # Problem statement
            ├── solution.tsx               # Solution overview
            ├── competitor-table.tsx       # Competitor comparison
            ├── market-analysis.tsx        # Market size & opportunity
            ├── strategy.tsx               # Go-to-market strategy
            └── roadmap.tsx                # Product roadmap
```

## Pitch Deck Sections

1. **Hero**: Bold headline, key metrics (TAM, developers, problem severity)
2. **Problem**: Config hell pain points in Node.js ecosystem
3. **Solution**: Configless approach with adapter flow
4. **Competitor Analysis**: Comprehensive comparison table with 10 competitors
5. **Market Analysis**: TAM/SAM/SOM, target audience, market trends
6. **Go-to-Market Strategy**: Open source, developer adoption, enterprise monetization
7. **Roadmap**: 4-phase plan from configless stack to cloudless platform

## Design System

- **Color scheme**: Dark background (#0a0a0a), primary accent (#6366f1)
- **Typography**: Large, bold headlines (60-80px)
- **Animations**: Framer Motion for scroll-triggered reveals
- **Layout**: Full-width sections with max-width containers (1280px)
- **Inspiration**: webAI.com dark, modern aesthetic

## Competitor Analysis

The pitch includes a comprehensive comparison table with:

**Node.js/JavaScript competitors**:
- c9h
- convict
- node-config
- nconf
- dotenv-vault/dotenv-flow
- cosmiconfig
- rc

**Go competitors** (for reference):
- Viper
- koanf

**Comparison dimensions**:
- Zero-config setup
- Schema validation
- Env var binding
- Multi-format support
- Secret masking
- Hot reload
- File structure required
- Boilerplate code
- Type safety
- Adapter ecosystem
- Cloudless deployment

## Updating the Password

To change the password:

1. Update `PITCH_PASSWORD` in `.env.local`
2. Restart the development server
3. Clear browser cookies for the site
4. Test login with new password

## Deployment Notes

### Vercel Deployment

1. Add environment variables in Vercel dashboard:
   - `PITCH_PASSWORD`: Your secure password
   - `PITCH_SLUG`: The random slug (or keep as `zfm845in`)

2. The middleware will automatically work in production

3. Ensure the slug is communicated securely to investors

### Security Recommendations

- Use a strong, unique password for production
- Consider rotating the slug periodically
- Monitor access logs if available
- Add rate limiting for password attempts (future enhancement)

## Development

To run locally:

```bash
npm run dev
```

Then visit: `http://localhost:3000/p/zfm845in`

## Future Enhancements

- Rate limiting on password attempts
- Analytics tracking (PostHog/Plausible)
- PDF export functionality
- Presentation mode with keyboard navigation
- Custom domain for pitch deck
