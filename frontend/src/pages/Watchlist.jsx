import movieData from "../data/movies.json";
import { useState } from "react";

export const Watchlist = () => {
  const [movies, setMovies] = useState(movieData);

  return (
    <div className="page-container">
      <h2>My Watchlist</h2>

      {movies.length === 0 ? (
        <p>Your watchlist is empty, add some movies!</p>
      ) : (
        <ul>
          {movies.map((movie, index) => (
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
