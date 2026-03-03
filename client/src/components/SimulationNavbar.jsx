import { useNavigate } from "react-router-dom";
import "./SimulationNavbar.css";

function SimulationNavbar() {
  const navigate = useNavigate();

  return (
    <div className="sim-navbar">
      
      {/* Logo Section */}
      <div className="sim-logo">
        <img src="/logo.png" alt="CyberDrill Logo" />
        <span>CyberDrill</span>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="back-btn"
      >
        ← Back to Dashboard
      </button>

    </div>
  );
}

export default SimulationNavbar;