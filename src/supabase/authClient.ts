// src/supabase/authClient.ts
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://axdbcqpwejcxvvisscjm.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4ZGJjcXB3ZWpjeHZ2aXNzY2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NjIwNTYsImV4cCI6MjA3ODIzODA1Nn0.OXDfGsVn_10_cADPGPPlUY6ttVLefIh4zzqa9rbLCKg";

export const authClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Login
export const loginUser = async (email: string, password: string) => {
  const { data, error } = await authClient.auth.signInWithPassword({ email, password });
  return { data, error };
};

// Register + tạo profile
export const registerUser = async (
  email: string,
  password: string,
  username: string,
  avatar_url?: string
) => {
  const { data, error } = await authClient.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: window.location.origin },
  });

  if (error) return { data: null, error };

  if (data.user) {
    const { error: profileError } = await authClient
      .from("profiles")
      .insert([{ id: data.user.id, username, avatar_url }]);
    if (profileError) return { data: null, error: profileError };
  }

  // Đăng nhập luôn sau khi đăng ký
  return loginUser(email, password);
};

// Lấy profile hiện tại
export const getUserProfile = async () => {
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return null;

  const { data, error } = await authClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) return null;
  return data; // { id, username, avatar_url }
};

// Logout
export const logoutUser = async () => {
  const { error } = await authClient.auth.signOut();
  return { error };
};
