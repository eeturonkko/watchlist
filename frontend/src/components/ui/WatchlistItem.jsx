import axios from "axios";
import { useState } from "react";
import "../styles/WatchlistItem.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export function WatchlistItem({ item, onRemove }) {
  const [status, setStatus] = useState(item.status);
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

  const handleChangeStatus = async (newStatus) => {
    if (!item._id) return;

    try {
      await axios.put(`http://localhost:3000/api/watchlist/${item._id}`, {
        status: newStatus,
      });
      toast.success(`${item.title} marked as ${newStatus}`);
      setStatus(newStatus);
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status. Please try again.");
    }
  };

  let statusClass = "Planned to watch";
  switch (status) {
    case "planned":
      statusClass = "Planned to watch";
      break;
    case "watching":
      statusClass = "Watching now";
      break;
    case "completed":
      statusClass = "Completed";
      break;
    default:
      statusClass = "Planned to watch";
  }

  return (
    <div className="watchlist-item">
      <Link
        to={`/movie/${item.movieId || ""}`}
        className="watchlist-item-content"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={imageUrl} alt={item.title} className="watchlist-poster" />
        <div className="watchlist-info">
          <h3 className="watchlist-title">{item.title}</h3>

          {item.notes && item.notes.trim() !== "" && (
            <p className="watchlist-notes">Notes: {item.notes}</p>
          )}

          <p className="watchlist-status">{statusClass}</p>
        </div>
      </Link>

      <select
        value={status}
        onChange={(e) => handleChangeStatus(e.target.value)}
        className="status-select"
      >
        <option value="planned">Planned</option>
        <option value="watching">Watching</option>
        <option value="completed">Completed</option>
      </select>

      <button onClick={handleRemove} className="remove-btn">
        Remove
      </button>
    </div>
  );
}

export default WatchlistItem;
