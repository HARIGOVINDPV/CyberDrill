import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import DashboardContent from "./Dpages/DashboardContent";
import Scenarios from "./Dpages/Scenarios";
import ProgressTracker from "./Dpages/ProgressTracker";

import WorkInProgress from "./pages/WorkInProgress";
import News from "./pages/News";

import SpearPhishing from "./pages/SpearPhishing";
import BruteForce from "./pages/BruteForce";

function App() {
  return (
    <Routes>

      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard Layout */}
      <Route path="/dashboard" element={<Dashboard />}>

        <Route index element={<DashboardContent />} />
        <Route path="scenarios" element={<Scenarios />} />
        <Route path="progress" element={<ProgressTracker />} />
        <Route path="leaderboard" element={<WorkInProgress />} />

      </Route>

      {/* Other Pages */}
      <Route path="/news" element={<News />} />

      {/* Attack Simulations */}
      <Route path="/spear-phishing" element={<SpearPhishing />} />
      <Route path="/bruteforce" element={<BruteForce />} />

      {/* WIP */}
      <Route path="/wip" element={<WorkInProgress />} />

    </Routes>
  );
}

export default App;