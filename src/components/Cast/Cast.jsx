import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getImages from 'services/Api/Casts';
import { ColorRing } from 'react-loader-spinner';

const Cast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImages = () => {
      setIsLoading(true);

      getImages(movieId)
        .then(response => response.json())
        .then(response => setCast(response.cast))
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
      <ul>
        {error && setError(error.message)}
        {isLoading && <ColorRing />}
        {cast &&
          cast.map(el => {
            return (
              <li key={el.cast_id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${el.profile_path}`}
                  alt=""
                />
                <p>{el.name}</p>
                <p>Character:{el.character}</p>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default Cast;
