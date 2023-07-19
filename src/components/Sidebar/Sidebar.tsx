import React, { useState } from "react";
import { MdOutlinePets, MdAccountBox } from "react-icons/md";
import { BsPostcardHeart, BsFillPersonVcardFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { TfiAlignRight, TfiClose } from "react-icons/tfi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { TbMoodSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import styles from "./Sidebar.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../storeReduxTools/storeHooks";
import SidebarItems from "./SidebarItems";
import ResetPassword from "../../pages/authentication/ResetPassword";
import { auth } from "../../database/firebase";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { logout } from "../../storeReduxTools/authSlice";

interface Props {
  children: ReactNode;
  toastMessageSuccess: (param: string) => void;
  toastMessageError: (param: string) => void;
}

const Sidebar = ({
  children,
  toastMessageSuccess,
  toastMessageError,
}: Props) => {
  const [openSub, setopenSub] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [resetPasswordContainerVisibily, setResetPasswordContainerVisibily] =
    useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  function closeAllTabs(
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    return setState(false);
  }
  function toggle() {
    setIsOpen(!isOpen);
  }
  function toggleOpen() {
    setIsOpen(true);
  }
  function blurHandler() {
    setIsOpen(false);
  }
  const handleLogout = async () => {
    dispatch(logout());
    // await signOut(auth);
    toastMessageSuccess("You have successfully been logged out");
    navigate("/login");
  };
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

  function handleClick() {
    blurHandler();
    closeAllTabs(setopenSub);
  }
  function handleClickChangePassword() {
    blurHandler();
    closeAllTabs(setopenSub);
    setResetPasswordContainerVisibily(true);
  }

  // const menuItem = [
  //   // {
  //   //   path: "/",
  //   //   name: "Pets For Adoption",
  //   //   icon: <MdOutlinePets />,
  //   // },
  //   // {
  //   //   path: "/adopters",
  //   //   name: "Search Adopters",
  //   //   icon: <TbMoodSearch />,
  //   // },
  //   // {
  //   //   path: "/messages",
  //   //   name: "Request Received",
  //   //   icon: <BsFillPersonVcardFill />,
  //   // },
  //   // {
  //   //   path: "/createpost",
  //   //   name: "Create Post",
  //   //   icon: <BsPostcardHeart />,
  //   // },

  //   // {
  //   //   path: "/myaccount",
  //   //   name: "My Account",
  //   //   icon: <MdAccountBox />,
  //   //   submenu: [
  //   //     { subpath: "/item1", subname: "Update Information" },
  //   //     { subpath: "/item2", subname: "Change Password" },
  //   //   ],
  //   // },
  // ];
  return (
    <>
      <ResetPassword
        handlePasswordReset={handlePasswordReset}
        isOpen={resetPasswordContainerVisibily}
        onClose={() => setResetPasswordContainerVisibily(false)}
        resetPasswordEmail={resetPasswordEmail}
        setResetPasswordEmail={setResetPasswordEmail}
      />
      <div className={styles.container}>
        <span
          className={styles.innerCon}
          style={{
            display: Boolean(!user) ? "none" : "block",
          }}
        >
          <div
            style={{ width: isOpen ? "250px" : "0px" }}
            className={styles.sidebar}
          >
            <div className={styles.top_section}>
              <div
                style={{ display: isOpen ? "flex" : "none" }}
                className={styles.logo}
              >
                {" "}
                {user?.photoUrl ? (
                  <img className="w-12 h-12 rounded-full" src={user.photoUrl} />
                ) : (
                  <div
                    style={{ padding: "0px" }}
                    className="w-12 text-center sm:h-12 text-[30px] text-black bg-[#fff] rounded-full"
                  >
                    {user?.email[0].toUpperCase()}
                  </div>
                )}{" "}
                <div className="ml-[10px]">
                  <p className="text-xs">You are Login as:</p>
                  <p className="text-sm">
                    {user?.fullName ? user?.fullName : user?.email}
                  </p>
                </div>
              </div>
              <button
                // onBlur={blurHandler}
                onClick={toggle}
                style={{ marginLeft: isOpen ? "0px" : "0px" }}
                className={styles.bars}
              >
                {isOpen ? (
                  <TfiClose className={styles.toggle} />
                ) : (
                  <TfiAlignRight className={styles.toggle} />
                )}
              </button>
            </div>

            {/* {menuItem.map((item, index) => (
              <>
                <SidebarItems
                  path={item.path}
                  name={item.name}
                  icon={item.icon}
                  index={index}
                  isOpen={isOpen}
                  parenthandleClick={handleClick}
                  // submenu={item.submenu}
                  blurHandler={blurHandler}
                  closeAllTabs={closeAllTabs}
                />
              </>
            ))} */}

            <div
              onClick={() => setopenSub(!openSub)}
              className={
                openSub ? [styles.active, styles.link].join(" ") : styles.link
              }
            >
              <div className={styles.icon}>
                <MdAccountBox />
              </div>
              <p
                style={{ display: isOpen ? "block" : "none" }}
                className={styles.link_text}
              >
                My Account
              </p>
              {openSub ? (
                <FaAngleUp className="text-lg self-center duration-1000" />
              ) : (
                <FaAngleDown className="text-lg self-center duration-1000" />
              )}
            </div>
            <ul
              style={{ display: openSub ? "block" : "none" }}
              className={styles.dropDown}
            >
              <li onClick={handleClick} className="text-sm">
                Update Information
              </li>
              <li onClick={handleClickChangePassword} className="text-sm">
                Change Password
              </li>
            </ul>

            <div onClick={handleLogout} className={styles.link}>
              <div className={styles.icon}>
                <BiLogOut />
              </div>
              <p
                style={{ display: isOpen ? "block" : "none" }}
                className={styles.link_text}
              >
                Logout
              </p>
            </div>
          </div>
        </span>

        <main onClick={handleClick}>{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
