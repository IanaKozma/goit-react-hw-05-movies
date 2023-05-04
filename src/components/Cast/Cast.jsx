import axios from 'axios';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';

const MovieCast = () => {
   const { movieId } = useParams();

   const [movie, setMovie] = useState([]);
   const [isLoading, setIsloading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      setIsloading(true);
      const fetchMovie = async () => {
         try {
            const res = await axios(
               `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=3ed700b5d7b679b57b749969c057aea5&language=en-US`
            );
            setMovie(res.data.cast);
            if (!res.data.cast.length) {
               setError('Information about the cast is missing.');
            }
            return res.data;
         } catch (error) {
            return setError(error.message);
         }
      };
      fetchMovie().finally(() => setIsloading(false));
   }, [movieId]);

    return (
      <div>
         {isLoading && <Loader/>}
         {error && <p> {error}</p>}
         <ul>
            {movie.map(movie => {
               return (
                  <li key={nanoid()}>
                     <div>{movie.name}</div>
                     <img
                        src={
                           movie.profile_path
                              ? `https://www.themoviedb.org/t/p/w500${movie.profile_path}`
                              : 'https://www.themoviedb.org/t/p/w500/q9qKbux5Jo76Sj8g3luxBt6rYtz.jpg'
                        }
                        width="250px"
                        alt={movie.name}
                     />
                  </li>
               );
            })}
         </ul>
      </div>
   );
};

export default MovieCast;