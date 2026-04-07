// src/redux/store.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  permissions: [],
  userType: "",
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  merchantId: null,
  accessExpiresAt: null,
  refreshExpiresAt: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.email = action.payload.email;
      state.userType = action.payload.userType;
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.accessExpiresAt = action.payload.accessExpiresAt;
      state.refreshExpiresAt = action.payload.refreshExpiresAt;
      state.merchantId = action.payload.merchantId ?? null;
      
      // Read role.permissions
      state.permissions = action.payload.role?.permissions ?? [];
    },
    
    logout(state) {
      Object.assign(state, initialState);
    },
    
    setAccessToken(state, action) {
      state.accessToken = action.payload.accessToken;
      state.accessExpiresAt = action.payload.accessExpiresAt;
      state.isAuthenticated = !!action.payload.accessToken;
    },
  },
});

export const { loginSuccess, logout, setAccessToken } = userSlice.actions;
export default userSlice.reducer;