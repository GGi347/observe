import styled from "styled-components";
import HeadingStyle from "./HeadingStyle";
import { useNavigate } from "react-router";
import Button from "./Button";

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 2rem 4rem;
`;

function Header() {
  const navigate = useNavigate();
  return (
    <HeaderStyle>
      <HeadingStyle>⌛ Observe</HeadingStyle>
      <div>
        <Button onClick={() => navigate("login")}>Login</Button>
        <Button onClick={() => navigate("signup")}>Create Account</Button>
      </div>
    </HeaderStyle>
  );
}

export default Header;
