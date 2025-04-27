import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../components/styles/MovieDetails.css"; 

export function MovieDetails() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
        );
        if (!res.ok) throw new Error("Elokuvan tietoja ei voitu ladata");
        const data = await res.json();
        setMovie(data); // Tallennetaan elokuvan tiedot
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchMovie();
  }, [id]); // Hakee tiedot aina kun elokuvan ID muuttuu

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>{error}</div>; 

  return (
    <div className="movie-details">
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      className="movie-poster"
    />
    <div className="movie-info">
      <h1>{movie.title}</h1>
      <h3>{movie.release_date?.slice(0, 4)} | {movie.genres.map(genre => genre.name).join(", ")}</h3>
      <p className="movie-overview">{movie.overview}</p>
      <div className="movie-rating">
        <div>
          <strong>IMDb Rating</strong>
          <div>{movie.vote_average ? movie.vote_average : "N/A"}</div>
        </div>
        <div>
          <strong>User Score</strong>
          <div>{movie.vote_count}</div>
        </div>
      </div>
      <button>Add to Watchlist</button> {/* Lisää katselulistalle -painike */}
    </div>
  </div>
);
}

export default MovieDetails;