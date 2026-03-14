import SimulationNavbar from "../components/SimulationNavbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FakeUpdateAttack() {
  
  const navigate = useNavigate();
  const [stage, setStage] = useState("scenario");
  const [result, setResult] = useState("");

  const installUpdate = () => {
    setResult("malware");
    setStage("result");
  };

  const checkWebsite = () => {
    setResult("safe");
    setStage("result");
  };

  const closePopup = () => {
    setResult("closed");
    setStage("result");
  };

  const completeAttack = async () => {

  const userId = localStorage.getItem("userId");

  await axios.post("http://localhost:5000/api/completeAttack",{
      userId: userId,
      attackId: 5
  });

  navigate("/dashboard");

  };

  return (
    <>
    <SimulationNavbar/>
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">

      {/* Scenario Screen */}
      {stage === "scenario" && (
        <div className="bg-gray-900 border border-cyan-500/20 p-8 rounded-xl w-[600px] text-center">

          <h1 className="text-2xl font-bold text-cyan-400 mb-4">
            Fake Software Update
          </h1>

          <p className="text-gray-300 mb-6">
            You are browsing a website when a popup suddenly appears
            claiming your Flash Player is outdated.
          </p>

          <button
            onClick={() => setStage("popup")}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-black font-semibold"
          >
            Continue Simulation
          </button>

        </div>
      )}

      {/* Popup Simulation */}
      {stage === "popup" && (
        <div className="bg-gray-900 border border-yellow-500 p-6 rounded-lg w-[500px] text-center">

          <h2 className="text-xl font-semibold text-yellow-400 mb-4">
            ⚠ Flash Player Outdated
          </h2>

          <p className="text-gray-300 mb-6">
            Your Flash Player version is outdated.
            Install the latest update to continue.
          </p>

          <div className="flex flex-col gap-3">

            <button
              onClick={installUpdate}
              className="mt-10 px-4 py-2 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
            >
              Install Update
            </button>

            <button
              onClick={checkWebsite}
              className=" px-4 py-2 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
            >
              Check Official Website
            </button>

            <button
              onClick={closePopup}
              className=" px-4 py-2 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
            >
              Close Popup
            </button>

          </div>

        </div>
      )}

      {/* Result Screen */}
      {stage === "result" && (
        <div className="bg-gray-900 border border-cyan-500/20 p-8 rounded-xl w-[600px] text-center">

          {result === "malware" && (
            <>
              <h2 className="text-2xl text-red-500 font-bold mb-4">
                Malware Installed!
              </h2>

              <p className="text-gray-300 mb-4">
                The update you installed was fake and contained malicious software.
                Attackers often disguise malware as software updates.
              </p>
              <button
                onClick={() => {
                  setStage("scenario");
                  setResult("");
                }}
                className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded text-black font-semibold"
              >
                Retry Simulation
              </button>
            </>
          )}

          {result === "safe" && (
            <>
              <h2 className="text-2xl text-green-400 font-bold mb-4">
                Correct Decision
              </h2>

              <p className="text-gray-300 mb-4">
                You checked the official website before installing the update.
                The popup was a fake update prompt.
              </p>
              <button
                onClick={completeAttack}
                className="mt-6 px-4 py-2 bg-green-500 text-black font-semibold rounded"
              >
                Complete Attack
              </button> 
              
            </>
          )}

          {result === "closed" && (
            <>
              <h2 className="text-2xl text-yellow-400 font-bold mb-4">
                Popup Closed
              </h2>

              <p className="text-gray-300 mb-4">
                You closed the popup. While this avoided the attack,
                always verify software updates from official sources.
              </p>
              <button
                onClick={() => {
                  setStage("scenario");
                  setResult("");
                }}
                className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded text-black font-semibold"
              >
                Retry Simulation
              </button>
            </>
          )}

          {/* Learning Section */}
          <div className="bg-gray-800 p-4 rounded mt-6 text-left">

            <h3 className="text-cyan-400 font-semibold mb-2">
              What You Should Know
            </h3>

            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Fake update prompts are commonly used to deliver malware.</li>
              <li>Attackers imitate software like Flash Player or browsers.</li>
              <li>Always download updates from official websites.</li>
              <li>Avoid installing software from popups or ads.</li>
            </ul>

          </div>

        </div>
      )}

    </div>
    </>
  );
}

export default FakeUpdateAttack;