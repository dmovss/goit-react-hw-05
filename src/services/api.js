import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWNmNzQ0YmZlYTY1Mjk0N2NhZDQwMGQ2ZjBlYjhkYyIsIm5iZiI6MTc0Nzk1MzExOC4zMDksInN1YiI6IjY4MmZhNWRlZjNjMTY2NDM0NjQxMzFkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qh73iSNCt0ROQl1Es_fu5r9zEDJfLgyrMG0zrAwDlUg"; // або api_key, якщо хочеш через URL

const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

export const fetchTrendingMovies = async () => {
  const url = `${BASE_URL}/trending/movie/day`;
  const response = await axios.get(url, options);
  return response.data.results;
};

export const fetchMoviesByQuery = async (query) => {
  const url = `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  const response = await axios.get(url, options);
  return response.data.results;
};

export const fetchMovieById = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}`;
  const response = await axios.get(url, options);
  return response.data;
};

export const fetchCastById = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/credits?language=en-US`;
  const response = await axios.get(url, options);
  return response.data.cast;
};

export const fetchReviewsById = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/reviews?language=en-US&page=1`;
  const response = await axios.get(url, options);
  return response.data.results;
};
