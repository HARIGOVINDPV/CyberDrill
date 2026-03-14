import SimulationNavbar from "../components/SimulationNavbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CredentialStuffing() {

  const navigate = useNavigate();

  const [stage, setStage] = useState("scenario");
  const [message, setMessage] = useState("");

  const handleIgnore = () => {
    setMessage(
      "🚨 Attack Successful!\n\nThe attacker logged into your account using leaked credentials.\n\nThis is called Credential Stuffing."
    );
    setStage("atresult");
  };

  const handleChangePassword = () => {
    setMessage(
      "✅ Password Updated.\n\nThe leaked password can no longer be used to access your account."
    );
    setStage("result");
  };

  const handleEnable2FA = () => {
    setMessage(
      "🔐 Two-Factor Authentication Enabled.\n\nEven if attackers know your password, they cannot access your account without the second authentication factor."
    );
    setStage("result");
  };

  const handleCheckDetails = () => {
    setStage("details");
  };

  const completeAttack = async () => {

  const userId = localStorage.getItem("userId");

  await axios.post("http://localhost:5000/api/completeAttack",{
      userId: userId,
      attackId: 33
  });

  navigate("/dashboard");

};

  return (
    <>
    <SimulationNavbar />
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-8">

      {/* Scenario */}
      {stage === "scenario" && (
        <div className="bg-gray-900 p-8 rounded-xl w-[700px] border border-cyan-500">

          <h1 className="text-2xl font-bold mb-4">
            Password Leak / Credential Stuffing
          </h1>

          <p className="mb-4">
            Security Alert!
          </p>

          <p className="mb-6 text-gray-300">
            Your email appeared in a recent data breach.
            Attackers may attempt to use the leaked credentials
            to log into your accounts.
          </p>

          <div className="bg-black p-4 rounded border border-gray-700 mb-6">
            <p>Email: user@example.com</p>
            <p>Password: ********</p>
            <p>Status: Leaked in breach database</p>
          </div>

          <div className="flex gap-4 flex-wrap">

            <button
              onClick={handleChangePassword}
              className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded"
            >
              Change Password
            </button>

            <button
              onClick={handleEnable2FA}
              className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded"
            >
              Enable 2FA
            </button>

            <button
              onClick={handleCheckDetails}
              className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded"
            >
              Check Breach Details
            </button>

            <button
              onClick={handleIgnore}
              className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 roundedd"
            >
              Ignore Alert
            </button>

          </div>
        </div>
      )}

      {/* Breach Details */}
      {stage === "details" && (
        <div className="bg-gray-900 p-8 rounded-xl w-[700px] border border-yellow-500">

          <h1 className="text-xl font-bold mb-4">
            Breach Details
          </h1>

          <p className="mb-4">
            Source: ExampleForum.com
          </p>

          <p className="mb-4">
            Exposed Data:
          </p>

          <ul className="list-disc ml-6 mb-6 text-gray-300">
            <li>Email addresses</li>
            <li>Usernames</li>
            <li>Passwords</li>
          </ul>

          <p className="mb-6">
            These credentials are often sold on underground forums
            and used for credential stuffing attacks.
          </p>

          <button
            onClick={() => setStage("scenario")}
            className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded"
          >
            Back
          </button>

        </div>
      )}

      {/* Result */}
      {stage === "result" && (
        <div className="bg-gray-900 p-8 rounded-xl w-[700px] border border-cyan-500">

          <h1 className="text-2xl font-bold mb-6">
            Simulation Result
          </h1>

          <p className="whitespace-pre-line text-gray-300 mb-6">
            {message}
          </p>

          <button
            onClick={() => setStage("scenario")}
            className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded"
          >
            Return to Attack
          </button>
          <button
            onClick={completeAttack}
            className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded"
          >
            Complete Attack
          </button>

        </div>
      )}

      {/* att Result */}
      {stage === "atresult" && (
        <div className="bg-gray-900 p-8 rounded-xl w-[700px] border border-cyan-500 border border-red-500">

          <h1 className="text-2xl font-bold mb-6">
            Simulation Result
          </h1>

          <p className="whitespace-pre-line text-gray-300 mb-6">
            {message}
          </p>

          <button
            onClick={() => setStage("scenario")}
            className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded"
          >
            Return to Attack
          </button>

        </div>
      )}

    </div>
    </>
  );
}

export default CredentialStuffing;