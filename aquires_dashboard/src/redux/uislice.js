// src/redux/uislice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  width: typeof window !== "undefined" ? window.innerWidth : 1200,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = uiSlice.actions;
export default uiSlice.reducer;