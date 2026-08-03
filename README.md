# 🛡️ CyberDrill
### Train Against Real-World Cyber Attacks

CyberDrill is an interactive **Cyber Attack & Defence Simulator** developed as a final semester diploma project in **Cyber Forensics**. The platform provides a safe, gamified environment where users can experience realistic cyber attack scenarios, learn how attacks work, and practice the correct defensive responses without putting their systems at risk.

---

## 📖 About

CyberDrill bridges the gap between cybersecurity theory and practical experience by simulating common cyber attacks in a controlled environment.

Instead of reading about attacks, users interact with realistic scenarios, make decisions, observe the consequences of their actions, and learn the correct mitigation techniques.

The project is intended for:

- 🎓 Students learning Cyber Security
- 👨‍💻 Beginners entering Cyber Security
- 🏢 Organizations conducting awareness training
- 🔒 Anyone interested in improving cyber hygiene

---

## ✨ Features

- Secure User Authentication
- User Registration & Login
- Password Validation
- Interactive Attack Simulations
- Step-by-Step Learning
- Decision-Based Outcomes
- Safe Simulated Environment
- Modern Responsive UI
- Progress Tracking (In Development)
- Scoring & Achievements (Coming Soon)

---

# 🖥 Technology Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- SQLite
- JWT Authentication
- bcrypt Password Hashing

---

# 📂 Project Structure

```
CyberDrill/
│
├── client/                 # React Frontend
│   ├── src/
│   │    ├── assets/
│   │    ├── components/
│   │    ├── pages/
│   │    └── App.jsx
│   └── package.json
│
├── server/                 # Express Backend
│   ├── server.js
│   ├── cyberdrill.db
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/HARIGOVINDPV/CyberDrill.git
```

```bash
cd CyberDrill
```

---

## Install Frontend

```bash
cd client
npm install
```

Run frontend

```bash
npm run dev
```

---

## Install Backend

Open another terminal

```bash
cd server
npm install
```

Run backend

```bash
npm start
```

Backend runs on

```
http://localhost:5000
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔐 Authentication

CyberDrill uses

- JWT Authentication
- bcrypt Password Hashing
- SQLite Database

Passwords are never stored in plain text.

---

# 🎮 Current Simulations

## 🟢 Basic Tier

- Phishing Email
- Fake Login Page
- Malicious Email Attachment
- USB Drop Attack
- Fake Software Update

---

## 🟡 Intermediate Tier

- Credential Harvesting
- Public WiFi Man-in-the-Middle
- Credential Stuffing
- Typosquatting Website
- Cracked Software Malware

---

## 🔴 Hard Tier

- Ransomware Attack
- Insider Data Theft
- DDoS Attack
- Data Breach Investigation

---

# 📚 Learning Objectives

Each simulation teaches:

- Attack Identification
- Threat Analysis
- Correct Response
- Prevention Techniques
- Security Best Practices
- Basic Incident Response
- Digital Forensics Concepts

---

# 📸 Screenshots

### Login

<img width="584" height="1038" alt="image" src="https://github.com/user-attachments/assets/6e27d717-e7a3-4c3c-85ed-d03862ec0b0e" />

### Dashboard

<img width="625" height="1112" alt="image" src="https://github.com/user-attachments/assets/42c2fd9f-6e2b-4ef4-b293-55062f11459d" />


### Attack Simulation

<img width="584" height="1042" alt="image" src="https://github.com/user-attachments/assets/9bc67da5-e8f6-4654-8cd7-83c31e2289fd" />


---

# 🛠 Roadmap

### Completed

- User Authentication
- Registration
- Login
- Dashboard
- Interactive Simulations
- Responsive UI

### Planned

- Experience Points (XP)
- Achievement System
- Leaderboards
- User Profiles
- Difficulty Progression
- Scenario Randomization
- Admin Panel
- Analytics Dashboard
- PostgreSQL Support
- Deployment

---

# 🤝 Contributing

Contributions, feature suggestions and bug reports are welcome.

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Add feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is developed for educational purposes.

---

# 👨‍🎓 Author

**HG**

Diploma in Cyber Forensics

Final Semester Project

---

# ⚠ Disclaimer

CyberDrill is an educational cyber security simulator.

All attack scenarios are simulated within a controlled environment.

No real attacks are performed against users or external systems.

The project is intended solely for cybersecurity education, awareness, and defensive training.

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps others discover the project and supports future development.
