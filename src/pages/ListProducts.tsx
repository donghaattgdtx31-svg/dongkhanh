import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // đảm bảo file này export đúng Supabase client

// Khai báo kiểu dữ liệu cho sản phẩm
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating_rate: number;
  rating_count: number;
}

const ListProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // ❌ KHÔNG dùng .from<Product>()
        // ✅ Dùng .from("product1") thôi
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;

        // ép kiểu thủ công cho an toàn
        setProducts((data as Product[]) || []);
      } catch (err: any) {
        console.error("Lỗi khi lấy sản phẩm:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p style={{ color: "red" }}>Lỗi: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách sản phẩm</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/sanpham/${p.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              backgroundColor: "#fff",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "scale(1.03)";
              el.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.transform = "scale(1)";
              el.style.boxShadow = "none";
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{
                height: "180px",
                width: "100%",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />
            <h4 style={{ marginBottom: "5px" }}>{p.title}</h4>
            <p style={{ margin: "0", color: "#333", fontWeight: "bold" }}>
              {p.price} Mora
            </p>
            <small style={{ color: "#777" }}>
              ⭐ {p.rating_rate} | ({p.rating_count} đánh giá)
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts;
