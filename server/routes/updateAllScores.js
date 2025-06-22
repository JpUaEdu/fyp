const pool = require("../db");
const nodemailer = require("nodemailer");

// ✅ Gmail transporter using App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "antoinemrajeh@gmail.com",        // 🔁 Replace with your Gmail
    pass: "einwjgkckbbxkbzm",            // 🔁 Replace with your 16-char App Password (no spaces)
  },
});

async function updateAllScores() {
  console.log("🟢 Starting score update...");

  const maxValues = {
    likes: 10000,
    retweets: 5000,
    replies: 3000,
    comments: 1000,
    sentiment: 1.0,
  };

  try {
    const partnerships = await pool.query(`
      SELECT DISTINCT 
        up.brand_id, 
        up.figure_id, 
        u.email,
        b.name AS brand_name,
        f.name AS figure_name
      FROM user_partnerships up
      JOIN users u ON up.user_id = u.user_id
      JOIN brands b ON up.brand_id = b.brand_id
      JOIN figures f ON up.figure_id = f.figure_id
    `);

    for (const row of partnerships.rows) {
      const { brand_id, figure_id, email, brand_name, figure_name } = row;

      const result = await pool.query(`
        SELECT 
          COALESCE(SUM(p.likes), 0) AS likes,
          COALESCE(SUM(p.retweets), 0) AS retweets,
          COALESCE(SUM(p.replies), 0) AS replies,
          COALESCE(COUNT(c.comment_id), 0) AS comments,
          COALESCE(AVG(c.positive_ratio - c.negative_ratio), 0) AS sentiment
        FROM posts p
        LEFT JOIN comments c ON p.post_id = c.post_id
        WHERE p.brand_id = $1 AND p.figure_id = $2
      `, [brand_id, figure_id]);

      const d = result.rows[0];

      const normLikes = Math.min(1, d.likes / maxValues.likes);
      const normRetweets = Math.min(1, d.retweets / maxValues.retweets);
      const normReplies = Math.min(1, d.replies / maxValues.replies);
      const normComments = Math.min(1, d.comments / maxValues.comments);
      const normSentiment = (d.sentiment + 1) / 2;

      const score = (
        normLikes * 30 +
        normRetweets * 20 +
        normReplies * 20 +
        normComments * 10 +
        normSentiment * 20
      );

      await pool.query(
        `UPDATE user_partnerships SET score = $1 WHERE brand_id = $2 AND figure_id = $3`,
        [score, brand_id, figure_id]
      );

      console.log(`📊 Score for (${brand_name}, ${figure_name}) → ${score.toFixed(2)}`);

      if (score < 50) {
        const mailOptions = {
          from: "your_gmail@gmail.com",  // Same Gmail used in transporter
          to: email,
          subject: "⚠️ Low Partnership Score Alert",
          text: `Hello,\n\nThe partnership between ${brand_name} and ${figure_name} has dropped to a score of ${score.toFixed(2)}.\n\nCheck your dashboard for more details.\n\n– Social Media FYP System`,
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log(`📧 Email sent to ${email}`);
        } catch (err) {
          console.error("❌ Failed to send email:", err.message);
        }
      }
    }

    console.log("✅ All scores updated.");
  } catch (err) {
    console.error("❌ Error in score update:", err.message);
  }
}

module.exports = updateAllScores;
