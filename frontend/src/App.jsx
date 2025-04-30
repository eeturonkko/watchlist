"use client";

import "./App.css";
import { Home } from "./pages/Home";
import { Movies } from "./pages/Movies";
import { useEffect, useState } from "react";
import Header from "./components/ui/Header";
import { fetchTrending } from "./utils/tmdb";
import { Watchlist } from "./pages/Watchlist";
import { ToastContainer } from "react-toastify";
import { MovieDetails } from "./pages/MovieDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Newsletter from "./pages/NewsletterTest"; //tämä on vaan testisivu

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
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/movies" element={<Movies />} />{" "}
              <Route path="/newslettertest" element={<Newsletter />} />
            </Routes>
          </div>
          <ToastContainer />
        </main>
      </div>
    </Router>
  );
}

export default App;
