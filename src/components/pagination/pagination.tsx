import React, { useState } from "react";
import styles from "./Pagination.module.css";
import {
  TfiAngleDoubleLeft,
  TfiAngleDoubleRight,
  TfiAngleLeft,
  TfiAngleRight,
} from "react-icons/tfi";

interface Props {
  listOfDataFromDb: [];
  numberOfItemsRenderPerPage: number;
  pageNumberLimitPerBatch: number;
  currentListOfEachItemsIndexFromPagination(param: any): any;
}

const pagination = ({
  listOfDataFromDb,
  numberOfItemsRenderPerPage,
  pageNumberLimitPerBatch,
  currentListOfEachItemsIndexFromPagination,
}: Props) => {
  const [currentPage, setcurrentPage] = useState(1);
  const [lastPageNumberInCurrentBatch, setlastPageNumberInCurrentBatch] =
    useState(pageNumberLimitPerBatch);
  const [
    startingPageNumberInCurrentBatch,
    setStartingPageNumberInCurrentBatch,
  ] = useState(0);
  const indexOfLastItemInCurrentBatch =
    currentPage * numberOfItemsRenderPerPage;
  const indexOfFirstItemInCurrentBatch =
    indexOfLastItemInCurrentBatch - numberOfItemsRenderPerPage;
  currentListOfEachItemsIndexFromPagination(
    listOfDataFromDb.slice(
      indexOfFirstItemInCurrentBatch,
      indexOfLastItemInCurrentBatch
    )
  );
  //preparing number for each pages
  const pagesNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(listOfDataFromDb.length / numberOfItemsRenderPerPage);
    i++
  ) {
    pagesNumbers.push(i);
  }

  function handleClick(event: any) {
    setcurrentPage(Number(event.target.id));
  }
  function handleNextbtn() {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > lastPageNumberInCurrentBatch) {
      setlastPageNumberInCurrentBatch(
        lastPageNumberInCurrentBatch + pageNumberLimitPerBatch
      );
      setStartingPageNumberInCurrentBatch(
        startingPageNumberInCurrentBatch + pageNumberLimitPerBatch
      );
    }
  }
  function handlePrevbtn() {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimitPerBatch == 0) {
      setlastPageNumberInCurrentBatch(
        lastPageNumberInCurrentBatch - pageNumberLimitPerBatch
      );
      setStartingPageNumberInCurrentBatch(
        startingPageNumberInCurrentBatch - pageNumberLimitPerBatch
      );
    }
  }

  function renderNextBatch() {
    setcurrentPage(lastPageNumberInCurrentBatch + 1);
    setlastPageNumberInCurrentBatch(
      lastPageNumberInCurrentBatch + pageNumberLimitPerBatch
    );
    setStartingPageNumberInCurrentBatch(lastPageNumberInCurrentBatch);
  }

  function renderPrevBatch() {
    setcurrentPage(
      startingPageNumberInCurrentBatch + 1 - pageNumberLimitPerBatch
    );
    setlastPageNumberInCurrentBatch(startingPageNumberInCurrentBatch);
    setStartingPageNumberInCurrentBatch(
      startingPageNumberInCurrentBatch - pageNumberLimitPerBatch
    );
  }

  return (
    <>
      {" "}
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          <li>
            <button
              style={{
                opacity: startingPageNumberInCurrentBatch >= 1 ? "1" : "0.3",
              }}
              disabled={startingPageNumberInCurrentBatch >= 1 ? false : true}
              onClick={renderPrevBatch}
              className={
                startingPageNumberInCurrentBatch >= 1
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
                opacity: currentPage == pagesNumbers[0] ? "0.3" : "1",
              }}
              onClick={handlePrevbtn}
              disabled={currentPage == pagesNumbers[0] ? true : false}
              className={
                currentPage == pagesNumbers[0]
                  ? "cursor-not-allowed px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 "
                  : "cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white"
              }
            >
              <TfiAngleLeft />
            </button>
          </li>

          {pagesNumbers.map((number) => {
            if (
              number < lastPageNumberInCurrentBatch + 1 &&
              number > startingPageNumberInCurrentBatch
            ) {
              return (
                <li
                  key={number}
                  id={String(number)}
                  onClick={handleClick}
                  className={
                    currentPage == number
                      ? [
                          "cursor-pointer px-3 py-1.5 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white",
                          styles.active,
                        ].join(" ")
                      : "cursor-pointer px-3 py-1.5 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white"
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
                opacity:
                  currentPage == pagesNumbers[pagesNumbers.length - 1]
                    ? "0.4"
                    : "1",
              }}
              disabled={
                currentPage == pagesNumbers[pagesNumbers.length - 1]
                  ? true
                  : false
              }
              className={
                currentPage == pagesNumbers[pagesNumbers.length - 1]
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
                opacity:
                  pagesNumbers.length > lastPageNumberInCurrentBatch
                    ? "1"
                    : "0.4",
              }}
              disabled={
                pagesNumbers.length > lastPageNumberInCurrentBatch
                  ? false
                  : true
              }
              onClick={renderNextBatch}
              className={
                pagesNumbers.length > lastPageNumberInCurrentBatch
                  ? "cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-700 hover:border-blue-700 hover:text-white"
                  : "cursor-not-allowed px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 "
              }
            >
              <TfiAngleDoubleRight />
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default pagination;
