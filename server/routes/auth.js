const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];
    res.json({ user_id: user.user_id, full_name: user.full_name });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id, email",
      [email, password]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).json({ error: "Email already exists." });
    } else {
      console.error("Signup error:", err.message);
      res.status(500).send("Server error");
    }
  }
});
