import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    displayName: "",
    accessToken: "",
    expirationTime: null,
    isAuthenticated: false,
    user: null, 
  },
  reducers: {
    login(state, action) {
      const { user, accessToken, expirationTime, displayName } = action.payload;
      state.isAuthenticated = true;
      state.user = user; 
      state.accessToken = accessToken;
      state.expirationTime = expirationTime;
      state.displayName = displayName;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = "";
      state.expirationTime = null;
      state.displayName = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
