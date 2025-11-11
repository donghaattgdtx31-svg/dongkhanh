// src/pages/CartPage.tsx
import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";

const CartPage: React.FC = () => {
  const { items, remove, clear, total } = useCart();

  const [isPaying, setIsPaying] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("🛒 Giỏ hàng trống!");
      return;
    }

    setIsPaying(true);

    // Giả lập thanh toán trong 1.5 giây
    setTimeout(() => {
      clear(); // Xóa giỏ hàng sau thanh toán
      setIsPaying(false);
      setShowReview(true); // Mở phần nhận xét
    }, 1500);
  };

  const handleSubmitReview = () => {
    if (!reviewText.trim()) {
      alert("Vui lòng nhập nhận xét trước khi gửi!");
      return;
    }
    setReviewSubmitted(true);
  };

  // === GIAO DIỆN SAU KHI THANH TOÁN XONG (FORM NHẬN XÉT) ===
  if (showReview && !reviewSubmitted) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>💬 Cảm ơn bạn đã mua sản phẩm!</h2>
        <p>Hãy để lại nhận xét của bạn để chúng tôi phục vụ tốt hơn 💖</p>
        <textarea
          placeholder="Nhập nhận xét tại đây..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          style={{
            width: "80%",
            height: "120px",
            marginTop: "20px",
            borderRadius: "10px",
            border: "2px solid #ccc",
            padding: "10px",
            fontSize: "1rem",
          }}
        />
        <br />
        <button
          onClick={handleSubmitReview}
          style={{
            marginTop: "15px",
            backgroundColor: "#0c8",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Gửi nhận xét
        </button>
      </div>
    );
  }

  // === GIAO DIỆN SAU KHI GỬI NHẬN XÉT (CẢM ƠN + GIF) ===
  if (reviewSubmitted) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>🎉 Cảm ơn bạn đã nhận xét! 🎉</h2>
        <p>Love you 😘 — Bạn là người tuyệt vời nhất 💕</p>
        <img
          src="https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif"
          alt="Thank you gif"
          style={{
            width: "250px",
            height: "auto",
            borderRadius: "10px",
            marginTop: "15px",
          }}
        />
        <br />
        <button
          onClick={() => {
            setShowReview(false);
            setReviewSubmitted(false);
            setReviewText("");
          }}
          style={{
            marginTop: "20px",
            backgroundColor: "#2196f3",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Quay lại cửa hàng
        </button>
      </div>
    );
  }

  // === GIAO DIỆN GIỎ HÀNG CHÍNH ===
  if (items.length === 0)
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        🛍️ Giỏ hàng trống 😢
      </p>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Giỏ hàng</h2>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "10px",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
          )}
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>{item.title}</p>
            <p style={{ margin: 0 }}>
              💰 {item.price} VNĐ × {item.qty} ={" "}
              <strong>{item.price * item.qty} VNĐ</strong>
            </p>
            <button
              onClick={() => remove(item.id)}
              style={{
                marginTop: "5px",
                backgroundColor: "crimson",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Xóa
            </button>
          </div>
        </div>
      ))}

      <hr />
      <h3>
        🧾 Tổng cộng: <span>{total.toLocaleString()} VNĐ</span>
      </h3>

      <button
        onClick={handleCheckout}
        disabled={isPaying}
        style={{
          backgroundColor: isPaying ? "gray" : "#0c8",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        {isPaying ? "⏳ Đang thanh toán..." : "Thanh toán"}
      </button>

      <button
        onClick={clear}
        style={{
          backgroundColor: "orange",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Xóa tất cả
      </button>
    </div>
  );
};

export default CartPage;
