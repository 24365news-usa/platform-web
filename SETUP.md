# 24365.News Platform Setup Checklist

## Quick Start (5 minutes to live)

### 1. GitHub Setup
- [ ] Create GitHub account/org (if needed)
- [ ] Create new repository: `24365news/platform-web`
- [ ] Push code:
  ```bash
  cd projects/platform-web
  git remote add origin git@github.com:24365news/platform-web.git
  git push -u origin main
  ```

### 2. Vercel Deployment
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Sign up / log in with GitHub
- [ ] "Add New Project"
- [ ] Import `24365news/platform-web`
- [ ] Deploy (will fail without env vars - that's okay)

### 3. Clerk Authentication (Free tier: 10k users)
- [ ] Go to [clerk.com](https://clerk.com)
- [ ] Create account
- [ ] Create new application: "24365.News"
- [ ] Copy `Publishable Key` and `Secret Key`
- [ ] In Vercel → Project Settings → Environment Variables, add:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` = pk_live_xxx
  - `CLERK_SECRET_KEY` = sk_live_xxx

### 4. Supabase Database (Free tier: 500MB)
- [ ] Go to [supabase.com](https://supabase.com)
- [ ] Create account
- [ ] Create new project: "24365-news"
- [ ] Wait for project to initialize (~2 min)
- [ ] Go to SQL Editor → Run contents of `supabase/schema.sql`
- [ ] Go to Project Settings → API, copy:
  - Project URL
  - anon/public key
  - service_role key (secret!)
- [ ] In Vercel, add:
  - `NEXT_PUBLIC_SUPABASE_URL` = https://xxx.supabase.co
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = xxx
  - `SUPABASE_SERVICE_ROLE_KEY` = xxx

### 5. Mux Video (Pay as you go)
- [ ] Go to [mux.com](https://mux.com)
- [ ] Create account
- [ ] Create new environment
- [ ] Go to Settings → Access Tokens → Generate new token
  - Permissions: Mux Video (read + write)
- [ ] Copy Token ID and Token Secret
- [ ] In Vercel, add:
  - `MUX_TOKEN_ID` = xxx
  - `MUX_TOKEN_SECRET` = xxx
- [ ] Set up webhook:
  - URL: `https://24365.news/api/webhook/mux`
  - Events: video.upload.*, video.asset.*

### 6. Domain Configuration
- [ ] In Vercel → Project → Settings → Domains
- [ ] Add `24365.news`
- [ ] In GoDaddy:
  - Add CNAME record: `@` → `cname.vercel-dns.com`
  - Or use Vercel nameservers (recommended)
- [ ] Wait for DNS propagation (~5-30 min)
- [ ] In Vercel, add:
  - `NEXT_PUBLIC_APP_URL` = https://24365.news

### 7. Redeploy
- [ ] Go to Vercel → Deployments → Redeploy (with env vars)

## Post-Launch

### Enable Authentication
Once Clerk is configured, update the code to use real auth:
1. Uncomment ClerkProvider in `src/app/layout.tsx`
2. Add middleware back for protected routes
3. Update dashboard/upload pages to use real user data

### Mux Webhook Verification (Optional but recommended)
1. In Mux dashboard, get webhook signing secret
2. Add `MUX_WEBHOOK_SECRET` to Vercel
3. Update webhook handler to verify signatures

## Estimated Setup Time

| Task | Time |
|------|------|
| GitHub + Vercel | 5 min |
| Clerk | 5 min |
| Supabase | 10 min |
| Mux | 10 min |
| Domain | 5 min + DNS wait |
| **Total** | ~35 min + DNS |

## Need Help?

- Clerk docs: https://clerk.com/docs
- Supabase docs: https://supabase.com/docs
- Mux docs: https://docs.mux.com
- Vercel docs: https://vercel.com/docs

---

Once all steps complete, 24365.news will be live with:
- ✅ Landing page
- ✅ User authentication
- ✅ Contributor applications
- ✅ Video upload
- ✅ Admin dashboard
