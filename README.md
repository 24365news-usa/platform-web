# 24365.News Platform

The distributed citizen journalist network covering news 24 hours a day, 365 days a year.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Auth:** Clerk
- **Database:** Supabase (PostgreSQL)
- **Video:** Mux
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Accounts at: Clerk, Supabase, Mux

### Installation

```bash
# Clone the repo
git clone https://github.com/24365news/platform-web.git
cd platform-web

# Install dependencies
npm install

# Copy env file and fill in values
cp .env.example .env.local

# Run development server
npm run dev
```

### Environment Variables

See `.env.example` for required variables:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `MUX_TOKEN_ID` - Mux API token ID
- `MUX_TOKEN_SECRET` - Mux API token secret
- `NEXT_PUBLIC_APP_URL` - Production URL (https://24365.news)

### Database Setup

Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── watch/             # Video feed
│   ├── dashboard/         # Contributor dashboard
│   ├── upload/            # Video upload
│   ├── admin/             # Admin dashboard
│   ├── about/             # About page
│   ├── apply/             # Contributor applications
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── VideoPlayer.tsx
│   ├── VideoCard.tsx
│   └── VideoGrid.tsx
└── lib/                   # Utilities
    ├── supabase.ts
    └── mux.ts
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Domain Setup

Point `24365.news` to Vercel:
- CNAME record: `cname.vercel-dns.com`

Or use Vercel nameservers for automatic SSL.

## Features

### Public
- Landing page with mission/values
- Video feed with categories
- Video player with HLS streaming
- About page
- Contributor application form

### Contributors
- Dashboard with stats
- Video upload with Mux direct upload
- Profile page

### Admin
- Dashboard with overview stats
- Application review
- Contributor management
- Content moderation

## API Endpoints

- `POST /api/applications` - Submit contributor application
- `GET /api/applications` - List applications (admin)
- `POST /api/upload` - Create Mux upload URL (auth required)
- `POST /api/webhook/mux` - Mux webhook handler

## License

Proprietary - 24365.News © 2025
# Force Deploy Wed Feb 11 18:49:34 AST 2026
