import axios from "axios";
import { useState, useRef } from "react";
import "../styles/WatchlistItem.css";
import { toast } from "react-toastify";

export function WatchlistItem({ item, onRemove }) {
  const [status, setStatus] = useState(item.status);
  const [notes, setNotes] = useState(item.notes || "");
  const [rating, setRating] = useState(item.rating || "");
  const [displayNotes, setDisplayNotes] = useState(item.notes || "");
  const [displayRating, setDisplayRating] = useState(item.rating || "");
  const dialogRef = useRef(null);

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

  const openDialog = () => {
    setNotes(displayNotes);
    setRating(displayRating);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleSaveNotesAndRating = async () => {
    if (!item._id) return;
    try {
      await axios.put(`http://localhost:3000/api/watchlist/${item._id}`, {
        notes,
        rating,
      });
      toast.success(`Notes and rating saved for ${item.title}`);
      setDisplayNotes(notes);
      setDisplayRating(rating);
      closeDialog();
    } catch (err) {
      console.error("Error saving notes and rating:", err);
      toast.error("Failed to save notes and rating. Please try again.");
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

  const hasNotesOrRating = displayNotes || displayRating;

  return (
    <div className={`watchlist-item ${!hasNotesOrRating ? "no-flip" : ""}`}>
      <div className="watchlist-item-content">
        {hasNotesOrRating ? (
          <>
            <div className="watchlist-front">
              <img
                src={imageUrl}
                alt={item.title}
                className="watchlist-poster"
              />
              <div className="watchlist-info">
                <h3 className="watchlist-title">{item.title}</h3>
                <p className="watchlist-status">{statusClass}</p>
              </div>
            </div>
            <div className="watchlist-back">
              {displayNotes && (
                <p className="watchlist-notes">{displayNotes}</p>
              )}
              {displayRating && (
                <p className="watchlist-rating">{displayRating}/5</p>
              )}
            </div>
          </>
        ) : (
          <div className="watchlist-front">
            <img src={imageUrl} alt={item.title} className="watchlist-poster" />
            <div className="watchlist-info">
              <h3 className="watchlist-title">{item.title}</h3>
              <p className="watchlist-status">{statusClass}</p>
            </div>
          </div>
        )}
      </div>

      <select
        value={status}
        onChange={(e) => handleChangeStatus(e.target.value)}
        className="status-select"
      >
        <option value="planned">Planned</option>
        <option value="watching">Watching</option>
        <option value="completed">Completed</option>
      </select>

      {status === "completed" ? (
        <button onClick={openDialog} className="notes-btn">
          Add Notes/Rating
        </button>
      ) : (
        <button onClick={handleRemove} className="remove-btn">
          Remove
        </button>
      )}

      <dialog ref={dialogRef} className="watchlist-dialog">
        <h2>Add Notes and Rating</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your notes here..."
          className="notes-textarea"
        />
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          className="rating-input"
        />
        <div className="modal-buttons">
          <button onClick={handleSaveNotesAndRating} className="save-btn">
            Save
          </button>
          <button onClick={closeDialog} className="cancel-btn">
            Cancel
          </button>
        </div>
        <button onClick={handleRemove} className="modal-remove-btn">
          Remove from Watchlist
        </button>
      </dialog>
    </div>
  );
}

export default WatchlistItem;
