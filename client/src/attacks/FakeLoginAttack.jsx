import SimulationNavbar from "../components/SimulationNavbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FakeLoginAttack() {
  const navigate = useNavigate();
  const [stage, setStage] = useState("warning");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // when user submits fake login
  const handleLogin = (e) => {
    e.preventDefault();

    setResult("captured");
    setStage("result");
  };

  const inspectURL = () => {
    setResult("inspect");
    setStage("result");
  };

  const checkSSL = () => {
    setResult("ssl");
    setStage("result");
  };

  const checkSender = () => {
    setResult("sender");
    setStage("result");
  };

  const closePage = () => {
    setResult("closed");
    setStage("result");
  };

  const completeAttack = async () => {

    const userId = localStorage.getItem("userId");

    await axios.post("http://localhost:5000/api/completeAttack",{
      userId: userId,
      attackId: 31
    });

    navigate("/dashboard");

  };

  return (
    <>
    <SimulationNavbar/>

    <div className="min-h-screen  text-white flex flex-col items-center p-10">
      {stage === "warning" && (

        <div className="max-w-2xl bg-gray-900 p-8 rounded-xl border border-yellow-500">

          <h1 className="text-3xl font-bold mb-4 text-yellow-400">
            ⚠ CyberDrill Simulation Warning
          </h1>

          <p className="text-gray-300 mb-4">
            You are about to enter a cybersecurity attack simulation.
          </p>

          <p className="text-gray-300 mb-6">
            Some screens may imitate real websites used in phishing attacks.
            This is part of a controlled educational environment.
          </p>

          <button
            onClick={() => setShowPopup(true)}
            className="bg-cyan-500 px-6 py-3 rounded text-black font-semibold"
          >
            Start Simulation
          </button>

        </div>
      )}

      {showPopup && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">

          <div className="bg-gray-900 p-8 rounded-xl border border-cyan-500 w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              Support the Creator
            </h2>

            <p className="text-gray-300 mb-6">
              Before continuing, support the creator by following on social media.
            </p>

            <div className="flex flex-col gap-4">

              <button
                onClick={() => {
                  setShowPopup(false);
                  setStage("scenario");
                }}
                className="bg-cyan-500 py-2 rounded text-black font-semibold"
              >
                Continue to Attack
              </button>

              <button
                onClick={() => {
                  setShowPopup(false);
                  setStage("socialphish");
                }}
                className="bg-gray-700 py-2 rounded"
              >
                Login to Social Media
              </button>

            </div>

          </div>
        </div>
      )}
        
      {stage === "socialphish" && (

<div className="min-h-screen flex text-white">

  {/* LEFT SIDE */}
  <div className="w-1/2 bg-[#0c1014] flex flex-col justify-center p-20 relative">

    <img
      src="/ig.png"
      alt="logo"
      className="absolute top-10 left-10 w-16"
    />

    <h1 className="text-3xl leading-relaxed">
      See everyday moments from your
      <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent font-bold ml-2">
        close friends.
      </span>
    </h1>

    <img
      src="/igp.png"
      alt="preview"
      className="w-[85%] mt-10 rounded-xl"
    />

    <p className="text-red-400 mt-8 font-semibold text-sm">
      ⚠ CyberDrill Phishing Simulation
    </p>

  </div>


  {/* RIGHT SIDE */}
  <div className="w-1/2 bg-[#152127] flex items-center justify-center">

    <form
      onSubmit={(e) => {
        e.preventDefault();
        setResult("captured");
        setStage("result");
      }}
      className="w-[350px]"
    >

      <h2 className="text-xl mb-6">Log in to lntaqram</h2>

      <input
        type="text"
        placeholder="Mobile number, username or email"
        className="w-full p-3 mb-4 rounded bg-[#152127] border border-gray-600"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 mb-4 rounded bg-[#152127] border border-gray-600"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-full bg-[#0d3c71] py-3 rounded-full font-bold">
        Log in
      </button>

      <div className="mt-4 text-center text-sm text-gray-400">
        <button type="button">Forgotten password?</button>
      </div>

      <div className="mt-3">
        <button type="button" className="w-full border border-gray-600 py-3 rounded-full">
          Log in With Facebook
        </button>
      </div>

      <div className="mt-3">
        <button type="button" className="w-full border border-blue-500 text-blue-400 py-3 rounded-full">
          Create new account
        </button>
      </div>

      <div className="mt-3">
        <button type="button" className="w-full py-3">
          Meta
        </button>
      </div>

    </form>

  </div>

</div>

)}

      {/* SCENARIO */}
      {stage === "scenario" && (
        <div className="max-w-2xl bg-gray-900 p-8 rounded-xl border border-cyan-500/30">

          <h1 className="text-3xl font-bold mb-4">
            Fake Login Page – Credential Harvesting
          </h1>

          <p className="text-gray-300 mb-4">
            You receive an email claiming there is unusual activity
            on your PayPal account.
          </p>

          <p className="text-gray-300 mb-4">
            The email asks you to verify your account immediately.
          </p>

          <div className="bg-gray-800 p-4 rounded mb-6">
            https://secure-paypal-login.net
          </div>

          <button
            onClick={() => setStage("browser")}
            className="bg-cyan-500 px-6 py-3 rounded text-black font-semibold"
          >
            Open Login Page
          </button>

        </div>
      )}

      {/* BROWSER SIMULATION */}
      {stage === "browser" && (

        <div className="w-full max-w-3xl bg-gray-900 border border-gray-700 rounded-xl">

          {/* browser bar */}
          <div className="bg-gray-800 p-3 text-sm text-green-400">
            🔒 https://secure-paypal-login.net
          </div>

          {/* login page */}
          <div className="p-10">

            <h2 className="text-2xl font-bold mb-6 text-center">
              PayPal Secure Login
            </h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">

              <input
                type="text"
                placeholder="Email"
                className="p-3 rounded bg-gray-800 border border-gray-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="p-3 rounded bg-gray-800 border border-gray-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className="bg-cyan-500 py-3 rounded text-black font-semibold"
              >
                Login
              </button>

            </form>

            {/* investigation buttons */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center">

              <button
                onClick={inspectURL}
                className="bg-gray-700 px-4 py-2 rounded"
              >
                Inspect URL
              </button>

              <button
                onClick={checkSSL}
                className="bg-gray-700 px-4 py-2 rounded"
              >
                View SSL Certificate
              </button>

              <button
                onClick={checkSender}
                className="bg-gray-700 px-4 py-2 rounded"
              >
                Check Email Sender
              </button>

              <button
                onClick={closePage}
                className="bg-gray-700 px-4 py-2 rounded"
              >
                Close Page
              </button>

            </div>

          </div>

        </div>
      )}

      {/* RESULT SCREEN */}
      {stage === "result" && (

        <div className="max-w-2xl bg-gray-900 p-8 rounded-xl border border-red-500/40">

          {/* credentials captured */}
          {result === "captured" && (
  <>
    <h2 className="text-2xl text-red-400 font-bold mb-4">
      Credentials Captured
    </h2>

    <p className="text-gray-300 mb-4">
      The attacker successfully captured your login credentials.
    </p>

    <div className="bg-black border border-red-500 p-4 rounded mb-4">
      <p className="text-red-300">Captured Data:</p>
      <p>Username / Email: {email}</p>
      <p>Password: {password}</p>
    </div>

    <p className="text-gray-400">
      This phishing page stored the credentials you entered.
      Attackers can now access your account.
    </p>
              <button
                onClick={() => {
                  setStage("warning");
                  setResult("");
                }}
                className=" mt-10 bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded text-black font-semibold"
              >
                Retry Simulation
              </button>
            </>
          )}

          {/* inspect URL */}
          {result === "inspect" && (
            <>
              <h2 className="text-2xl text-cyan-400 font-bold mb-4">
                URL Inspection
              </h2>

              <p className="text-gray-300">
                Domain observed:
                <br />
                secure-paypal-login.net
              </p>

              <p className="mt-4 text-gray-300">
                Official PayPal domain is:
                paypal.com
              </p>
              <button
                onClick={() => {
                  setStage("scenario");
                  setResult("");
                }}
                className="mt-10 bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded text-black font-semibold"
              >
                Retry Simulation
              </button>
            </>
          )}

          {/* SSL */}
          {result === "ssl" && (
            <>
              <h2 className="text-2xl text-yellow-400 font-bold mb-4">
                SSL Certificate Information
              </h2>

              <p className="text-gray-300">
                The SSL certificate is valid.
              </p>

              <p className="mt-4 text-gray-300">
                However, it belongs to:
                secure-paypal-login.net
              </p>

              <p className="mt-4 text-gray-400">
                HTTPS does not guarantee a legitimate website.
              </p>
              <button
                onClick={() => {
                  setStage("scenario");
                  setResult("");
                }}
                className="mt-10 bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded text-black font-semibold"
              >
                Retry Simulation
              </button>
            </>
          )}

          {/* sender */}
          {result === "sender" && (
            <>
              <h2 className="text-2xl text-yellow-400 font-bold mb-4">
                Email Sender Analysis
              </h2>

              <p className="text-gray-300">
                Sender:
                security-alert@paypaI-support.com
              </p>

              <p className="mt-4 text-gray-400">
                The domain uses a look-alike character
                (capital I instead of lowercase L).
              </p>
              <button
                onClick={() => {
                  setStage("scenario");
                  setResult("");
                }}
                className="mt-10 bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded text-black font-semibold"
              >
                Retry Simulation
              </button>
            </>
          )}

          {/* closed */}
          {result === "closed" && (
            <>
              <h2 className="text-2xl text-green-400 font-bold mb-4">
                Safe Action
              </h2>

              <p className="text-gray-300">
                You closed the page without entering credentials.
              </p>

              <p className="mt-4 text-gray-400">
                Avoid logging into accounts through links in emails.
              </p>
              <button
                onClick={() => {
                  setStage("scenario");
                  setResult("");
                }}
                className="mt-10 bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded text-black font-semibold"
              >
                Retry Simulation
              </button>
              <button
                onClick={completeAttack}
                className="mt-10 bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded text-black font-semibold"
              >
                Complete Attack
              </button>
            </>
          )}

        </div>
      )}

    </div>
    </>
  );
}

export default FakeLoginAttack;