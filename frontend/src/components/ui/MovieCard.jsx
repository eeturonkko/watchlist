import "../styles/MovieCard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

export function MovieCard({ movie }) {
  const { user } = useUser();
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : "/no-image.png";

  const handleAddToWatchlist = async () => {
    if (!user) {
      return;
    }

    try {
      const payload = {
        userId: user.id,
        title: movie.title,
        type: "movie",
        status: "planned",
        notes: "",
        imageUrl: imageUrl,
      };

      const res = await axios.post(
        "http://localhost:3000/api/watchlist",
        payload
      );

      console.log("Saved:", res.data);
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
          alt={movie.title}
          className="movie-poster"
          loading="lazy"
        />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-date">{movie.release_date?.slice(0, 4)}</p>
        </div>
      </Link>

      <button onClick={handleAddToWatchlist} className="add-btn">
        + Add to Watchlist
      </button>
    </div>
  );
}

export default MovieCard;
