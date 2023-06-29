import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { logout } from "../../features/authSlice";
import { auth } from "../../database/firebase";
import ResetPassword from "../resetPassword/ResetPassword";

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<
    string | null
  >(null);
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(
    null
  );
  const [resetPassword, setResetPassword] = useState(false);

  const [filter, setFilter] = useState(false);
  function blurHandler() {
    const timer = setTimeout(() => {
      setProfileDropdown(false);
    }, 200);
    return () => clearTimeout(timer);
  }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  // useEffect(() => {
  //   if (Boolean(!user)) {
  //     navigate("/login");
  //   }
  // }, [navigate, user]);

  const handlePasswordReset = async () => {
    if (!resetPasswordEmail.length) return;
    try {
      await sendPasswordResetEmail(auth, resetPasswordEmail);
      setResetPasswordSuccess(
        "Password reset email sent. Please check your inbox."
      );
      setResetPasswordError(null);
    } catch (error: any) {
      setResetPasswordError(error.message);
      setResetPasswordSuccess(null);
    }
  };

  return (
    <>
      <ResetPassword
        handlePasswordReset={handlePasswordReset}
        isOpen={resetPassword}
        onClose={() => setResetPassword(false)}
        resetPasswordEmail={resetPasswordEmail}
        resetPasswordError={resetPasswordError}
        resetPasswordSuccess={resetPasswordSuccess}
        setResetPasswordEmail={setResetPasswordEmail}
      />
      <nav className="bg-[#002349] min-w-[315px]">
        <div
          style={{
            display: Boolean(!user) ? "none" : "flex",
          }}
          className="max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto p-3"
        >
          <span className="flex items-center">
            <form>
              <div className="flex">
                <select
                  id="dropdown"
                  className=" px-3  text-sm font-medium text-gray-900 bg-[#ddefff] rounded-l-lg hover:bg-gray-200"
                >
                  <option>Mockups</option>
                  <option>Templates</option>
                  <option>Design</option>
                  <option>Logos</option>
                </select>
                <div className="relative w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 md:w-[400px] sm:w-[200px] w-[100px] z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </form>
          </span>
          <div className="flex flex-col content-end items-center md:order-2">
            {Boolean(!user) && (
              <Link
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                to="/login"
              >
                Sign in
              </Link>
            )}

            {user ? (
              <button
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 "
                onBlur={blurHandler}
                onClick={() => setProfileDropdown(!profileDropdown)}
              >
                {user?.photoUrl ? (
                  <img className="w-12 h-12 rounded-full" src={user.photoUrl} />
                ) : (
                  <div
                    style={{ padding: "11px" }}
                    className="w-12 h-12 text-[30px] bg-[#fff] rounded-full"
                  >
                    {" "}
                    {user?.email[0].toUpperCase()}
                  </div>
                )}{" "}
              </button>
            ) : (
              <></>
            )}

            <div
              style={{
                display: profileDropdown ? "block" : "none",
              }}
              className="z-50 top-10 right-12 fixed my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="px-4 py-3">
                {/* <span className="block text-sm text-gray-900 dark:text-white">
                  Name Here
                </span> */}
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {user?.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    onClick={() => setResetPassword(true)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Change Password
                  </a>
                </li>
                <li>
                  <a
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
