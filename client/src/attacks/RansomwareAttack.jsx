import SimulationNavbar from "../components/SimulationNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RansomwareAttack() {
  const navigate = useNavigate();
  const [canComplete, setCanComplete] = useState(false);
  const [stage, setStage] = useState("scenario");
  const [timeLeft, setTimeLeft] = useState(7200);
  const [result, setResult] = useState("");

  const files = [
    "documents.docx",
    "family_photo.jpg",
    "project_files.zip",
    "database_backup.sql",
    "financial_report.xlsx",
    "presentation.pptx"
  ];

  useEffect(() => {
    if (stage === "ransom") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [stage]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m}:${s}`;
  };

  const startAttack = () => {
    setStage("encrypting");

    setTimeout(() => {
      setStage("ransom");
    }, 3000);
  };

  const handleAction = (choice) => {

  if (choice === "pay") {
    setResult("You paid the ransom, but the attackers never sent the decryption key.");
    setCanComplete(false);
  }

  if (choice === "disconnect") {
    setResult("You disconnected the system from the network. This prevented the ransomware from spreading.");
    setCanComplete(true);
  }

  if (choice === "backup") {
    setResult("You restored your files from a secure backup. System recovered successfully.");
    setCanComplete(true);
  }

  if (choice === "analyze") {
    setResult("You investigated the malware. It was identified as ransomware communicating with a command server.");
    setCanComplete(false);
  }

  setStage("result");
};

  const restartSimulation = () => {
    setStage("scenario");
    setResult("");
    setTimeLeft(7200);
  };

  const completeSimulation = () => {
    setStage("complete");
  };

  const completeAttack = async () => {

  const userId = localStorage.getItem("userId");

  await axios.post("http://localhost:5000/api/completeAttack",{
      userId: userId,
      attackId: 61
  });

  navigate("/dashboard");

};

  return (
    <>
    <SimulationNavbar />
    <div className="ransomware-container">

      <style>{`

      .ransomware-container{
        background:#081b28;
        color:white;
        min-height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:monospace;
        padding:20px;
      }

      .box{
        background:#020d15;
        padding:40px;
        border-radius:10px;
        max-width:650px;
        text-align:center;
        border:1px solid #333;
      }

      h1{
        color:#ff4c4c;
      }

      .button{
        margin-top:20px;
        padding:10px 20px;
        background:#081b28;
        border:none;
        cursor:pointer;
        border:1px solid #444;
        font-weight:bold;
      }

      .file{
        color:#ff4c4c;
        margin:5px 0;
      }

      .progress-bar{
        width:400px;
        height:10px;
        background:#333;
        margin:30px auto;
      }

      .progress{
        height:100%;
        background:red;
        animation:encrypt 3s linear forwards;
      }

      @keyframes encrypt{
        from{width:0%;}
        to{width:100%;}
      }

      .btc{
        color:#ff3c3c;
        font-size:20px;
      }

      .timer{
        margin-top:15px;
        font-size:18px;
        color:#00e5ff;
      }

      .actions{
        margin-top:25px;
        display:flex;
        flex-wrap:wrap;
        gap:10px;
        justify-content:center;
      }

      .actions button{
        padding:10px 20px;
        background:#081b28;
        color:white;
        border:1px solid #444;
        cursor:pointer;
      }

      .actions button:hover{
        background:#333;
      }

      .lesson{
        margin-top:20px;
        color:#00e5ff;
      }

      .control-buttons{
        margin-top:25px;
        display:flex;
        justify-content:center;
        gap:15px;
      }

      .restart{
        background:#444;
        color:white;
        border:none;
        padding:10px 20px;
        cursor:pointer;
      }

      .com{
        background:#444;
        color:black;
        border:none;
        padding:10px 20px;
        cursor:pointer;
        font-weight:bold;
      }

      `}</style>

      {/* Scenario */}
      {stage === "scenario" && (
        <div className="box">

          <h1>⚠ Ransomware Attack Simulation</h1>

          <p>
            You installed a free software tool from an unknown website.
          </p>

          <p>
            A few minutes later your system begins behaving strangely.
          </p>

          <p>
            Several files suddenly become inaccessible.
          </p>

          <button className="button" onClick={startAttack}>
            Start Simulation
          </button>

        </div>
      )}

      {/* Encrypting */}
      {stage === "encrypting" && (
        <div className="box">

          <h1>Encrypting Files...</h1>

          {files.map((file, index) => (
            <div key={index} className="file">
              {file} → encrypted
            </div>
          ))}

          <div className="progress-bar">
            <div className="progress"></div>
          </div>

        </div>
      )}

      {/* Ransom Screen */}
      {stage === "ransom" && (
        <div className="box">

          <h1>🔒 YOUR FILES HAVE BEEN ENCRYPTED</h1>

          <p>
            All your files have been locked using military-grade encryption.
          </p>

          <p className="btc">
            Pay 2 BTC to recover your files
          </p>

          <p>
            Wallet Address: bc1x9ransomwallet8asdasd
          </p>

          <div className="timer">
            Time Remaining: {formatTime(timeLeft)}
          </div>

          <div className="actions">

            <button onClick={() => handleAction("pay")}>
              Pay Ransom
            </button>

            <button onClick={() => handleAction("disconnect")}>
              Disconnect Network
            </button>

            <button onClick={() => handleAction("backup")}>
              Restore Backup
            </button>

            <button onClick={() => handleAction("analyze")}>
              Investigate Malware
            </button>

          </div>

        </div>
      )}

      {/* Result */}
      {stage === "result" && (
        <div className="box">

          <h1>Simulation Result</h1>

          <p>{result}</p>

          <p className="lesson">
            Recommended response: isolate infected systems and restore files from clean backups.
          </p>

          <div className="control-buttons">

            <button className="restart" onClick={restartSimulation}>
              Restart Simulation
            </button>

            {canComplete && (
              <button
                onClick={completeAttack}
                className="com"
              >
                Complete Attack
              </button>
            )}

          </div>

        </div>
      )}

      {/* Completion Screen */}
      {stage === "complete" && (
        <div className="box">

          <h1>✔ Attack Completed</h1>

          <p>
            You have completed the Ransomware Attack simulation.
          </p>

          <p>
            This scenario demonstrated how ransomware encrypts files
            and the importance of backups and network isolation.
          </p>

          <button className="button" onClick={restartSimulation}>
            Replay Attack
          </button>

        </div>
      )}

    </div>
    </>
  );
}

export default RansomwareAttack;