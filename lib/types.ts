export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  images: string[];
  colors: Color[];
  sizes: string[];
  material: string;
  care: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
  flashDeal?: boolean;
  pattern?: string;
}

export interface Color {
  name: string;
  hex: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface WishlistItem {
  productId: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  colors: string[];
  materials: string[];
  sizes: string[];
  patterns: string[];
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: CartItem[];
}
