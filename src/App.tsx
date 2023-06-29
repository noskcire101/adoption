import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";

import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import { useEffect } from "react";
import { login } from "./features/authSlice";
import { auth } from "./database/firebase";
import { unsubscribe } from "diagnostics_channel";
import { useAppDispatch } from "./hooks/storeHooks";
import LoginRoutes from "./components/HOC/LoginRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.email)
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoUrl: user?.photoURL || null,
          })
        );
    });

    return () => unsubscribe();
  }, [dispatch]);
  const showToastMessageSuccess = (toastMessage: string) => {
    toast.success(toastMessage, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessageError = (toastMessage: string) => {
    toast.success(toastMessage, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <Sidebar>
        <Header />
        <Routes>
          <Route element={<LoginRoutes />}>
            <Route
              path="/"
              element={
                <Dashboard
                  toastMessageSuccess={showToastMessageSuccess}
                  toastMessageError={showToastMessageError}
                />
              }
            />
            <Route
              path="/blog"
              element={
                <Blog
                  toastMessageSuccess={showToastMessageSuccess}
                  toastMessageError={showToastMessageError}
                />
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <Login
                toastMessageSuccess={showToastMessageSuccess}
                toastMessageError={showToastMessageError}
              />
            }
          />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </Sidebar>
      <ToastContainer />
    </>
  );
};

export default App;
