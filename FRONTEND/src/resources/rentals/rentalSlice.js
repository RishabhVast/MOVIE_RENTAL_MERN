import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rentalService from "../../services/rentalService";

const initialState = {
  rentals: [],
};
export const createRental = createAsyncThunk(
  "rentals/create",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await rentalService.create(data, token);
    console.log(`data after create`, res.data);
    return res.data;
  }
);
export const retrieveRentals = createAsyncThunk(
  "rentals/retrieve",
  async () => {
    const res = await rentalService.getAll();
    return res.data;
  }
);

export const rentalPatch = createAsyncThunk(
  "rentals/update",
  async (data, thunkAPI) => {
    console.log(`this is state point st1 `, data);
    const token = thunkAPI.getState().loginReducer.token;
    const res = await rentalService.update(data._id, data, token);
    console.log("patch" + res);
    return res.data;
  }
);

export const deleteRental = createAsyncThunk(
  "rentals/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().loginReducer.token;
    const res = await rentalService.remove(id, token);
    console.log(`the deleted data `, res.data);
    return res.data;
  }
);

export const rentalSlice = createSlice({
  name: "rentals",
  initialState,
  extraReducers: {
    [createRental.fulfilled]: (state, action) => {
      state.rentals.push(action.payload);
    },
    [retrieveRentals.fulfilled]: (state, action) => {
      return { rentals: [...action.payload] };
    },
    [rentalPatch.fulfilled]: (state, action) => {
      console.log(`this is payload`, action.payload);
      const index = state.rentals.findIndex(
        (rental) => rental._id === action.payload._id
      );
      state.rentals.splice(index, 1, action.payload);
    },

    [deleteRental.fulfilled]: (state, action) => {
      console.log("deleted action", action.payload_id);
      let index = state.rentals.findIndex(
        (rental) => rental._id === action.payload._id
      );
      state.rentals.splice(index, 1);
    },
  },
});
export const { reducer } = rentalSlice;
export default reducer;
