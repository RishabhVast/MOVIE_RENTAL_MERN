import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import genreService from "../../services/genreService";

const initialState = {
  genres: [],
};
export const createGenre = createAsyncThunk(
  "genres/create",
  async ({ name }, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    console.log(token);
    const res = await genreService.create({ name }, token);
    return res.data;
  }
);
export const retrieveGenres = createAsyncThunk("genres/retrieve", async () => {
  const res = await genreService.getAll();
  return res.data;
});
export const updateGenre = createAsyncThunk(
  "genres/update",
  async ({ _id, name }, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    console.log(token);
    const res = await genreService.update(_id, { name }, token);
    return res.data;
  }
);
export const deleteGenre = createAsyncThunk(
  "genres/delete",
  async (_id, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    console.log(token);
    const res = await genreService.remove(_id, token);
    return res.data;
  }
);

export const genreSlice = createSlice({
  name: "genres",
  initialState,
  extraReducers: {
    [createGenre.fulfilled]: (state, action) => {
      state.genres.push(action.payload);
    },
    [retrieveGenres.fulfilled]: (state, action) => {
      return { genres: [...action.payload] };
    },
    [updateGenre.fulfilled]: (state, action) => {
      const index = state.findIndex((genre) => genre._id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteGenre.fulfilled]: (state, action) => {
      let index = state.genres.findIndex(
        (genre) => genre._id === action.payload._id
      );
      state.genres.splice(index, 1);
    },
  },
});

export const { reducer } = genreSlice;
export default reducer;
