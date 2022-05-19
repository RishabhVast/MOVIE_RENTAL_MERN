import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import registerService from "../../services/registerService";

const initialState = {
  register: [],
};
export const createRegister = createAsyncThunk(
  "users/create",
  async ({ name, email, password, isAdmin }) => {
    const res = await registerService.create({
      name,
      email,
      password,
      isAdmin,
    });

    console.log(`its reducer`, res.data);
    return res.data;
  }
);
export const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: {
    [createRegister.fulfilled]: (state, action) => {
      console.log("slice");
      state.register.push(action.payload);
    },
  },
});

export const { reducer } = registerSlice;
export default reducer;
