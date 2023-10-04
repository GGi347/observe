import axios from "axios";
import { storeToken } from "./authToken";

export async function login({ email, password }) {
  axios
    .post("http://127.0.0.1:8000/users/login/", {
      email: email,
      password: password,
    })
    .then(function (response) {
      storeToken(response.data.key);
    })
    .catch(function (error) {
      throw new Error(error.message);
    });
}

export async function signup({ email, username, password }) {
  axios
    .post("http://127.0.0.1:8000/users/signup/", {
      username: username,
      email: email,
      password: password,
    })
    .then(function (response) {
      storeToken(response.data.key);
    })
    .catch(function (error) {
      throw new Error(error.message);
    });
}
