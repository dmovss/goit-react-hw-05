import { useEffect, useState, useRef } from "react";
import {
  Outlet,
  useParams,
  useLocation,
  useNavigate,
  NavLink,
} from "react-router-dom";
import { fetchMovieById } from "../../services/api";
import css from "./MovieDetailPage.module.css";
import clsx from "clsx";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const fromRef = useRef(location.state?.from || "/movies");

  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getData();
  }, [movieId]);

  const genres = movie.genres?.map((genre) => genre.name).join(", ");

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate(fromRef.current)}
        className={css.goBackBtn}
      >
        ← Go back
      </button>

      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width="300px"
        />
      )}

      <h2>
        {movie.title} ({movie.release_date?.slice(0, 4)})
      </h2>
      <p>User Score: {Math.round(movie.vote_average * 10)}%</p>

      <ul>
        <li>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
        </li>
        <li>
          <h3>Genres</h3>
          <p>{genres}</p>
        </li>
      </ul>

      <p>Additional information</p>
      <ul>
        <li>
          <NavLink
            to="cast"
            state={{ from: fromRef.current }}
            className={buildLinkClass}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to="reviews"
            state={{ from: fromRef.current }}
            className={buildLinkClass}
          >
            Reviews
          </NavLink>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default MovieDetailPage;
