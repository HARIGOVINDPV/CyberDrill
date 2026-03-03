const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "cyberdrill_secret";

// Database setup
const db = new sqlite3.Database("./cyberdrill.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users1 (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      password TEXT,
      profession TEXT
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

      res.json({ token });
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});