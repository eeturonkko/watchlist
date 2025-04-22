"use client";

import "./App.css";
import { Home } from "./pages/Home";
import Header from "./components/ui/header";
import { useEffect, useState } from "react";
import { fetchTrending } from "./utils/tmdb";
import { Watchlist } from "./pages/Watchlist";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const data = await fetchTrending();
        setTrending(data.results);
      } catch (err) {
        console.error("Error fetching trending:", err);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home trending={trending} />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
