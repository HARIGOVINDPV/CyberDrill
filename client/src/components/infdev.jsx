import { useNavigate } from "react-router-dom";

function AttackLauncher() {
  const navigate = useNavigate();

  const attacks = [
    {
      id: 1,
      name: "Spear Phishing",
      path: "/spear-phishing"
    },
    {
      id: 2,
      name: "BruteForce",
      path: "/bruteforce"
    },
    {
      id: 3,
      name: "MaliciousAttachment",
      path: "/maliciousattachment"
    },
    {
      id: 4,
      name: "USB Drop Attack",
      path: "/usb-drop-attack"
    },
    {
      id: 5,
      name: "Fake Update",
      path: "/fake-update"
    },
    {
      id: 6,
      name: "fake-login",
      path: "/fake-login"
    },
    {
      id: 7,
      name: "public-wifi-mitm",
      path: "/public-wifi-mitm"
    },
    {
      id: 8,
      name: "credential-stuffing",
      path: "/credential-stuffing"
    },
    {
      id: 9,
      name: "typosquatting",
      path: "/typosquatting"
    },
    {
      id: 10,
      name: "malware-download",
      path: "/malware-download"
    }
    
  ];

  return (
    <div className="attack-launcher">

      <div className="attack-list">
        {attacks.map((attack) => (
          <div className="attack-card" key={attack.id}>
            <h2>{attack.name}</h2>
            <p>{attack.description}</p>

            <button
              className=" bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
              onClick={() => navigate(attack.path)}
            >
              Start Attack
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttackLauncher;