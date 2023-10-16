import LoginForm from "../features/authentication/LoginForm";
import HeadingStyle from "../ui/HeadingStyle";

function LoginPage() {
  return (
    <>
      <HeadingStyle>Log in to your account</HeadingStyle>
      <LoginForm />
    </>
  );
}

export default LoginPage;
