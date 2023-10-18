import axios from "axios";
import { storeToken } from "./authToken";
import jwtDecode from "jwt-decode";
import {
  authenticateUser,
  loginUser,
  logoutUser,
  setIsFirstUpdate,
} from "../features/habits/userSlice";
import toast from "react-hot-toast";

export async function login({ username, password, dispatch }) {
  axios
    .post("http://127.0.0.1:8000/users/signin/", {
      username: username,
      password: password,
    })
    .then(function (response) {
      const tokens = response.data;
      const data = jwtDecode(tokens.access);
      localStorage.setItem("authTokens", JSON.stringify(tokens));
      dispatch(loginUser(data));
      dispatch(authenticateUser(tokens));
    })
    .catch(function (error) {
      toast.error("Error in login. Try again.", error.message);
    });
}

export async function updateToken({ token }) {
  axios
    .post("http://127.0.0.1:8000/users/token/refresh/", {
      refresh: token,
    })
    .then(function (response) {
      const tokens = response.data;
      localStorage.setItem("authTokens", JSON.stringify(tokens));
    })
    .catch(function () {
      toast.error("Something went wrong.");
      return "data";
    });
}

export async function signup(data) {
  axios
    .post("http://127.0.0.1:8000/users/register/", {
      username: data.username,
      email: data.email,
      password: data.password,
      first_name: data.firstName,
      last_name: data.lastName,
    })
    .then(function (response) {
      console.log("REGISTER", response);
      storeToken(response.data.key);
    })
    .catch(function (error) {
      console.log("REGISTER", error);
      throw new Error(error.message);
    });
}
