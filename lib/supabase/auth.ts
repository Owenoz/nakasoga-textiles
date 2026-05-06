import { supabase, isSupabaseConfigured } from './client';

// Sign up new user
export async function signUp(email: string, password: string, fullName: string) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  // Create user profile
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        role: 'customer',
      });

    if (profileError) throw profileError;
  }

  return authData;
}

// Sign in user
export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

// Sign out user
export async function signOut() {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get current user
export async function getCurrentUser() {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

// Get user profile
export async function getUserProfile(userId: string) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

// Update user profile
export async function updateUserProfile(userId: string, updates: {
  full_name?: string;
  phone?: string;
  avatar_url?: string;
}) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Check if user is admin
export async function isAdmin(userId: string) {
  if (!supabase) return false;
  
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) return false;
  return data.role === 'admin';
}

// Reset password
export async function resetPassword(email: string) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/reset-password`,
  });

  if (error) throw error;
}

// Update password
export async function updatePassword(newPassword: string) {
  if (!supabase) throw new Error('Supabase not configured');
  
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
}
