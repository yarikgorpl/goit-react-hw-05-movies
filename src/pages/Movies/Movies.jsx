import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import css from './Movies.module.css';
import getImages from 'services/Api/Search';
import { ColorRing } from 'react-loader-spinner';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQueryString = evt => {
    const movieIdValue = evt.target.value;
    if (movieIdValue === '') {
      return setSearchParams({});
    }
    setSearchParams({ movieId: movieIdValue });
  };

  const movieId = searchParams.get('movieId') ?? '';

  const location = useLocation();

  useEffect(() => {
    const fetchImages = () => {
      setIsLoading(true);

      getImages(movieId)
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
  }, [movieId]);
  return (
    <div>
      {error && setError(error.message)}

      <input
        type="text"
        value={movieId}
        className={css.input}
        onChange={updateQueryString}
      />
      <button
        type="submit"
        className={css.form_button}
        onClick={updateQueryString}
      >
        Search
      </button>
      <section>
        {error && setError(error.message)}
        {isLoading && <ColorRing />}
        <ul>
          {movies.map(movie => {
            return (
              <li key={movie.id}>
                <Link to={`${movie.id}`} state={{ from: location }}>
                  {movie.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
export default Movies;
