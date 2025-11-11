import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ========================
// ⚙️ Cấu hình Supabase Products
// ========================
const SUPABASE_URL = "https://eoemighznlwbhrlitfre.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvZW1pZ2h6bmx3YmhybGl0ZnJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MjIwMjQsImV4cCI6MjA3Mjk5ODAyNH0.chISl1iWUEsMGSGBIVKq_EyiRm6vjTb_nH1Dt7whvns";

export const productClient: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ========================
// 🧩 Kiểu dữ liệu sản phẩm
// ========================
export interface Product {
  id?: number;
  title: string;
  price: number;
  image?: string;
  description?: string;
  category?: string;
  rating_rate?: number;
  rating_count?: number;
  created_at?: string;
}

// ========================
// 📦 Các hàm thao tác dữ liệu
// ========================

// 🔹 Lấy danh sách sản phẩm
export const getProducts = async () => {
  const { data, error } = await productClient.from("product1").select("*");
  if (error) console.error("❌ Lỗi lấy sản phẩm:", error.message);
  return data ?? [];
};

// 🔹 Thêm sản phẩm mới
export const addProduct = async (product: Product) => {
  const { data, error } = await productClient
    .from("product1")
    .insert([product])
    .select();
  if (error) console.error("❌ Lỗi thêm sản phẩm:", error.message);
  return data ?? [];
};

// 🔹 Cập nhật sản phẩm
export const updateProduct = async (id: number, product: Partial<Product>) => {
  const { data, error } = await productClient
    .from("product1")
    .update(product)
    .eq("id", id)
    .select();
  if (error) console.error("❌ Lỗi cập nhật sản phẩm:", error.message);
  return data ?? [];
};

// 🔹 Xóa sản phẩm
export const deleteProduct = async (id: number) => {
  const { data, error } = await productClient
    .from("product1")
    .delete()
    .eq("id", id);
  if (error) console.error("❌ Lỗi xóa sản phẩm:", error.message);
  return data ?? [];
};
