import { useMemo, useState } from "react";
import SimulationNavbar from "../components/SimulationNavbar";
import "./InsiderDataTheft.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InsiderDataTheft() {
  const navigate = useNavigate();
  const [transferStatus, setTransferStatus] = useState("in_progress");
  const [transferProgress, setTransferProgress] = useState(62);
  const [adminAlerted, setAdminAlerted] = useState(false);
  const [evidencePreserved, setEvidencePreserved] = useState(false);
  const [userInvestigated, setUserInvestigated] = useState(false);
  const [destinationInspected, setDestinationInspected] = useState(false);
  const [accountQuarantined, setAccountQuarantined] = useState(false);
  const [outcome, setOutcome] = useState(null);
  const [logs, setLogs] = useState([
    "[22:41:03] Monitoring started for suspicious file transfer.",
    "[22:42:17] Employee account 'employee_john' accessed internal backup repository.",
    "[22:43:05] File detected: company_database_backup.zip (4.2 GB).",
    "[22:43:29] Destination appears to be external cloud storage.",
    "[22:44:10] Transfer status: IN PROGRESS.",
  ]);

  const completeAttack = async () => {

  const userId = localStorage.getItem("userId");

  await axios.post("http://localhost:5000/api/completeAttack",{
      userId: userId,
      attackId: 62
  });

  navigate("/dashboard");

  };

  const suspiciousIndicators = useMemo(() => {
    const list = [
      "Large sensitive file transfer detected",
      "Activity occurred after work hours",
      "Destination is external",
    ];

    if (!userInvestigated) list.push("User behavior not yet investigated");
    if (!destinationInspected) list.push("Destination details not yet inspected");
    if (!adminAlerted) list.push("Security team not yet notified");
    if (!evidencePreserved) list.push("Evidence not yet preserved");

    return list;
  }, [userInvestigated, destinationInspected, adminAlerted, evidencePreserved]);

  const addLog = (message) => {
    const time = new Date().toLocaleTimeString("en-GB");
    setLogs((prev) => [`[${time}] ${message}`, ...prev]);
  };

  const endWithFailure = (title, description) => {
    setOutcome({
      type: "failure",
      title,
      description,
    });
    setTransferStatus("completed");
    setTransferProgress(100);
  };

  const endWithSuccess = (title, description) => {
    setOutcome({
      type: "success",
      title,
      description,
    });
    setTransferStatus("blocked");
  };

  const handleAllowTransfer = () => {
    if (outcome) return;

    addLog("Transfer manually allowed by analyst.");
    endWithFailure(
      "Data Breach Occurred",
      "Sensitive company data was transferred outside the organization. The insider successfully exfiltrated the backup archive."
    );
    
  };

  const handleInvestigateUser = () => {
    if (outcome || userInvestigated) return;

    setUserInvestigated(true);
    addLog("User activity investigation opened.");

    addLog(
      "Findings: employee_john logged in from a personal laptop at 22:41, accessed backup storage for the first time, and started a large transfer."
    );
  };

  const handleInspectDestination = () => {
    if (outcome || destinationInspected) return;

    setDestinationInspected(true);
    addLog("Destination analysis completed.");
    addLog(
      "Destination identified as unauthorized external cloud storage endpoint: fileshare-sync.transfer-now.net"
    );
  };

  const handleBlockTransfer = () => {
    if (outcome || transferStatus === "blocked") return;

    setTransferStatus("blocked");
    setTransferProgress(68);
    addLog("Transfer blocked by analyst.");
  };

  const handleAlertAdmin = () => {
    if (outcome || adminAlerted) return;

    setAdminAlerted(true);
    addLog("Security administrator and incident response team notified.");
  };

  const handlePreserveEvidence = () => {
    if (outcome || evidencePreserved) return;

    setEvidencePreserved(true);
    addLog("Evidence preserved: logs, session metadata, and file-access trail secured.");
  };

  const handleQuarantineAccount = () => {
    if (outcome || accountQuarantined) return;

    setAccountQuarantined(true);
    addLog("Employee account quarantined and temporary access suspension applied.");
  };

  const handleFinalize = () => {
    if (outcome) return;

    // Bad finalization cases
    if (transferStatus === "in_progress") {
      endWithFailure(
        "Response Delayed",
        "The transfer was still active when the case was closed. Sensitive company data continued moving outside the network."
      );
      return;
    }

    if (transferStatus === "completed") {
      endWithFailure(
        "Incident Mishandled",
        "The transfer had already completed. No containment was achieved before the insider finished exfiltrating the data."
      );
      return;
    }

    // Hard-tier best practice: containment + escalation + evidence handling
    if (transferStatus === "blocked" && adminAlerted && evidencePreserved) {
      endWithSuccess(
        "Incident Contained Successfully",
        "The suspicious transfer was blocked, the incident response team was alerted, and critical evidence was preserved for investigation."
      );
      return;
    }

    // Partial success
    if (transferStatus === "blocked" && adminAlerted && !evidencePreserved) {
      setOutcome({
        type: "partial",
        title: "Partially Contained",
        description:
          "The transfer was blocked and the administrator was alerted, but forensic evidence was not preserved properly. Investigation quality is reduced.",
      });
      return;
    }

    if (transferStatus === "blocked" && !adminAlerted) {
      setOutcome({
        type: "partial",
        title: "Containment Without Escalation",
        description:
          "The transfer was blocked, but the security team was not formally alerted. The threat may reappear and the incident was not fully managed.",
      });
      return;
    }

    setOutcome({
      type: "partial",
      title: "Incomplete Response",
      description:
        "Some useful actions were taken, but the incident response process was not completed correctly.",
    });
  };

  const handleReset = () => {
    setTransferStatus("in_progress");
    setTransferProgress(62);
    setAdminAlerted(false);
    setEvidencePreserved(false);
    setUserInvestigated(false);
    setDestinationInspected(false);
    setAccountQuarantined(false);
    setOutcome(null);
    setLogs([
      "[22:41:03] Monitoring started for suspicious file transfer.",
      "[22:42:17] Employee account 'employee_john' accessed internal backup repository.",
      "[22:43:05] File detected: company_database_backup.zip (4.2 GB).",
      "[22:43:29] Destination appears to be external cloud storage.",
      "[22:44:10] Transfer status: IN PROGRESS.",
    ]);
  };

  const statusBadgeClass =
    transferStatus === "blocked"
      ? "status-badge blocked"
      : transferStatus === "completed"
      ? "status-badge completed"
      : "status-badge progress";

  const outcomeClass =
    outcome?.type === "success"
      ? "outcome success"
      : outcome?.type === "failure"
      ? "outcome failure"
      : "outcome partial";


  return (
    <>
    <SimulationNavbar />
    <div className="insider-page">
      <div className="insider-grid-bg"></div>

      <header className="insider-header">
        <div>
          <p className="eyebrow">CyberDrill • Hard Tier</p>
          <h1>Insider Data Theft</h1>
          <p className="subtitle">
            Monitor suspicious employee activity, contain exfiltration, and
            respond like a real security analyst.
          </p>
        </div>

        <div className="header-actions">
          <button className="secondary-btn" onClick={handleReset}>
            Reset Simulation
          </button>
          {outcome?.type === "success" && (
            <button
              onClick={completeAttack}
              className="complete-btn"
            >
              Complete Attack
            </button>
          )}
        </div>
      </header>

      <section className="scenario-card">
        <div className="scenario-left">
          <h2>Scenario Brief</h2>
          <p>
            A company employee has initiated a transfer of a sensitive archive:
            <strong> company_database_backup.zip</strong>.
          </p>
          <p>
            The activity occurred <strong>after working hours</strong>, from a
            <strong> personal laptop</strong>, to an
            <strong> external destination</strong>.
          </p>
        </div>

        <div className="scenario-right">
          <div className={statusBadgeClass}>
            {transferStatus === "blocked"
              ? "TRANSFER BLOCKED"
              : transferStatus === "completed"
              ? "TRANSFER COMPLETED"
              : "TRANSFER IN PROGRESS"}
          </div>
        </div>
      </section>

      <div className="main-layout">
        <section className="panel monitoring-panel">
          <div className="panel-header">
            <h3>Security Monitoring Dashboard</h3>
            <span className="panel-tag">Live Incident</span>
          </div>

          <div className="details-grid">
            <div className="detail-box">
              <span className="detail-label">Employee</span>
              <span className="detail-value">employee_john</span>
            </div>
            <div className="detail-box">
              <span className="detail-label">Source</span>
              <span className="detail-value">Internal Backup Server</span>
            </div>
            <div className="detail-box">
              <span className="detail-label">File</span>
              <span className="detail-value">company_database_backup.zip</span>
            </div>
            <div className="detail-box">
              <span className="detail-label">Size</span>
              <span className="detail-value">4.2 GB</span>
            </div>
            <div className="detail-box">
              <span className="detail-label">Device</span>
              <span className="detail-value">Personal Laptop</span>
            </div>
            <div className="detail-box">
              <span className="detail-label">Time</span>
              <span className="detail-value">22:47</span>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-head">
              <span>Transfer Progress</span>
              <span>{transferProgress}%</span>
            </div>
            <div className="progress-track">
              <div
                className={`progress-fill ${
                  transferStatus === "blocked" ? "blocked" : ""
                }`}
                style={{ width: `${transferProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="network-flow">
            <div className="flow-node">Employee Device</div>
            <div className="flow-arrow">→</div>
            <div className="flow-node">Internal Server</div>
            <div className="flow-arrow">→</div>
            <div className="flow-node danger">External Destination</div>
          </div>
        </section>

        <section className="panel indicators-panel">
          <div className="panel-header">
            <h3>Risk Indicators</h3>
            <span className="panel-tag red">Critical</span>
          </div>

          <ul className="indicator-list">
            {suspiciousIndicators.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <div className="concept-box">
            <h4>Concept</h4>
            <p>
              <strong>Insider Threat:</strong> a trusted user misuses legitimate
              access to steal or expose sensitive data.
            </p>
          </div>
        </section>
      </div>

      <section className="panel action-panel">
        <div className="panel-header">
          <h3>Analyst Actions</h3>
          <span className="panel-tag">Decision Console</span>
        </div>

        <div className="action-grid">
          <button className="danger-btn" onClick={handleAllowTransfer}>
            Allow Transfer
          </button>

          <button className="action-btn" onClick={handleBlockTransfer}>
            Block Transfer
          </button>

          <button className="action-btn" onClick={handleAlertAdmin}>
            Alert Administrator
          </button>

          <button className="action-btn" onClick={handleInvestigateUser}>
            Investigate User Activity
          </button>

          <button className="action-btn" onClick={handleInspectDestination}>
            Inspect Destination
          </button>

          <button className="action-btn" onClick={handlePreserveEvidence}>
            Preserve Evidence
          </button>

          <button className="action-btn" onClick={handleQuarantineAccount}>
            Quarantine Account
          </button>

          <button className="finalize-btn" onClick={handleFinalize}>
            Finalize Incident Response
          </button>
        </div>
      </section>

      <div className="bottom-layout">
        <section className="panel log-panel">
          <div className="panel-header">
            <h3>Event Log</h3>
            <span className="panel-tag">SOC Feed</span>
          </div>

          <div className="log-list">
            {logs.map((log, index) => (
              <div key={index} className="log-item">
                {log}
              </div>
            ))}
          </div>
        </section>

        <section className="panel evidence-panel">
          <div className="panel-header">
            <h3>Response Checklist</h3>
            <span className="panel-tag">Case Status</span>
          </div>

          <div className="checklist">
            <div className={userInvestigated ? "check-item done" : "check-item"}>
              User activity investigated
            </div>
            <div
              className={destinationInspected ? "check-item done" : "check-item"}
            >
              Destination inspected
            </div>
            <div className={adminAlerted ? "check-item done" : "check-item"}>
              Administrator alerted
            </div>
            <div
              className={evidencePreserved ? "check-item done" : "check-item"}
            >
              Evidence preserved
            </div>
            <div
              className={accountQuarantined ? "check-item done" : "check-item"}
            >
              Account quarantined
            </div>
            <div
              className={
                transferStatus === "blocked" ? "check-item done" : "check-item"
              }
            >
              Transfer blocked
            </div>
          </div>
        </section>
      </div>

      {outcome && (
        <section className={outcomeClass}>
          <h3>{outcome.title}</h3>
          <p>{outcome.description}</p>

          <div className="outcome-note">
            {outcome.type === "success" && (
              <>
                Best practice: contain the transfer, escalate the incident, and
                preserve evidence for investigation.
              </>
              
            )}

            {outcome.type === "partial" && (
              <>
                This response helped, but a hard-tier incident requires full
                containment plus proper escalation and evidence handling.
              </>
            )}

            {outcome.type === "failure" && (
              <>
                Unknown or suspicious internal transfers should never be trusted
                without investigation and containment.
              </>
            )}
          </div>
        </section>
      )}
    </div>
    </>
  );
}

export default InsiderDataTheft;