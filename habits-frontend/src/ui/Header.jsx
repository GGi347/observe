import styled from "styled-components";
import HeadingStyle from "./HeadingStyle";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/habits/userSlice";
import MediumButton from "./MediumButton";

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 2rem;
  cursor: pointer;
  background-color: var(---color-grey-50);
`;
const Nav = styled.ul`
  display: flex;
  gap: 1.5rem;
  font-size: 18px;

  .active {
    color: var(---color-grey-900);
  }

  .hover {
    color: var(---color-grey-800);
  }
`;
function Header() {
  const username = useSelector((store) => store.user.username);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const habits = useSelector((store) => store.habits.habits);
  return (
    <HeaderStyle>
      <HeadingStyle onClick={() => navigate("/")}>⌛ Observe</HeadingStyle>
      <div style={{ color: "blue" }}>
        {username ? (
          <Nav>
            <NavLink to="charts" state={{ habits: habits }}>
              Charts
            </NavLink>
            <span
              onClick={() => {
                localStorage.removeItem("authTokens");
                dispatch(logoutUser());
                navigate("/");
              }}
              style={{ background: "var(---primary-color)" }}
            >
              Logout
            </span>
            <span style={{ textTransform: "capitalize" }}>{username}</span>
          </Nav>
        ) : (
          <>
            <Nav>
              <NavLink to="login">
                {({ isActive }) => (
                  <li className={isActive ? "active" : ""}>Login</li>
                )}
              </NavLink>

              <NavLink to="signup">
                {({ isActive }) => (
                  <li className={isActive ? "active" : ""}>Create Account</li>
                )}
              </NavLink>
            </Nav>
          </>
        )}
      </div>
    </HeaderStyle>
  );
}

export default Header;
