import React from "react";
import { CartItem } from "../contexts/CartContext";

interface Props {
  open: boolean;
  onClose: () => void;
  item?: {
    id: number;
    title: string;
    price: number;
    image?: string;
    description?: string;
  };
  onAddToCart: (product: Omit<CartItem, "qty">) => void;
}

export const CharacterModal: React.FC<Props> = ({
  open,
  onClose,
  item,
  onAddToCart,
}) => {
  if (!open || !item) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 5000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          width: "min(900px,95%)",
          background: "#0b0b0b",
          borderRadius: 12,
          overflow: "hidden",
          color: "white",
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          <div
            style={{
              flex: "0 0 360px",
              background: "rgba(255,255,255,0.03)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div style={{ padding: 18, flex: 1 }}>
            <h2 style={{ marginTop: 0 }}>{item.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.85)" }}>
              {item.description}
            </p>
            <p style={{ color: "#f0c040", fontWeight: 700 }}>
              {item.price.toLocaleString()} VND
            </p>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <button
                onClick={() =>
                  onAddToCart({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                  })
                }
                style={{
                  background: "#f0c040",
                  border: "none",
                  padding: "10px 14px",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={onClose}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "10px 14px",
                  borderRadius: 8,
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
