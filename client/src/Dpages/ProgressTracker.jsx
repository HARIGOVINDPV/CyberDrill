import { useEffect, useState } from "react";
import "./ProgressTracker.css";

function ProgressTracker() {
  const [earnedScore, setEarnedScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ Edit this whenever you want to change the total possible score
  const TOTAL_SCORE = 860;

  useEffect(() => {
    const fetchUserScore = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/score", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch score");
        }

        const data = await res.json();

        // Assumes backend returns: { score: number }
        setEarnedScore(data.score || 0);
      } catch (error) {
        console.error("Error fetching progress score:", error);
        setEarnedScore(0);
      } finally {
        setLoading(false);
      }
    };

    fetchUserScore();
  }, []);

  const progressPercentage =
    TOTAL_SCORE > 0 ? Math.min((earnedScore / TOTAL_SCORE) * 100, 100) : 0;

  return (
    <div className="progress-tracker-page">
      <h1 className="progress-title">Progress Tracker</h1>

      {loading ? (
        <p className="progress-loading">Loading progress...</p>
      ) : (
        <>
          <div className="progress-summary-card">
            <h2>Your Progress</h2>
            <p>
              <strong>Earned Score:</strong> {earnedScore}
            </p>
            <p>
              <strong>Total Score:</strong> {TOTAL_SCORE}
            </p>
            <p>
              <strong>Completion:</strong> {progressPercentage.toFixed(1)}%
            </p>
          </div>

          <div className="progress-bar-wrapper">
            <div className="progress-bar-background">
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="progress-marks-card">
            <h3>Score Progress</h3>
            <div className="progress-scale">
              <span>0</span>
              <span>{Math.floor(TOTAL_SCORE * 0.25)}</span>
              <span>{Math.floor(TOTAL_SCORE * 0.5)}</span>
              <span>{Math.floor(TOTAL_SCORE * 0.75)}</span>
              <span>{TOTAL_SCORE}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProgressTracker;