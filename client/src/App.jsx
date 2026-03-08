import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import SpearPhishing from "./pages/SpearPhishing";
import BruteForce from "./pages/BruteForce";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/news" element={<News />} />
      <Route path="/spear-phishing" element={<SpearPhishing />} />
      <Route path="/bruteforce" element={<BruteForce />} />
o
    </Routes>
  );
}

export default App;