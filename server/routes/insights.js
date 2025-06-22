const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/verifyToken");

router.get("/partnership-insights", verifyToken, async (req, res) => {
  const { brand_id, figure_id } = req.query;

  try {
    const engagementQuery = `
      SELECT 
        SUM(likes) AS total_likes,
        SUM(replies) AS total_replies,
        SUM(retweets) AS total_retweets,
        COUNT(*) AS post_count
      FROM posts
      WHERE brand_id = $1 AND figure_id = $2;
    `;
    
    const sentimentQuery = `
      SELECT 
        sentiment_real, COUNT(*) as count
      FROM comments
      WHERE post_id IN (
        SELECT id FROM posts WHERE brand_id = $1 AND figure_id = $2
      )
      GROUP BY sentiment_real;
    `;

    const [engagement, sentiment] = await Promise.all([
      pool.query(engagementQuery, [brand_id, figure_id]),
      pool.query(sentimentQuery, [brand_id, figure_id])
    ]);

    res.json({
      engagement: engagement.rows[0] || {},
      sentiment: sentiment.rows || []
    });

  } catch (err) {
    console.error("❌ Backend error:", err);
    res.status(500).json({ error: "Failed to fetch insights" });
  }
});

module.exports = router;
