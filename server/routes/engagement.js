const express = require("express");
const router = express.Router();
const pool = require("../db");
const verifyToken = require("../middleware/verifyToken");

// GET /api/engagement/:brand_id/:figure_id
router.get("/:brand_id/:figure_id", verifyToken, async (req, res) => {
  const { brand_id, figure_id } = req.params;
  const { id: user_id } = req.user; // ✅ Correctly extract user_id

  try {
    const engagementQuery = `
      SELECT 
        SUM(likes) AS likes,
        SUM(replies) AS replies,
        SUM(retweets) AS retweets
      FROM posts
      WHERE brand_id = $1 AND figure_id = $2;
    `;

    const commentQuery = `
      SELECT COUNT(*) AS comments
      FROM comments
      WHERE post_id IN (
        SELECT post_id FROM posts WHERE brand_id = $1 AND figure_id = $2
      );
    `;

    const scoreQuery = `
      SELECT score
      FROM user_partnerships
      WHERE user_id = $1 AND brand_id = $2 AND figure_id = $3;
    `;

    const [engagementResult, commentResult, scoreResult] = await Promise.all([
      pool.query(engagementQuery, [brand_id, figure_id]),
      pool.query(commentQuery, [brand_id, figure_id]),
      pool.query(scoreQuery, [user_id, brand_id, figure_id])
    ]);

    const engagement = engagementResult.rows[0];
    const commentData = commentResult.rows[0];
    const scoreData = scoreResult.rows[0];

    res.json({
      likes: parseInt(engagement.likes) || 0,
      replies: parseInt(engagement.replies) || 0,
      retweets: parseInt(engagement.retweets) || 0,
      comments: parseInt(commentData.comments) || 0,
      score: scoreData ? Math.round(scoreData.score) : null // 🔥 Score will now show
    });
  } catch (err) {
    console.error("❌ Error fetching engagement + score:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
