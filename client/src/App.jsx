import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoadingScreen from "./components/LoadingScreen";

import Dashboard from "./pages/Dashboard";
import DashboardContent from "./Dpages/DashboardContent";
import Scenarios from "./Dpages/Scenarios";
import ProgressTracker from "./Dpages/ProgressTracker";
import ContactUs from "./components/ContactUs";
import WorkInProgress from "./pages/WorkInProgress";
import News from "./pages/News";

//temp
import AttackLauncher from "./components/infdev";

//basic tier attacks
import SpearPhishing from "./attacks/SpearPhishing";
import BruteForce from "./attacks/BruteForce";
import MaliciousAttachment from "./Attacks/MaliciousAttachment";
import UsbDropAttack from "./attacks/UsbDropAttack";
import FakeUpdateAttack from "./attacks/FakeUpdateAttack";

//Intermediate tier attacks
import FakeLoginAttack from "./attacks/FakeLoginAttack";
import PublicWifiMITM from "./attacks/PublicWifiMITM";
import CredentialStuffing from "./attacks/CredentialStuffing";
import TyposquattingAttack from "./attacks/TyposquattingAttack";
import MalwareDownload from "./attacks/MalwareDownload";

//Hard tier attacks
import RansomwareAttack from "./attacks/RansomwareAttack";

function App() {
  return (
    <Routes>

      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/loading" element={<LoadingScreen />} />

      {/* Dashboard Layout */}
      <Route path="/dashboard" element={<Dashboard />}>

        <Route index element={<DashboardContent />} />
        <Route path="scenarios" element={<Scenarios />} />
        <Route path="progress" element={<ProgressTracker />} />
        <Route path="leaderboard" element={<WorkInProgress />} />

      </Route>
      <Route path="/contact" element={<ContactUs />} />
      {/* Other Pages */}
      <Route path="/news" element={<News />} />

      {/*temp*/}
      <Route path="/attacks" element={<AttackLauncher />} />

      {/* Attack Simulations */}
      {/* Basic Tier */}
      <Route path="/spear-phishing" element={<SpearPhishing />} />
      <Route path="/bruteforce" element={<BruteForce />} />
      <Route path="/maliciousattachment" element={<MaliciousAttachment />} />
      <Route path="/usb-drop-attack" element={<UsbDropAttack />} />
      <Route path="/fake-update" element={<FakeUpdateAttack />} />

      {/*Intermediate Tier */}
      <Route path="/fake-login" element={<FakeLoginAttack />} />
      <Route path="/public-wifi-mitm" element={<PublicWifiMITM />} />
      <Route path="/credential-stuffing" element={<CredentialStuffing />} />
      <Route path="/typosquatting" element={<TyposquattingAttack />} />
      <Route path="/malware-download" element={<MalwareDownload />} />

      {/*High Tier */}
      <Route path="/ransomware" element={<RansomwareAttack />} />

      {/* WIP */}
      <Route path="/wip" element={<WorkInProgress />} />

    </Routes>
  );
}

export default App;