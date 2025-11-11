import React, { useEffect } from "react";

interface Props {
  image?: string;
  onDone: () => void;
}

export const IntroScreen: React.FC<Props> = ({ image, onDone }) => {
  useEffect(() => {
    const t = setTimeout(() => onDone(), 2200); // 2.2s intro
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at center, rgba(0,0,0,0.6), rgba(0,0,0,0.95))",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "white",
          animation: "pop .6s ease",
        }}
      >
        <img
          src={image}
          alt="intro"
          style={{
            width: 320,
            height: "auto",
            borderRadius: 16,
            boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
          }}
        />
        <h2 style={{ marginTop: 18 }}>Mua thành công!</h2>
      </div>
    </div>
  );
};
