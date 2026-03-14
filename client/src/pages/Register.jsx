import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/CyberDrillLogoNoBg.png";
import "./register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profession: "student"
  });
  
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    // KEEP your existing register logic here
    // Just make sure you're sending:
    // username, email, password, profession
    const { password, confirmPassword } = formData;

    // Password pattern
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login"); // 🔥 Redirect to login
      } else {
        alert(data.message || "Registration failed");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="register-container">

      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl"></div>

      {/* Logo OUTSIDE box */}
      <div className="flex flex-col items-center mb-6 relative z-10">
        <img src={logo} alt="CyberDrill Logo" className="w-40" />
        <h1 className="text-4xl font-bold text-white">
        </h1>
        <p className="text-cyan-400 mt-2 text-sm tracking-wide">
            Train Against Real-World Cyber Attacks
        </p>
      </div>

      <form className="register-box" onSubmit={handleRegister}>
        <h2>Create Your Account</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <select
          name="profession"
          value={formData.profession}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="professional">Professional</option>
          <option value="common">None of Above</option>
        </select>

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">
            {error}
          </p>
        )}

        <button type="submit">Sign Up</button>

       
        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Login
          </Link>
        </p>

        <p className="text-xs text-gray-500 mt-4 text-center">
          🛡️ All simulations are safe and run in a controlled environment.
        </p>

      </form>
    </div>
  );
}

export default Register;