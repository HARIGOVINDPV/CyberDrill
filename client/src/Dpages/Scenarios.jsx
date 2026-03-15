import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Scenarios.css";

function Scenarios() {
  const [scenarios, setScenarios] = useState([]);
  const [tier, setTier] = useState("");
  const [profession, setProfession] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    fetch(`http://localhost:5000/api/scenarios/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setScenarios(data.scenarios || []);
        setTier(data.tier || "");
        setProfession(data.profession || "");
      })
      .catch((err) => console.error("Failed to fetch scenarios:", err));
  }, []);

  const handleStart = (scenario) => {
    if (scenario.status === "locked") return;

    navigate(scenario.route, {
      state: {
        isRedo: scenario.status === "completed",
      },
    });
  };

  const formatTitle = (title) => {
    return title
      .replace(/-/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="scenarios-page">
      <div className="scenarios-header">
        <div>
          <h2>Scenarios</h2>
          <p className="scenarios-subtitle">
            Practice cyber attacks based on your current tier
          </p>
        </div>

        <div className="scenarios-info">
          <span className="info-badge">Profession: {profession}</span>
          <span className="info-badge">Tier: {tier}</span>
        </div>
      </div>

      <div className="scenario-grid">
        {scenarios.map((scenario) => (
          <div key={scenario.id} className={`scenario-card ${scenario.status}`}>
            <div className="card-top">
              <h3>{formatTitle(scenario.title)}</h3>
              <span className={`status-badge ${scenario.status}`}>
                {scenario.status}
              </span>
            </div>

            <div className="card-middle">
              <div className="card-info-box">
                <span className="label">Tier</span>
                <span className="value">{scenario.tier}</span>
              </div>

              <div className="card-info-box">
                <span className="label">Points</span>
                <span className="value">{scenario.points}</span>
              </div>
            </div>

            <button
              className={`scenario-btn ${scenario.status}`}
              disabled={scenario.status === "locked"}
              onClick={() => handleStart(scenario)}
            >
              {scenario.status === "completed"
                ? "Redo"
                : scenario.status === "unlocked"
                ? "Start"
                : "Locked"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scenarios;