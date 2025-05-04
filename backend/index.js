require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const watchlistRoutes = require("./routes/watchlist");
const imdbRoutes = require("./routes/rating-IMDB");


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONN_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/watchlist", watchlistRoutes);
app.use("/api/movie-rating", imdbRoutes);

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express backend!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
