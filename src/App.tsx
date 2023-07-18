import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";

import Header from "./components/header/Header";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/Signup";
import { useEffect, useState } from "react";
import { login } from "./storeReduxTools/authSlice";
import { auth } from "./database/firebase";
import { unsubscribe } from "diagnostics_channel";
import { useAppDispatch } from "./storeReduxTools/storeHooks";
import LoginRoutes from "./components/HOC/LoginRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllPost from "./pages/allpost/AllPost";

import NotFoundPage from "./pages/notFoundPage/notFoundPage";
import CreatePost from "./pages/allpost/CreatePost";
import PostDetails from "./pages/allpost/PostDetails";
import UpdatePost from "./pages/allpost/UpdatePost";

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
  const [hideSearch, setHideSearch] = useState(false);
  function hideSearchfunction() {
    setHideSearch(true);
  }
  function showOrHideSearchfunction() {
    setHideSearch(false);
  }

  const [filter, setfilter] = useState({
    main: "all",
    type: "all",
    gender: "all",
    age: "all",
  });
  const filterOnChange = (filterVal: any, kind: string) => {
    switch (kind) {
      case "main":
        return setfilter({
          ...filter,
          main: filterVal,
        });
      case "type":
        return setfilter({
          ...filter,
          type: filterVal,
        });
      case "gender":
        return setfilter({
          ...filter,
          gender: filterVal,
        });
      case "age":
        return setfilter({
          ...filter,
          age: filterVal,
        });
    }
  };

  return (
    <>
      <Sidebar
        toastMessageSuccess={showToastMessageSuccess}
        toastMessageError={showToastMessageError}
      >
        <Header
          filterOnChange={filterOnChange}
          hideSearch={hideSearch}
          toastMessageSuccess={showToastMessageSuccess}
          toastMessageError={showToastMessageError}
        />
        <Routes>
          <Route element={<LoginRoutes />}>
            <Route path="/">
              <Route
                index
                element={
                  <AllPost
                    filter={filter}
                    showOrHideSearchfunction={showOrHideSearchfunction}
                    toastMessageSuccess={showToastMessageSuccess}
                    toastMessageError={showToastMessageError}
                  />
                }
              />
              <Route
                path="/:id"
                element={
                  <PostDetails hideSearchfunction={hideSearchfunction} />
                }
              />
              <Route
                path="/new"
                element={
                  <CreatePost
                    hideSearchfunction={hideSearchfunction}
                    toastMessageSuccess={showToastMessageSuccess}
                    toastMessageError={showToastMessageError}
                  />
                }
              />
              <Route
                path="/update/:id"
                element={
                  <UpdatePost
                    hideSearchfunction={hideSearchfunction}
                    toastMessageSuccess={showToastMessageSuccess}
                    toastMessageError={showToastMessageError}
                  />
                }
              />
            </Route>
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
          <Route path="/*" element={<NotFoundPage />} />

          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </Sidebar>

      <ToastContainer />
    </>
  );
};

export default App;
