# 🎯 BetMind - AI-Powered Sports Betting Platform

**BetMind** is a cutting-edge sports betting analysis platform powered by AI. Built with Next.js 16, it provides real-time odds analysis, value bet detection, and intelligent betting recommendations.

## ✨ Features

- 🤖 **AI-Powered Analysis** - Claude AI generates detailed match analysis and betting strategies
- 📊 **Real-Time Odds** - Live odds from multiple bookmakers
- 💎 **Value Bet Detection** - Automatically identifies high-value betting opportunities
- 🎲 **Parlay Builder** - Smart parlay construction with risk assessment
- 📈 **Advanced Statistics** - Comprehensive stats and historical data
- 🔥 **Live Events** - Real-time tracking of ongoing matches
- 🎨 **Modern UI** - Beautiful glassmorphic design with smooth animations

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **AI**: Claude (Anthropic)

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and fill in your API keys:

```bash
cp .env.example .env.local
```

Required variables:
- `ANTHROPIC_API_KEY` - Claude AI API key
- `ODDS_API_KEY` - Sports odds API key
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth secret key

## 📁 Project Structure

```
/app
  /page.tsx                    # Homepage with live events
  /analysis/[id]/page.tsx      # Match analysis page
  /layout.tsx                  # Root layout
  /globals.css                 # Global styles + Tailwind config
/components
  /ui/                         # shadcn/ui components
  /EventCard.tsx               # Event display card
  /SportTabs.tsx               # Sport filter tabs
  /ParlayBuilder.tsx           # Parlay construction
  /StatsBar.tsx                # Statistics display
/lib
  /utils.ts                    # Utility functions
  /types.ts                    # TypeScript types
/public
  /images/                     # Static images
```

## 🎨 Design System

BetMind uses a custom dark theme with neon accents:

- **Primary**: Neon Green (#00e87b)
- **Accent**: Neon Cyan (#06d6e0)
- **Background**: Deep Navy (#0b1120)
- **Cards**: Glassmorphic with backdrop blur

## 🔐 Authentication

Authentication is handled via NextAuth with support for:
- Email/Password
- OAuth providers (Google, GitHub)
- JWT sessions

## 📊 API Routes

- `GET /api/events` - Fetch live and upcoming events
- `GET /api/analysis/[id]` - Get AI analysis for a match
- `POST /api/parlay` - Create and analyze parlays
- `GET /api/odds/[eventId]` - Get real-time odds

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Environment Variables on Vercel

Add all variables from `.env.example` in your Vercel project settings.

## 🛠️ Development

```bash
# Run linter
pnpm lint

# Type check
pnpm type-check

# Format code
pnpm format
```

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Contact

For questions or support, reach out via GitHub issues.

---

**Built with ❤️ using Next.js and Claude AI**
