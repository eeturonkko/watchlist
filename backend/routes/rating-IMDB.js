const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

const OMDB_API_KEY = process.env.OMDB_API_KEY;

router.get("/:id", async (req, res) => {
  const imdbId = req.params.id;

  try {
    // Haetaan elokuvan arvosana OMDB API:sta
    const response = await fetch(
      `http://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`
    );
    const data = await response.json();

    // logita Apin vastaus konsoliin koska ei se nyt toiminut :SS
    console.log("OMDB API Response:", data);

    if (data.Response === "True") {
      // onnistunut vastaus palauttaaa IMDb-arvosanan
      res.json({ imdbRating: data.imdbRating });
    } else {
      // Jos OMDB ei löydö elokuvaa, palauta virheviesti
      res.status(400).json({ error: `Invalid IMDb ID: ${imdbId}` });
    }
  } catch (err) {
    // Logita virhe ja palauta virheviesti
    console.error("Error fetching IMDb rating:", err);
    res.status(500).json({ error: "Failed to fetch IMDb rating from OMDB" });
  }
});

module.exports = router;
