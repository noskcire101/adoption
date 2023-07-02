import React, { ReactNode, useEffect, useState } from "react";
import styles from "./Properties.module.css";
import {
  TfiAngleDoubleLeft,
  TfiAngleDoubleRight,
  TfiAngleLeft,
  TfiAngleRight,
} from "react-icons/tfi";
import { MdOutlineArrowBackIos } from "react-icons/md";

interface Props {
  toastMessageSuccess: (param: string) => void;
  toastMessageError: (param: string) => void;
}
const Properties = ({ toastMessageSuccess, toastMessageError }: Props) => {
  const [data, setData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }
  // Logic para pigilan ang loadmore mag bug
  // console.log(currentPage * (itemsPerPage + 5), "nextRound indexOfLastItem");
  // console.log(data.length, "-total items");
  // console.log(indexOfLastItem, "-indexOfLastItem ,must not over total items");
  // console.log(itemsPerPage, "-itemsPerPage soon be +5");
  // console.log(currentPage, "-currentPage");

  function handleClick(event: any) {
    setcurrentPage(Number(event.target.id));
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={String(number)}
          onClick={handleClick}
          className={currentPage == number ? styles.active : ""}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  function handleNextbtn() {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }

  function handlePrevbtn() {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }

  function renderNextBatch() {
    setcurrentPage(maxPageNumberLimit + 1);
    setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    setminPageNumberLimit(maxPageNumberLimit);
  }

  function renderPrevBatch() {
    setcurrentPage(minPageNumberLimit + 1 - pageNumberLimit);
    setmaxPageNumberLimit(minPageNumberLimit);
    setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
  }

  function handleLoadMore() {
    if (data.length >= currentPage * (itemsPerPage + 5)) {
      setitemsPerPage(itemsPerPage + 5);
    }
  }

  return (
    <>
      <div className="overflow-auto h-[90vh] py-[5vh] px-[5%] pl-[4%] mx-[0%]">
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-l hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-96 md:rounded-none md:rounded-l-lg"
            src="/docs/images/blog/image-4.jpg"
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              P 1200
            </h5>
            <div>
              <button className="bg-[#002349] hover:bg-blue-700 border border-[#002349] hover:border-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
                Update
              </button>
              <button className="bg-transparent hover:bg-red-600 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-600 hover:border-transparent rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
        <h1>Todo List</h1> <br />
        <ul>
          {currentItems?.map((data: any, index: number) => {
            return <li key={index}>{data.title}</li>;
          })}
        </ul>
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px">
            <li>
              <button
                style={{
                  opacity: minPageNumberLimit >= 1 ? "1" : "0.3",
                }}
                disabled={minPageNumberLimit >= 1 ? false : true}
                onClick={renderPrevBatch}
                className={
                  minPageNumberLimit >= 1
                    ? "cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white"
                    : "cursor-not-allowed px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 "
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
                onClick={handlePrevbtn}
                disabled={currentPage == pages[0] ? true : false}
                className={
                  currentPage == pages[0]
                    ? "cursor-not-allowed px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 "
                    : "cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white"
                }
              >
                <TfiAngleLeft />
              </button>
            </li>

            {pages.map((number) => {
              if (
                number < maxPageNumberLimit + 1 &&
                number > minPageNumberLimit
              ) {
                return (
                  <li
                    key={number}
                    id={String(number)}
                    onClick={handleClick}
                    className={
                      currentPage == number
                        ? [
                            "px-3 py-1.5 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white",
                            styles.active,
                          ].join(" ")
                        : "px-3 py-1.5 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white"
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
                onClick={handleNextbtn}
                style={{
                  opacity: currentPage == pages[pages.length - 1] ? "0.4" : "1",
                }}
                disabled={currentPage == pages[pages.length - 1] ? true : false}
                className={
                  currentPage == pages[pages.length - 1]
                    ? "cursor-not-allowed px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 "
                    : "cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white"
                }
              >
                <TfiAngleRight />
              </button>
            </li>

            <li>
              <button
                style={{
                  opacity: pages.length > maxPageNumberLimit ? "1" : "0.4",
                }}
                disabled={pages.length > maxPageNumberLimit ? false : true}
                onClick={renderNextBatch}
                className={
                  pages.length > maxPageNumberLimit
                    ? "cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white"
                    : "cursor-not-allowed px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 "
                }
              >
                <TfiAngleDoubleRight />
              </button>
            </li>
          </ul>
        </nav>
        <div className="w-full text-center">
          <button
            onClick={handleLoadMore}
            className={
              data.length >= currentPage * (itemsPerPage + 5)
                ? "bg-[#002349] hover:bg-blue-700 border cursor-pointer border-[#002349] hover:border-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                : "bg-gray-300  border border-gray-300 cursor-not-allowed text-white font-bold py-2 px-4 mr-2 rounded"
            }
          >
            {data.length >= currentPage * (itemsPerPage + 5)
              ? "Expand More"
              : "Expansion Limit Reached"}
          </button>
        </div>
        {/* <div>
          <ul className={styles.pageNumbers}>
            <li>
              <button
                onClick={handlePrevbtn}
                disabled={currentPage == pages[0] ? true : false}
              >
                Prev
              </button>
            </li>
            {minPageNumberLimit >= 1 && (
              <li onClick={renderPrevBatch}> &hellip; </li>
            )}
            {pages.map((number) => {
              if (
                number < maxPageNumberLimit + 1 &&
                number > minPageNumberLimit
              ) {
                return (
                  <li
                    key={number}
                    id={String(number)}
                    onClick={handleClick}
                    className={currentPage == number ? styles.active : ""}
                  >
                    {number}
                  </li>
                );
              } else {
                return null;
              }
            })}
            {pages.length > maxPageNumberLimit && (
              <li onClick={renderNextBatch}> &hellip; </li>
            )}

            <li>
              <button
                onClick={handleNextbtn}
                disabled={currentPage == pages[pages.length - 1] ? true : false}
              >
                Next
              </button>
            </li>
          </ul>
        </div> */}
      </div>
    </>
  );
};
export default Properties;
