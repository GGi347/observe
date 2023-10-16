import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import FormStyled from "../../ui/FormStyled";
import toast from "react-hot-toast";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { signup, isLoading } = useSignup();

  function handleSumbit(e) {
    e.preventDefault();
    if (!email || !password || !username) {
      toast.error("Fill the form properly");
      setPassword("");
      return;
    }

    signup({ email, username, password, firstName, lastName });
  }

  return (
    <FormStyled onSubmit={handleSumbit}>
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

      <div>
        <input
          placeholder="First Name"
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <input
          placeholder="Last Name"
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <button type="submit">Create Account</button>
    </FormStyled>
  );
}

export default SignupForm;
