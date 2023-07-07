import React, { useEffect, useState } from "react";
import { MdOutlinePets, MdAccountBox } from "react-icons/md";
import { BsPostcardHeart, BsFillPersonVcardFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { TfiAlignRight, TfiClose } from "react-icons/tfi";
import { TfiAngleUp, TfiAngleDown } from "react-icons/tfi";
import { TbMoodSearch } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { ReactNode } from "react";
import styles from "./Sidebar.module.css";
import { useAppSelector } from "../../storeReduxTools/storeHooks";
import SidebarItems from "./SidebarItems";

interface Props {
  children: ReactNode;
}
function closeAllTabs(setState: React.Dispatch<React.SetStateAction<boolean>>) {
  return setState(false);
}

const Sidebar = ({ children }: Props) => {
  function blurHandler() {
    setIsOpen(false);
  }
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const toggleOpen = () => setIsOpen(true);
  const { user } = useAppSelector((state) => state.auth);
  const [openSub, setopenSub] = useState(false);
  function handleClick() {
    blurHandler();
    closeAllTabs(setopenSub);
  }
  const menuItem = [
    {
      path: "/",
      name: "Pets For Adoption",
      icon: <MdOutlinePets />,
    },
    {
      path: "/adopters",
      name: "Search Adopters",
      icon: <TbMoodSearch />,
    },
    {
      path: "/messages",
      name: "Request Received",
      icon: <BsFillPersonVcardFill />,
    },
    {
      path: "/mypost",
      name: "My Posts",
      icon: <BsPostcardHeart />,
    },

    // {
    //   path: "/myaccount",
    //   name: "My Account",
    //   icon: <MdAccountBox />,
    //   submenu: [
    //     { subpath: "/item1", subname: "Update Information" },
    //     { subpath: "/item2", subname: "Change Password" },
    //   ],
    // },
  ];
  return (
    <>
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
                    style={{ padding: "11px" }}
                    className="w-12 h-12 text-[30px] bg-[#fff] rounded-full"
                  >
                    {" "}
                    {user?.email[0].toUpperCase()}
                  </div>
                )}{" "}
                <div className="ml-[10px]">
                  <p className="text-xs">You are Login as:</p>
                  <p className="text-sm">{user?.fullName}</p>
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

            {menuItem.map((item, index) => (
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
            ))}

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
                <TfiAngleUp className="self-center duration-1000" />
              ) : (
                <TfiAngleDown className="self-center duration-1000" />
              )}
            </div>
            <ul
              style={{ display: openSub ? "block" : "none" }}
              className={styles.dropDown}
            >
              <li onClick={handleClick} className="text-sm">
                Update Information
              </li>
              <li onClick={handleClick} className="text-sm">
                Change Password
              </li>
            </ul>

            <div className={styles.link}>
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
