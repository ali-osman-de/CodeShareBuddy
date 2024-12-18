import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState, removeState } from "../utils/localStorageUtils";

const defaultAuthState = {
  uid: "",
  displayName: "",
  accessToken: "",
  expirationTime: null,
  isAuthenticated: false,
  user: null,
};

const loadAuthState = () => loadState("authState", defaultAuthState);

let logoutTimer;

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuthState(),
  reducers: {
    login(state, action) {
      const { user, accessToken, expirationTime, displayName, uid } =
        action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.accessToken = accessToken;
      state.expirationTime = expirationTime;
      state.displayName = displayName;
      state.uid = uid;

      saveState("authState", state);


      if (logoutTimer) clearTimeout(logoutTimer);


      const remainingTime =
        new Date(expirationTime).getTime() - new Date().getTime();
      if (remainingTime > 0) {
        logoutTimer = setTimeout(() => {
          authSlice.caseReducers.logout(state); 
        }, remainingTime);
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = "";
      state.expirationTime = null;
      state.displayName = "";
      state.uid = "";


      removeState("authState");


      if (logoutTimer) clearTimeout(logoutTimer);
    },
    refreshToken(state, action) {

      const { accessToken, expirationTime } = action.payload;
      state.accessToken = accessToken;
      state.expirationTime = expirationTime;

      saveState("authState", state);


      if (logoutTimer) clearTimeout(logoutTimer);
      const remainingTime =
        new Date(expirationTime).getTime() - new Date().getTime();
      if (remainingTime > 0) {
        logoutTimer = setTimeout(() => {
          authSlice.caseReducers.logout(state);
        }, remainingTime);
      }
    },
  },
});

export const { login, logout, refreshToken } = authSlice.actions;
export default authSlice.reducer;
