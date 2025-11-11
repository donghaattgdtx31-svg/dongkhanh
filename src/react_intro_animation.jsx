import { useEffect, useState } from "react";
import introImage from "./intro.jpg"; // đặt ảnh 1 của bạn vào thư mục src và đổi tên

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3500); // thời gian intro
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      {showIntro ? (
        <div className="intro flex items-center justify-center w-full h-full animate-fade">
          <img
            src={introImage}
            alt="intro"
            className="w-full h-full object-cover animate-zoom"
          />
        </div>
      ) : (
        <div className="login flex items-center justify-center h-full text-white text-3xl">
          Đây là phần đăng nhập
        </div>
      )}

      <style>{`
        .animate-fade {
          animation: fadeOut 3.5s forwards;
        }
        .animate-zoom {
          animation: zoomIn 3.5s ease-out forwards;
        }
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes zoomIn {
          0% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
