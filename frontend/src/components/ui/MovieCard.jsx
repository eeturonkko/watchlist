import "../styles/MovieCard.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { addMovieToWatchlist } from "../../utils/tmdb";
import { SignedIn, useUser } from "@clerk/clerk-react";

export function MovieCard({ movie }) {
  const { user } = useUser();
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : "/no-image.png";

  const handleAddToWatchlist = async () => {
    if (!user) {
      return;
    }

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

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card-content">
        <img
          src={imageUrl}
          alt={`No poster for ${movie.title}`}
          className="movie-poster"
          loading="lazy"
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-date">{movie.release_date?.slice(0, 4)}</p>
        </div>
      </Link>
      <SignedIn>
        <button onClick={handleAddToWatchlist} className="add-btn">
          + Add to Watchlist
        </button>
      </SignedIn>
    </div>
  );
}

export default MovieCard;
