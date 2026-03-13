import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/CyberDrillLogoNoBg.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        identifier,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);;
      navigate("/loading");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  from-black via-gray-900 to-black relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl"></div>

      {/* Logo + Title */}
      <div className="flex flex-col items-center mb-6 relative z-10">
        <img src={logo} alt="CyberDrill Logo" className="w-80" />
        <h1 className="text-4xl font-bold text-white">
        </h1>
        <p className="text-cyan-400 mt-2 text-sm tracking-wide">
          Train Against Real-World Cyber Attacks
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-gray-900/70 backdrop-blur-md p-8 rounded-xl border border-cyan-500/20 shadow-2xl w-[400px] relative z-10">

        <h2 className="text-xl font-semibold text-center text-white mb-6">
          Login to Your Account
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            name="identifier"
            placeholder="Username"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm hover:text-cyan-300"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 transition duration-300 rounded-lg font-semibold text-black"
          >
            Login
          </button>

        </div>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline">
            Sign Up
          </Link>
        </p>

        <p className="text-xs text-gray-500 mt-4 text-center">
          🛡️ All simulations are safe and run in a controlled environment.
        </p>

      </div>
    </div>
  );
}

export default Login;