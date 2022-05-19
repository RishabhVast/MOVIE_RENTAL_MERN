import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// impport { getmovies} from "../../services/moviesServices";
import movieService from "../../services/movieService";
const initialState = {
  movies: [],
  totalMovies: 0,
  error : " "
};
export const createMovie = createAsyncThunk(
  "movies/create",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await movieService.create(data, token);
    return res.data;
  }
);

export const getMovies = createAsyncThunk("/movies/pfs", async (data) => {
  const res = await movieService.pagination(data);
  console.log(`Movies Data`, res.data);
  return res.data;
});

export const updateMovie = createAsyncThunk(
  "movie/update",
  async ({ _id, ...data }, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await movieService.update(_id, { ...data }, token);
    return res.data;
  }
);
export const deleteMovie = createAsyncThunk(
  "movie/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await movieService.remove(id, token);
    if (res.data){
      const response = await movieService.pagination({ currentPage:1 , pageSize: 3})
      return  response.data
    }
    
  }
);
export const retrieveMovies = createAsyncThunk("movie/retrieve", async () => {
  const res = await movieService.getAll();
  return res.data;
});

export const getCount = createAsyncThunk("movies/count", async (genreName) => {
  const res = await movieService.getCount(genreName);
  return res.data;
});

export const movieSlice = createSlice({
  name: "movies",
  initialState,

  extraReducers: {
    [createMovie.fulfilled]: (state, action) => {
      state.movies.push(action.payload);
    },
    [createMovie.rejected]: (state, action) => {
      state.error = "Something failed";
    },
    [getMovies.fulfilled]: (state, action) => {
      console.log("in the fulfilled", action.payload);
      state.movies = [...action.payload];
      state.error = "";
    },
    [retrieveMovies.fulfilled]: (state, action) => {
      return { movies: [...action.payload] };
    },

    [getCount.fulfilled]: (state, action) => {
      state.totalMovies = action.payload.totalMovies;
    },
    [deleteMovie.fulfilled]: (state, action) => {
      state.movies = action.payload
    },
    [deleteMovie.rejected]: (state, action) => {
      state.error = "something failed";
    },
  },
});
export const { reducer } = movieSlice;
export default reducer;
