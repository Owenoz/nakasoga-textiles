import { ensureSupabase } from "./client";
// import { supabase } from './client';
import { Database } from './database.types';

type Inventory = Database['public']['Tables']['inventory']['Row'];
type InventoryInsert = Database['public']['Tables']['inventory']['Insert'];
type InventoryUpdate = Database['public']['Tables']['inventory']['Update'];

// Get all inventory
export async function getAllInventory() {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('inventory')
    .select(`
      *,
      products (
        id,
        name,
        category,
        price,
        images
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Get inventory by product ID
export async function getInventoryByProductId(productId: string) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .eq('product_id', productId)
    .single();

  if (error) throw error;
  return data;
}

// Get low stock items
export async function getLowStockItems() {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('inventory')
    .select(`
      *,
      products (
        id,
        name,
        category,
        price,
        images
      )
    `)
    .filter('quantity', 'lte', 'low_stock_threshold');

  if (error) throw error;
  return data;
}

// Create inventory entry
export async function createInventory(inventory: InventoryInsert) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('inventory')
    .insert(inventory)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Update inventory
export async function updateInventory(productId: string, updates: InventoryUpdate) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('inventory')
    .update(updates)
    .eq('product_id', productId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Update stock quantity
export async function updateStockQuantity(productId: string, quantity: number) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('inventory')
    .update({ quantity })
    .eq('product_id', productId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Decrease stock (when order is placed)
export async function decreaseStock(productId: string, amount: number) {
  // Get current quantity
  const { data: current, error: fetchError } = await supabase
    .from('inventory')
    .select('quantity')
    .eq('product_id', productId)
    .single();

  if (fetchError) throw fetchError;

  const newQuantity = Math.max(0, current.quantity - amount);

  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('inventory')
    .update({ quantity: newQuantity })
    .eq('product_id', productId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Increase stock (when restocking)
export async function increaseStock(productId: string, amount: number) {
  // Get current quantity
  const { data: current, error: fetchError } = await supabase
    .from('inventory')
    .select('quantity')
    .eq('product_id', productId)
    .single();

  if (fetchError) throw fetchError;

  const newQuantity = current.quantity + amount;

  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('inventory')
    .update({ quantity: newQuantity })
    .eq('product_id', productId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Get inventory statistics
export async function getInventoryStatistics() {
  const { data: inventory, error } = await supabase
    .from('inventory')
    .select(`
      *,
      products (
        price
      )
    `);

  if (error) throw error;

  const stats = {
    totalProducts: inventory.length,
    lowStockItems: inventory.filter((item) => item.quantity <= item.low_stock_threshold).length,
    outOfStock: inventory.filter((item) => item.quantity === 0).length,
    totalValue: inventory.reduce((sum, item) => {
      const price = (item.products as any)?.price || 0;
      return sum + (item.quantity * price);
    }, 0),
  };

  return stats;
}
