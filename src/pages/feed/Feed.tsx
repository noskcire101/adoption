import React, { Fragment, ReactNode, useEffect, useState } from "react";
import styles from "./Feed.module.css";

import Pagination from "../../components/pagination/pagination";

import { getAllDocsInACollection } from "../../database/crud";
import { Link } from "react-router-dom";
import { blogProps } from "../../yupModels/blog";
import FeedCard from "./FeedCard";

interface Props {
  toastMessageSuccess: (param: string) => void;
  toastMessageError: (param: string) => void;
}

const Feed = ({ toastMessageSuccess, toastMessageError }: Props) => {
  const [currentPage, setcurrentPage] = useState(1);
  const [itemLimitPerPage, setitemLimitPerPage] = useState(5);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [lastPageNumberInCurrentBatch, setLastPageNumberInCurrentBatch] =
    useState(5);
  const [
    startingPageNumberInCurrentBatch,
    setStartingPageNumberInCurrentBatch,
  ] = useState(0);
  const indexOfLastItemInCurrentBatch = currentPage * itemLimitPerPage;
  const indexOfFirstItemInCurrrentBatch =
    indexOfLastItemInCurrentBatch - itemLimitPerPage;
  const [dataFromDB, setDataFromDB] = useState<blogProps[]>([]);
  const currentItems: any[] = dataFromDB.slice(
    indexOfFirstItemInCurrrentBatch,
    indexOfLastItemInCurrentBatch
  );

  useEffect(() => {
    getAllDocsInACollection("blog", setDataFromDB);
  }, []);

  // fetch("https://jsonplaceholder.typicode.com/todos")
  //   .then((response) => response.json())
  //   .then((json) => setDataFromDB(json));

  return (
    <>
      <div className="overflow-auto h-[81vh] sm:h-[79vh] pb-[4vh] mx-[0%]">
        <div className="sticky pt-[3vh] pb-[3vh] px-[5%] top-0 ... bg-white">
          <h2 className=" text-2xl  text-black md:text-3xl drop-shadow-lg shadow-white ">
            Free Pets For Adoption
          </h2>
        </div>
        <div className="container mx-auto px-[5%] md:px-12">
          <ul className="flex flex-wrap -mx-1 lg:-mx-4">
            {currentItems?.map((data, index) => {
              return (
                // <p key={index}>
                //   {data.title}
                //   {index}
                //   {data.description}
                //   {data.id}
                // </p>

                <FeedCard
                  id={data.id}
                  index={index}
                  title={data.title}
                  description={data.description}
                />
              );
            })}
          </ul>
        </div>
      </div>

      <Pagination
        setitemLimitPerPage={setitemLimitPerPage}
        itemLimitPerPage={itemLimitPerPage}
        dataFromDB={dataFromDB}
        pageNumberLimit={pageNumberLimit}
        currentPage={currentPage}
        setcurrentPage={setcurrentPage}
        startingPageNumberInCurrentBatch={startingPageNumberInCurrentBatch}
        setStartingPageNumberInCurrentBatch={
          setStartingPageNumberInCurrentBatch
        }
        lastPageNumberInCurrentBatch={lastPageNumberInCurrentBatch}
        setLastPageNumberInCurrentBatch={setLastPageNumberInCurrentBatch}
      />
    </>
  );
};
export default Feed;
