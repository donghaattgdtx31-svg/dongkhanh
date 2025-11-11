import { useEffect, useState } from "react";
import introImage from "./assets/images/newicon_en.gif";
import Login from "./login";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showIntro ? (
        <div className="intro-container">
          <img src={introImage} alt="intro" className="intro-bg" />
          <div className="logo fade-in">YOUR LOGO</div>
          <div className="light-effect"></div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
