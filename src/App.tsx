import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";

import Header from "./components/header/Header";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/Signup";
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
            id: user.uid,
            fullName: user.displayName || null,
            email: user.email,
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
    toast.error(toastMessage, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      <Sidebar>
        <Header
          toastMessageSuccess={showToastMessageSuccess}
          toastMessageError={showToastMessageError}
        />
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
          <Route
            path="/signup"
            element={
              <SignUp
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
