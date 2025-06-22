const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/partnerships", require("./routes/partnerships"));
app.use("/api/engagement", require("./routes/engagement"));
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/protected"));
app.use("/api", require("./routes/insights"));

// Automatically update scores at server start
const updateAllScores = require("./routes/updateAllScores");
updateAllScores();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
