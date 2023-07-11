import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useAppSelector } from "../../storeReduxTools/storeHooks";
import { Link } from "react-router-dom";

const MainContentTitle = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [togglePostOption, settogglePostOption] = useState(false);

  function handleMouseOut() {
    const timeout = setTimeout(() => {
      settogglePostOption(false);
    }, 500);
    return () => clearTimeout(timeout);
  }

  return (
    <>
      <div className="drop-shadow-[1px_1px_var(--tw-shadow-color)] items-center justify-between sm:justify-center flex shadow-white bg-gradient-to-b from-white ...   p-5 lg:p-10 text-center sticky top-[74px] ...">
        <h2 className="text-[18px] sm:text-3xl text-[#002349] mr-2">
          List For Adoption
        </h2>
        <div className="w-[148px]">
          <button
            onBlur={handleMouseOut}
            onClick={() => settogglePostOption(!togglePostOption)}
            className="text-white bg-[#002349] hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
            type="button"
          >
            Post Option
            {togglePostOption ? (
              <FaAngleUp className="ml-1 text-lg" />
            ) : (
              <FaAngleDown className="ml-1 text-lg" />
            )}
          </button>
          <div
            style={{ display: togglePostOption ? "block" : "none" }}
            className="z-10 hidden bg-white divide-y absolute divide-gray-100 rounded-lg shadow w-[146px] dark:bg-gray-700"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <Link
                  to="/new"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Create New Post
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  View My Post
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContentTitle;
