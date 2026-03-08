import { useState, useEffect } from "react";
import SimulationNavbar from "../components/SimulationNavbar";

function BruteForce() {

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  // simulate attack progress
  useEffect(() => {
    if (step === 2) {
      let interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep(3), 1000);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [step]);

  // password strength checker
  const checkStrength = () => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (strongRegex.test(password)) {
      setStrength("strong");
      setStep(5);
    } else {
      setStrength("weak");
    }
  };

  return (
    
    <div className="min-h-screen text-white flex flex-col">
      <SimulationNavbar />
      <div className="bg-gray-900 border items-center justify-center border-cyan-500 p-8 rounded-xl w-[500px] w-full max-w-md mx-auto  ">

        {/* STEP 1 : Scenario */}
        {step === 1 && (
          <>
            <h2 className="text-2xl mb-4 text-cyan-400">
              Weak Password Scenario
            </h2>

            <p className="mb-4">
              A user created an account with:
            </p>

            <div className="bg-gray-800 p-4 rounded mb-4">
              Username: alex <br />
              Password: alex123
            </div>

            <p className="mb-6">
              Do you think this password is secure?
            </p>

            <button
              onClick={() => setStep(2)}
              className="w-full py-2 bg-cyan-500 text-black rounded"
            >
              Start Attack Simulation
            </button>
          </>
        )}

        {/* STEP 2 : Attack Simulation */}
        {step === 2 && (
          <>
            <h2 className="text-2xl mb-4 text-cyan-400">
              Brute Force Attack Simulation
            </h2>

            <p className="mb-4">
              Attacker is trying common passwords...
            </p>

            <div className="w-full bg-gray-700 h-4 rounded mb-4">
              <div
                className="bg-cyan-500 h-4 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p>Progress: {progress}%</p>
          </>
        )}

        {/* STEP 3 : Result */}
        {step === 3 && (
          <>
            <h2 className="text-2xl mb-4 text-red-400">
              Password Cracked
            </h2>

            <p className="mb-4">
              The password <b>alex123</b> was cracked in less than
              a second using a dictionary attack.
            </p>

            <p className="mb-6">
              Weak passwords are easy for attackers to guess
              using automated tools.
            </p>

            <button
              onClick={() => setStep(4)}
              className="w-full py-2 bg-cyan-500 text-black rounded"
            >
              Learn How to Create a Strong Password
            </button>
          </>
        )}

        {/* STEP 4 : Training */}
        {step === 4 && (
          <>
            <h2 className="text-2xl mb-4 text-cyan-400">
              Create a Strong Password
            </h2>

            <input
              type="password"
              placeholder="Enter strong password"
              className="w-full p-3 bg-gray-800 rounded mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={checkStrength}
              className="w-full py-2 bg-cyan-500 text-black rounded"
            >
              Check Strength
            </button>

            {strength === "weak" && (
              <p className="text-red-400 mt-3">
                Password is weak. Try including uppercase,
                lowercase, numbers and symbols.
              </p>
            )}
          </>
        )}

        {/* STEP 5 : Success */}
        {step === 5 && (
          <>
            <h2 className="text-2xl mb-4 text-green-400">
              Attack Prevented
            </h2>

            <p className="mb-4">
              Your password is strong and would take
              millions of years to crack.
            </p>

            <p className="mb-6">
              Always use strong passwords and enable
              Multi-Factor Authentication (MFA).
            </p>

            <button
              onClick={() => setStep(1)}
              className="w-full py-2 bg-cyan-500 text-black rounded"
            >
              Restart Simulation
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default BruteForce;