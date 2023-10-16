import { Outlet } from "react-router";
import Header from "./Header";
import styled from "styled-components";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const AppLayoutStyled = styled.div`
  display: grid;
  grid-template-rows: 120px 1fr 100px;
  height: 100vh;

  &.inactive-bg {
    background-color: var(--color-grey-600);
  }

  &.active-bg {
    background-color: var(--color-grey-50);
  }
`;

const MainStyled = styled.main`
  width: 100%;
  margin-top: 40px;
  background-color: var(--color-grey-50);
`;

function AppLayout() {
  const isFirstUpdate = useSelector((store) => store.user.isFirstUpdate);
  const isFormOpen = useSelector((store) => store.miscellaneous.isFormOpen);
  return (
    <AppLayoutStyled className={isFormOpen ? "inactive-bg" : "active-bg"}>
      <Header />
      {/* <MainStyled>{isFirstUpdate ? <Spinner /> : <Outlet />}</MainStyled> */}
      <MainStyled>
        <Outlet />
      </MainStyled>

      <Footer />
    </AppLayoutStyled>
  );
}

export default AppLayout;
