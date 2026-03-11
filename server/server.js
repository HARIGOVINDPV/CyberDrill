const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "cyberdrill_secret";
const attacks = [
  { id: 1, title: "Spear Phishing", difficulty: "Easy" },
  { id: 2, title: "BruteForce", difficulty: "Easy" },
  { id: 3, title: "SQL Injection Attack", difficulty: "Hard" }
];

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
        userId: user.id
      });
    }
  );
});

//progress
app.get("/api/dashboard/:userId", (req, res) => {

  const userId = req.params.userId;

  db.all(
    "SELECT attack_id FROM progress WHERE user_id = ? AND completed = 1",
    [userId],
    (err, rows) => {

      const completed = rows.map(r => r.attack_id);

      const remaining = attacks.filter(a => !completed.includes(a.id));

      const currentAttack = remaining[0] || null;
      const upcomingAttack = remaining[1] || null;

      res.json({
        currentAttack,
        upcomingAttack
      });

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

  db.run(
    "INSERT INTO progress (user_id, attack_id, completed) VALUES (?, ?, 1)",
    [userId, attackId],
    function(err){

      if(err){
        return res.status(500).json({error:"Failed to save progress"});
      }

      // Add score for completing attack
      db.run(
        "UPDATE users1 SET score = score + 100 WHERE id = ?",
        [userId]
      );

      res.json({message:"Attack completed and score updated"});
    }
  );

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});