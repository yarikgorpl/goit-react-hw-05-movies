import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import getImages from 'services/Api/Tranding';
import { ColorRing } from 'react-loader-spinner';

const Home = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = () => {
      setIsLoading(true);

      getImages()
        .then(response => response.json())
        .then(data => {
          setMovies(data.results);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchImages();
  }, []);

  return (
    <div>
      {error && setError(error.message)}
      {isLoading && <ColorRing />}
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Home;
