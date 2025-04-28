import "../styles/WatchlistItem.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/WatchlistItem.css";

export function WatchlistItem({ item, onRemove }) {
  const imageUrl = item.imageUrl ? item.imageUrl : "/no-image.png";

  const handleRemove = async () => {
    if (!item._id) return;

    try {
      await axios.delete(`http://localhost:3000/api/watchlist/${item._id}`);
      toast.success(`${item.title} removed from watchlist`);
      if (onRemove) {
        onRemove(item._id);
      }
    } catch (err) {
      console.error("Error removing item:", err);
      toast.error("Failed to remove item. Please try again.");
    }
  };

  return (
    <div className="watchlist-item">
      <Link
        to={`/movie/${item.movieId || ""}`}
        className="watchlist-item-content"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={imageUrl}
          alt={item.title}
          className="watchlist-poster"
          loading="lazy"
        />
        <div className="watchlist-info">
          <h3 className="watchlist-title">{item.title}</h3>
          {item.release_date && (
            <p className="watchlist-date">{item.release_date.slice(0, 4)}</p>
          )}
          {item.notes && <p className="watchlist-notes">Notes: {item.notes}</p>}
        </div>
      </Link>
      <button onClick={handleRemove} className="remove-btn">
        Remove
      </button>
    </div>
  );
}

export default WatchlistItem;
