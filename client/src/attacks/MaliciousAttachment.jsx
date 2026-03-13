import SimulationNavbar from "../components/SimulationNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function MaliciousAttachment() {
  const navigate = useNavigate();
  const [view, setView] = useState("briefing"); 
  const [logs, setLogs] = useState([]);

  const malwareLogs = [
    "Opening file: invoice.pdf.exe...",
    "Initializing executable...",
    "Injecting malicious payload...",
    "Establishing remote connection...",
    "Access granted to attacker...",
    "System status: COMPROMISED"
  ];

  useEffect(() => {
    if (view === "terminal") {
      let i = 0;

      const interval = setInterval(() => {
        setLogs((prev) => [...prev, malwareLogs[i]]);
        i++;

        if (i === malwareLogs.length) {
          clearInterval(interval);

          setTimeout(() => {
            setView("compromised");
          }, 1200);
        }

      }, 700);

      return () => clearInterval(interval);
    }
  }, [view]);

  const completeAttack = async () => {

  const userId = localStorage.getItem("userId");

  await axios.post("http://localhost:5000/api/completeAttack",{
      userId: userId,
      attackId: 3
  });

  navigate("/dashboard");

    };

  return (
    <>
    <SimulationNavbar />
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-8">
      {/* BRIEFING SCREEN */}
{view === "briefing" && (
  <div className="bg-gray-900 p-8 rounded-xl w-[650px] border border-cyan-500 shadow-xl">

    <h2 className="text-2xl font-bold text-cyan-400 mb-4">
      Attack Briefing
    </h2>

    <p className="text-gray-300 mb-4">
      In this simulation you will encounter a suspicious email containing an attachment.
      Attackers frequently use email attachments to deliver malware to victims.
    </p>

    <div className="bg-gray-800 p-4 rounded mb-4">
      <p className="text-gray-300">
        <b>Objective:</b>
      </p>

      <ul className="list-disc ml-6 mt-2 text-gray-400">
        <li>Identify suspicious attachments</li>
        <li>Avoid executing malicious files</li>
        <li>Use security tools to verify files</li>
      </ul>
    </div>

    <div className="bg-gray-800 p-4 rounded mb-6">
      <p className="text-gray-300">
        <b>Concepts Covered:</b>
      </p>

      <ul className="list-disc ml-6 mt-2 text-gray-400">
        <li>Malware delivery through email</li>
        <li>Double file extensions</li>
        <li>Executable file disguise</li>
      </ul>
    </div>

    <div className="flex justify-end">
      <button
        onClick={() => setView("email")}
        className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded font-semibold"
      >
        Start Simulation
      </button>
    </div>

  </div>
)}

      {/* EMAIL VIEW */}
      {view === "email" && (
        <div className="bg-gray-900 p-8 rounded-xl w-[650px] border border-gray-700 shadow-xl">

          <h2 className="text-xl font-semibold mb-6">Inbox</h2>

          <div className="bg-gray-800 p-5 rounded-lg mb-6">

            <p><b>From:</b> accounts@billing-support.com</p>
            <p><b>Subject:</b> Invoice for March</p>

            <div className="mt-4 text-gray-300">
              Dear Customer,
              <br/><br/>
              Please review the attached invoice for your recent transaction.
              <br/><br/>
              Regards,<br/>
              Billing Department
            </div>

            <div className="mt-6 bg-gray-700 p-3 rounded flex justify-between items-center">

              <div>
                📎 <b>invoice.pdf.exe</b>
                <div className="text-sm text-gray-400">
                  Size: 84.3 MB
                </div>
              </div>

              <button
                onClick={() => setView("terminal")}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Open Attachment
              </button>

            </div>

          </div>

          <div className="flex gap-4 justify-center">

            <button
              onClick={() => setView("scan")}
              className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded"
            >
              Scan File
            </button>

            <button
              onClick={() => setView("deleted")}
              className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded"
            >
              Delete Email
            </button>

          </div>

        </div>
      )}

      {/* TERMINAL ANIMATION */}
      {view === "terminal" && (
  <div className="w-[650px] bg-gray-900 rounded-lg shadow-xl border border-gray-700 overflow-hidden">

    {/* Window Header */}
    <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">

      <div className="flex items-center gap-2">

        {/* Window Buttons */}
        <span className="w-3">-</span>
        <span className="w-3 ">▢ </span>
        <span className="w-3 ">X</span>

      </div>

      <div className="text-sm text-gray-300 font-semibold">
        C:\WINDOWS\system32\cmd.
      </div>

      <div></div>

    </div>

    {/* Terminal Body */}
    <div className="bg-black h-[300px] overflow-y-auto p-4 font-mono text-green-400 text-sm">

      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}

      {/* Blinking cursor */}
      <span className="animate-pulse">█</span>

    </div>

  </div>
)}

      {/* COMPROMISED RESULT */}
      {view === "compromised" && (
        <div className="bg-cyan-50 p-8 rounded-xl w-[600px] text-center">

          <h2 className="text-2xl font-bold mb-4">
            Malware Executed!
          </h2>

          <p className="text-red-200">
            The attachment you opened contained malicious code disguised
            as a PDF document.
          </p>

          <p className="mt-4 text-gray-300">
            Attackers often use <b>double file extensions</b> like:
          </p>

          <div className="mt-2 text-gray-400">
            invoice.pdf.exe<br/>
            photo.jpg.exe<br/>
            report.docx.exe
          </div>

          <button
            onClick={() => setView("email")}
            className="mt-6 bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded"
          >
            Restart Simulation
          </button>

        </div>
      )}

      {/* SCAN RESULT */}
      {view === "scan" && (
        <div className="bg-gray-900 p-8 rounded-xl w-[600px] border border-cyan-500 text-center">

          <h2 className="text-xl font-semibold mb-4">
            Antivirus Scan
          </h2>

          <p className="text-cyan-300">
            Threat Detected!
          </p>

          <p className="mt-4 text-gray-300">
            The attachment <b>invoice.pdf.exe</b> contains hidden malware.
          </p>

          <p className="mt-2 text-gray-400">
            The ".exe" extension means it is an executable program,
            not a PDF document.
          </p>

          <button
            onClick={completeAttack}
            className="mt-6 px-4 py-2 bg-green-500 text-black font-semibold rounded"
            >
            Complete Attack
            </button>

        </div>
      )}

      {/* DELETE RESULT */}
      {view === "deleted" && (
        <div className="bg-gray-900 p-8 rounded-xl w-[600px] border border-gray-700 text-center">

          <h2 className="text-xl font-semibold mb-4">
            Email Deleted
          </h2>

          <p className="text-gray-300">
            You deleted the email without interacting with the attachment.
          </p>

          <p className="mt-2 text-gray-400">
            Suspicious attachments should be verified before opening.
          </p>

          <button
            onClick={() => setView("email")}
            className="mt-6 bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded"
          >
            Restart Simulation
          </button>

        </div>
      )}

    </div>
    </>
  );
}

export default MaliciousAttachment;