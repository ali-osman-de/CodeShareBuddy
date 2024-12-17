import { createSlice } from "@reduxjs/toolkit";

// localStorage'dan auth bilgilerini al
const loadAuthState = () => {
  const authState = JSON.parse(localStorage.getItem("authState"));
  return authState || {
    uid: "",
    displayName: "",
    accessToken: "",
    expirationTime: null,
    isAuthenticated: false,
    user: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuthState(), // Başlangıç durumu localStorage'dan yükle
  reducers: {
    login(state, action) {
      const { user, accessToken, expirationTime, displayName, uid } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.accessToken = accessToken;
      state.expirationTime = expirationTime;
      state.displayName = displayName;
      state.uid = uid;

      // localStorage'a kaydet
      localStorage.setItem("authState", JSON.stringify({
        isAuthenticated: true,
        user,
        accessToken,
        expirationTime,
        displayName,
        uid,
      }));

      const remainingTime = new Date(expirationTime).getTime() - new Date().getTime();
      if (remainingTime > 0) {
        setTimeout(() => {
          state.isAuthenticated = false;
          state.user = null;
          state.accessToken = "";
          state.expirationTime = null;
          state.displayName = "";
          state.uid = "";
          localStorage.removeItem("authState");
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
      
      localStorage.removeItem("authState");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
