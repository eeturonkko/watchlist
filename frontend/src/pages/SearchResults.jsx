// src/pages/SearchResults.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMoviesByQuery } from "../utils/tmdb";
import MovieCard from "../components/ui/MovieCard";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const search = async () => {
      try {
        const data = await fetchMoviesByQuery(query);
        setResults(data.results || []);
      } catch (err) {
        console.error("Search failed", err);
      }
    };

    search();
  }, [query]);

  return (
    <div className="page-container">
      <h2>Search results for "{query}"</h2>
      <div className="movie-grid">
        {results.map((movie) => (
          <div key={movie.id} className="movie-card-wrapper">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
