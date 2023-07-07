import React, { Dispatch } from "react";
import styles from "./Pagination.module.css";
import {
  TfiAngleDoubleDown,
  TfiAngleDoubleLeft,
  TfiAngleDoubleRight,
  TfiAngleLeft,
  TfiAngleRight,
} from "react-icons/tfi";
import {
  handleClick,
  handleNextbtn,
  handlePrevbtn,
  handleNextBatch,
  handlePrevBatch,
  createPages,
  handleLoadMore,
} from "./paginationFunctions";
import { blogProps } from "../../yupModels/blog";
interface Props {
  dataFromDB: blogProps[];
  itemLimitPerPage: number;
  pageNumberLimit: number;
  currentPage: number;
  setcurrentPage: Dispatch<React.SetStateAction<number>>;
  startingPageNumberInCurrentBatch: number;
  setStartingPageNumberInCurrentBatch: Dispatch<React.SetStateAction<number>>;
  lastPageNumberInCurrentBatch: number;
  setLastPageNumberInCurrentBatch: Dispatch<React.SetStateAction<number>>;
  setitemLimitPerPage: Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  setitemLimitPerPage,
  lastPageNumberInCurrentBatch,
  dataFromDB,
  itemLimitPerPage,
  currentPage,
  setStartingPageNumberInCurrentBatch,
  pageNumberLimit,
  startingPageNumberInCurrentBatch,
  setcurrentPage,
  setLastPageNumberInCurrentBatch,
}: Props) => {
  const pages: any[] = createPages(dataFromDB, itemLimitPerPage);
  console.log(itemLimitPerPage, "itemLimitPerPage");
  console.log(dataFromDB.length, "dataFromDB.length");
  return (
    <>
      {" "}
      <div className="overflow-auto pb-[2vh] text-center px-[5%] pl-[4%] mx-[0%]">
        <nav aria-label="Pagination" className="border-t-2">
          <p className="text-gray-500 text-xs pb-[1vh] pt-[2vh]">
            Page {currentPage} of{" "}
            {Math.ceil(dataFromDB.length / itemLimitPerPage)}
          </p>
          <ul className="inline-flex -space-x-px mt-1">
            <li>
              <button
                style={{
                  opacity: startingPageNumberInCurrentBatch >= 1 ? "1" : "0.3",
                }}
                disabled={startingPageNumberInCurrentBatch >= 1 ? false : true}
                onClick={() =>
                  handlePrevBatch(
                    setcurrentPage,
                    setLastPageNumberInCurrentBatch,
                    pageNumberLimit,
                    setStartingPageNumberInCurrentBatch,
                    startingPageNumberInCurrentBatch
                  )
                }
                className={
                  startingPageNumberInCurrentBatch >= 1
                    ? "cursor-pointer md:text-sm md:px-3 md:py-3 text-xs px-1.5 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white"
                    : "cursor-not-allowed md:text-sm md:px-3 md:py-3 text-xs px-1.5 py-2 leading-tight text-gray-500 bg-white border border-gray-300 "
                }
              >
                <TfiAngleDoubleLeft />
              </button>
            </li>

            <li>
              <button
                style={{
                  opacity: currentPage == pages[0] ? "0.3" : "1",
                }}
                onClick={() =>
                  handlePrevbtn(
                    setcurrentPage,
                    currentPage,
                    lastPageNumberInCurrentBatch,
                    setLastPageNumberInCurrentBatch,
                    pageNumberLimit,
                    setStartingPageNumberInCurrentBatch,
                    startingPageNumberInCurrentBatch
                  )
                }
                disabled={currentPage == pages[0] ? true : false}
                className={
                  currentPage == pages[0]
                    ? "cursor-not-allowed md:text-sm md:px-3 md:py-3 text-xs px-1.5 py-2 leading-tight text-gray-500 bg-white border border-gray-300 "
                    : "cursor-pointer md:text-sm md:px-3 md:py-3 text-xs px-1.5 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white"
                }
              >
                <TfiAngleLeft />
              </button>
            </li>

            {pages.map((number: number) => {
              if (
                number < lastPageNumberInCurrentBatch + 1 &&
                number > startingPageNumberInCurrentBatch
              ) {
                return (
                  <li
                    key={number}
                    id={String(number)}
                    onClick={() => handleClick(number, setcurrentPage)}
                    className={
                      currentPage == number
                        ? [
                            "cursor-pointer md:text-sm md:px-4 md:py-2 text-xs px-2 py-1.5 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white",
                            styles.active,
                          ].join(" ")
                        : "cursor-pointer md:text-sm md:px-4 md:py-2 text-xs px-2 py-1.5 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white"
                    }
                  >
                    {number}
                  </li>
                );
              } else {
                return null;
              }
            })}
            <li>
              <button
                onClick={() =>
                  handleNextbtn(
                    setcurrentPage,
                    currentPage,
                    lastPageNumberInCurrentBatch,
                    setLastPageNumberInCurrentBatch,
                    pageNumberLimit,
                    setStartingPageNumberInCurrentBatch,
                    startingPageNumberInCurrentBatch
                  )
                }
                style={{
                  opacity: currentPage == pages[pages.length - 1] ? "0.4" : "1",
                }}
                disabled={currentPage == pages[pages.length - 1] ? true : false}
                className={
                  currentPage == pages[pages.length - 1]
                    ? "cursor-not-allowed md:text-sm md:px-3 md:py-3 text-xs px-1.5 py-2 leading-tight text-gray-500 bg-white border border-gray-300 "
                    : "cursor-pointer md:text-sm md:px-3 md:py-3 text-xs px-1.5 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white"
                }
              >
                <TfiAngleRight />
              </button>
            </li>

            <li>
              <button
                style={{
                  opacity:
                    pages.length > lastPageNumberInCurrentBatch ? "1" : "0.4",
                }}
                disabled={
                  pages.length > lastPageNumberInCurrentBatch ? false : true
                }
                onClick={() =>
                  handleNextBatch(
                    setcurrentPage,
                    lastPageNumberInCurrentBatch,
                    setLastPageNumberInCurrentBatch,
                    pageNumberLimit,
                    setStartingPageNumberInCurrentBatch
                  )
                }
                className={
                  pages.length > lastPageNumberInCurrentBatch
                    ? "cursor-pointer md:text-sm md:px-3 md:py-3 text-xs px-1.5 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white"
                    : "cursor-not-allowed md:text-sm md:px-3 md:py-3 text-xs px-1.5 py-2 leading-tight text-gray-500 bg-white border border-gray-300 "
                }
              >
                <TfiAngleDoubleRight />
              </button>
            </li>
            <span className="w-[10px]"></span>
            <li>
              <button
                style={{
                  opacity: itemLimitPerPage <= dataFromDB.length ? "1" : "0.3",
                }}
                disabled={itemLimitPerPage <= dataFromDB.length ? false : true}
                onClick={() =>
                  handleLoadMore(
                    dataFromDB,
                    currentPage,
                    itemLimitPerPage,
                    pageNumberLimit,
                    setitemLimitPerPage,
                    setLastPageNumberInCurrentBatch,
                    setStartingPageNumberInCurrentBatch,
                    setcurrentPage
                  )
                }
                className={
                  itemLimitPerPage <= dataFromDB.length
                    ? "cursor-pointer md:text-sm md:px-3 md:py-3 text-xs px-1.5 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white"
                    : "cursor-not-allowed md:text-sm md:px-3 md:py-3 text-xs px-1.5 py-2 leading-tight text-gray-500 bg-white border border-gray-300"
                }
              >
                <TfiAngleDoubleDown />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
