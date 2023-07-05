import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../storeReduxTools/storeHooks";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { logout } from "../../storeReduxTools/authSlice";
import { auth } from "../../database/firebase";
import ResetPassword from "../../pages/authentication/ResetPassword";

interface Props {
  toastMessageSuccess: (param: string) => void;
  toastMessageError: (param: string) => void;
}

const Header = ({ toastMessageSuccess, toastMessageError }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");

  const [resetPasswordContainerVisibily, setResetPasswordContainerVisibily] =
    useState(false);
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
    toastMessageSuccess("You have successfully been logged out");
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
      toastMessageSuccess(
        "Change password request sent. Please check your email."
      );
      setResetPasswordContainerVisibily(false);
    } catch (error: any) {
      toastMessageError(error.message);
    }
  };

  return (
    <>
      <ResetPassword
        handlePasswordReset={handlePasswordReset}
        isOpen={resetPasswordContainerVisibily}
        onClose={() => setResetPasswordContainerVisibily(false)}
        resetPasswordEmail={resetPasswordEmail}
        setResetPasswordEmail={setResetPasswordEmail}
      />
      <nav className="bg-[#002349] min-w-[345px]">
        <div
          style={{
            display: Boolean(!user) ? "none" : "flex",
          }}
          className="max-w-screen-2xl  flex flex-wrap items-center justify-between mx-auto p-3"
        >
          <div className="list-item md:inline-flex md:flex-row-reverse  items-center">
            <div className="flex">
              <div className="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  className="block p-2 md:w-[250px] sm:w-[295px] w-[245px] z-20 text-[10px] sm:text-xs text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg md:rounded-l-none border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search..."
                />
              </div>
            </div>
            <div className="flex pt-1 md:pt-0 items-center">
              <select
                id="dropdown"
                className=" px-1 py-2 text-[9px] sm:text-xs text-gray-900 bg-[#ddefff] rounded-l-lg hover:bg-gray-200"
              >
                <option>All Types</option>
                <option>Dogs</option>
                <option>Cats</option>
                <option>Rabbits</option>
                <option>Guinea Pigs</option>
                <option>Birds</option>
              </select>
              <select
                id="dropdown2"
                className=" px-1 py-2 text-[9px] sm:text-xs  text-gray-900 bg-[#ddefff] hover:bg-gray-200"
              >
                <option>All Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <select
                id="dropdown4"
                className=" px-1 py-2 text-[9px] sm:text-xs text-gray-900 rounded-r-lg md:rounded-r-none bg-[#ddefff] hover:bg-gray-200"
              >
                {" "}
                <option>All Ages</option>
                <option>Below 3 Months</option>
                <option>3-12 Months</option>
                <option>Above 1 Year</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col content-end items-center md:order-2">
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
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user?.fullName}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {user?.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    onClick={() => setResetPasswordContainerVisibily(true)}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 font-bold  text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
                  >
                    Change Password
                  </a>
                </li>
                <li>
                  <a
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 font-bold  text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
                  >
                    Log Out
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
