import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';

const MovieReviews = () => {
   const { movieId } = useParams();

   const [movie, setMovie] = useState([]);
   const [isLoading, setIsloading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      setIsloading(true);
      const fetchMovie = async () => {
         try {
            const res = await axios(
               `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=3ed700b5d7b679b57b749969c057aea5&language=en-US&page=1`
            );
            setMovie(res.data.results);
            if (!res.data.results.length) {
               return setError('There are no reviews for this movie.');
            }
         } catch (error) {
            return setError(error.message);
         }
      };
      fetchMovie().finally(() => setIsloading(false));
   }, [movieId]);

   return (
      <div>
         {error && <p> {error}</p>}
         {isLoading && <Loader />}
         <ul>
            {movie.map(movie => {
               return (
                  <li key={movie.id}>
                     <div>
                        <h3>{movie.author}</h3>
                        <p>{movie.content}</p>
                     </div>
                  </li>
               );
            })}
         </ul>
      </div>
   );
};

export default MovieReviews;