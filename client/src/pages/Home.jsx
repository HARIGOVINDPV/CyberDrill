import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white relative ">

      {/* Background Glow */}
      <div className="absolute w-[2000px] h-[800px] bg-cyan-200/10 rounded-full blur-3xl"></div>

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 relative z-10">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="CyberDrill Logo"
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-bold text-cyan-400">CyberDrill</h1>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Log In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-6 relative z-10">
        
        <h2 className="text-5xl font-bold mb-6">
          Welcome to Cyber<span className="text-cyan-400">Drill</span>
        </h2>

        <h6 className="text-xl font-bold mb-6">
          Train Against Real-World Cyber Attacks
        </h6>

        <p className="max-w-2xl mx-auto text-gray-400 text-lg">
          CyberDrill is an interactive cyber attack simulation platform<br></br>
          designed to educate and train users on cybersecurity<br></br>
          practices in a safe and controlled environment.
        </p>
      </section>

      {/* Features Section */}
      <section className="text-center grid md:grid-cols-3 gap-3 px-6 py-1 pb-9">

        <div className="px-6 py-9 border border-gray-700 rounded-lg hover:border-cyan-400 transition">
          <h3 className="text-xl font-semibold mb-3">Simulated Cyber Attacks</h3>
          <p className="text-gray-400">
            Engage in realistic, hands-on simulations of various cyber attack scenarios, including phishing, malware, and more.
          </p>
        </div>

        <div className="px-6 py-9 border border-gray-700 rounded-lg hover:border-cyan-400 transition">
          <h3 className="text-xl font-semibold mb-3">Learn Defense Techniques</h3>
          <p className="text-gray-400">
            Learn step-by-step Defence, prevention, and recovery techniques to secure systems against cyber threats.
          </p>
        </div>

        <div className="px-6 py-9 border border-gray-700 rounded-lg hover:border-cyan-400 transition">
          <h3 className="text-xl font-semibold mb-3">Track Progress & Earn Rewards</h3>
          <p className="text-gray-400">
            Monitor your progress,earn points, and unlock achievements as you develop your cybersecurity skills.
          </p>
        </div>
      </section>
    
      <section className="text-center p-10 py-15 px-2">

        <h2 className="text-2xl mb-6">
          Build Your Cyber Defence Skills
        </h2>
        <p className="max-w-2xl mx-auto text-gray-400 text-lg">
          Join CyberDrill to test your knowledge ,learn cybersecurity tactics, <br></br> and enhance your ability to defend against real-world attacks.
        </p> 
      </section>

      {/* Start Button Section */}
      <section className="text-center py-10 relative z-10">
        <button
          onClick={() => navigate("/register")}
          className="mt-10 px-9 py-4 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition"
        >
          Start Your First Drill
        </button>

        <p className="text-xs text-gray-500 mt-5">
          🛡️ All simulations are safe and run in a controlled environment.
        </p>
      </section>
      
      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-800 text-gray-500">
        <p>
          designed & powered by
        </p>
        <h3 className="text-3xl font-bold mb-6">
          CyberFox
        </h3>
      </footer>

    </div>
  );
}