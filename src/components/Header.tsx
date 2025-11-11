import React from "react";

const Header: React.FC = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#1e1e1e",
        color: "#fff",
      }}
    >
      {/* Logo + tên trang */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="/logo192.png" // nếu bạn có logo khác thì đổi tại đây
          alt="Logo"
          style={{ height: "40px", width: "40px" }}
        />
        <h2 style={{ margin: 0 }}>Genshin Product Shop</h2>
      </div>

      {/* Các liên kết điều hướng */}
      <nav style={{ display: "flex", gap: "20px" }}>
        <a
          href="/"
          style={{
            textDecoration: "none",
            color: "#fff",
            fontWeight: 500,
          }}
        >
          Trang chủ nội bộ
        </a>

        <a
          href="https://genshin.hoyoverse.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "#FFD700",
            fontWeight: 600,
          }}
        >
          Trang chủ Genshin Impact 🌐
        </a>
      </nav>
    </header>
  );
};

export default Header;
