import "./styles/Home.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovieByName } from "../utils/tmdb";
import MovieCard from "../components/ui/MovieCard";
import SearchBar from "../components/ui/SearchBar";

export const Home = ({ trending }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query) return;
    try {
      const { results } = await fetchMovieByName(query);
      if (results.length === 0) {
        alert("No movies found");
        return;
      }

      // Get movie id and navigate to the movie page
      const movieId = results[0].id;
      navigate(`/movie/${movieId}`);
    } catch (error) {
      console.error("Error fetching movie by name:", error);
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
            className="movie-card-wrapper fade-in-up"
            style={{ ["--i"]: index }}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};
