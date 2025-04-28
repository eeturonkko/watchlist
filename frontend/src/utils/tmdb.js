const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrending = async () => {
  const res = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch trending movies");
  const data = await res.json();
  return { ...data, results: data.results.slice(0, 12) };
};

export const fetchMovieByName = async (name) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${name}`
  );
  if (!res.ok) throw new Error("Failed to fetch movie by name");
  const data = await res.json();
  return { ...data, results: data.results.slice(0, 1) };
};

export const fetchMoviesByName = async (name) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${name}`
  );
  if (!res.ok) throw new Error("Failed to fetch movies by name");
  const data = await res.json();
  return { ...data, results: data.results.slice(0, 12) };
};
