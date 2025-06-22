const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const pool = require("../db");

router.get("/partnerships", verifyToken, async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT 
        up.user_partnership_id,
        b.name AS brand_name,
        f.name AS figure_name,
        up.label
      FROM user_partnerships up
      JOIN brands b ON up.brand_id = b.brand_id
      JOIN figures f ON up.figure_id = f.figure_id
      WHERE up.user_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching partnerships:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
