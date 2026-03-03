import { useNavigate } from "react-router-dom";

function DashboardContent() {
  const navigate = useNavigate();
  return (
    <div className="content">

      <h1>Welcome to Cyber<span className="text-cyan-400">Drill!</span></h1>
      <p className="subtitle">
        Simulated Cyber Attack Training and Defense
      </p>

      <div className="card-grid py-4 ">

        <div className="card">
          <h3>First Attack</h3>
          <p>Spear Phishing Attack</p>
          <button
            onClick={() => navigate("/spear-phishing")}
            className="mt-10 px-4 py-2 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
          >
            Start
          </button>
        </div>

        <div className="card">
          <h2>Tips & Guidance</h2>
          <h5>Enhance your cyber defence skills.</h5>
          <button className="mt-10 px-4 py-0 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition">Get Guidance</button>
        </div>

      </div>

      <hr className="section-divider" />
      <div className="challenges card-grid">
        <h2>Latest Challenges</h2>
      </div>
      <div className="card-grid rows ">
        <div className="card">
          <h3>Fake Updates Malware</h3>
          <button className="mt-10 px-4 py-0 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
          >Start Challenge</button>
        </div>
        <div className="card">
          <h3>Firewall Bypass</h3>
          <button className="mt-10 px-4 py-0 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
          >Start Challenge</button>
        </div>

      </div>
      <div classname="py-4">
        <button
          className="mt-4 px-4 py-0 bg-cyan-950 item-center text-black font-semibold rounded hover:bg-cyan-400 transition"
        >
          View All Challenges
        </button>
      </div>
      <hr className=" section-divider" />
      <div className="challenges card-grid">
        <h2></h2>
      </div>
            
      <div className="challenges card-grid">
        <h2>Security News & Updates</h2>
      </div>
      <div className="card-grid-rows-2 py-4">
        <div className="card">
          <h3>LAtest Phishing Tactics Targeting Companies</h3>
        </div>

        <div className="card">
          <h3>Zero-Day Exploit Found in Popular Software App</h3>
        </div>

      </div>
      <div>
        <button
          className="mt-4 px-4 py-0 bg-cyan-950 items-center text-black font-semibold rounded hover:bg-cyan-400 transition"
        >
          Read More
        </button>
      </div>
      <hr className=" section-divider" />
      <div className="challenges card-grid">
        <h2>Recommended Courses</h2>
      </div>
      <div className="card-grid rows">
        <div className="card">
          <h3>Introduction to Cybersecurity</h3>
          <button className="mt-10 px-4 py-0 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
          >Start Course</button>
        </div>
        <div className="card">
          <h3>Web Application Security</h3>
          <button className="mt-10 px-4 py-0 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
          >Start Course</button>
        </div>

      </div>
      <div>
        <button
          className="mt-4 px-4 py-0 bg-cyan-950 item-center text-black font-semibold rounded hover:bg-cyan-400 transition"
        >
          View All Courses
        </button>
      </div>
    </div>
    
  );
}

export default DashboardContent;