# Nakasoga Textile Centre - E-Commerce Website

A modern, production-ready e-commerce website for Nakasoga Textile Centre - premium East African textiles and fashion, built with Next.js 15.

## Features

- **Modern Design**: Clean, minimalist African aesthetic with rich colors and generous whitespace
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **Complete E-Commerce**: Product catalog, cart, checkout, and order management
- **Smart Filtering**: Advanced product filtering by category, price, color, and more
- **Wishlist**: Save favorite items for later
- **Persistent Cart**: Cart data saved in localStorage
- **Image Optimization**: Fast loading with Next.js Image component
- **SEO Optimized**: Proper metadata and Open Graph tags
- **Smooth Animations**: Beautiful transitions and hover effects

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI primitives
- **State Management**: Zustand with persistence
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or extract the files

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
nakasoga-textiles/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── about/             # About page
│   ├── account/           # User account
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── contact/           # Contact page
│   ├── faq/               # FAQ page
│   ├── products/[slug]/   # Product detail pages
│   ├── shop/              # Shop/catalog page
│   ├── shipping-returns/  # Shipping & returns policy
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── cart/             # Cart components
│   ├── checkout/         # Checkout components
│   ├── home/             # Homepage sections
│   ├── layout/           # Header, footer, navigation
│   ├── products/         # Product components
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and data
│   ├── data/            # Product data
│   ├── store/           # Zustand stores
│   ├── types.ts         # TypeScript types
│   ├── utils.ts         # Utility functions
│   └── validations.ts   # Form schemas
└── public/              # Static assets
```

## Key Pages

- **Homepage** (`/`): Hero banner, featured categories, flash deals, best sellers
- **Shop** (`/shop`): Product catalog with filtering and sorting
- **Product Detail** (`/products/[slug]`): Detailed product view with variants
- **Cart** (`/cart`): Shopping cart with quantity management
- **Checkout** (`/checkout`): Multi-step checkout process
- **Account** (`/account`): Order history, wishlist, profile
- **About** (`/about`): Company information
- **Contact** (`/contact`): Contact form and information
- **FAQ** (`/faq`): Frequently asked questions
- **Shipping & Returns** (`/shipping-returns`): Policies

## Product Data

The site includes 20 sample products across 4 categories:
- Traditional Fabrics (Ankara, Kitenge, Barkcloth)
- Ready-to-Wear (Dresses, Shirts, Suits)
- Home Textiles (Bedding, Curtains, Pillows)
- Accessories (Bags, Scarves, Jewelry)

Products are stored in `lib/data/products.ts` and can be easily replaced with a real backend API.

## Customization

### Colors

Brand colors are defined in `tailwind.config.ts`:
- Earth tones (browns, beiges)
- Terracotta (warm oranges)
- Gold (yellows)
- Forest (greens)

### Fonts

- Primary: Inter (sans-serif)
- Headings: Playfair Display (serif)

### Images

Currently using Unsplash placeholder images. Replace with your own product images in the `products.ts` file.

## Building for Production

```bash
npm run build
npm start
```

## Deployment

This project can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting platform

## Future Enhancements

- Connect to real backend API (Supabase, Firebase, etc.)
- Add user authentication
- Implement real payment processing
- Add product reviews and ratings
- Email notifications
- Admin dashboard
- Multi-language support
- Advanced search with autocomplete

## License

This project is provided as-is for educational and commercial use.

## Contact Information

**Nakasoga Textile Centre**

**Locations:**
- Magoba Arcade - Shop K-02
- City Mall - Shop P3-524
- City Mall - Shop P5-795

**Contact:**
- Email: Idriisakimbgwe@yahoo.com
- Phone: +256 753 222 207
- Phone: +256 779 905 060

---

Built with ❤️ for Nakasoga Textile Centre
