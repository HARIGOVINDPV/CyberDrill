const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "cyberdrill_secret";
const attacksByTier = {
  basic: [
    { id: 1, title: "Spear Phishing", points: 10, route: "/spear-phishing" },
    { id: 2, title: "BruteForce", points: 10, route: "/bruteforce" },
    { id: 3, title: "MaliciousAttachment", points: 15, route: "/malicious-attachment" },
    { id: 4, title: "usb-drop-attack", points: 15, route: "/usb-drop-attack" },
    { id: 5, title: "fake-update", points: 20, route: "/fake-update" }
  ],

  intermediate: [
    { id: 31, title: "fake-login", points: 50, route: "/fake-login" },
    { id: 32, title: "public-wifi-mitm", points: 50, route: "/public-wifi-mitm" },
    { id: 33, title: "credential-stuffing", points: 55, route: "/credential-stuffing" },
    { id: 34, title: "typosquatting", points: 55, route: "/typosquatting" },
    { id: 35, title: "malware-download", points: 60, route: "/malware-download" }
  ],

  hard: [
    { id: 61, title: "ransomware", points: 100, route: "/ransomware" },
    { id: 62, title: "insider-data-theft", points: 100, route: "/insider-data-theft" },
    { id: 63, title: "Zero Day Exploit", points: 105, route: "/zero-day-exploit" },
    { id: 64, title: "Insider Threat", points: 105, route: "/insider-threat" },
    { id: 65, title: "Privilege Escalation", points: 110, route: "/privilege-escalation" }
  ]
};

// Database setup
const db = new sqlite3.Database("./cyberdrill.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users1 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      password TEXT,
      profession TEXT,
      score INTEGER DEFAULT 0
    )
  `);

  // NEW TABLE FOR ATTACK PROGRESS
  db.run(`
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      attack_id INTEGER,
      completed INTEGER DEFAULT 0
    )
  `);
});

// Register
app.post("/api/register", async (req, res) => {
  const { username, email, password, profession } = req.body;

  const hashed = await bcrypt.hash(password, 10);

db.run(
  "INSERT INTO users1 (username, email, password, profession) VALUES (?, ?, ?, ?)",
  [username, email, hashed, profession],
    function (err) {
      if (err){
        return res.status(400).json({ error: "User exists" });
      }
      res.status(201).json({ message: "User registered" });
    }
  );
});

// Login
app.post("/api/login", (req, res) => {
  const { identifier, password } = req.body;

db.get(
  "SELECT * FROM users1 WHERE email = ? OR username = ?",
  [identifier, identifier],
    async (err, user) => {
      if (!user) return res.status(400).json({ error: "Invalid credentials" });

      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(400).json({ error: "Invalid credentials" });

      const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "2h" });

      res.json({
        token,
        userId: user.id,
        profession: user.profession
      });
    }
  );
});

//progress
app.get("/api/dashboard/:userId", (req, res) => {

  const userId = req.params.userId;

  // first get user's profession
  db.get(
    "SELECT profession FROM users1 WHERE id = ?",
    [userId],
    (err, user) => {

      if(err || !user){
        return res.status(500).json({error:"User not found"});
      }

      let tier;

      if(user.profession === "professional"){
        tier = "hard";
      }
      else if(user.profession === "student"){
        tier = "intermediate";
      }
      else{
        tier = "basic";
      }

      const attacks = attacksByTier[tier];

      // now check completed attacks
      db.all(
        "SELECT attack_id FROM progress WHERE user_id = ? AND completed = 1",
        [userId],
        (err, rows) => {

          const completed = rows.map(r => r.attack_id);

          const remaining = attacks.filter(a => !completed.includes(a.id));

          const currentAttack = remaining[0] || null;
          const upcomingAttack = remaining[1] || null;
          const upcoming2Attack = remaining[2] || null;

          res.json({
            currentAttack,
            upcomingAttack,
            upcoming2Attack
          });

        }
      );

    }
  );

});

// Get user score
app.get("/api/score", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, SECRET);

    db.get(
      "SELECT score FROM users1 WHERE id = ?",
      [decoded.id],
      (err, user) => {
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ score: user.score });
      }
    );
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Update score
app.post("/api/score", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { points } = req.body;

  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, SECRET);

    db.run(
      "UPDATE users1 SET score = score + ? WHERE id = ?",
      [points, decoded.id],
      function (err) {
        if (err) return res.status(500).json({ error: "Update failed" });
        res.json({ message: "Score updated" });
      }
    );
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.post("/api/completeAttack", (req, res) => {
  const { userId, attackId } = req.body;

  // combine all attacks into one array
  const allAttacks = [
    ...attacksByTier.basic,
    ...attacksByTier.intermediate,
    ...attacksByTier.hard
  ];

  // find the attack by id
  const attack = allAttacks.find(a => a.id === Number(attackId));

  if (!attack) {
    return res.status(404).json({ error: "Attack not found" });
  }

  const points = attack.points;

  db.get(
    "SELECT * FROM progress WHERE user_id = ? AND attack_id = ?",
    [userId, attackId],
    (err, existing) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (existing) {
        return res.json({
          message: "Attack already completed, no extra score given",
          pointsAdded: 0
        });
      }

      db.run(
        "INSERT INTO progress (user_id, attack_id, completed) VALUES (?, ?, 1)",
        [userId, attackId],
        function (err) {
          if (err) {
            return res.status(500).json({ error: "Failed to save progress" });
          }

          db.run(
            "UPDATE users1 SET score = score + ? WHERE id = ?",
            [points, userId],
            function (err) {
              if (err) {
                return res.status(500).json({
                  error: "Progress saved but score update failed"
                });
              }

              res.json({
                message: "Attack completed and score updated",
                pointsAdded: points
              });
            }
          );
        }
      );
    }
  );
});

app.get("/api/checkUpgrade/:userId", (req, res) => {
  const userId = req.params.userId;

  db.get(
    "SELECT profession FROM users1 WHERE id = ?",
    [userId],
    (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: "User not found" });
      }

      let currentTier;
      let nextProfession = null;
      let nextTier = null;

      if (user.profession === "common") {
        currentTier = "basic";
        nextProfession = "student";
        nextTier = "intermediate";
      } else if (user.profession === "student") {
        currentTier = "intermediate";
        nextProfession = "professional";
        nextTier = "hard";
      } else {
        currentTier = "hard";
      }

      if (currentTier === "hard") {
        return res.json({
          canUpgrade: false,
          message: "Already at highest tier"
        });
      }

      const currentAttackIds = attacksByTier[currentTier].map(a => a.id);

      db.all(
        "SELECT attack_id FROM progress WHERE user_id = ? AND completed = 1",
        [userId],
        (err, rows) => {
          if (err) {
            return res.status(500).json({ error: "Failed to fetch progress" });
          }

          const completedIds = rows.map(r => r.attack_id);
          const completedCurrentTier = currentAttackIds.filter(id => completedIds.includes(id));

          const canUpgrade = completedCurrentTier.length === currentAttackIds.length;

          res.json({
            canUpgrade,
            currentTier,
            nextTier,
            nextProfession
          });
        }
      );
    }
  );
});

app.post("/api/upgradeTier", (req, res) => {
  const { userId } = req.body;

  db.get(
    "SELECT profession FROM users1 WHERE id = ?",
    [userId],
    (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: "User not found" });
      }

      let currentTier;
      let newProfession = null;
      let upgradedTier = null;

      if (user.profession === "common") {
        currentTier = "basic";
        newProfession = "student";
        upgradedTier = "intermediate";
      } else if (user.profession === "student") {
        currentTier = "intermediate";
        newProfession = "professional";
        upgradedTier = "hard";
      } else {
        return res.status(400).json({ error: "Already at highest tier" });
      }

      const currentAttackIds = attacksByTier[currentTier].map(a => a.id);

      db.all(
        "SELECT attack_id FROM progress WHERE user_id = ? AND completed = 1",
        [userId],
        (err, rows) => {
          if (err) {
            return res.status(500).json({ error: "Failed to fetch progress" });
          }

          const completedIds = rows.map(r => r.attack_id);
          const completedCurrentTier = currentAttackIds.filter(id => completedIds.includes(id));

          if (completedCurrentTier.length !== currentAttackIds.length) {
            return res.status(400).json({ error: "Complete all attacks in this tier first" });
          }

          db.run(
            "UPDATE users1 SET profession = ? WHERE id = ?",
            [newProfession, userId],
            function (err) {
              if (err) {
                return res.status(500).json({ error: "Failed to upgrade tier" });
              }

              res.json({
                message: `Upgraded successfully to ${upgradedTier}`,
                profession: newProfession,
                tier: upgradedTier
              });
            }
          );
        }
      );
    }
  );
});

app.get("/api/scenarios/:userId", (req, res) => {
  const userId = req.params.userId;

  db.get(
    "SELECT profession FROM users1 WHERE id = ?",
    [userId],
    (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: "User not found" });
      }

      let tier;

      if (user.profession === "professional") {
        tier = "hard";
      } else if (user.profession === "student") {
        tier = "intermediate";
      } else {
        tier = "basic";
      }

      const attacks = attacksByTier[tier];

      db.all(
        "SELECT attack_id FROM progress WHERE user_id = ? AND completed = 1",
        [userId],
        (err, rows) => {
          if (err) {
            return res.status(500).json({ error: "Failed to fetch progress" });
          }

          const completedIds = rows.map(row => row.attack_id);

          const scenarios = attacks.map((attack, index) => {
            let status = "locked";

            if (completedIds.includes(attack.id)) {
              status = "completed";
            } else {
              const previousAttack = attacks[index - 1];

              if (index === 0 || completedIds.includes(previousAttack.id)) {
                status = "unlocked";
              }
            }

            return {
              ...attack,
              tier,
              profession: user.profession,
              status
            };
          });

          res.json({
            profession: user.profession,
            tier,
            scenarios
          });
        }
      );
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});