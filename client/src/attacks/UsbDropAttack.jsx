import SimulationNavbar from "../components/SimulationNavbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UsbDropAttack() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  const handleChoice = (choice) => {
    if (choice === "plug") {
      setResult("compromised");
    }

    if (choice === "scan") {
      setResult("scanSafe");
    }

    if (choice === "report") {
      setResult("reportSafe");
    }
  };

  const resetSimulation = () => {
    setResult(null);
  };

  const completeAttack = async () => {

  const userId = localStorage.getItem("userId");

  await axios.post("http://localhost:5000/api/completeAttack",{
      userId: userId,
      attackId: 4
  });

  navigate("/dashboard");

};

  return (
    <>
    <SimulationNavbar/>
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-10">

      {/* Title */}
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">
        USB Drop Attack Simulation
      </h1>

      {/* Scenario Section */}
      {!result && (
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 max-w-xl">

          <h2 className="text-xl font-semibold mb-4">Scenario</h2>

          <p className="text-gray-300 mb-6">
            While walking through a company's parking lot, you find a USB drive
            on the ground.
          </p>

          <div className="bg-gray-800 p-4 rounded mb-6 text-center">
            <p className="text-lg">🔌 USB Drive</p>
            <p className="text-sm text-gray-400">Label: Salary Data 2026</p>
          </div>

          <p className="text-gray-300 mb-6">
            Curious employees often plug unknown USB drives into their
            computers. Attackers exploit this curiosity to spread malware.
          </p>

          <div className="flex flex-col gap-4">

            <button
              onClick={() => handleChoice("plug")}
              className="mt-10 px-4 py-2 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
            >
              Plug into Computer
            </button>

            <button
              onClick={() => handleChoice("scan")}
              className=" px-4 py-2 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
            >
              Scan with Antivirus
            </button>

            <button
              onClick={() => handleChoice("report")}
              className=" px-4 py-2 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
            >
              Report to IT
            </button>

          </div>

        </div>
      )}

      {/* Result: Compromised */}
      {result === "compromised" && (
        <div className="bg-red-900 p-8 rounded-lg max-w-xl border border-red-500">

          <h2 className="text-2xl font-bold mb-4">System Compromised</h2>

          <p className="mb-4">
            The USB contained a hidden malicious payload.
          </p>

          <p className="mb-4">
            When the USB was connected, the malware automatically executed and
            compromised the system.
          </p>

          <h3 className="font-semibold mt-6 mb-2">Concept</h3>

          <p className="text-gray-300">
            Unknown USB devices can contain malware designed to execute when
            plugged into a computer.
          </p>

          <button
            onClick={resetSimulation}
            className="mt-6 bg-cyan-500 hover:bg-cyan-600 p-3 rounded font-semibold text-black"
          >
            Restart Simulation
          </button>

        </div>
      )}

      {/* Result: Scan */}
      {result === "scanSafe" && (
        <div className="bg-gray-900 p-8 rounded-lg max-w-xl border border-yellow-500">

          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            Threat Detected
          </h2>

          <p className="mb-4">
            Antivirus scanning detected suspicious executable files on the USB
            device.
          </p>

          <p className="mb-4">
            The device contained malware designed to run automatically when the
            USB was inserted.
          </p>

          <h3 className="font-semibold mt-6 mb-2">Concept</h3>

          <p className="text-gray-300">
            Always scan unknown storage devices before opening files.
          </p>

          <button
            onClick={resetSimulation}
            className="mt-6 bg-cyan-500 hover:bg-cyan-600 p-3 rounded font-semibold text-black"
          >
            Restart Simulation
          </button>

        </div>
      )}

      {/* Result: Report */}
      {result === "reportSafe" && (
        <div className="bg-gray-900 p-8 rounded-lg max-w-xl border border-green-500">

          <h2 className="text-2xl font-bold mb-4 text-green-400">
            Correct Response
          </h2>

          <p className="mb-4">
            You reported the suspicious USB device to the IT department.
          </p>

          <p className="mb-4">
            Security professionals can analyze the device in a controlled
            environment without risking the company network.
          </p>

          <h3 className="font-semibold mt-6 mb-2">Concept</h3>

          <p className="text-gray-300">
            Unknown USB devices are a common physical social engineering attack.
          </p>

          <button
            onClick={resetSimulation}
            className="mt-6 bg-cyan-500 hover:bg-cyan-600 p-3 rounded font-semibold text-black"
          >
            Restart Simulation
          </button>
          <button
            onClick={completeAttack}
            className="mt-6 bg-cyan-500 hover:bg-cyan-600 p-3 rounded font-semibold text-black"
          >
            Complete Attack
          </button>

        </div>
      )}

    </div>
    </>
  );
}

export default UsbDropAttack;