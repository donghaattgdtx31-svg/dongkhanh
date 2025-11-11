import React, { useEffect, useState } from "react";
import { productClient } from "../supabase/productClient";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

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

const ProductListPackage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await productClient
        .from("product1")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url('https://uploadstatic-sea.mihoyo.com/contentweb/20210507/2021050710422362610.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            padding: "30px 50px",
            borderRadius: "20px",
            color: "white",
            fontSize: "24px",
          }}
        >
          ⏳ Đang tải dữ liệu...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        backgroundImage: `url('https://uploadstatic-sea.mihoyo.com/contentweb/20210507/2021050710422362610.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "28px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
        }}
      >
        🌸 Danh sách nhân vật Genshin Impact 🌸
      </h2>

      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <input
          type="text"
          placeholder="🔍 Tìm nhân vật bạn yêu thích..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "12px 20px",
            width: "60%",
            maxWidth: "500px",
            borderRadius: "25px",
            border: "none",
            outline: "none",
            fontSize: "16px",
            backgroundColor: "rgba(255,255,255,0.9)",
            color: "#333",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          }}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "50px",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: "20px",
            margin: "0 auto",
            maxWidth: "500px",
          }}
        >
          <p style={{ fontSize: "20px" }}>
            😢 Không tìm thấy nhân vật nào!
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                borderRadius: "16px",
                padding: "15px",
                textAlign: "center",
                cursor: "pointer",
                transition: "transform 0.3s, background 0.3s",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.background = "rgba(255,255,255,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{
                  height: "180px",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginBottom: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                }}
              />
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  marginBottom: "8px",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                }}
              >
                {p.title}
              </h4>
              <p
                style={{
                  margin: "5px 0",
                  color: "#FFD700",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {p.price} Mora
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/cart?add=${p.id}`);
                }}
                style={{
                  backgroundColor: "#FFD700",
                  color: "#000",
                  border: "none",
                  borderRadius: "10px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  marginTop: "8px",
                  transition: "all 0.3s",
                  fontWeight: "bold",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffcc00";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFD700";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                🛒 Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListPackage;