# Installation Guide - Nakasoga Textile Centre

Complete step-by-step installation guide for local development.

## Prerequisites

Before you begin, ensure you have:
- ✅ Node.js 18 or higher installed
- ✅ npm or yarn package manager
- ✅ Git installed
- ✅ A code editor (VS Code recommended)
- ✅ A Supabase account (free tier is fine)

## Step 1: Clone or Download the Project

### Option A: If you have the project files
```bash
cd /path/to/NAKASOGA\ TEXTILES
```

### Option B: If cloning from Git
```bash
git clone <repository-url>
cd nakasoga-textiles
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 15
- React 18
- Supabase client
- Tailwind CSS
- TypeScript
- And all other dependencies

**Expected time**: 2-3 minutes

## Step 3: Set Up Supabase

### 3.1 Create Supabase Project
1. Go to https://supabase.com
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Name: `Nakasoga Textiles`
   - Database Password: (choose a strong password)
   - Region: (closest to Uganda)
5. Wait 2-3 minutes for project creation

### 3.2 Run Database Schema
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy entire contents of `lib/supabase/schema.sql`
4. Paste and click "Run"
5. Should see "Success. No rows returned"

### 3.3 Create Storage Bucket
1. Go to **Storage** in Supabase
2. Click "Create a new bucket"
3. Name: `product-images`
4. Make it **Public**
5. Click "Create bucket"

### 3.4 Create Admin User
1. Go to **Authentication** > **Users**
2. Click "Add user"
3. Email: `admin@nakasogatextiles.com`
4. Password: `Admin@2026`
5. Check "Auto Confirm User"
6. Click "Create user"
7. Copy the User ID

Then run this SQL (replace USER_ID):
```sql
INSERT INTO public.users (id, email, full_name, role)
VALUES ('USER_ID', 'admin@nakasogatextiles.com', 'Admin User', 'admin');
```

### 3.5 Get API Keys
1. Go to **Project Settings** > **API**
2. Copy:
   - Project URL
   - anon public key
   - service_role key

## Step 4: Configure Environment Variables

1. Copy the example file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_WHATSAPP=256753222207
```

## Step 5: Migrate Sample Products (Optional)

To populate your database with sample products:

1. Go to Supabase **SQL Editor**
2. Copy contents of `lib/supabase/migrate-products.sql`
3. Paste and run

This adds 12 sample products across all categories.

## Step 6: Start Development Server

```bash
npm run dev
```

The site will be available at: http://localhost:3000

## Step 7: Verify Installation

### Test Customer Features:
1. ✅ Open http://localhost:3000
2. ✅ Browse products on homepage
3. ✅ Click on a product to view details
4. ✅ Add product to cart
5. ✅ View cart
6. ✅ Register a new account
7. ✅ Login with your account

### Test Admin Features:
1. ✅ Go to http://localhost:3000/login
2. ✅ Login with admin credentials:
   - Email: `admin@nakasogatextiles.com`
   - Password: `Admin@2026`
3. ✅ Access admin dashboard at http://localhost:3000/admin
4. ✅ Try adding a new product
5. ✅ Try editing a product
6. ✅ View inventory
7. ✅ View orders

## Step 8: Upload Product Images

### Option A: Use Existing Images
Your images are in `app/Assets/` and `public/images/products/`

### Option B: Upload to Supabase Storage
1. Go to admin panel
2. Add/Edit product
3. Upload images directly to Supabase
4. Images will be stored in cloud storage

## Troubleshooting

### Issue: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Failed to fetch from Supabase"
- Check `.env.local` has correct values
- Restart dev server: `Ctrl+C` then `npm run dev`
- Verify Supabase project is running

### Issue: "Cannot read properties of undefined"
- Clear browser cache
- Check browser console for errors
- Verify database schema is created

### Issue: "Build failed"
```bash
npm run build
```
Check for TypeScript errors and fix them.

### Issue: Font loading errors
This is a network issue with Google Fonts. The site will work with fallback fonts.

## Next Steps

### For Development:
1. Read `README-COMPLETE.md` for full documentation
2. Explore the codebase
3. Customize colors in `tailwind.config.ts`
4. Add your own products
5. Customize content

### For Production:
1. Follow `SUPABASE-SETUP.md` for complete Supabase setup
2. Follow `DEPLOYMENT.md` for deployment instructions
3. Set up custom domain
4. Configure email notifications
5. Set up analytics

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## File Structure

```
nakasoga-textiles/
├── app/                    # Next.js pages
├── components/             # React components
├── lib/                    # Utilities
│   ├── supabase/          # Supabase integration
│   └── store/             # State management
├── public/                 # Static files
├── .env.local             # Environment variables (create this)
├── package.json           # Dependencies
└── README-COMPLETE.md     # Full documentation
```

## Getting Help

### Documentation:
- `README-COMPLETE.md` - Complete project documentation
- `SUPABASE-SETUP.md` - Supabase setup guide
- `DEPLOYMENT.md` - Deployment instructions
- `TROUBLESHOOTING.md` - Common issues and solutions

### Support:
- Email: Idriisakimbgwe@yahoo.com
- Phone: +256 753 222 207
- WhatsApp: +256 779 905 060

## Success Checklist

- [ ] Dependencies installed
- [ ] Supabase project created
- [ ] Database schema deployed
- [ ] Storage bucket created
- [ ] Admin user created
- [ ] Environment variables configured
- [ ] Development server running
- [ ] Can view products
- [ ] Can login as admin
- [ ] Can add products
- [ ] Can place orders

**Congratulations! Your development environment is ready! 🎉**

Start building amazing features for Nakasoga Textile Centre!
