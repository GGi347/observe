import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import SignupPage from "./pages/SignupPage";
import { useEffect, useState } from "react";
import { updateToken } from "./services/apiAuth";
import { useDispatch, useSelector } from "react-redux";
import ChartsPage from "./pages/ChartsPage";
import { setIsFirstUpdate } from "./features/habits/userSlice";
import Spinner from "./ui/Spinner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const tokens = useSelector((store) => store.user.tokens);

  const dispatch = useDispatch();
  // dispatch(setIsFirstUpdate(true));

  useEffect(() => {
    let fourMinutes = 1000 * 60 * 9;
    console.log("useDispatch");
    let interval = setInterval(() => {
      console.log("here");
      if (tokens !== null) {
        const token = tokens.refresh;
        console.log("app", token);
        updateToken({ token, dispatch });
        console.log("called", tokens);
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [dispatch, tokens]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="charts" element={<ChartsPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
