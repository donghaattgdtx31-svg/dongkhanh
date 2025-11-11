// src/components/CharacterCard.tsx
import React from "react";

interface Props {
  id: number;
  title: string;
  price: number;
  image?: string;
  description?: string;
  onOpen: () => void;
}

export const CharacterCard: React.FC<Props> = ({
  id,
  title,
  price,
  image,
  description,
  onOpen,
}) => {
  return (
    <div
      className="char-card"
      style={{
        cursor: "pointer",
        borderRadius: 12,
        overflow: "hidden",
        background: "#1a1a1a",
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "transform 0.15s, box-shadow 0.15s",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
      onClick={onOpen}
    >
      {image && (
        <div
          style={{
            width: "100%",
            height: 180,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.25)",
            overflow: "hidden",
            borderRadius: 8,
          }}
        >
          <img
            src={image}
            alt={title}
            style={{ maxHeight: "100%", width: "auto", objectFit: "contain" }}
          />
        </div>
      )}

      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 6 }}>
        <h4 style={{ margin: 0, color: "#f0c040" }}>{title}</h4>

        {description && (
          <p
            style={{
              fontSize: 12,
              color: "#ccc",
              margin: 0,
              height: 36,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description}
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <strong style={{ color: "#f0c040" }}>{price.toLocaleString()} VND</strong>

          <button
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "none",
              background: "#f0c040",
              cursor: "pointer",
              fontWeight: 600,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};
