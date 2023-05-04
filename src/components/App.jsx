import { Route, Routes } from "react-router-dom";
import { lazy } from 'react';
import SharedLayout from "./SharedLayout/SharedLayout";

const Home = lazy(() => import('../pages/Home'));
const MovieDetails = lazy(() => import('../pages/MovieDetails'));
const Movies = lazy(() => import('../pages/Movies'));
const MovieReviews = lazy(() => import('../components/Reviews/Reviews'));
const MovieCast = lazy(() => import('../components/Cast/Cast'));

export default function App () {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/movies/:movieId/*" element={<MovieDetails />}>
          <Route path="reviews" element={<MovieReviews />} />
          <Route path="cast" element={<MovieCast />} />
        </Route>  
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};