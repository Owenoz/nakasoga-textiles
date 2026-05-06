import { ensureSupabase } from './client';
import { Database } from './database.types';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

// Get all products
export async function getAllProducts() {
  const supabase = ensureSupabase();
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Get product by ID
export async function getProductById(id: string) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Get product by slug
export async function getProductBySlug(slug: string) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

// Get products by category
export async function getProductsByCategory(category: string) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Get featured products
export async function getFeaturedProducts() {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(8);

  if (error) throw error;
  return data;
}

// Get trending products
export async function getTrendingProducts() {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('trending', true)
    .limit(8);

  if (error) throw error;
  return data;
}

// Get new arrivals
export async function getNewArrivals() {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('new_arrival', true)
    .order('created_at', { ascending: false })
    .limit(8);

  if (error) throw error;
  return data;
}

// Get flash deals
export async function getFlashDeals() {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('flash_deal', true)
    .limit(8);

  if (error) throw error;
  return data;
}

// Search products
export async function searchProducts(query: string) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Create product (admin only)
export async function createProduct(product: ProductInsert) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Update product (admin only)
export async function updateProduct(id: string, updates: ProductUpdate) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Delete product (admin only)
export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

// Upload product image to Supabase Storage
export async function uploadProductImage(file: File, productId: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${productId}-${Date.now()}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const supabase = ensureSupabase();
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return publicUrl;
}

// Delete product image from Supabase Storage
export async function deleteProductImage(imageUrl: string) {
  // Extract file path from URL
  const urlParts = imageUrl.split('/product-images/');
  if (urlParts.length < 2) return;
  
  const filePath = urlParts[1];

  const { error } = await supabase.storage
    .from('product-images')
    .remove([filePath]);

  if (error) throw error;
  return true;
}
