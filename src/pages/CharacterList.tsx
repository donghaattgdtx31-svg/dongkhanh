// src/pages/CharacterList.tsx
import React, { useEffect, useMemo, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { CharacterCard } from "../components/CharacterCard";
import { CharacterModal } from "../components/CharacterModal";
import { useCart } from "../contexts/CartContext";
import { supabase } from "../supabaseClient";
import "../assets/css/character-list.css";
import { useNavigate } from "react-router-dom";

interface ProductRow {
  id: number;
  title: string;
  price: number;
  description?: string;
  image?: string;
}

// Fallback mock data
const mock: ProductRow[] = [
  {
    id: 1,
    title: "Zhongli",
    price: 1500000,
    description: "Geo Archon",
    image:
      "https://static.wikia.nocookie.net/gensin-impact/images/f/f6/Character_Zhongli_Card.png",
  },
  {
    id: 2,
    title: "Raiden Shogun",
    price: 1600000,
    description: "Electro Archon",
    image:
      "https://static.wikia.nocookie.net/gensin-impact/images/3/3d/Character_Raiden_Shogun_Card.png",
  },
  {
    id: 3,
    title: "Nahida",
    price: 1400000,
    description: "Dendro Archon",
    image:
      "https://static.wikia.nocookie.net/gensin-impact/images/5/5e/Character_Nahida_Card.png",
  },
];

export default function CharacterList() {
  const [q, setQ] = useState("");
  const [list, setList] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ProductRow | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const cart = useCart();
  const navigate = useNavigate();

  // Kiểm tra login, nếu chưa -> redirect
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  // Lấy dữ liệu sản phẩm
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .order("id", { ascending: true });

        if (error || !data) {
          setList(mock);
        } else {
          const mapped = data.map((r: any) => ({
            id: r.id,
            title: r.title,
            price: Number(r.price) || 0,
            description: r.description || "",
            image: r.image || "",
          }));
          setList(mapped);
        }
      } catch {
        setList(mock);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return list;
    return list.filter((p) => p.title.toLowerCase().includes(t));
  }, [list, q]);

  const open = (p: ProductRow) => {
    setSelected(p);
    setModalOpen(true);
  };

  const handleAdd = (product: Omit<ProductRow, "qty">) => {
    cart.add(product);
    setModalOpen(false);
  };

  if (loading)
    return <div style={{ padding: 40, color: "white" }}>Đang tải...</div>;

  return (
    <div className="char-page">
      <div className="char-bg" />
      <div className="char-content">
        <SearchBar value={q} onChange={setQ} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <button
            onClick={() => navigate("/cart")}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              background: "#f0c040",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Đi tới giỏ hàng ({cart.items.length})
          </button>
        </div>
        <div className="grid">
          {filtered.map((p) => (
            <CharacterCard
              key={p.id}
              id={p.id}
              title={p.title}
              price={p.price}
              image={p.image}
              description={p.description}
              onOpen={() => open(p)}
            />
          ))}
        </div>
      </div>

      <CharacterModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selected}
        onAddToCart={handleAdd}
      />
    </div>
  );
}
