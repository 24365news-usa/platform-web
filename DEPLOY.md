# 24365.News Platform — Deployment Guide

## Quick Start (Local)

```bash
cd projects/platform-web
npm install
npm run dev
# Open http://localhost:3000
```

## Deploy to Vercel

### 1. Push to GitHub

```bash
cd projects/platform-web
git add .
git commit -m "Initial platform build"
# Create repo on GitHub: 24365news/platform-web
git remote add origin git@github.com:24365news/platform-web.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import the GitHub repo
3. Framework will auto-detect (Next.js)
4. Deploy

### 3. Set Environment Variables in Vercel

```
# Clerk (https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx

# Supabase (https://supabase.com/dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Mux (https://dashboard.mux.com)
MUX_TOKEN_ID=xxx
MUX_TOKEN_SECRET=xxx

# App URL
NEXT_PUBLIC_APP_URL=https://24365.news
```

### 4. Configure Domain (GoDaddy → Vercel)

In GoDaddy DNS:
- Type: CNAME
- Name: @
- Value: cname.vercel-dns.com
- TTL: 600

Or use Vercel nameservers for full control.

In Vercel:
1. Project Settings → Domains
2. Add `24365.news`
3. Follow verification steps

### 5. Set Up Supabase

1. Create project at supabase.com
2. Go to SQL Editor
3. Run `supabase/schema.sql`
4. Copy keys to Vercel env vars

### 6. Set Up Mux

1. Create account at mux.com
2. Create new environment
3. Generate API token (with video permissions)
4. Copy Token ID and Secret to Vercel
5. Set up webhook: `https://24365.news/api/webhook/mux`

### 7. Set Up Clerk

1. Create app at clerk.com
2. Configure sign-in methods (email, Google, etc.)
3. Copy keys to Vercel
4. Update `src/app/layout.tsx` to use ClerkProvider
5. Re-enable middleware

## Post-Deploy Checklist

- [ ] Landing page loads at 24365.news
- [ ] Sign up creates Clerk user
- [ ] Dashboard accessible after login
- [ ] Upload creates Mux direct upload URL
- [ ] Video appears after processing
- [ ] Webhook updates video status in Supabase

## Architecture

```
User → Clerk Auth → Next.js App → Mux (video) + Supabase (data)
                                       ↓
                              Mux Webhook → Update video status
```

## Costs (Estimated)

| Service | Free Tier | Production |
|---------|-----------|------------|
| Vercel | Hobby free | $20/mo Pro |
| Clerk | 10k MAU free | $0.02/MAU |
| Supabase | 500MB free | $25/mo Pro |
| Mux | - | ~$0.007/min stored, $0.005/min delivered |

**Typical month (light usage):** $70-100
**Growth phase:** $150-300
