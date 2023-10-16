import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialState = {
  //   userId: localStorage.getItem("authTokens")
  //     ? jwtDecode(localStorage.getItem("authTokens").access).userId
  //     : null,

  tokens: localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null,
  username: localStorage.getItem("authTokens")
    ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access).username
    : null,
  userId: localStorage.getItem("authTokens")
    ? jwtDecode(JSON.parse(localStorage.getItem("authTokens")).access).userId
    : null,
  isFirstUpdate: true,
  //   tokens: null,
};

const UserSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    loginUser(state, action) {
      state.username = action.payload.username;
      state.userId = action.payload.userId;
    },
    authenticateUser(state, action) {
      state.tokens = action.payload;
      state.isFirstUpdate = false;
      console.log("ISFIRST", state.isFirstUpdate);
    },
    logoutUser(state, action) {
      state.userId = null;
      state.username = null;
      state.tokens = null;
    },
    setIsFirstUpdate(state, action) {
      state.isFirstUpdate = action.payload;
    },
  },
});
export const { loginUser, authenticateUser, logoutUser, setIsFirstUpdate } =
  UserSlice.actions;

export default UserSlice.reducer;
