import axios from 'axios';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Link, useLocation } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { MoviesContainer } from 'components/SharedLayout/SharedLayout.styled';
export const API_KEY = '3ed700b5d7b679b57b749969c057aea5';

const Home = () => {
   const location = useLocation();
   const [trending, setTrending] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(false);

   useEffect(() => {
      setIsLoading(true);
      const fetchTrending = async () => {
         try {
            const res = await axios(
               `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
            );
            setTrending(res.data.results);

            return res.data;
         } catch (error) {
            setError(error.message);
            console.log(error);
         }
      };
      fetchTrending().finally(() => setIsLoading(false));
   }, []);
   
   return (
      <div>
         {isLoading && <Loader />}
         <MoviesContainer>
            {trending.map(movie => {
               return (
                  <li key={nanoid()}>
                     <Link
                        to={`/movies/${movie.id}`}
                        state={{ from: location }}
                     >
                        {movie.title || movie.name}{' '}
                     </Link>
                  </li>
               );
            })}
         </MoviesContainer>
         {error && <p>{error}</p>}
      </div>
   );
};

export default Home;