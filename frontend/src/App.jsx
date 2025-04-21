"use client";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/ui/header";

// Placeholder components for routes
const Home = () => (
  <div className="page-container">
    <h2>Home Page</h2>
  </div>
);
const Movies = () => (
  <div className="page-container">
    <h2>Movies Page</h2>
  </div>
);
const TVShows = () => (
  <div className="page-container">
    <h2>TV Shows Page</h2>
  </div>
);
const MyList = () => (
  <div className="page-container">
    <h2>My List Page</h2>
  </div>
);
const SignIn = () => (
  <div className="page-container">
    <h2>Sign In Page</h2>
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
              <Route path="/movies" element={<Movies />} />
              <Route path="/tvshows" element={<TVShows />} />
              <Route path="/mylist" element={<MyList />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
