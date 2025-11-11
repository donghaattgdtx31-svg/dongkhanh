import React from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div
      style={{ margin: "16px 0", display: "flex", justifyContent: "center" }}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tìm nhân vật bạn yêu thích..."
        style={{
          width: "90%",
          maxWidth: 800,
          padding: "12px 16px",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(0,0,0,0.4)",
          color: "white",
          outline: "none",
        }}
      />
    </div>
  );
};
