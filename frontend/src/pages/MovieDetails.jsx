import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "../components/styles/MovieDetails.css";
import React, { useState, useEffect } from "react";
import { addMovieToWatchlist } from "../utils/tmdb";
import { SignedIn, useUser } from "@clerk/clerk-react";

export function MovieDetails() {
  const { id } = useParams();
  const { user } = useUser();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : "/no-image.png";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&language=en-US`
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

  const handleAddToWatchlist = async () => {
    if (!movie) return;

    const payload = {
      userId: user.id,
      movieId: movie.id,
      title: movie.title,
      type: "movie",
      status: "planned",
      notes: "",
      imageUrl: imageUrl,
    };

    try {
      const savedData = await addMovieToWatchlist(payload);
      console.log("Saved:", savedData);
      toast.success(`${movie.title} added to watchlist!`);
    } catch (err) {
      console.error("Error adding to watchlist:", err);
      toast.error("Error adding to watchlist. Please try again.");
    }
  };

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
        <h3>
          {movie.release_date?.slice(0, 4)} |{" "}
          {movie.genres.map((genre) => genre.name).join(", ")}
        </h3>
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
        <SignedIn>
          <button onClick={handleAddToWatchlist}>Add to Watchlist</button>{" "}
        </SignedIn>
      </div>
    </div>
  );
}

export default MovieDetails;
