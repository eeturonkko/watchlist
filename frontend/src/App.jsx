"use client";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/ui/header";
import "./App.css";

// Placeholder components for routes
const Home = () => (
  <div className="page-container">
    <h2>Home Page</h2>
  </div>
);
const Watchlist = () => (
  <div className="page-container">
    <h2>Watchlist page</h2>
  </div>
);

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <div className="content-container">
            <div className="api-message">
              <h1>{message || "Loading..."}</h1>
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
