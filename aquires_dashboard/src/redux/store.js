// src/redux/store.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  permissions: string[];
  userType: string;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  merchantId: string | null;
  accessExpiresAt: string | null;
  refreshExpiresAt: string | null;
}

const initialState: UserState = {
  email: "",
  permissions: [],
  userType: "",
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  accessExpiresAt: null,
  refreshExpiresAt: null,
  merchantId: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
  state,
  action: PayloadAction<{
    email: string;
    userType: string;
    accessToken: string;
    refreshToken: string;
    accessExpiresAt: string;
    refreshExpiresAt: string;
    merchantId?: string | null;
    role?: {
      id: number;
      key: string;
      permissions: string[];
    };
  }>
) {
  state.email = action.payload.email;
  state.userType = action.payload.userType;
  state.isAuthenticated = true;
  state.accessToken = action.payload.accessToken;
  state.refreshToken = action.payload.refreshToken;
  state.accessExpiresAt = action.payload.accessExpiresAt;
  state.refreshExpiresAt = action.payload.refreshExpiresAt;
  state.merchantId = action.payload.merchantId ?? null;

  // ⭐ REAL FIX — read role.permissions
  state.permissions = action.payload.role?.permissions ?? [];
},
    logout(state) {
      Object.assign(state, initialState);
    },
    setAccessToken(state, action: PayloadAction<{ accessToken: string; accessExpiresAt: string }>) {
      state.accessToken = action.payload.accessToken;
      state.accessExpiresAt = action.payload.accessExpiresAt;
      state.isAuthenticated = !!action.payload.accessToken;
    },
  },
});

export const { loginSuccess, logout, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
