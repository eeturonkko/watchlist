import "../styles/MovieCard.css";
import { Link } from "react-router-dom";

export function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : "/no-image.png";

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img
        src={imageUrl}
        alt={movie.title}
        className="movie-poster"
        loading="lazy"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-date">{movie.release_date?.slice(0, 4)}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
