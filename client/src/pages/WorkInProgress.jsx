import { Link } from "react-router-dom";
import logo from "../assets/CyberDrillLogoNoBg.png";

function WorkInProgress() {
  return (
    <div style={{
      height: "100vh",
      backgroundColor: "#061622",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center"
    }}>
        <img src={logo} alt="CyberDrill Logo" className="w-60" />
      
      <h1 style={{fontSize:"40px"}}>🚧 Work In Progress</h1>

      <p style={{marginTop:"10px", fontSize:"18px"}}>
        This section is currently under development.
      </p>

      <p style={{marginTop:"5px", color:"#94a3b8"}}>
        Please check back later.
      </p>

      <Link to="/dashboard">
        <button style={{
          marginTop:"20px",
          padding:"10px 20px",
          border:"none",
          background:"#06b6d4",
          color:"white",
          cursor:"pointer",
          borderRadius:"5px"
        }}>
          Back to Dashboard
        </button>
      </Link>

    </div>
  );
}

export default WorkInProgress;