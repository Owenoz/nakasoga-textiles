import { ensureSupabase } from "./client";
// import { supabase } from './client';
import { Database } from './database.types';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderInsert = Database['public']['Tables']['orders']['Insert'];
type OrderUpdate = Database['public']['Tables']['orders']['Update'];

// Create order
export async function createOrder(order: OrderInsert) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Get all orders (admin only)
export async function getAllOrders() {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Get order by ID
export async function getOrderById(id: string) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Get order by order number
export async function getOrderByNumber(orderNumber: string) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('order_number', orderNumber)
    .single();

  if (error) throw error;
  return data;
}

// Get orders by user ID
export async function getOrdersByUserId(userId: string) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Get orders by status
export async function getOrdersByStatus(status: string) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Update order status (admin only)
export async function updateOrderStatus(id: string, status: string) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Update order (admin only)
export async function updateOrder(id: string, updates: OrderUpdate) {
  const supabase = ensureSupabase();
  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Get order statistics (admin only)
export async function getOrderStatistics() {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('status, total');

  if (error) throw error;

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
    revenue: orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + Number(o.total), 0),
  };

  return stats;
}
