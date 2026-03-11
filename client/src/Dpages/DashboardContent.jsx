import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CyberNews from "../components/CyberNews";
import axios from "axios";

function DashboardContent() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [news, setNews] = useState([]);
  const [currentAttack,setCurrentAttack] = useState(null)
  const [upcomingAttack,setUpcomingAttack] = useState(null)

  useEffect(() => {
    const fetchScore = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/score", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setScore(data.score);
    };

    fetchScore();
  }, []);
  useEffect(() => {
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/TheHackersNews")
      .then(res => res.json())
      .then(data => {
        setNews(data.items.slice(0,2)); // only 2 news because you have 2 cards
      });
  }, []);

  useEffect(()=>{

  const userId = localStorage.getItem("userId")

  axios.get(`http://localhost:5000/api/dashboard/${userId}`)
  .then(res=>{
      setCurrentAttack(res.data.currentAttack)
      setUpcomingAttack(res.data.upcomingAttack)
  })

  },[])

  return (
    <div className="content">

      <h2 className="text-xl " >Welcome to Cyber<span className="text-cyan-400">Drill!</span></h2>
      <h2 className="text-xl text-cyan-400">Score: {score}</h2>
      <p className="subtitle">
        Simulated Cyber Attack Training and Defense
      </p>

      <div className="card-grid py-4 ">

        {currentAttack && (
        <div className="card">
          <h3>Current Attack</h3>
          <p>{currentAttack.title}</p>

          <button
            onClick={() => navigate(`/${currentAttack.title.toLowerCase().replace(/\s/g,"-")}`)}
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
            className="mt-10 px-4 py-0 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition">Get Guidance</button>
        </div>

      </div>

      <hr className="section-divider" />
      <div className="challenges card-grid">
        <h2>Latest Challenges</h2>
      </div>
      <div className="card-grid rows ">

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

        {/* check*/}
        <div className="card">
          <h3>BruteForce</h3>
            <button onClick={() => navigate("/bruteforce")}
            className="mt-10 px-4 py-2 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
          >
              Start
            </button>
        </div>

      </div>
      <div className="py-4">
        <button
          className="mt-4 px-4 py-0 bg-cyan-950 item-center text-black font-semibold rounded hover:bg-cyan-400 transition"
        >
          View All Challenges
        </button>
      </div>
      <hr className=" section-divider" />
      <div className="challenges card-grid">
        <h2></h2>
      </div>
            
      <div className="challenges card-grid">
        <h2>Security News & Updates</h2>
      </div>

      <div className="card-grid-rows-2 py-4">

        {news.map((item, index) => (
          <div
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
      <hr className=" section-divider" />
      <div className="challenges card-grid">
        <h2>Recommended Courses ( ON PROGRESS )</h2>
      </div>
      <div className="card-grid rows">
        <div className="card">
          <h3>Introduction to Cybersecurity</h3>
          <button className="mt-10 px-4 py-0 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
          onClick={() => navigate("/wip")}
          >Start Course</button>
        </div>
        <div className="card">
          <h3>Web Application Security</h3>
          <button className="mt-10 px-4 py-0 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
          onClick={() => navigate("/wip")}
          >Start Course</button>
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