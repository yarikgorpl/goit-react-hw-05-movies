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
      {error && setError(error.message)}
      {isLoading && <ColorRing />}

      {reviews.length < 1 ? (
        <p>No reviews for this movie</p>
      ) : (
        <ul>
          {reviews.map(el => (
            <li key={el.id}>
              <p>{el.content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Reviews;
