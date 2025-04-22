import MovieCard from "../components/ui/MovieCard";
import "./Home.css";

export const Home = ({ trending }) => (
  <div className="page-container">
    <h2>Popular Movies</h2>
    <div className="movie-grid">
      {trending.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  </div>
);
