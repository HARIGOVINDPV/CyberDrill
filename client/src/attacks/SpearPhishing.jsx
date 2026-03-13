import SimulationNavbar from "../components/SimulationNavbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./simulation.css";

function SpearPhishing() {
  const navigate = useNavigate();
  const [step, setStep] = useState("briefing");
  const [result, setResult] = useState(null);

  const handleAction = (action) => {
  if (action === "report") {
    setResult("success");
    setStep("result");
  }

  if (action === "download") {
    // Open the fake PDF
    window.open("/docs/Payroll_Update.pdf", "_blank");

    // Then trigger compromise result
    setResult("fail");
    setStep("result");
  }

  if (action === "click") {
    setResult("fail");
    setStep("result");
  }
  };

  const completeAttack = async () => {

    const userId = localStorage.getItem("userId");

    try {

      await axios.post("http://localhost:5000/api/completeAttack", {
        userId: userId,
        attackId: 1
      });

      navigate("/dashboard");

    } catch (err) {
      console.error("Completion failed", err);
    }

  };

  return (
    <>
    <SimulationNavbar />
    <div className="simulation-container">

      {step === "briefing" && (
        <div className="card">
          <h2>Spear Phishing Attack Simulation</h2>
          <p>
            You are an employee at TechNova Corp.
            A suspicious email has arrived in your inbox.
            Investigate and respond correctly.
          </p>
          <button onClick={() => setStep("email")} className="mt-10 px-4 py-2 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition">
            Start Simulation
          </button>
        </div>
      )}

      {step === "email" && (
        <div className="email-card">
          <h3>Inbox - 1 New Message</h3>

          <div className="email">
            <p><strong>From:</strong> IT-Support@techn0va-security.com</p>
            <p><strong>Subject:</strong> Urgent Password Reset Required</p>
            <div className="card">
            <p>
              Dear Employee,<br></br>
              We have detected unusugl activity on your account and have temporarily locked it for your security. Please verify and reset your password urgently to regain access. <br></br>
              Reset your Password using this link
            </p>
            <p className="link">
              https://technova-secure-login.com/reset
            </p>
            <div className="attachment">
  <div className="attachment-file">
    📎 Payroll_Update.pdf
  </div>

  <button
    className="attachment-btn"
    onClick={() => handleAction("download")}
  >
    Download
  </button>
</div>
            <p>
              Failure to do , may result in your account remaining locked.
              <br></br>
              Note : This is an automated message . do not reply.
            </p>
            </div>
            

            <div className="actions">
              <button onClick={() => handleAction("click")} className="mt-10 px-4 py-2 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition">
                Click Link
              </button>
              <button onClick={() => handleAction("download")} className="mt-10 px-4 py-2 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition">
                Download Attachment
              </button>
              <button className="mt-10 px-4 py-2 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
                onClick={() => handleAction("report")}>
                Report Phishing
              </button>
            </div>
          </div>
        </div>
      )}

      {step === "result" && (
        <div className="card">
          {result === "success" ? (
            <>
              <h2 className="success">Threat Neutralized ✅</h2>
              <p>
                You identified the phishing attempt correctly.
                Red flags included:
              </p>
              <ul>
                <li>Misspelled domain (techn0va)</li>
                <li>Urgency pressure</li>
                <li>Suspicious external link</li>
              </ul>
              <button
                onClick={completeAttack}
                className="mt-10 px-4 py-2 p-2 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
              >
                Complete Attack
              </button>
            </>
          ) : (
            <>
              <h2 className="fail">System Compromised ❌</h2>
              <p>
                You interacted with a malicious email.
                Your credentials have been stolen.
              </p>
              <ul>
                <li>Fake IT domain</li>
                <li>Phishing reset page</li>
                <li>Social engineering tactics</li>
              </ul>
              <button 
                onClick={() => setStep("briefing")} 
                className="mt-10 px-4 py-2 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
              >
                Restart Simulation
              </button>
            </>
          )}
          
        </div>
      )}

    </div>
    </>
  );
}

export default SpearPhishing;