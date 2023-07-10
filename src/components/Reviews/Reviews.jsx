import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getImages from 'services/Api/Reviews';
import { ColorRing } from 'react-loader-spinner';

const Reviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImages = () => {
      setIsLoading(true);

      getImages(movieId)
        .then(response => response.json())
        .then(response => setReviews(response.results))
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

        {reviews.map(el => {
          return (
            <li key={el.id}>
              {el.total_results === 0 ? (
                <p>No reviews for this movie</p>
              ) : (
                <p>{el.content}</p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Reviews;
