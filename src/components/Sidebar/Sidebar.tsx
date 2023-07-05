import React, { useEffect, useState } from "react";
import { MdOutlinePets } from "react-icons/md";
import { BsPostcardHeart, BsFillPersonVcardFill } from "react-icons/bs";
import { LuMailSearch } from "react-icons/lu";
import { TbMoodSearch } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { ReactNode } from "react";
import styles from "./Sidebar.module.css";
import { useAppSelector } from "../../storeReduxTools/storeHooks";

interface Props {
  children: ReactNode;
}

const Sidebar = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  // const toggle = () => setIsOpen(!isOpen);
  const toggleOpen = () => setIsOpen(true);
  const { user } = useAppSelector((state) => state.auth);
  function getWindowDimensions(): {
    windowWidth: number;
    windowHeight: number;
  } {
    if (typeof window === "undefined") {
      const windowWidth = 0;
      const windowHeight = 0;
      return { windowWidth, windowHeight };
    }

    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

    return {
      windowWidth,
      windowHeight,
    };
  }

  function UseWindowDimensions(): {
    windowWidth: number;
    windowHeight: number;
  } {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );

    useEffect(() => {
      function handleResize(): void {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);

      return (): void => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }
  const { windowWidth } = UseWindowDimensions();

  useEffect(() => {
    windowWidth > 947 ? setIsOpen(true) : setIsOpen(false);
  }, [windowWidth]);

  const menuItem = [
    {
      path: "/",
      name: "Pets For Adoption",
      icon: <MdOutlinePets />,
    },
    {
      path: "/adopters",
      name: "Pet Adopters",
      icon: <TbMoodSearch />,
    },
    {
      path: "/mypost",
      name: "My Posts",
      icon: <BsPostcardHeart />,
    },
    {
      path: "/messages",
      name: "Applicant Received",
      icon: <BsFillPersonVcardFill />,
    },
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
            style={{ width: isOpen ? "300px" : "55px" }}
            className={styles.sidebar}
          >
            <div className={styles.top_section}>
              <h1
                style={{ display: isOpen ? "block" : "none" }}
                className={styles.logo}
              >
                Logo
              </h1>
              {/* <div
                style={{ marginLeft: isOpen ? "120px" : "0px" }}
                className={styles.bars}
              >
                {isOpen ? (
                  <GoSidebarExpand className={styles.toggle} onClick={toggle} />
                ) : (
                  <GoSidebarCollapse
                    className={styles.toggle}
                    onClick={toggle}
                  />
                )}
              </div> */}
            </div>
            {menuItem.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) =>
                  isActive
                    ? [styles.active, styles.link].join(" ")
                    : styles.link
                }
              >
                <div className={styles.icon}>{item.icon}</div>
                <p
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles.link_text}
                >
                  {item.name}
                </p>
              </NavLink>
            ))}
          </div>
        </span>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Sidebar;
