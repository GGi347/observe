import { Outlet } from "react-router";
import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";

const AppLayoutStyled = styled.div`
  display: grid;
  grid-template-rows: 120px 1fr 100px;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

const MainStyled = styled.main`
  width: 100%;
  margin-top: 40px;
`;

function AppLayout() {
  return (
    <AppLayoutStyled>
      <Header />
      <MainStyled>
        <Outlet />
      </MainStyled>
      <Footer />
    </AppLayoutStyled>
  );
}

export default AppLayout;
