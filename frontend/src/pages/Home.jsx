import "./Home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Add this
import MovieCard from "../components/ui/MovieCard";
import SearchBar from "../components/ui/SearchBar";

export const Home = ({ trending }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="page-container">
      <h2>Popular movies right now</h2>
      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />

      <div className="movie-grid">
        {trending.map((movie, index) => (
          <div
            key={movie.id}
            className="movie-card-wrapper"
            style={{ ["--i"]: `${index}` }}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};
