# Nakasoga Textile Centre - Complete E-Commerce Platform

A modern, production-ready e-commerce website for selling African textiles, fabrics, and fashion items.

## 🎉 Features

### Customer Features
- ✅ Browse products by category
- ✅ Search functionality
- ✅ Product filtering and sorting
- ✅ Shopping cart with persistent storage
- ✅ Wishlist functionality
- ✅ Secure checkout process
- ✅ User authentication (register/login)
- ✅ Order history
- ✅ Product reviews and ratings
- ✅ WhatsApp order notifications
- ✅ Mobile-responsive design
- ✅ Recently viewed products

### Admin Features
- ✅ Admin dashboard with statistics
- ✅ Product management (add/edit/delete)
- ✅ Inventory management
- ✅ Order management
- ✅ Stock tracking with low stock alerts
- ✅ Image upload to cloud storage
- ✅ Real-time order notifications
- ✅ Mobile-optimized admin panel

### Technical Features
- ✅ Next.js 15 with App Router
- ✅ TypeScript for type safety
- ✅ Supabase backend (database + storage + auth)
- ✅ Row Level Security (RLS)
- ✅ Real-time data synchronization
- ✅ Image optimization
- ✅ SEO-friendly
- ✅ Fast page loads
- ✅ Secure authentication
- ✅ Production-ready

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase
Follow the complete guide in `SUPABASE-SETUP.md`

### 3. Configure Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials.

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Login as Admin
- Email: `admin@nakasogatextiles.com`
- Password: `Admin@2026`

## 📁 Project Structure

```
nakasoga-textiles/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin panel pages
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout process
│   ├── products/            # Product pages
│   └── ...
├── components/              # Reusable components
│   ├── home/               # Homepage components
│   ├── layout/             # Layout components
│   ├── products/           # Product components
│   └── ui/                 # UI components
├── lib/                     # Utilities and configurations
│   ├── supabase/           # Supabase integration
│   │   ├── auth.ts         # Authentication functions
│   │   ├── products.ts     # Product CRUD operations
│   │   ├── orders.ts       # Order management
│   │   ├── inventory.ts    # Inventory management
│   │   └── schema.sql      # Database schema
│   ├── store/              # Zustand state management
│   └── utils.ts            # Helper functions
├── public/                  # Static assets
│   └── images/             # Product images
└── ...
```

## 🗄️ Database Schema

### Tables
- **products** - Product catalog
- **orders** - Customer orders
- **users** - User profiles and roles
- **inventory** - Stock management
- **reviews** - Product reviews

### Storage
- **product-images** - Product image uploads

See `lib/supabase/schema.sql` for complete schema.

## 🔐 Authentication & Authorization

### User Roles
- **Customer** - Can browse, purchase, review products
- **Admin** - Full access to admin panel and management features

### Security
- Row Level Security (RLS) enabled
- JWT-based authentication
- Secure password hashing
- Protected admin routes
- HTTPS enforced in production

## 📦 Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

See `DEPLOYMENT.md` for complete deployment guide.

### Deploy to Other Platforms
- Netlify
- Railway
- DigitalOcean
- AWS Amplify

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

### Backend
- **Supabase** - Database, Auth, Storage
- **PostgreSQL** - Database
- **Row Level Security** - Data security

### State Management
- **Zustand** - Global state
- **React Hook Form** - Form handling
- **Zod** - Validation

## 📱 Mobile Responsiveness

Fully optimized for all devices:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1280px+)

## 🎨 Design System

### Colors
- **Forest Green** - Primary brand color
- **Terracotta** - Secondary accent
- **Gold** - Highlights
- **Earth Tones** - Supporting colors

### Typography
- **Headings** - Playfair Display (serif)
- **Body** - Inter (sans-serif)

## 📊 Admin Dashboard

Access at `/admin` with admin credentials.

### Features
- Real-time statistics
- Product management
- Order tracking
- Inventory monitoring
- Low stock alerts
- Sales analytics

## 🔔 Notifications

### WhatsApp Integration
- Automatic order notifications to admin
- Customer can send order details via WhatsApp
- Direct communication channel

### Email (Optional)
- Order confirmations
- Password resets
- Account verification

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration
- [ ] User login
- [ ] Browse products
- [ ] Add to cart
- [ ] Checkout process
- [ ] Admin login
- [ ] Add product
- [ ] Edit product
- [ ] Delete product
- [ ] Manage inventory
- [ ] View orders

## 📈 Performance

### Optimization
- Image optimization with Next.js Image
- Code splitting
- Lazy loading
- Caching strategies
- CDN delivery

### Lighthouse Scores (Target)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## 🐛 Troubleshooting

### Common Issues

**Build Errors:**
```bash
npm run build
```
Check for TypeScript errors and fix them.

**Database Connection:**
- Verify Supabase URL and keys
- Check RLS policies
- Ensure tables are created

**Image Upload:**
- Verify storage bucket exists
- Check storage policies
- Confirm file size limits

See `TROUBLESHOOTING.md` for more solutions.

## 📚 Documentation

- `SUPABASE-SETUP.md` - Complete Supabase setup guide
- `DEPLOYMENT.md` - Deployment instructions
- `WHATSAPP-ORDER-NOTIFICATIONS.md` - WhatsApp integration guide
- `AUTHENTICATION-ADMIN-SYSTEM.md` - Auth system documentation

## 🤝 Support

### Contact
- **Email**: Idriisakimbgwe@yahoo.com
- **Phone**: +256 753 222 207
- **WhatsApp**: +256 779 905 060

### Business Locations
- Magoba Arcade Shop K-02
- City Mall P3-524
- City Mall P5-795

## 📄 License

This project is proprietary software for Nakasoga Textile Centre.

## 🎯 Roadmap

### Phase 1 (Complete) ✅
- Basic e-commerce functionality
- Admin panel
- Supabase integration
- WhatsApp notifications

### Phase 2 (Future)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Payment gateway integration (Flutterwave/Paystack)
- [ ] Advanced analytics
- [ ] Customer reviews moderation
- [ ] Bulk product import
- [ ] Multi-currency support

### Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] Loyalty program
- [ ] Gift cards
- [ ] Subscription boxes
- [ ] Live chat support

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend platform
- shadcn for the beautiful UI components
- Vercel for hosting platform

---

**Built with ❤️ for Nakasoga Textile Centre**

*Preserving African heritage through quality textiles*
