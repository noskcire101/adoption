import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";

import Header from "./components/header/Header";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/Signup";
import { useEffect } from "react";
import { login } from "./storeReduxTools/authSlice";
import { auth } from "./database/firebase";
import { unsubscribe } from "diagnostics_channel";
import { useAppDispatch } from "./storeReduxTools/storeHooks";
import LoginRoutes from "./components/HOC/LoginRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllPost from "./pages/allpost/AllPost";
import FeedDetails from "./pages/allpost/PostDetails";
import NotFoundPage from "./pages/notFoundPage/notFoundPage";
import CreatePost from "./pages/allpost/CreatePost";

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
      <Sidebar
        toastMessageSuccess={showToastMessageSuccess}
        toastMessageError={showToastMessageError}
      >
        <Header
          toastMessageSuccess={showToastMessageSuccess}
          toastMessageError={showToastMessageError}
        />
        <Routes>
          {/* <Route element={<LoginRoutes />}> */}
          <Route path="/">
            <Route
              index
              element={
                <AllPost
                  toastMessageSuccess={showToastMessageSuccess}
                  toastMessageError={showToastMessageError}
                />
              }
            />
            <Route path=":id" element={<FeedDetails />} />
            <Route
              path="/new"
              element={
                <CreatePost
                  toastMessageSuccess={showToastMessageSuccess}
                  toastMessageError={showToastMessageError}
                />
              }
            />
          </Route>

          {/* </Route> */}
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
          <Route path="/*" element={<NotFoundPage />} />

          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </Sidebar>

      <ToastContainer />
    </>
  );
};

export default App;
