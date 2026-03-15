import SimulationNavbar from "../components/SimulationNavbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DataBreachInvestigation() {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState(null);
  const [ipInput, setIpInput] = useState("");
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("idle"); 
  // idle | success | fail

  const correctIP = "185.220.101.45";

  const logs = [
    "02:01:11  LOGIN FAILED   user: admin   IP: 192.168.0.14",
    "02:01:18  LOGIN FAILED   user: admin   IP: 192.168.0.14",
    "02:01:24  LOGIN FAILED   user: admin   IP: 185.220.101.45",
    "02:02:02  LOGIN SUCCESS  user: admin   IP: 185.220.101.45",
    "02:02:30  ACCESS FILE    /secure/config.yml   IP: 185.220.101.45",
    "02:04:10  FILE DOWNLOAD  company_database_backup.zip   IP: 185.220.101.45",
    "02:05:47  FILE DOWNLOAD  customer_data.csv   IP: 185.220.101.45",
    "02:06:11  EXTERNAL CONNECTION   IP: 185.220.101.45",
  ];

  const analyzeLogs = () => {
    setSelectedTool("analysis");
  };

  const traceIP = () => {
    setSelectedTool("trace");
  };

  const submitAnswer = () => {
    if (ipInput.trim() === correctIP) {
      setResult("✅ Correct! The attacker IP has been identified and blocked.");
      setStatus("success");
    } else {
      setResult("❌ Incorrect IP. Re-analyze the logs and try again.");
      setStatus("fail");
    }
  };

  const resetAttack = () => {
    setSelectedTool(null);
    setIpInput("");
    setResult("");
    setStatus("idle");
  };

  const completeAttack = async () => {

    const userId = localStorage.getItem("userId");

    await axios.post("http://localhost:5000/api/completeAttack",{
        userId: userId,
        attackId: 64
    });

    navigate("/dashboard");

  };

  return (
    <>
    <SimulationNavbar />
    <div style={styles.container}>
      <h1 style={styles.title}>Data Breach Investigation</h1>

      <div style={styles.scenario}>
        <h3>Scenario</h3>
        <p>
          The CyberDrill security system detected suspicious activity on the server.
          Multiple failed login attempts were recorded followed by a successful login.
          Shortly after, sensitive files were downloaded.
        </p>
        <p><strong>Your task:</strong> Identify the attacker IP address.</p>
      </div>

      <div style={styles.logsContainer}>
        <h3>Server Logs</h3>
        <div style={styles.logs}>
          {logs.map((log, index) => (
            <div key={index} style={styles.logLine}>
              {log}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.tools}>
        <button style={styles.button} onClick={analyzeLogs}>
          Analyze Logs
        </button>

        <button style={styles.button} onClick={traceIP}>
          Trace IP
        </button>
      </div>

      {selectedTool === "analysis" && (
        <div style={styles.analysis}>
          <h3>Log Analysis</h3>
          <p>
            Multiple failed login attempts followed by a successful login from the same external IP.
            This suggests a brute-force attack succeeded.
          </p>
        </div>
      )}

      {selectedTool === "trace" && (
        <div style={styles.analysis}>
          <h3>IP Trace Result</h3>
          <p>Network: TOR Exit Node</p>
          <p>Reputation: Suspicious</p>
          <p>Location: Unknown</p>
        </div>
      )}

      <div style={styles.answerBox}>
        <h3>Enter Attacker IP</h3>

        <input
          style={styles.input}
          placeholder="Enter IP Address"
          value={ipInput}
          onChange={(e) => setIpInput(e.target.value)}
        />

        <button style={styles.submitBtn} onClick={submitAnswer}>
          Submit
        </button>
      </div>

      {result && <div style={styles.result}>{result}</div>}

      {/* Final action buttons */}
      <div style={styles.finalActions}>
        {status === "success" && (
          <button
            onClick={completeAttack}
            className="mt-6 px-4 py-2 bg-green-500 text-black font-semibold rounded"
          >
            Complete Attack
          </button>
        )}

        {status === "fail" && (
          <button style={styles.resetBtn} onClick={resetAttack}>
            Reset Attack
          </button>
        )}
      </div>
    </div>
    </>
  );
}

export default DataBreachInvestigation;

const styles = {
  container: {
    padding: "40px",
    color: "white",
    minHeight: "100vh",
    fontFamily: "monospace",
  },

  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },

  scenario: {
    background: "#0f3446",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
  },

  logsContainer: {
    marginBottom: "20px",
  },

  logs: {
    background: "#051e31",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #334155",
    maxHeight: "250px",
    overflowY: "auto",
  },

  logLine: {
    marginBottom: "6px",
    color: "#38bdf8",
  },

  tools: {
    marginTop: "20px",
    marginBottom: "20px",
  },

  button: {
    marginRight: "10px",
    padding: "10px 20px",
    background: "#2563eb",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },

  analysis: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  },

  answerBox: {
    marginTop: "30px",
  },

  input: {
    padding: "10px",
    width: "250px",
    marginRight: "10px",
    borderRadius: "6px",
    border: "none",
  },

  submitBtn: {
    padding: "10px 20px",
    background: "#16a34a",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },

  result: {
    marginTop: "20px",
    fontSize: "18px",
  },

  finalActions: {
    marginTop: "30px",
  },

  completeBtn: {
    padding: "12px 24px",
    background: "#22c55e",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    marginRight: "12px",
  },

  resetBtn: {
    padding: "12px 24px",
    background: "#ef4444",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
};