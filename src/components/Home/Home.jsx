import axios from 'axios';
import { useEffect } from 'react';
import MovieListing from '../MovieListing/MovieListing';
import movieApi from '../../common/apis/movieApi';
import { addMovies } from '../../features/movies/movieSlice';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMovies = async () => {
      const movieText = 'Harry';
      try {
        const { data } = await movieApi.get(
          `?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${movieText}&type=movie`
        );
        dispatch(addMovies(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <div className="banner-image">
        <MovieListing />
      </div>
    </div>
  );
};

export default Home;
