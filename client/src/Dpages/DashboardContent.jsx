import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function DashboardContent() {
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [news, setNews] = useState([]);
  const [currentAttack, setCurrentAttack] = useState(null);
  const [upcomingAttack, setUpcomingAttack] = useState(null);
  const [upcoming2Attack, setUpcoming2Attack] = useState(null);
  const [tier, setTier] = useState("");
  const [canUpgrade, setCanUpgrade] = useState(false);
  const [nextTier, setNextTier] = useState("");
  const [loadingUpgrade, setLoadingUpgrade] = useState(false);

  const userId = localStorage.getItem("userId");

  const getTierFromProfession = (profession) => {
    if (profession === "professional") return "hard";
    if (profession === "student") return "intermediate";
    return "basic";
  };

  useEffect(() => {
    const profession = localStorage.getItem("profession");
    setTier(getTierFromProfession(profession));
  }, []);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/score", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setScore(data.score);
      } catch (error) {
        console.error("Failed to fetch score:", error);
      }
    };

    fetchScore();
  }, []);

  useEffect(() => {
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TheHackersNews")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.items.slice(0, 2));
      })
      .catch((err) => console.error("Failed to fetch news:", err));
  }, []);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/dashboard/${userId}`)
      .then((res) => {
        setCurrentAttack(res.data.currentAttack);
        setUpcomingAttack(res.data.upcomingAttack);
        setUpcoming2Attack(res.data.upcoming2Attack);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard attacks:", err);
      });
  }, [userId, tier]);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/checkUpgrade/${userId}`)
      .then((res) => {
        setCanUpgrade(res.data.canUpgrade);
        setNextTier(res.data.nextTier || "");
      })
      .catch((err) => {
        console.error("Failed to check upgrade:", err);
      });
  }, [userId, tier]);

  const handleUpgrade = async () => {
    try {
      setLoadingUpgrade(true);

      const res = await axios.post("http://localhost:5000/api/upgradeTier", {
        userId,
      });

      const newProfession = res.data.profession;
      const newTier = res.data.tier;

      localStorage.setItem("profession", newProfession);
      setTier(newTier);
      setCanUpgrade(false);

      alert(`Successfully upgraded to ${newTier} tier!`);
    } catch (error) {
      console.error("Upgrade failed:", error);
      alert(error.response?.data?.error || "Upgrade failed");
    } finally {
      setLoadingUpgrade(false);
    }
  };

  return (
    <div className="content">
      <h2 className="text-xl">
        Welcome to Cyber<span className="text-cyan-400">Drill!</span>
      </h2>

      <h2 className="text-xl text-cyan-400">Score: {score}</h2>

      <h2 className="text-sm text-gray-400">
        Training Tier: <span className="text-cyan-400">{tier}</span>
      </h2>

      <p className="subtitle">Simulated Cyber Attack Training and Defense</p>

      {canUpgrade && (
        <div className="my-4">
          <button
            onClick={handleUpgrade}
            disabled={loadingUpgrade}
            className="px-4 py-2 bg-green-500 text-black font-semibold rounded hover:bg-green-400 transition disabled:bg-gray-600 disabled:text-gray-300"
          >
            {loadingUpgrade ? "Upgrading..." : `Upgrade to ${nextTier}`}
          </button>
        </div>
      )}

      <div className="card-grid py-4">
        {currentAttack && (
          <div className="card">
            <h3>Current Attack</h3>
            <p>{currentAttack.title}</p>

            <button
              onClick={() =>
                navigate(`/${currentAttack.title.toLowerCase().replace(/\s/g, "-")}`)
              }
              className="mt-10 px-4 py-2 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
            >
              Start
            </button>
          </div>
        )}

        <div className="card">
          <h2>Tips & Guidance</h2>
          <h5>Enhance your cyber defence skills.</h5>
          <button
            onClick={() => navigate("/wip")}
            className="mt-10 px-4 py-0 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
          >
            Get Guidance
          </button>
        </div>
      </div>

      <hr className="section-divider" />

      <div className="challenges card-grid">
        <h2>Latest Challenges</h2>
      </div>

      <div className="card-grid rows">
        {upcomingAttack && (
          <div className="card">
            <h3>Upcoming Attack</h3>
            <p>{upcomingAttack.title}</p>

            <button
              disabled
              className="mt-10 px-4 py-2 bg-gray-700 text-gray-300 font-semibold rounded"
            >
              Locked
            </button>
          </div>
        )}

        {upcoming2Attack && (
          <div className="card">
            <h3>Upcoming 2 Attack</h3>
            <p>{upcoming2Attack.title}</p>

            <button
              disabled
              className="mt-10 px-4 py-2 bg-gray-700 text-gray-300 font-semibold rounded"
            >
              Locked
            </button>
          </div>
        )}
        
        <div className="card">
          <h2>Trial</h2>
          <button
            onClick={() => navigate("/attacks")}
            className="mt-10 px-4 py-0 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
          >
            attacks
          </button>
        </div>
      
      </div>

      <div className="py-4">
        <button
          onClick={() => navigate("/dashboard/scenarios")}
          className="mt-4 px-4 py-0 bg-cyan-950 item-center text-black font-semibold rounded hover:bg-cyan-400 transition"
        >
          View All Challenges
        </button>
      </div>

      <hr className="section-divider" />

      <div className="challenges card-grid">
        <h2>Security News & Updates</h2>
      </div>

      <div className="card-grid-rows-2 py-4">
        {news.map((item, index) => (
          <div
            key={index}
            className="card cursor-pointer hover:scale-105 transition"
            onClick={() => navigate("/news", { state: item })}
          >
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

      <div className="py-4">
        <button
          onClick={() => window.open("https://thehackernews.com", "_blank")}
          className="mt-4 px-4 py-0 bg-cyan-950 item-center text-black font-semibold rounded hover:bg-cyan-400 transition"
        >
          Read More
        </button>
      </div>

      <hr className="section-divider" />

      <div className="challenges card-grid">
        <h2>Recommended Courses ( ON PROGRESS )</h2>
      </div>

      <div className="card-grid rows">
        <div className="card">
          <h3>Introduction to Cybersecurity</h3>
          <button
            className="mt-10 px-4 py-0 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
            onClick={() => navigate("/wip")}
          >
            Start Course
          </button>
        </div>

        <div className="card">
          <h3>Web Application Security</h3>
          <button
            className="mt-10 px-4 py-0 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
            onClick={() => navigate("/wip")}
          >
            Start Course
          </button>
        </div>
      </div>

      <div>
        <button
          className="mt-4 px-4 py-0 bg-cyan-950 item-center text-black font-semibold rounded hover:bg-cyan-400 transition"
          onClick={() => navigate("/wip")}
        >
          View All Courses
        </button>
      </div>
    </div>
  );
}

export default DashboardContent;