import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginService from "../../services/loginService";

const initialState = {
  token: "",
};
export const createLogin = createAsyncThunk("login/create", async (data) => {
  console.log("step 1");
  const res = await loginService.create(data);
  console.log("step 2", res.data);
  sessionStorage.setItem("token", res.data);

  return res.data;
});

export const loginUser = createSlice({
  name: "Login",
  initialState,
  reducers: {
    loadLogin: (state) => {
      state.token = sessionStorage.getItem("token");
    },
  },
  extraReducers: {
    [createLogin.fulfilled]: (state, action) => {
      console.log("login successfull");
      console.log(state.token);
      state.token = action.payload;
      console.log(state.token);
    },
  },
});

export const { loadLogin } = loginUser.actions;
export const { reducer } = loginUser;
export default reducer;
