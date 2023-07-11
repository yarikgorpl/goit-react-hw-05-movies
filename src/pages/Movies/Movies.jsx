import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import css from './Movies.module.css';
import getInfo from 'services/Api/Search';
import { ColorRing } from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQueryString = evt => {
    const movieIdValue = evt.target.value;

    setSearchParams({ movieId: movieIdValue });
  };
  const movieId = searchParams.get('movieId') ?? '';

  const location = useLocation();

  const fetchImages = () => {
    setIsLoading(true);

    getInfo(movieId)
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

  const handleSearch = () => {
    fetchImages();
  };

  return (
    <>
      <section className={css.finder}>
        <input
          className={css.input}
          type="text"
          placeholder="Search movies"
          value={movieId}
          onChange={updateQueryString}
        />
        <button type="submit" className={css.button} onClick={handleSearch}>
          Search
        </button>
      </section>

      <section className={css.finded}>
        {error && setError(error.message)}
        {isLoading && <ColorRing />}
        <ul className={css.list}>
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
    </>
  );
};

export default Movies;
Movies.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};
