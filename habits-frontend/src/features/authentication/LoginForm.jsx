import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import toast from "react-hot-toast";
import FormStyled from "../../ui/FormStyled";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { login, isLoading, status } = useLogin();

  function handleSumbit(e) {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Invalid Form. Fill Again");
      setUsername("");
      setPassword("");
      return;
    }

    login({ username, password, dispatch });
    if (status === "success") {
      navigate("/home");
    }
  }

  return (
    <FormStyled onSubmit={handleSumbit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          autoFocus
          placeholder="Username"
          id="username"
          type="text"
          value={username}
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <button type="submit">Login</button>
    </FormStyled>
  );
}

export default LoginForm;
