import { useEffect, useState, useMemo } from "react";
import "./styles/Watchlist.css";
import { useUser } from "@clerk/clerk-react";
import WatchlistItem from "../components/ui/WatchlistItem";

export const Watchlist = () => {
  const { user } = useUser();
  const [movies, setMovies] = useState([]);
  const [sortMovies, setSortMovies] = useState("default");
  const [filterByYear, setFilterByYear] = useState("all");

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        if (!user?.id) return;

        const response = await fetch(
          `http://localhost:3000/api/watchlist/${user.id}`
        );
        const data = await response.json();
        const formattedData = data.map((movie) => ({
          ...movie,
          releaseDate: movie.releaseDate?.toString() || "",
        }));
        setMovies(formattedData);
      } catch (error) {
        console.error("Failed to fetch watchlist:", error);
      }
    };

    fetchWatchlist();
  }, [user?.id]);

  const decades = useMemo(() => {
    const years = movies
      .map((movie) => parseInt(movie.releaseDate?.slice(0, 4)))
      .filter((year) => !isNaN(year));

    const decadeSet = new Set(
      years.map((year) => `${Math.floor(year / 10) * 10}s`)
    );

    return Array.from(decadeSet).sort((a, b) => b.localeCompare(a));
  }, [movies]);

  const getFilteredMovies = () => {
    let filtered = [...movies];

    if (filterByYear !== "all") {
      const startYear = parseInt(filterByYear.slice(0, 4));
      const endYear = startYear + 9;
      filtered = filtered.filter((movie) => {
        const year = parseInt(movie.releaseDate?.slice(0, 4));
        return year >= startYear && year <= endYear;
      });
    }

    if (sortMovies === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortMovies === "year") {
      filtered.sort((a, b) => {
        const yearA = parseInt(a.releaseDate) || 0;
        const yearB = parseInt(b.releaseDate) || 0;
        return yearA - yearB;
      });
    }

    return filtered;
  };

  const filteredMovies = getFilteredMovies();

  const handleRemoveItem = (id) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
  };

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
            {decades.map((decade) => (
              <option key={decade} value={decade}>
                {decade}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredMovies.length === 0 ? (
        <p>Your watchlist is empty, add some movies!</p>
      ) : (
        <div className="movie-grid">
          {filteredMovies.map((item, index) => (
            <div
              key={item._id || item.id}
              className="movie-card-wrapper fade-in-up"
              style={{ ["--i"]: `${index}` }}
            >
              <WatchlistItem item={item} onRemove={handleRemoveItem} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
