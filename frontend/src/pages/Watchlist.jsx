import movieData from "../data/movies.json";
import { useState } from "react";
import "./styles/Watchlist.css";
import MovieCard from "../components/ui/MovieCard";

export const Watchlist = () => {
  const [movies, setMovies] = useState(
    movieData.map((movie) => ({
      ...movie,
      release_date: movie.release_date?.toString() || "",
    }))
  );
  const [sortMovies, setSortMovies] = useState("default");
  const [filterByYear, setFilterByYear] = useState("all");

  let filteredMovies = [...movies];

  if (filterByYear !== "all") {
    filteredMovies = filteredMovies.filter((movie) => {
      const movieYear = movie.release_date;
      if (filterByYear === "2020s") {
        return movieYear >= 2020 && movieYear <= 2029;
      } else if (filterByYear === "2010s") {
        return movieYear >= 2010 && movieYear <= 2019;
      } else if (filterByYear === "2000s") {
        return movieYear >= 2000 && movieYear <= 2009;
      } else if (filterByYear === "1990s") {
        return movieYear >= 1990 && movieYear <= 1999;
      } else if (filterByYear === "1980s") {
        return movieYear >= 1980 && movieYear <= 1989;
      } else if (filterByYear === "1970s") {
        return movieYear >= 1970 && movieYear <= 1979;
      } else if (filterByYear === "1960s") {
        return movieYear >= 1960 && movieYear <= 1969;
      } else if (filterByYear === "1950s") {
        return movieYear >= 1950 && movieYear <= 1959;
      } else if (filterByYear === "1940s") {
        return movieYear >= 1940 && movieYear <= 1949;
      } else if (filterByYear === "1930s") {
        return movieYear >= 1930 && movieYear <= 1939;
      } else if (filterByYear === "1920s") {
        return movieYear >= 1920 && movieYear <= 1929;
      } else if (filterByYear === "1910s") {
        return movieYear >= 1910 && movieYear <= 1919;
      } else if (filterByYear === "1900s") {
        return movieYear >= 1900 && movieYear <= 1909;
      }
      return true;
    });
  }

  if (sortMovies === "title") {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortMovies === "year") {
    filteredMovies.sort((a, b) => a.release_date - b.release_date);
  }

  return (
    <div className="page-container">
      <h2>My Watchlist</h2>

      <div className="filters">
        <div className="sorting">
          <label htmlFor="sort">Sort by: </label>
          <select
            id="sort"
            value={sortMovies}
            onChange={(event) => setSortMovies(event.target.value)}
          >
            <option value="default">Default</option>
            <option value="title">Title</option>
            <option value="year">Year</option>
          </select>
        </div>

        <div className="filterYear">
          <label htmlFor="filter-by-year">Filter by year: </label>
          <select
            id="filter-by-year"
            value={filterByYear}
            onChange={(event) => setFilterByYear(event.target.value)}
          >
            <option value="all">All</option>
            <option value="2020s">2020s</option>
            <option value="2010s">2010s</option>
            <option value="2000s">2000s</option>
            <option value="1990s">1990s</option>
            <option value="1980s">1980s</option>
            <option value="1970s">1970s</option>
            <option value="1960s">1960s</option>
            <option value="1950s">1950s</option>
            <option value="1940s">1940s</option>
            <option value="1930s">1930s</option>
            <option value="1920s">1920s</option>
            <option value="1910s">1910s</option>
            <option value="1900s">1900s</option>
          </select>
        </div>
      </div>
      {filteredMovies.length === 0 ? (
        <p>Your watchlist is empty, add some movies!</p>
      ) : (
        <div className="movie-grid">
          {filteredMovies.map((movie, index) => (
            <div
              key={movie.id}
              className="movie-card-wrapper"
              style={{ ["--i"]: `${index}` }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
