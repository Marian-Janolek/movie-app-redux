import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieApi from '../../common/apis/movieApi';

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async (term) => {
    const { data } = await movieApi.get(
      `?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${term}&type=movie`
    );
    return data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',
  async (term) => {
    const { data } = await movieApi.get(
      `?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${term}&type=series`
    );
    return data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  'movies/fetchAsyncMovieOrShowDetail',
  async (id) => {
    const { data } = await movieApi.get(
      `?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}&Plot=full`
    );
    return data;
  }
);
const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log('pending');
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log('fetched successfully');
      return { ...state, movies: payload };
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log('fetched successfully');
      return { ...state, shows: payload };
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      console.log('fetched successfully');
      return { ...state, selectedMovieOrShow: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log('rejected');
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMoviesOrShow = (state) =>
  state.movies.selectedMovieOrShow;

export default movieSlice.reducer;
