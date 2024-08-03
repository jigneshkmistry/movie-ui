import { createSlice, current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setToken(state, { payload }) {
      state.token = payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export const useAuth = () => useSelector((state) => state.auth);

export default authSlice.reducer;
