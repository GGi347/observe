import styled from "styled-components";
import HeadingStyle from "./HeadingStyle";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/habits/userSlice";
import { useEffect, useState } from "react";

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 2rem 4rem;
  cursor: pointer;
`;
const Nav = styled.ul`
  display: flex;
  gap: 1.5rem;
  font-size: 18px;

  .active {
    border-bottom: 2px solid black;
  }
`;
function Header() {
  const username = useSelector((store) => store.user.username);
  console.log("Username in header", username);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const habits = useSelector((store) => store.habits.habits);
  return (
    <HeaderStyle>
      <HeadingStyle onClick={() => navigate("/")}>⌛ Observe</HeadingStyle>
      <div>
        {username ? (
          <Nav>
            <span style={{ textTransform: "capitalize" }}>{username}</span>
            <NavLink to="charts" state={{ habits: habits }}>
              Charts
            </NavLink>
            <Button
              onClick={() => {
                localStorage.removeItem("authTokens");
                dispatch(logoutUser());
                navigate("/");
              }}
            >
              Logout
            </Button>
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
