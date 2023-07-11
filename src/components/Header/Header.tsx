import { useState } from "react";
import styles from "./Header.module.css";
import { useAppSelector } from "../../storeReduxTools/storeHooks";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth } from "../../database/firebase";
import ResetPassword from "../../pages/authentication/ResetPassword";
import { Link } from "react-router-dom";

interface Props {
  toastMessageSuccess: (param: string) => void;
  toastMessageError: (param: string) => void;
}

const Header = ({ toastMessageSuccess, toastMessageError }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");

  const [resetPasswordContainerVisibily, setResetPasswordContainerVisibily] =
    useState(false);

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
      <nav className="z-50 sticky top-0 ... bg-[#002349] min-w-[345px] ">
        <div className="max-w-[1630px] flex flex-wrap items-center  mx-auto  py-2.5 pl-[10px] pr-[70px] md:px-[75px] xl:px-[6%] 2xl:px-[5%]">
          <Link to="/">
            <div className="cursor-pointer list-item md:inline-flex mr-1 min-[795px]:mr-[50px] items-center">
              <button className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 ">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://firebasestorage.googleapis.com/v0/b/webproject-6f2f2.appspot.com/o/mylogo%2Fmylogowhite.png?alt=media&token=ed33baad-63c3-48ae-873d-220b5860dd43"
                />
              </button>
              <p className="text-white text-lg ml-3 hidden font-bold lg:block ">
                Pet Adoption
              </p>
            </div>
          </Link>

          <div
            className={
              Boolean(!user)
                ? "hidden"
                : "list-item md:inline-flex md:flex-row-reverse  items-center"
            }
          >
            <div className="flex">
              <div className="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  className="block p-1 sm:p-1.5 md:w-[250px] sm:w-[295px] w-[193px] z-20 text-[10px] sm:text-xs text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg md:rounded-l-none border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search..."
                />
              </div>
            </div>
            <div className="flex pt-1 md:pt-0 items-center">
              <select
                id="dropdown"
                className=" px-1 py-1.5 text-[6px] sm:text-xs text-gray-900 bg-[#ddefff] rounded-l-lg hover:bg-gray-200"
              >
                <option>All Types</option>
                <option>Dogs</option>
                <option>Cats</option>
                <option>Rabbits</option>
                <option>Guinea Pigs</option>
                <option>Birds</option>
                <option>Others</option>
              </select>
              <select
                id="dropdown2"
                className=" px-1 py-1.5 text-[6px] sm:text-xs  text-gray-900 bg-[#ddefff] hover:bg-gray-200"
              >
                <option>All Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <select
                id="dropdown4"
                className=" px-1 py-1.5 text-[6px] sm:text-xs text-gray-900 rounded-r-lg md:rounded-r-none bg-[#ddefff] hover:bg-gray-200"
              >
                {" "}
                <option>All Ages</option>
                <option>Below 3 Months</option>
                <option>3-12 Months</option>
                <option>Above 1 Year</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
