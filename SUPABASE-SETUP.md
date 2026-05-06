   # Supabase Setup Guide for Nakasoga Textile Centre

   This guide will help you set up Supabase as the complete backend for your e-commerce website.

   ## Prerequisites
   - Node.js 18+ installed
   - A Supabase account (free tier available at https://supabase.com)

   ## Step 1: Create Supabase Project

   1. Go to https://supabase.com and sign up/login
   2. Click "New Project"
   3. Fill in project details:
      - **Name**: Nakasoga Textiles
      - **Database Password**: Choose a strong password (save it!)
      - **Region**: Choose closest to Uganda (e.g., Frankfurt or Singapore)
   4. Click "Create new project" and wait 2-3 minutes

   ## Step 2: Set Up Database Schema

   1. In your Supabase dashboard, go to **SQL Editor**
   2. Click "New Query"
   3. Copy the entire contents of `lib/supabase/schema.sql`
   4. Paste into the SQL editor
   5. Click "Run" to execute the schema
   6. You should see "Success. No rows returned"

   This creates all tables: products, orders, users, inventory, reviews

   ## Step 3: Create Storage Bucket for Images

   1. Go to **Storage** in the Supabase dashboard
   2. Click "Create a new bucket"
   3. Name it: `product-images`
   4. Make it **Public** (check the box)
   5. Click "Create bucket"

   ### Set Storage Policies:
   1. Click on the `product-images` bucket
   2. Go to **Policies** tab
   3. Click "New Policy"
   4. Create these policies:

   **Policy 1: Public Read**
   ```sql
   CREATE POLICY "Anyone can view product images"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'product-images');
   ```

   **Policy 2: Admin Upload**
   ```sql
   CREATE POLICY "Admins can upload product images"
   ON storage.objects FOR INSERT
   WITH CHECK (
   bucket_id = 'product-images' AND
   EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
   );
   ```

   **Policy 3: Admin Delete**
   ```sql
   CREATE POLICY "Admins can delete product images"
   ON storage.objects FOR DELETE
   USING (
   bucket_id = 'product-images' AND
   EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
   );
   ```

   ## Step 4: Create Admin User

   ### Option A: Using Supabase Dashboard
   1. Go to **Authentication** > **Users**
   2. Click "Add user"
   3. Fill in:
      - **Email**: admin@nakasogatextiles.com
      - **Password**: Admin@2026 (or your preferred password)
      - **Auto Confirm User**: Yes
   4. Click "Create user"
   5. Copy the User ID

   ### Add Admin Role:
   1. Go to **SQL Editor**
   2. Run this query (replace USER_ID with the copied ID):
   ```sql
   INSERT INTO public.users (id, email, full_name, role)
   VALUES ('USER_ID', 'admin@nakasogatextiles.com', 'Admin User', 'admin');
   ```

   ## Step 5: Get API Keys

   1. Go to **Project Settings** (gear icon)
   2. Click **API** in the sidebar
   3. Copy these values:
      - **Project URL**: `https://xxxxx.supabase.co`
      - **anon public key**: `eyJhbGc...` (long string)
      - **service_role key**: `eyJhbGc...` (different long string)

   ## Step 6: Configure Environment Variables

   1. Create `.env.local` file in your project root:
   ```bash
   cp .env.example .env.local
   ```

   2. Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_ADMIN_WHATSAPP=256753222207
   ```

   ## Step 7: Install Dependencies

   ```bash
   npm install
   ```

   This will install `@supabase/supabase-js` and other dependencies.

   ## Step 8: Migrate Existing Products to Supabase

   Create a migration script to move your existing products:

   1. Go to **SQL Editor** in Supabase
   2. Run the migration script (see `lib/supabase/migrate-products.sql`)
   3. Or use the admin panel to add products manually

   ## Step 9: Test the Setup

   1. Start your development server:
   ```bash
   npm run dev
   ```

   2. Test these features:
      - ✅ View products on homepage
      - ✅ Register a new user
      - ✅ Login with admin credentials
      - ✅ Add a new product (admin)
      - ✅ Place an order
      - ✅ View orders in admin panel

   ## Step 10: Enable Email Authentication (Optional)

   1. Go to **Authentication** > **Providers**
   2. Enable **Email** provider
   3. Configure email templates:
      - Confirmation email
      - Password reset email
      - Magic link email

   ### Custom SMTP (Recommended for Production):
   1. Go to **Project Settings** > **Auth**
   2. Scroll to **SMTP Settings**
   3. Add your email service credentials (Gmail, SendGrid, etc.)

   ## Database Tables Overview

   ### `products`
   Stores all product information including images, prices, categories, and variants.

   ### `orders`
   Stores customer orders with items, shipping details, and payment information.

   ### `users`
   Stores user profiles with roles (customer/admin).

   ### `inventory`
   Tracks stock levels for each product with low stock alerts.

   ### `reviews`
   Stores product reviews and ratings from customers.

   ## Security Features

   ✅ **Row Level Security (RLS)** enabled on all tables
   ✅ **Admin-only** access for product management
   ✅ **User-specific** access for orders and profiles
   ✅ **Public read** access for products and reviews
   ✅ **Secure authentication** with JWT tokens

   ## Backup and Recovery

   ### Automatic Backups:
   - Supabase automatically backs up your database daily
   - Free tier: 7 days of backups
   - Pro tier: 30 days of backups

   ### Manual Backup:
   1. Go to **Database** > **Backups**
   2. Click "Create backup"
   3. Download when needed

   ## Monitoring

   ### View Real-time Activity:
   1. Go to **Database** > **Logs**
   2. Monitor queries, errors, and performance

   ### Check API Usage:
   1. Go to **Project Settings** > **Usage**
   2. Monitor database size, bandwidth, and API requests

   ## Troubleshooting

   ### Issue: "Failed to fetch"
   - Check if Supabase URL and keys are correct in `.env.local`
   - Restart your dev server after changing env variables

   ### Issue: "Row Level Security policy violation"
   - Check if user is authenticated
   - Verify admin role is set correctly in users table

   ### Issue: "Storage bucket not found"
   - Ensure `product-images` bucket is created
   - Check bucket is set to public

   ### Issue: "Cannot insert into products table"
   - Verify user has admin role
   - Check RLS policies are set correctly

   ## Production Deployment

   See `DEPLOYMENT.md` for complete deployment instructions including:
   - Vercel deployment
   - Environment variables setup
   - Custom domain configuration
   - SSL certificates
   - Performance optimization

   ## Support

   For Supabase-specific issues:
   - Documentation: https://supabase.com/docs
   - Community: https://github.com/supabase/supabase/discussions
   - Discord: https://discord.supabase.com

   For project-specific issues:
   - Check `TROUBLESHOOTING.md`
   - Contact: Idriisakimbgwe@yahoo.com
   - WhatsApp: +256 753 222 207
