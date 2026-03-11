import logo from "../assets/CyberDrillLogoNoBg.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("cyberUser");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cyberUser");
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="logo-section flex items-center gap-6">

        {/* Logo + Tagline */}
        <div className="flex flex-col items-center">
          <img src={logo} alt="CyberDrill" className="w-10" />
          <p className="text-xs">Learn, Simulate, Defend</p>
        </div>

      </div>
      <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/dashboard/progress">Progress_Tracker</Link>
          <Link to="/wip">Leaderboard</Link>
        </div>

        <div className="user-profile">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
    </div>
  );
}

export default Navbar;