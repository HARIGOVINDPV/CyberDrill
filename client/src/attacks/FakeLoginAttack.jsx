import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FakeLoginAttack({ completeAttack, addScore }) {

  const navigate = useNavigate();

  const [step, setStep] = useState("warning");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  // WARNING SCREEN
  if (step === "warning") {
    return (
      <div className="attack-container">

        <h2>CyberDrill Simulation Warning</h2>

        <p>
          This simulation demonstrates phishing attacks.
          No real credentials will be stored or transmitted.
        </p>

        <button onClick={() => setStep("popup")}>
          Start Simulation
        </button>

      </div>
    );
  }



  // SOCIAL MEDIA POPUP
  if (step === "popup") {
    return (
      <div className="attack-container">

        <h2>Support CyberDrill</h2>

        <p>
          Follow the creator of CyberDrill on social media for updates.
        </p>

        <div className="button-group">

          <button onClick={() => setStep("fakeLogin")}>
            Open Social Media
          </button>

          <button onClick={() => setStep("paypalAttack")}>
            No, Continue Attack
          </button>

        </div>

      </div>
    );
  }



  // FAKE SOCIAL LOGIN PAGE
  if (step === "fakeLogin") {
    return (
      <div className="attack-container">

        <h2>Social Media Login</h2>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={() => setStep("captured")}>
          Log In
        </button>

      </div>
    );
  }



  // PHISHING SUCCESS RESULT
  if (step === "captured") {

    // award small score because user failed attack
    addScore(5);

    return (
      <div className="attack-container">

        <h2 style={{ color: "red" }}>⚠ Phishing Attack Successful</h2>

        <p>
          You entered credentials into an unverified login page.
        </p>

        <div className="captured-box">

          <h3>Captured Data (Simulation)</h3>

          <p>Username: {username}</p>

          <p>Password: {"*".repeat(password.length)}</p>

        </div>

        <p>
          CyberDrill did NOT store your credentials.
          This was a safe simulation.
        </p>

        <button
          onClick={() => {
            completeAttack("fake-login");
            navigate("/dashboard");
          }}
        >
          Return to Dashboard
        </button>

      </div>
    );
  }



  // PAYPAL ATTACK PLACEHOLDER
  if (step === "paypalAttack") {
    return (
      <div className="attack-container">

        <h2>Fake PayPal Login</h2>

        <p>
          You received a login link:
        </p>

        <p className="fake-url">
          https://secure-paypal-login.net
        </p>

        <div className="button-group">

          <button onClick={() => setStep("paypalLogin")}>
            Open Login Page
          </button>

          <button onClick={() => setStep("inspect")}>
            Inspect URL
          </button>

          <button onClick={() => setStep("close")}>
            Close Page
          </button>

        </div>

      </div>
    );
  }



  // CORRECT RESPONSE
  if (step === "inspect") {

    addScore(20);

    return (
      <div className="attack-container">

        <h2 style={{ color: "lime" }}>✔ Correct Decision</h2>

        <p>
          This website was a fake login portal.
          Always verify domains before entering credentials.
        </p>

        <button
          onClick={() => {
            completeAttack("fake-login");
            navigate("/dashboard");
          }}
        >
          Finish Attack
        </button>

      </div>
    );
  }



  // USER CLOSED PAGE
  if (step === "close") {

    addScore(15);

    return (
      <div className="attack-container">

        <h2>Safe Action</h2>

        <p>
          Closing suspicious pages is a safe choice.
        </p>

        <button
          onClick={() => {
            completeAttack("fake-login");
            navigate("/dashboard");
          }}
        >
          Finish Attack
        </button>

      </div>
    );
  }



}

export default FakeLoginAttack;