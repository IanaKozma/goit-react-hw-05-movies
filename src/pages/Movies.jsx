import axios from 'axios';
import { MoviesContainer } from 'components/SharedLayout/SharedLayout.styled';
import Loader from 'components/Loader/Loader';
import SearchBar from 'components/Searchbar/Searchbar';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
export const API_KEY = '3ed700b5d7b679b57b749969c057aea5';

const Movies = () => {
   const [movies, setMovies] = useState([]);
   const [error, setError] = useState(false);
   const [searchParams, setSearchParams] = useSearchParams();
   const [isLoading, setIsLoading] = useState(false);
   const nameFromInput = searchParams.get('query') ?? '';
   const location = useLocation();
   const [inputQuery, setInputQuery] = useState(() => nameFromInput);

   useEffect(() => {
      if (inputQuery === '') {
         return;
      }
      setIsLoading(true);
      const fetchMovie = async () => {
         try {
            const res = await axios(
               `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${inputQuery}&page=1&include_adult=false`
            );
            setMovies(res.data.results);
            setError(false);
            if (!res.data.results.length) {
               setError(true);
            }
            return res.data;
         } catch (error) {
            setError(error.message);
            console.log(error);
         }
      };
      fetchMovie().finally(() => {
         setIsLoading(false);
      });
   }, [inputQuery]);

   const handleSearchSubmit = querySearch => {
      if (querySearch === '') {
         return setSearchParams({});
      }
      setInputQuery(nameFromInput);
   };

   return (
      <>
         <SearchBar onSubmit={handleSearchSubmit} />
         <Link to="/">Go back</Link>
         {error && <p>{error} nemae</p>}
         {isLoading && <Loader />}
         <MoviesContainer>
            {movies.map(movie => {
               return (
                  <li key={movie.id}>
                     <Link to={`${movie.id}`} state={{ from: location }}>
                        {movie.title || movie.name}{' '}
                     </Link>
                  </li>
               );
            })}
         </MoviesContainer>
      </>
   );
};

export default Movies;