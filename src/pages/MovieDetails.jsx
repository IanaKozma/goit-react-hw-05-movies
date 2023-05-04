import axios from 'axios';
import {
   DescriptionContainer,
   MovieDetailContainer
} from 'components/SharedLayout/SharedLayout.styled';
import Loader from 'components/Loader/Loader';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

const API_KEY = '3ed700b5d7b679b57b749969c057aea5';

const MovieDetails = () => {
   const { movieId } = useParams();
   const [isLoading, setIsLoading] = useState(false);
   const [movie, setMovie] = useState(null);
   const [error, setError] = useState(null);
   const location = useLocation();
   const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

   useEffect(() => {
      setIsLoading(true);
      const fetchMovie = async () => {
         try {
            const res = await axios(
               `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
            );
            setMovie(res.data);

            return res.data;
         } catch (error) {
            return setError(error.message);
         }
      };
      fetchMovie()
         .finally(() => setIsLoading(false));
   }, [movieId]);
   
   return (
      <>
         <Link to={backLinkLocationRef.current}>Go back</Link>
         {movie && (
            <MovieDetailContainer>
               <div>
                  <img
                     src={
                        movie.poster_path
                           ? `https://www.themoviedb.org/t/p/w500${movie.poster_path}`
                           : 'https://www.themoviedb.org/t/p/w500/q9qKbux5Jo76Sj8g3luxBt6rYtz.jpg'
                     }
                     width="280px"
                     alt={movie.title}
                  />
               </div>
               <DescriptionContainer>
                  <h2>
                     {movie.title} (
                     {movie.release_date.split('').slice(0, 4).join('')})
                  </h2>
                  <h3>Overview </h3>
                  <p>{movie.overview}</p>
                  <h3>User Score </h3>
                  <p>User Score: {`${movie.vote_average * 10}`}%</p>
                  <div>
                     <h3> Genres </h3>
                     {movie.genres.length > 0 ? (
                        movie.genres.map(genre => {
                           return <p key={genre.id}>{genre.name}</p>;
                        })
                     ) : (
                        <p>Missing</p>
                     )}
                  </div>
               </DescriptionContainer>
            </MovieDetailContainer>
         )}
         {isLoading && <Loader />}
         {error && <p>Error : {error}</p>}
         <div>
            <Link to="reviews">Reviews</Link>
         </div>
         <div>
            <Link to="cast">Cast</Link>
         </div>
         <Suspense fallback={<Loader />}>
            <Outlet />
         </Suspense>
      </>
   );
};

export default MovieDetails;