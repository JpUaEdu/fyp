const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/verifyToken");
router.get("/", verifyToken, async (req, res) => {
  const { id: user_id } = req.user;
  console.log("✅ Verified user ID from token:", user_id); // <-- Add this line

  const result = await pool.query(
    "SELECT brand_id, figure_id, label FROM user_partnerships WHERE user_id = $1",
    [user_id]
  );

  console.log("📦 Result from DB:", result.rows); // <-- Add this line too
  res.json(result.rows);
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const { id: user_id } = req.user;
    console.log("🧪 Authenticated user ID:", user_id);
    console.log("🔑 Token user ID:", user_id);

    const result = await pool.query(
      `SELECT brand_id, figure_id, label FROM user_partnerships WHERE user_id = $1`,
      [user_id]
    );

    console.log("📦 Found partnerships:", result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching partnerships:", error);
    res.status(500).json({ error: "Failed to fetch partnerships" });
  }
});

module.exports = router;
