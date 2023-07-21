import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Props {
  ifHasData: number;
  title: string;
  guest: boolean;
}

const MainContentTitle = ({ ifHasData, title, guest }: Props) => {
  const [showtogglePostOption, setShowTogglePostOption] = useState(false);

  function handleMouseOut() {
    const timeout = setTimeout(() => {
      setShowTogglePostOption(false);
    }, 500);
    return () => clearTimeout(timeout);
  }

  return (
    <>
      <div className="z-50 drop-shadow-[1px_1px_var(--tw-shadow-color)] items-center mx-auto max-w-[1680px] justify-between flex shadow-white bg-gradient-to-b from-white ...  py-5 px-4 md:px-[130px] text-center sticky top-[132px] min-[438px]:top-[77px] md:top-[66px] ...">
        <h2 className="text-lg sm:text-3xl text-[#002349] mr-2 font-bold">
          {title}
        </h2>
        <div>
          {guest ? (
            <>
              <Link
                to="/login"
                className="text-white bg-[#002349] hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
              >
                Login or Signup
              </Link>
            </>
          ) : (
            <>
              <button
                onBlur={handleMouseOut}
                onClick={() => setShowTogglePostOption(!showtogglePostOption)}
                className="text-white bg-[#002349] hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
                type="button"
              >
                Post Option
                {showtogglePostOption ? (
                  <FaAngleUp className="ml-1 text-lg" />
                ) : (
                  <FaAngleDown className="ml-1 text-lg" />
                )}
              </button>
            </>
          )}

          <div
            style={{ display: showtogglePostOption ? "block" : "none" }}
            className="z-10 hidden bg-white divide-y absolute divide-gray-100 rounded-lg shadow w-[137px] dark:bg-gray-700"
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
              {ifHasData > 0 && title != "My Post" && (
                <li>
                  <Link
                    to="/mypost"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    View My Post
                  </Link>
                </li>
              )}
              {title != "List For Adoption" && (
                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    View All Post
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContentTitle;
