import "./styles/Movies.css";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/ui/MovieCard";

export const Movies = () => {
  const location = useLocation();
  const movies = location.state?.movies || [];

  return (
    <div className="page-container">
      <h2>Search Results</h2>
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="movie-card-wrapper fade-in-up"
              style={{ ["--i"]: index }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
