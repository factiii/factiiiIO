# Pitch Deck Quick Start

## 🚀 Start the Pitch Deck (30 seconds)

### 1. Start Development Server
```bash
npm run dev
```

### 2. Open in Browser
Navigate to: **http://localhost:3000/p/zfm845in**

### 3. Enter Password
Password: **factiii2025secure**

### 4. View Pitch Deck
You're in! 🎉

---

## 📋 What You'll See

### 7 Sections in Order:
1. **Hero** - "The End of Config Hell" with key metrics
2. **Problem** - Config hell pain points (4 problems)
3. **Solution** - Configless approach with adapter flow
4. **Competitor Analysis** - Comparison table (11 competitors)
5. **Market Analysis** - TAM/SAM/SOM breakdown
6. **Go-to-Market Strategy** - 4 strategic pillars + revenue model
7. **Roadmap** - 4-phase plan to $10M+ ARR

---

## 🔧 Troubleshooting

### "Cannot find module" error
```bash
npm install
```

### Port 3000 already in use
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Password not working
Check `.env.local` file exists with:
```
PITCH_PASSWORD=factiii2025secure
```

### Build errors
```bash
npm run build
```
Should complete without errors.

---

## 📱 Presentation Tips

### Full Screen Mode
- Press `F11` (Windows/Linux) or `Cmd+Ctrl+F` (Mac)
- Hide browser UI for clean presentation

### Navigation
- Scroll naturally through sections
- Each section has smooth scroll-triggered animations
- Mobile responsive for tablet demos

### Key Talking Points

**Hero**: "We're solving an $8.2B problem affecting 20M+ developers"

**Problem**: "Developers waste 30% of their time on config instead of features"

**Solution**: "Code-first, not config-first—like Viper for Node.js, but better"

**Competitors**: "No one else offers zero-config + adapters + cloudless vision"

**Market**: "Clear path to $180M SOM in 3 years"

**Strategy**: "Open source first, then monetize enterprise features"

**Roadmap**: "From configless stack to cloudless platform in 4 phases"

---

## 🎨 Design Notes

- **Dark theme** inspired by webAI.com
- **Gradient text** for section headers
- **Animated cards** on scroll
- **Color coding**: Red (problems), Blue/Purple (solution), Green (market)
- **Glassmorphism** effects throughout

---

## 🔐 Security Notes

- Password protected via middleware
- HTTP-only cookies (7-day expiry)
- Random slug for obscurity
- noindex meta tags (won't appear in search)
- Safe to share URL with investors

---

## 📤 Sharing with Investors

### Option 1: Deploy to Vercel
1. Push to GitHub
2. Connect to Vercel
3. Add env vars: `PITCH_PASSWORD`, `PITCH_SLUG`
4. Share: `https://factiii.io/p/zfm845in`

### Option 2: Local Demo
1. Run `npm run dev`
2. Use screen sharing (Zoom/Meet)
3. Walk through sections live

### Option 3: Export PDF (Future)
- Feature not yet implemented
- Consider using browser print-to-PDF for now

---

## 📞 Need Help?

See detailed docs:
- `PITCH_DECK_README.md` - Full documentation
- `IMPLEMENTATION_SUMMARY.md` - Technical overview

---

**Ready to pitch? Let's go! 🚀**
