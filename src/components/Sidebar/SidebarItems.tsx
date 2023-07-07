import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { TfiAngleUp, TfiAngleDown } from "react-icons/tfi";

interface Submenu {
  subpath: string;
  subname: string;
}

interface Props {
  path: string;
  name: string;
  icon: JSX.Element;
  index: number;
  isOpen: boolean;
  submenu?: Submenu[];
  parenthandleClick: () => void;
  blurHandler: () => void;
  closeAllTabs(setState: React.Dispatch<React.SetStateAction<boolean>>): void;
}

const SidebarItems = ({
  path,
  name,
  icon,
  index,
  submenu,
  isOpen,
  blurHandler,
  closeAllTabs,
  parenthandleClick,
}: Props) => {
  const [openSub, setopenSub] = useState(false);

  function handleClick() {
    blurHandler();
    closeAllTabs(setopenSub);
    parenthandleClick();
    console.log(openSub, "hey1");
  }
  console.log(openSub, "hey");
  return (
    <>
      {!submenu ? (
        <NavLink
          onClick={handleClick}
          to={path}
          key={index}
          className={({ isActive }) =>
            isActive ? [styles.active, styles.link].join(" ") : styles.link
          }
        >
          <div className={styles.icon}>{icon}</div>
          <p
            style={{ display: isOpen ? "block" : "none" }}
            className={styles.link_text}
          >
            {name}
          </p>
        </NavLink>
      ) : (
        <>
          {" "}
          <div
            key={index}
            onClick={() => setopenSub((prev) => !prev)}
            className={
              openSub ? [styles.active, styles.link].join(" ") : styles.link
            }
          >
            <div className={styles.icon}>{icon}</div>
            <p
              style={{ display: isOpen ? "block" : "none" }}
              className={styles.link_text}
            >
              {name}
            </p>
            {openSub ? (
              <TfiAngleUp className="self-center duration-1000" />
            ) : (
              <TfiAngleDown className="self-center duration-1000" />
            )}
          </div>
          {submenu && (
            <ul
              style={{ display: openSub ? "block" : "none" }}
              className={styles.dropDown}
            >
              {submenu?.map((submenu, index) => (
                <>
                  <NavLink
                    onClick={handleClick}
                    to={submenu.subpath}
                    key={index}
                  >
                    <li className="text-sm">{submenu.subname}</li>
                  </NavLink>
                </>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default SidebarItems;
