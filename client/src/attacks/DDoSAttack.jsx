import SimulationNavbar from "../components/SimulationNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DDoSAttack() {
  const navigate = useNavigate();
  const [attackOutcome, setAttackOutcome] = useState("");
  const [requests, setRequests] = useState(300);
  const [cpu, setCpu] = useState(20);
  const [status, setStatus] = useState("Normal");
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState("");
  const [attackStarted, setAttackStarted] = useState(false);

  // Start attack simulation
  const startAttack = () => {
    setAttackStarted(true);
    setStatus("Traffic Spike Detected");
  };

  // Traffic simulation
  useEffect(() => {
    if (!attackStarted) return;

    const interval = setInterval(() => {

      setRequests(prev => {
        const newVal = prev + Math.floor(Math.random() * 800);
        return newVal > 15000 ? 15000 : newVal;
      });

      setCpu(prev => {
        const newVal = prev + Math.floor(Math.random() * 5);
        return newVal > 98 ? 98 : newVal;
      });

      setLogs(prev => [
        `Incoming request from ${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
        ...prev.slice(0, 8)
      ]);

    }, 1000);

    return () => clearInterval(interval);

  }, [attackStarted]);



  // ACTIONS

  const enableFirewall = () => {
    setStatus("Firewall Rules Applied");
    setRequests(1200);
    setCpu(40);

    setResult(
      "Firewall blocked some suspicious IP ranges, but traffic is still high."
    );

    setAttackOutcome("partial");
  };

  const rateLimit = () => {
    setStatus("Rate Limiting Enabled");
    setRequests(400);
    setCpu(25);

    setResult(
      "Rate limiting successfully mitigated the DDoS attack. Server traffic is stable."
    );

    setAttackOutcome("success");
  };

  const ignoreTraffic = () => {
    setStatus("Server Overloaded");
    setRequests(15000);
    setCpu(98);

    setResult(
      "The server crashed due to excessive traffic. Legitimate users cannot access the service."
    );

    setAttackOutcome("fail");
  };

  const analyzeTraffic = () => {
    setResult(
      "Traffic analysis shows a botnet performing an HTTP flood attack from multiple regions."
    );
  };

  const resetAttack = () => {
    setRequests(300);
    setCpu(20);
    setStatus("Normal");
    setLogs([]);
    setResult("");
    setAttackStarted(false);
    setAttackOutcome("");
  };

  const completeAttack = async () => {

    const userId = localStorage.getItem("userId");

    await axios.post("http://localhost:5000/api/completeAttack",{
        userId: userId,
        attackId: 63
    });

    navigate("/dashboard");

  };

  return (
    <>
    <SimulationNavbar />
    <div className="min-h-screen text-white p-8">

      <h1 className="text-3xl font-bold mb-4 text-red-400">
        DDoS Attack Simulation
      </h1>

      <p className="text-gray-400 mb-6">
        Server traffic has suddenly spiked. Investigate and defend the system.
      </p>

      {/* Server Dashboard */}

      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-gray-900 p-6 rounded-lg border border-red-500">
          <h2 className="text-lg">Requests / sec</h2>
          <p className="text-3xl text-red-400">{requests}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-yellow-500">
          <h2 className="text-lg">CPU Usage</h2>
          <p className="text-3xl text-yellow-400">{cpu}%</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-blue-500">
          <h2 className="text-lg">Server Status</h2>
          <p className="text-xl">{status}</p>
        </div>

      </div>


      {/* Logs */}

      <div className="bg-gray-900 p-6 rounded-lg mb-8 border border-gray-700">
        <h2 className="text-xl mb-3">Incoming Traffic Logs</h2>

        <div className="text-sm font-mono text-green-400 h-40 overflow-auto">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
      </div>


      {/* Controls */}

      {!attackStarted && (
        <button
          onClick={startAttack}
          className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700"
        >
          Start Attack Simulation
        </button>
      )}

      {attackStarted && (
        <div className="flex gap-4 mb-6">

          <button
            onClick={enableFirewall}
            className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-700"
          >
            Enable Firewall Rules
          </button>

          <button
            onClick={rateLimit}
            className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-700"
          >
            Apply Rate Limiting
          </button>

          <button
            onClick={ignoreTraffic}
            className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-700"
          >
            Ignore Traffic
          </button>

          <button
            onClick={analyzeTraffic}
            className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-700"
          >
            Analyze Traffic
          </button>

        </div>
      )}


      {/* Result Panel */}

      {result && (
        <div className="bg-gray-900 p-6 border border-cyan-500 rounded-lg mt-4">
          <h2 className="text-xl mb-2 text-cyan-400">Result</h2>
          <p>{result}</p>

          <div className="mt-4 flex gap-4">

            {attackOutcome === "success" && (
              <button
                onClick={completeAttack}
                className="mt-6 px-4 py-2 bg-green-500 text-black font-semibold rounded"
              >
                Complete Attack
              </button>
            )}

            {(attackOutcome === "fail" || attackOutcome === "partial") && (
              <button
                onClick={resetAttack}
                className="bg-red-600 px-5 py-2 rounded hover:bg-red-700"
              >
                Reset Attack
              </button>
            )}

          </div>
        </div>
      )}

    </div>
    </>
  );
}

export default DDoSAttack;