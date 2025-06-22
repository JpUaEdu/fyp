const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const pool = require("../db");

const SECRET_KEY = "your_secret_key"; // Replace with environment variable in production

// SIGNUP
router.post("/signup", async (req, res) => {
  const { email, password, full_name } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (email, password, full_name) VALUES ($1, $2, $3) RETURNING user_id, email",
      [email, password, full_name]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      res.status(400).json({ error: "Email already exists." });
    } else {
      console.error("Signup error:", err.message);
      res.status(500).send("Server error");
    }
  }
});

// LOGIN
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

    const token = jwt.sign(
  { id: user.user_id, full_name: user.full_name },
  SECRET_KEY,
  { expiresIn: "2h" }
);


    res.json({ token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
