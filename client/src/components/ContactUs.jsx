import SimulationNavbar from "../components/SimulationNavbar";
import "./ContactUs.css";

function ContactUs() {
  return (
    <>
      <SimulationNavbar />
    <div className="contact-page">

      <h1 className="page-title">Developer</h1>

      <div className="member-card">
        <h2>Harigovind P.V ( Leader )</h2>

        <div className="social-buttons">
          <a href="https://linkedin.com" target="_blank">LinkedIn</a>
          <a href="https://github.com/HARIGOVINDPV" target="_blank">GitHub</a>
          <a href="https://www.instagram.com/hari._.govind._/" target="_blank">Instagram</a>
          <a href="https://www.instagram.com/cyber._.fox_">CyberFox</a>
        </div>
      </div>

      <h2 className="page-title ">Brainstorming Team</h2>

      <div className="member-card">
        <h2>Amin Sam ( Co-Leader )</h2>

        <div className="social-buttons">
          <a href="https://linkedin.com" target="_blank">LinkedIn</a>
          <a href="https://www.instagram.com/the_pacer_45/" target="_blank">Instagram</a>
        </div>
      </div>

      <div className="member-card">
        <h2>Geevan Varghese ( Co-Leader )</h2>

        <div className="social-buttons">
          <a href="https://linkedin.com" target="_blank">LinkedIn</a>
          <a href="https://instagram.com" target="_blank">Instagram</a>
        </div>
      </div>

      <div className="member-card">
        <h2>Muhammed Shahal</h2>

        <div className="social-buttons">
          <a href="https://linkedin.com" target="_blank">LinkedIn</a>
          <a href="https://instagram.com" target="_blank">Instagram</a>
        </div>
      </div>

      <div className="member-card">
        <h2>Abhilash B</h2>

        <div className="social-buttons">
          <a href="https://linkedin.com" target="_blank">LinkedIn</a>
          <a href="https://www.instagram.com/ab_h_i________________" target="_blank">Instagram</a>
        </div>
      </div>

    </div>
    </>
  );
}

export default ContactUs;