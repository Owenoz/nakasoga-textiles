# Nakasoga Textiles - Production Deployment Guide

## ✅ Build Status: READY FOR DEPLOYMENT

Your site has been successfully built and is ready to deploy online!

---

## 🚀 Quick Deployment to Vercel (Recommended)

### Step 1: Push Code to GitHub

1. **Initialize Git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Nakasoga Textiles E-commerce Site"
   ```

2. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it: `nakasoga-textiles`
   - Don't initialize with README (you already have one)

3. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/nakasoga-textiles.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign up/Login with your GitHub account

2. **Import Project:**
   - Click "Add New" → "Project"
   - Select your `nakasoga-textiles` repository
   - Click "Import"

3. **Configure Environment Variables:**
   
   In the Vercel project settings, add these environment variables:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://amufnehhtesinkbkjpv.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtdWZuZWhodGVzaW5rYmtianB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NzQ3OTAsImV4cCI6MjA5MzU1MDc5MH0.gg2N8dSv67Z2WaFxnrz5zAZO2YIdyERNhu949uVzuhY
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtdWZuZWhodGVzaW5rYmtianB2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Nzk3NDc5MCwiZXhwIjoyMDkzNTUwNzkwfQ.kso2DF7Og_v_sxarqalLEHZq_Kf9tQoKDaHiWcsesQE
   NEXT_PUBLIC_SITE_URL=https://your-site-name.vercel.app
   NEXT_PUBLIC_ADMIN_WHATSAPP=256753222207
   ```
   
   **Note:** After deployment, update `NEXT_PUBLIC_SITE_URL` with your actual Vercel URL

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - Your site will be live at `https://your-site-name.vercel.app`

5. **Update Site URL:**
   - After deployment, go to Vercel project settings
   - Update `NEXT_PUBLIC_SITE_URL` with your actual URL
   - Redeploy (Vercel will auto-redeploy on changes)

---

## 🗄️ Supabase Database Setup

Your Supabase is already configured! But you need to set up the database tables:

### Step 1: Run Database Schema

1. **Go to Supabase Dashboard:**
   - Visit https://supabase.com/dashboard
   - Select your project: `amufnehhtesinkbkjpv`

2. **Open SQL Editor:**
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Schema:**
   - Copy the entire content from `lib/supabase/schema.sql`
   - Paste it into the SQL editor
   - Click "Run" or press Ctrl+Enter

4. **Verify Tables Created:**
   - Go to "Table Editor"
   - You should see: `products`, `orders`, `users`, `inventory`, `reviews`

### Step 2: Migrate Sample Products (Optional)

1. **In SQL Editor, run:**
   - Copy content from `lib/supabase/migrate-products.sql`
   - Paste and run
   - This will add your 20 sample products to the database

### Step 3: Set Up Storage for Product Images

1. **Go to Storage:**
   - Click "Storage" in the left sidebar
   - Click "Create a new bucket"

2. **Create Bucket:**
   - Name: `product-images`
   - Public bucket: ✅ Yes
   - Click "Create bucket"

3. **Set Bucket Policies:**
   - Click on the bucket
   - Go to "Policies"
   - Add policy: "Allow public read access"
   - SQL:
     ```sql
     CREATE POLICY "Public Access"
     ON storage.objects FOR SELECT
     USING ( bucket_id = 'product-images' );
     ```

### Step 4: Create Admin User

1. **Go to Authentication:**
   - Click "Authentication" → "Users"
   - Click "Add user"

2. **Create Admin:**
   - Email: `admin@nakasogatextiles.com`
   - Password: `Admin@2026`
   - Click "Create user"

3. **Set Admin Role:**
   - Go to SQL Editor
   - Run:
     ```sql
     UPDATE users 
     SET role = 'admin' 
     WHERE email = 'admin@nakasogatextiles.com';
     ```

---

## 🔧 Alternative Deployment Options

### Option 2: Deploy to Netlify

1. **Push to GitHub** (same as Step 1 above)

2. **Go to Netlify:**
   - Visit https://netlify.com
   - Click "Add new site" → "Import an existing project"

3. **Connect GitHub:**
   - Select your repository
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Add Environment Variables:**
   - Same as Vercel (see above)

5. **Deploy:**
   - Click "Deploy site"

### Option 3: Deploy to Your Own Server

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

3. **Use PM2 for process management:**
   ```bash
   npm install -g pm2
   pm2 start npm --name "nakasoga-textiles" -- start
   pm2 save
   pm2 startup
   ```

4. **Set up Nginx reverse proxy:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 📱 Post-Deployment Checklist

### 1. Test Core Features
- [ ] Homepage loads correctly
- [ ] Product pages display images
- [ ] Search functionality works
- [ ] Cart add/remove works
- [ ] Checkout process completes
- [ ] WhatsApp order notification opens

### 2. Test Admin Portal
- [ ] Login with admin credentials
- [ ] View all products
- [ ] Add new product
- [ ] Edit existing product
- [ ] Delete product
- [ ] View orders
- [ ] Update inventory

### 3. Test Authentication
- [ ] Register new user
- [ ] Login as customer
- [ ] Logout
- [ ] Password reset (if implemented)

### 4. Mobile Responsiveness
- [ ] Test on mobile device
- [ ] Check all pages are responsive
- [ ] Admin portal works on mobile

### 5. Performance
- [ ] Check page load speeds
- [ ] Verify images are optimized
- [ ] Test on slow connection

---

## 🔐 Security Checklist

- [ ] Environment variables are set correctly
- [ ] Supabase RLS policies are enabled
- [ ] Admin credentials are secure
- [ ] HTTPS is enabled (automatic on Vercel/Netlify)
- [ ] API keys are not exposed in client code

---

## 📊 Analytics & Monitoring (Optional)

### Add Google Analytics

1. **Get GA4 tracking ID:**
   - Go to https://analytics.google.com
   - Create property
   - Get Measurement ID (G-XXXXXXXXXX)

2. **Add to your site:**
   - Add to `app/layout.tsx` in the `<head>` section

### Add Vercel Analytics

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Analytics" tab
   - Enable analytics

---

## 🆘 Troubleshooting

### Build Fails
- Check all environment variables are set
- Verify `.env.local` is not committed to Git
- Check Node.js version (should be 18+)

### Images Not Loading
- Verify images are in `public/images/products/`
- Check Next.js image domains in `next.config.js`
- For Supabase images, verify bucket is public

### Database Errors
- Verify Supabase credentials are correct
- Check RLS policies are set up
- Ensure tables are created

### WhatsApp Not Working
- Verify phone number format: 256753222207
- Check if WhatsApp is installed on device
- Test on mobile device (works better than desktop)

---

## 📞 Support

**Business Contact:**
- Email: Idriisakimbgwe@yahoo.com
- Phone: +256 753 222 207
- Phone: +256 779 905 060

**Locations:**
- Magoba Arcade Shop K-02
- City Mall P3-524
- City Mall P5-795

---

## 🎉 Your Site is Ready!

Your Nakasoga Textiles e-commerce website is fully built and ready to go live. Follow the steps above to deploy to Vercel (easiest option) or your preferred hosting platform.

**What You Have:**
- ✅ Complete e-commerce website
- ✅ 20 products with real images
- ✅ Shopping cart & checkout
- ✅ WhatsApp order notifications
- ✅ Admin dashboard
- ✅ Product management
- ✅ Order management
- ✅ Inventory tracking
- ✅ User authentication
- ✅ Mobile responsive design
- ✅ Supabase backend integration
- ✅ Production-ready build

**Next Steps:**
1. Push code to GitHub
2. Deploy to Vercel
3. Set up Supabase database
4. Test everything
5. Go live! 🚀
