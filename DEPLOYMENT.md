# Deployment Guide - Nakasoga Textile Centre

Complete guide to deploy your e-commerce website to production.

## Deployment Options

### Recommended: Vercel (Easiest & Free)
- ✅ Free hosting for Next.js
- ✅ Automatic deployments from Git
- ✅ Global CDN
- ✅ SSL certificates included
- ✅ Environment variables management

### Alternative: Netlify, Railway, or DigitalOcean

---

## Option 1: Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free at https://vercel.com)
- Supabase project set up (see SUPABASE-SETUP.md)

### Step 1: Push Code to GitHub

1. Create a new repository on GitHub
2. Initialize git in your project (if not already):
```bash
git init
git add .
git commit -m "Initial commit"
```

3. Add remote and push:
```bash
git remote add origin https://github.com/yourusername/nakasoga-textiles.git
git branch -M main
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to https://vercel.com and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

### Step 3: Add Environment Variables

In Vercel project settings, add these environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_ADMIN_WHATSAPP=256753222207
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. Your site will be live at `https://your-project.vercel.app`

### Step 5: Add Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain (e.g., nakasogatextiles.com)
3. Update DNS records as instructed by Vercel
4. SSL certificate is automatically provisioned

---

## Option 2: Deploy to Netlify

### Step 1: Push to GitHub (same as Vercel)

### Step 2: Import to Netlify

1. Go to https://netlify.com and sign in
2. Click "Add new site" > "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

### Step 3: Add Environment Variables

In Netlify site settings > Environment variables, add the same variables as Vercel.

### Step 4: Deploy

Click "Deploy site" and wait for build to complete.

---

## Pre-Deployment Checklist

### 1. Environment Variables
- [ ] All Supabase keys added
- [ ] Site URL updated to production domain
- [ ] WhatsApp number verified

### 2. Supabase Configuration
- [ ] Database schema deployed
- [ ] Storage bucket created
- [ ] RLS policies enabled
- [ ] Admin user created
- [ ] Products migrated

### 3. Code Quality
- [ ] No console.log statements in production code
- [ ] All TypeScript errors resolved
- [ ] Build succeeds locally: `npm run build`
- [ ] No security vulnerabilities: `npm audit`

### 4. Content
- [ ] All product images uploaded
- [ ] Product descriptions complete
- [ ] Contact information correct
- [ ] About page content finalized

### 5. Testing
- [ ] Test user registration
- [ ] Test user login
- [ ] Test product browsing
- [ ] Test cart functionality
- [ ] Test checkout process
- [ ] Test admin login
- [ ] Test product management
- [ ] Test order management
- [ ] Test WhatsApp notifications

---

## Post-Deployment Tasks

### 1. Update Supabase Redirect URLs

1. Go to Supabase Dashboard > Authentication > URL Configuration
2. Add your production URL to:
   - **Site URL**: `https://your-domain.com`
   - **Redirect URLs**: 
     - `https://your-domain.com/**`
     - `https://your-domain.vercel.app/**`

### 2. Configure Email Templates

1. Go to Supabase Dashboard > Authentication > Email Templates
2. Customize templates with your branding
3. Update links to point to your production domain

### 3. Set Up Analytics (Optional)

#### Google Analytics:
1. Create GA4 property
2. Add tracking code to `app/layout.tsx`

#### Vercel Analytics:
1. Enable in Vercel dashboard
2. Free for hobby projects

### 4. Set Up Monitoring

#### Sentry (Error Tracking):
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

#### Uptime Monitoring:
- Use UptimeRobot (free)
- Monitor your site every 5 minutes

### 5. Performance Optimization

#### Enable Image Optimization:
- Already configured with Next.js Image component
- Vercel automatically optimizes images

#### Enable Caching:
- Supabase responses are cached
- Static pages are cached by Vercel CDN

### 6. Security Hardening

#### Add Security Headers:
Create `next.config.js`:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
```

#### Enable Rate Limiting:
- Supabase has built-in rate limiting
- Consider Vercel Edge Middleware for additional protection

---

## Continuous Deployment

### Automatic Deployments:
- Push to `main` branch → Automatic production deployment
- Push to `develop` branch → Preview deployment

### Preview Deployments:
- Every pull request gets a unique preview URL
- Test changes before merging to main

---

## Backup Strategy

### Database Backups:
- Supabase automatic daily backups (7-30 days retention)
- Manual backups before major changes

### Code Backups:
- GitHub repository (primary)
- Local git repository (secondary)

### Media Backups:
- Supabase Storage (primary)
- Download periodically for local backup

---

## Scaling Considerations

### When to Upgrade:

#### Supabase:
- **Free Tier**: Up to 500MB database, 1GB storage
- **Pro Tier** ($25/month): 8GB database, 100GB storage
- Upgrade when approaching limits

#### Vercel:
- **Hobby**: Free for personal projects
- **Pro** ($20/month): Custom domains, analytics
- Upgrade for commercial use

### Performance Optimization:
1. Enable Supabase connection pooling
2. Add database indexes for frequently queried fields
3. Implement Redis caching for hot data
4. Use Vercel Edge Functions for API routes

---

## Monitoring & Maintenance

### Daily:
- [ ] Check error logs in Vercel
- [ ] Monitor Supabase usage

### Weekly:
- [ ] Review order statistics
- [ ] Check inventory levels
- [ ] Respond to customer inquiries

### Monthly:
- [ ] Update dependencies: `npm update`
- [ ] Review security advisories: `npm audit`
- [ ] Backup database manually
- [ ] Review analytics and performance

---

## Troubleshooting Production Issues

### Site Not Loading:
1. Check Vercel deployment logs
2. Verify environment variables
3. Check Supabase project status

### Database Errors:
1. Check Supabase logs
2. Verify RLS policies
3. Check connection limits

### Image Upload Failures:
1. Verify storage bucket exists
2. Check storage policies
3. Verify file size limits

### Authentication Issues:
1. Check redirect URLs in Supabase
2. Verify JWT secret
3. Check email provider settings

---

## Support & Resources

### Documentation:
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Vercel: https://vercel.com/docs

### Community:
- Next.js Discord: https://nextjs.org/discord
- Supabase Discord: https://discord.supabase.com

### Contact:
- Email: Idriisakimbgwe@yahoo.com
- Phone: +256 753 222 207
- WhatsApp: +256 779 905 060

---

## Success Checklist

- [ ] Site is live and accessible
- [ ] SSL certificate is active (https://)
- [ ] All pages load correctly
- [ ] Products display properly
- [ ] Cart and checkout work
- [ ] Admin panel accessible
- [ ] Orders are saved to database
- [ ] WhatsApp notifications work
- [ ] Email notifications work (if configured)
- [ ] Mobile responsive design works
- [ ] Performance is good (Lighthouse score >90)
- [ ] SEO meta tags are present
- [ ] Analytics tracking works
- [ ] Error monitoring is active

---

## Next Steps After Deployment

1. **Marketing**:
   - Share website on social media
   - Add to Google My Business
   - Create Facebook/Instagram pages
   - Start email marketing campaigns

2. **SEO**:
   - Submit sitemap to Google Search Console
   - Optimize product descriptions
   - Add structured data markup
   - Build backlinks

3. **Customer Service**:
   - Set up WhatsApp Business
   - Create FAQ section
   - Add live chat (optional)
   - Set up email support

4. **Growth**:
   - Add more products
   - Create blog content
   - Run promotions
   - Collect customer reviews

---

**Congratulations! Your e-commerce site is now live! 🎉**
