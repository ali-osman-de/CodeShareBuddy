import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    uid: "",
    displayName: "",
    accessToken: "",
    expirationTime: null,
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    login(state, action) {
      const { user, accessToken, expirationTime, displayName, uid } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.accessToken = accessToken;
      state.expirationTime = expirationTime;
      state.displayName = displayName;
      state.uid = uid;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = "";
      state.expirationTime = null;
      state.displayName = "";
      state.uid = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
