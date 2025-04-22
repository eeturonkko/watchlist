import "./MovieCard.css";

export function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : "/no-image.png";

  return (
    <div className="movie-card">
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
    </div>
  );
}

export default MovieCard;
