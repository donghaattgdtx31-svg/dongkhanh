import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { IntroScreen } from "../components/IntroScreen";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const { items, total, remove, clear } = useCart();
  const [processing, setProcessing] = useState(false);
  const [introImg, setIntroImg] = useState<string | undefined>(undefined);
  const [showIntro, setShowIntro] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setProcessing(true);
    // giả lập thanh toán
    const firstItem = items[0];
    setIntroImg(firstItem.image);
    setShowIntro(true);
    // xóa giỏ hàng sau khi intro xong
    setTimeout(() => {
      clear();
      setShowIntro(false);
      setProcessing(false);
      navigate("/buon-hang"); // quay về danh sách
    }, 2400);
  };

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 900,
        margin: "30px auto",
        color: "white",
      }}
    >
      <h2>Giỏ hàng</h2>
      {items.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <div>
          {items.map((it) => (
            <div
              key={it.id}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                marginBottom: 12,
                background: "rgba(255,255,255,0.02)",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <img
                src={it.image}
                alt={it.title}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "contain",
                  borderRadius: 8,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{it.title}</div>
                <div>
                  {it.qty} × {it.price.toLocaleString()} VND
                </div>
              </div>
              <div>
                <button
                  onClick={() => remove(it.id)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                    padding: "6px 10px",
                    borderRadius: 6,
                  }}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
          <div
            style={{
              marginTop: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <strong>Tổng: {total.toLocaleString()} VND</strong>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => clear()}
                style={{
                  padding: "8px 12px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                  borderRadius: 8,
                }}
              >
                Xóa hết
              </button>
              <button
                onClick={handleCheckout}
                disabled={processing}
                style={{
                  padding: "8px 12px",
                  background: "#f0c040",
                  border: "none",
                  borderRadius: 8,
                }}
              >
                {processing ? "Đang xử lý..." : "Thanh toán"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showIntro && (
        <IntroScreen
          image={introImg}
          onDone={() => {
            /* handled by timer */
          }}
        />
      )}
    </div>
  );
};

export default CartPage;
