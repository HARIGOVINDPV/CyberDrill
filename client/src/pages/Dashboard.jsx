import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

import "./dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">

      <Navbar />

      <div className="dashboard-body">
        <Sidebar />

        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-800 text-gray-500">
        <p>designed & powered by</p>
        <h3 className="text-3xl font-bold mb-6">CyberFox</h3>
      </footer>

    </div>
  );
}

export default Dashboard;