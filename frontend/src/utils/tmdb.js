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
