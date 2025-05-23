import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCastById } from "../../services/api";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchCastById(movieId);
        setCast(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getData();
  }, [movieId]);

  return (
    <div>
      <ul>
        {cast.map((item) => (
          <li key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
              alt="actor profile"
              width="100px"
            />
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
