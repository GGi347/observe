import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { signup, isLoading } = useSignup();

  function handleSumbit(e) {
    e.preventDefault();
    if (!email || !password) return;

    signup({ email, username, password });
  }

  return (
    <form onSubmit={handleSumbit}>
      <div>
        <input
          placeholder="Email"
          id="email"
          type="email"
          value={email}
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <input
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
      <button type="submit" />
    </form>
  );
}

export default SignupForm;
