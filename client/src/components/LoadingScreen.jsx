import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoadingScreen.css";

function LoadingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard"); // redirect after loading
    }, 3300); // 2 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-container">
      <video
        src="/load.mp4"
        autoPlay
        loop
        muted
        className="loading-video"
      />
    </div>
  );
}

export default LoadingScreen;