import { Link, useParams, useLocation, Outlet } from 'react-router-dom';
import { useEffect, useState, useRef, Suspense } from 'react';
import getImages from 'services/Api/FullInfo';
import css from './MovieDetails.module.css';
import { ColorRing } from 'react-loader-spinner';
import { FiArrowLeft } from 'react-icons/fi';

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const { movieId } = useParams();

  const location = useLocation();

  const backLincLocationRef = useRef(location.state?.from ?? '/movies');
  useEffect(() => {
    const fetchImages = () => {
      setIsLoading(true);

      getImages(movieId)
        .then(response => response.json())
        .then(response => setMovie(response))
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
    <section>
      {error && setError(error.message)}
      {isLoading && <ColorRing />}
      <button className={css.button}>
        <FiArrowLeft />
        <Link to={backLincLocationRef.current}>Go back</Link>
      </button>

      <div>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt=""
        />
        <div>
          <h1>{movie.title + ' (' + movie.release_date + ')'}</h1>
          <p>User score:{Math.round(movie.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>{movie.genres && movie.genres.map(el => el.name + ' ')}</p>
        </div>
      </div>
      <p>Additional information</p>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </section>
  );
};
export default MovieDetails;
