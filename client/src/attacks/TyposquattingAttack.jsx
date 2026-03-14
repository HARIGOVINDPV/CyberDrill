import SimulationNavbar from "../components/SimulationNavbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TyposquattingAttack() {
  const navigate = useNavigate();
  const [view, setView] = useState("scenario");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const handleLogin = () => {
    setResult("stolen");
    setView("result");
  };

  const handleCheckURL = () => {
    setResult("url");
    setView("result");
  };

  const handleInspectSecurity = () => {
    setResult("security");
    setView("result");
  };

  const handleLeave = () => {
    setResult("leave");
    setView("result");
  };

  const completeAttack = async () => {

  const userId = localStorage.getItem("userId");

  await axios.post("http://localhost:5000/api/completeAttack",{
      userId: userId,
      attackId: 34
  });

  navigate("/dashboard");

};

  return (
    <>
    <SimulationNavbar />
    <div className="min-h-screen text-white flex items-center justify-center">

      {/* SCENARIO SCREEN */}

      {view === "scenario" && (
        <div className="bg-gray-900 p-8 rounded-lg w-[600px] border border-gray-700">

          <h1 className="text-2xl font-bold mb-4">
            Fake Website – Typosquatting Attack
          </h1>

          <p className="text-gray-300 mb-4">
            You are trying to log into your Facebook account.
          </p>

          <p className="text-gray-300 mb-4">
            You typed the website address into your browser and opened:
          </p>

          <div className="bg-black border border-red-500 p-3 mb-6 text-red-400">
            https://www.faceb00k-login.com
          </div>

          <p className="text-gray-400 mb-6">
            The page looks identical to the real Facebook login page.
          </p>

          <button
            onClick={() => setView("simulation")}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded text-black font-semibold"
          >
            Open Website
          </button>

        </div>
      )}

      {/* FAKE WEBSITE SIMULATION */}

      {view === "simulation" && (
        <div className="w-[700px]">

          {/* Browser Bar */}

          <div className="bg-gray-800 p-2 text-sm text-gray-300 rounded-t">
            🔒 https://www.faceb00k-login.com
          </div>

          {/* Fake Website */}

          <div className="bg-white text-black p-8 rounded-b">

            <h2 className="text-2xl font-bold mb-6 text-center">
              Facebook Login
            </h2>

            <input
              type="text"
              placeholder="Email or Phone"
              className="w-full border p-2 mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 mb-4"
            >
              Log In
            </button>

            {/* User choices */}

            <div className="flex justify-between mt-4">

              <button
                onClick={handleCheckURL}
                className="bg-gray-600 px-4 py-2 text-black rounded"
              >
                Check URL
              </button>

              <button
                onClick={handleInspectSecurity}
                className="bg-gray-600 px-4 py-2 rounded"
              >
                Inspect Security
              </button>

              <button
                onClick={handleLeave}
                className="bg-gray-600 px-4 py-2 rounded"
              >
                Leave Website
              </button>

            </div>

          </div>

        </div>
      )}

      {/* RESULT SCREEN */}

      {view === "result" && (

        <div className="bg-gray-900 p-8 rounded-lg w-[600px] border border-gray-700">

          {result === "stolen" && (
  <>
    <h2 className="text-red-500 text-xl font-bold mb-4">
      ⚠ Credentials Captured
    </h2>

    <p className="text-gray-300 mb-4">
      You entered your credentials into a fake login page.
    </p>

    <div className="bg-black border border-red-500 p-4 mb-4">
      <p className="text-red-400 font-semibold">Captured Credentials</p>

      <p className="text-gray-300 mt-2">
        Username / Email: <span className="text-white">{email}</span>
      </p>

      <p className="text-gray-300">
        Password: <span className="text-white">{password}</span>
      </p>
    </div>

    <p className="text-gray-400">
      The domain <span className="text-red-400">faceb00k-login.com</span> is a
      typosquatting domain designed to steal user credentials.
    </p>
  </>
)}

          {result === "url" && (
            <>
              <h2 className="text-green-400 text-xl font-bold mb-4">
                Suspicious Domain Detected
              </h2>

              <p className="text-gray-300">
                The domain contains a typo.
              </p>

              <div className="bg-black p-3 border border-red-500 mt-4">
                faceb00k-login.com
              </div>

              <p className="text-gray-400 mt-4">
                The number <b>0</b> replaces the letter <b>o</b>.
              </p>
              <button
                onClick={completeAttack}
                className="mt-6 bg-cyan-500 px-6 py-2 text-black rounded"
              >
                Complete Attack
              </button>
            </>
          )}

          {result === "security" && (
            <>
              <h2 className="text-yellow-400 text-xl font-bold mb-4">
                Security Inspection
              </h2>

              <p className="text-gray-300">
                SSL Certificate: Valid
              </p>

              <p className="text-gray-300">
                Domain Registered: 3 days ago
              </p>

              <p className="text-gray-400 mt-4">
                Attackers can obtain valid SSL certificates for fake websites.
              </p>
            </>
          )}

          {result === "leave" && (
            <>
              <h2 className="text-green-400 text-xl font-bold mb-4">
                Safe Action
              </h2>

              <p className="text-gray-300">
                You left the suspicious website before entering credentials.
              </p>
              <button
                onClick={completeAttack}
                className="mt-6 bg-cyan-500 px-6 py-2 text-black rounded"
              >
                Complete Attack
              </button>
            </>
          )}

          <button
            onClick={() => setView("scenario")}
            className="mt-6 bg-cyan-500 px-6 py-2 text-black rounded"
          >
            Restart Simulation
          </button>

        </div>

      )}

    </div>
    </>
  );
}

export default TyposquattingAttack;