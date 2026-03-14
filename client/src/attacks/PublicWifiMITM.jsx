import SimulationNavbar from "../components/SimulationNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function PublicWifiMITM() {
  const navigate = useNavigate();
  const [step, setStep] = useState("scenario");
  const [result, setResult] = useState("");

  const handleConnect = () => {
    setStep("result");
    setResult("intercepted");
  };

  const handleVPN = () => {
    setStep("result");
    setResult("vpn");
  };

  const handleDisconnect = () => {
    setStep("result");
    setResult("disconnect");
  };

  const handleInspect = () => {
    setStep("inspect");
  };

  const completeAttack = async () => {

    const userId = localStorage.getItem("userId");

    await axios.post("http://localhost:5000/api/completeAttack",{
      userId: userId,
      attackId: 32
    });

    navigate("/dashboard");

  };

  return (
    <>
    <SimulationNavbar/>
    <div className="min-h-screen text-white flex items-center justify-center p-8">

      <div className="bg-gray-900 border border-cyan-500/20 rounded-xl p-8 w-[800px]">

        {/* SCENARIO SCREEN */}
        {step === "scenario" && (
          <>
            <h1 className="text-3xl font-bold mb-4 text-cyan-400">
              Public WiFi Man-in-the-Middle Attack
            </h1>

            <p className="mb-4 text-gray-300">
              You are at an airport waiting for your flight.
              You decide to connect to the available public WiFi.
            </p>

            <div className="bg-black border border-gray-700 p-4 rounded mb-6">
              <p>Network: <span className="text-cyan-400">FreeAirportWiFi</span></p>
              <p>Security: <span className="text-red-400">Unsecured</span></p>
            </div>

            <p className="mb-6 text-gray-400">
              Public WiFi networks are often unencrypted and may allow attackers
              to intercept network traffic.
            </p>

            <div className="grid grid-cols-2 gap-4">

              <button
                onClick={handleConnect}
                className="bg-cyan-500 hover:bg-cyan-600 text-black p-3 rounded"
              >
                Connect Normally
              </button>

              <button
                onClick={handleVPN}
                className="bg-cyan-500 hover:bg-cyan-600 text-black p-3 rounded "
              >
                Use VPN
              </button>

              <button
                onClick={handleDisconnect}
                className="bg-cyan-500 hover:bg-cyan-600 text-black p-3 rounded"
              >
                Disconnect
              </button>

              <button
                onClick={handleInspect}
                className="bg-cyan-500 hover:bg-cyan-600 text-black p-3 rounded"
              >
                Inspect Network Security
              </button>

            </div>
          </>
        )}

        {/* INSPECT NETWORK */}
        {step === "inspect" && (
          <>
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              Network Inspection
            </h2>

            <div className="bg-black border border-gray-700 p-4 rounded mb-6">
              <p>Network Name: FreeAirportWiFi</p>
              <p>Security: Open (No Encryption)</p>
              <p>Authentication: None</p>
            </div>

            <p className="text-gray-400 mb-6">
              Open networks allow anyone to connect and monitor traffic
              transmitted over the network.
            </p>

            <button
              onClick={() => setStep("scenario")}
              className="bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-2 rounded"
            >
              Back
            </button>
          </>
        )}

        {/* RESULT SCREEN */}
        {step === "result" && (

          <>
            {result === "intercepted" && (
              <>
                <h2 className="text-2xl font-bold text-red-400 mb-4">
                  Attack Successful
                </h2>

                <p className="mb-4 text-gray-300">
                  An attacker on the same network intercepted your traffic.
                </p>

                <div className="bg-black border border-red-500 p-4 rounded mb-6">
                  <p>Capturing packets...</p>
                  <p>Extracting credentials...</p>
                  <p className="text-red-400">Login credentials intercepted.</p>
                </div>

                <p className="text-gray-400">
                  Because the network was unsecured, your data could be viewed
                  by attackers on the same network.
                </p>
              </>
            )}

            {result === "vpn" && (
              <>
                <h2 className="text-2xl font-bold text-green-400 mb-4">
                  Traffic Protected
                </h2>

                <p className="mb-4 text-gray-300">
                  Your VPN encrypted all network traffic.
                </p>

                <div className="bg-black border border-green-500 p-4 rounded mb-6">
                  <p>Establishing VPN tunnel...</p>
                  <p>Encrypting data packets...</p>
                  <p className="text-green-400">
                    Attacker unable to read traffic.
                  </p>
                </div>

                <p className="text-gray-400">
                  Even though the attacker could see your connection,
                  the encrypted traffic prevented them from accessing your data.
                </p>
                <button
                  onClick={completeAttack}
                  className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-2 rounded "
                >
                  Complete Attack
                </button>
              </>
            )}

            {result === "disconnect" && (
              <>
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                  Connection Closed
                </h2>

                <p className="mb-4 text-gray-300">
                  You disconnected from the unsecured network.
                </p>

                <p className="text-gray-400">
                  Avoid using public WiFi networks for sensitive activities
                  unless you use a secure connection like a VPN.
                </p>
              </>
            )}

            <button
              onClick={() => setStep("scenario")}
              className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-black px-6 py-2 rounded"
            >
              Restart Simulation
            </button>
          </>
        )}

      </div>
    </div>
    </>
  );
}

export default PublicWifiMITM;