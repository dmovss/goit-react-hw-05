import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { fetchMoviesByQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const newQuery = form.elements.query.value.trim();

    if (newQuery === "") {
      toast.error("Please enter a search term!");
      return;
    }

    setSearchParams({ query: newQuery });
    form.reset();
  };

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const fetchedMovies = await fetchMoviesByQuery(query);
        if (fetchedMovies.length === 0) {
          toast.error("No movies found!");
        }
        setMovies(fetchedMovies);
      } catch (error) {
        setError(error.message);
        toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [query]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && <MovieList data={movies} />}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default MoviesPage;
