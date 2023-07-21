import { useState } from "react";
import styles from "./Header.module.css";
import { useAppSelector } from "../../storeReduxTools/storeHooks";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../database/firebase";
import ResetPassword from "../authentication/ResetPassword";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/loader";

interface Props {
  toastMessageSuccess: (param: string) => void;
  toastMessageError: (param: string) => void;
  hideSearch: boolean;
  filterOnChange: (param: any, kind: string) => void;
}

const Header = ({
  toastMessageSuccess,
  toastMessageError,
  hideSearch,
  filterOnChange,
}: Props) => {
  const [loader, setLoader] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [resetPasswordContainerVisibily, setResetPasswordContainerVisibily] =
    useState(false);

  const handlePasswordReset = async () => {
    if (!resetPasswordEmail.length) return;
    try {
      setLoader(true);
      await sendPasswordResetEmail(auth, resetPasswordEmail).then(() => {
        toastMessageSuccess(
          "Change password request sent. Please check your email."
        );
        setResetPasswordContainerVisibily(false);
        setLoader(false);
      });
    } catch (error: any) {
      toastMessageError(error.message);
      setLoader(false);
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
        <div className="max-w-[1630px] flex flex-wrap items-center  mx-auto  py-1.5 pl-[10px] pr-[70px] md:px-[75px] xl:px-[6%] 2xl:px-[5%]">
          <Link to="/">
            <div className="cursor-pointer inline-flex mr-[10px] items-center">
              <button className="flex text-sm bg-gray-800 rounded-full md:mr-0 ">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://firebasestorage.googleapis.com/v0/b/webproject-6f2f2.appspot.com/o/mylogo%2Fmylogowhite.png?alt=media&token=ed33baad-63c3-48ae-873d-220b5860dd43"
                />
              </button>
              <p className="text-white text-lg ml-3 mr-4 block min-[420px]:hidden font-bold lg:block ">
                Pet Adoption
              </p>
            </div>
          </Link>

          <div
            className={
              Boolean(hideSearch)
                ? "hidden"
                : "inline-block md:inline-flex md:flex-row-reverse  items-center"
            }
          >
            <div className="flex">
              <div className="relative w-full">
                <input
                  type="search"
                  onChange={(e) => filterOnChange(e.target.value, "main")}
                  id="search-dropdown"
                  className="block p-1.5 sm:mt-0 w-[93vw]  min-[420px]:w-[300px] md:w-[250px] min-[850px]:w-[250px] z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg md:rounded-l-none border-l-gray-50 border-l-2 border border-gray-300"
                  placeholder="Search..."
                />
              </div>
            </div>
            <div className="flex pt-1 mb-1 sm:mb-0 md:pt-0 items-center">
              <select
                id="dropdown"
                onChange={(e) => filterOnChange(e.target.value, "type")}
                className="px-1 py-1 md:py-2 text-xs w-[31vw] min-[420px]:max-w-[100px] text-gray-900 cursor-pointer bg-[#ddefff] rounded-l-lg hover:bg-[#bbdfff]"
              >
                <option value="all" className="text-[11px]">
                  All Types
                </option>
                <option value="Dog" className="text-[11px]">
                  Dogs
                </option>
                <option value="Cat" className="text-[11px]">
                  Cats
                </option>
                <option value="Rabbit" className="text-[11px]">
                  Rabbits
                </option>
                <option value="Guinea Pig" className="text-[11px]">
                  Guinea Pigs
                </option>
                <option value="Bird" className="text-[11px]">
                  Birds
                </option>
                <option value="Others" className="text-[11px]">
                  Others
                </option>
              </select>
              <select
                id="dropdown2"
                onChange={(e) => filterOnChange(e.target.value, "gender")}
                className="px-1 py-1 md:py-2 text-xs w-[31vw] min-[420px]:max-w-[100px]  text-gray-900 cursor-pointer bg-[#ddefff] hover:bg-[#bbdfff]"
              >
                <option value="all" className="text-[11px]">
                  All Gender
                </option>
                <option value="Male" className="text-[11px]">
                  Male
                </option>
                <option value="Female" className="text-[11px]">
                  Female
                </option>
              </select>
              <select
                id="dropdown4"
                onChange={(e) => filterOnChange(e.target.value, "age")}
                className="px-1 py-1 md:py-2 text-xs w-[31vw] min-[420px]:max-w-[100px] text-gray-900 cursor-pointer rounded-r-lg md:rounded-r-none bg-[#ddefff] hover:bg-[#bbdfff]"
              >
                <option value="all" className="text-[11px]">
                  All Ages
                </option>
                <option value="below3" className="text-[11px]">
                  Below 3 Months
                </option>
                <option value="between3to12" className="text-[11px]">
                  3-12 Months
                </option>
                <option value="above12" className="text-[11px]">
                  Above 1 Year
                </option>
              </select>
            </div>
          </div>
        </div>
      </nav>
      {loader && <Loader />}
    </>
  );
};

export default Header;
