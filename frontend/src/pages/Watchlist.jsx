import movieData from "../data/movies.json";
import { useState } from "react";

export const Watchlist = () => {
  const [movies, setMovies] = useState(movieData);
  const [sortMovies, setSort] = useState("default");

  const sortedMovies = [...movies];

  if (sortMovies === "title") {
    sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortMovies === "year") {
    sortedMovies.sort((a, b) => a["movie-year"] - b["movie-year"]);
  }

  return (
    <div className="page-container">
      <h2>My Watchlist</h2>

      <label htmlFor="sort">Sort by: </label>
      <select
        id="sort"
        value={sortMovies}
        onChange={(event) => setSort(event.target.value)}
      >
        <option value="title">Title</option>
        <option value="year">Year</option>
      </select>

      {movies.length === 0 ? (
        <p>Your watchlist is empty, add some movies!</p>
      ) : (
        <ul>
          {sortedMovies.map((movie, index) => (
            <li key={index}>
              {movie.title} ({movie["movie-year"]})
            </li>
            // Vaihdetaan index myöhemmin elokuvan ID:ksi?
          ))}
        </ul>
      )}
    </div>
  );
};
