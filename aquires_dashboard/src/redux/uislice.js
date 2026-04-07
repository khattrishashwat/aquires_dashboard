// src/redux/uislice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UISliceState {
  isLoading: boolean;
  width: number;
}

const initialState: UISliceState = {
  isLoading: false,
  width: typeof window !== "undefined" ? window.innerWidth : 1200,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = uiSlice.actions;
export default uiSlice.reducer;
