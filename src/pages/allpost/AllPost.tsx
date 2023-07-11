import React, { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./AllPost.module.css";

import Pagination from "../../components/pagination/pagination";

import { getAllDocsInACollection } from "../../database/crud";
import { Link } from "react-router-dom";
import { postProps } from "../../yupModels/postProps";
import PostCard from "./PostCard";
import { useAppSelector } from "../../storeReduxTools/storeHooks";
import NeedsLoginMessage from "../../components/needsLoginMessage/NeedsLoginMessage";
import MainContentTitle from "../../components/mainContentTitle/mainContentTitle";

interface Props {
  toastMessageSuccess: (param: string) => void;
  toastMessageError: (param: string) => void;
}

const AllPost = ({ toastMessageSuccess, toastMessageError }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
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
  const [dataFromDB, setDataFromDB] = useState<postProps[]>([]);
  const currentItems: any[] = dataFromDB.slice(
    indexOfFirstItemInCurrrentBatch,
    indexOfLastItemInCurrentBatch
  );

  useEffect(() => {
    getAllDocsInACollection("blog", setDataFromDB);
  }, []);

  const [delayExecute, setdelayExecute] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setdelayExecute(true);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [delayExecute]);

  return (
    <>
      <MainContentTitle />
      {delayExecute && !user && <NeedsLoginMessage />}

      <div
        style={{ display: user ? "block" : "none" }}
        className="overflow-auto pb-[4vh] mx-[0%]"
      >
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

                <PostCard
                  id={data.id}
                  index={index}
                  title={data.title}
                  description={data.description}
                />
              );
            })}
            <li className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
              <article className="overflow-hidden rounded-lg shadow-lg">
                <img
                  alt="Placeholder"
                  className="block h-auto w-full"
                  src="https://picsum.photos/600/400/?random"
                />

                <header className="flex items-center justify-between leading-tight p-2 md:py-3 md:px-4">
                  <h1 className="text-lg max-w-[90%] break-words pr-[25px]">
                    <a
                      className="no-underline hover:underline text-black"
                      href="#"
                    >
                      Name:
                    </a>
                  </h1>
                  <div className="text-center">
                    <p className="text-[25px]"> </p>
                    <p className="text-grey-darker text-[11px]">45</p>
                  </div>
                </header>
                <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-4  ">
                  <p className="text-gray-500 text-sm break-words ">
                    Address: 92 Tabing Ilog Street Aniban 4 Bacoor Cavite
                  </p>
                </div>
                <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-1  ">
                  <p className="text-gray-500 text-xs max-w-[77%] break-words pr-[25px]">
                    Born: 11/11/23 (1 Month Old)
                  </p>
                  <p className="text-gray-500 text-xs ">Gender: Female</p>
                </div>

                <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-1 ">
                  <p className="text-gray-500 text-xs max-w-[77%] break-words pr-[25px]">
                    Breed: Siberian Husky
                  </p>
                  <p className="text-gray-500 text-xs">Vaccinated: Yes</p>
                </div>
                <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-3 ">
                  <p className="text-gray-500 text-xs max-w-[77%] break-words pr-[25px]">
                    Type: Cat
                  </p>
                  <p className="text-gray-500 text-xs">Dewormed: Yes</p>
                </div>
                <footer className="flex items-center justify-between leading-none pr-2 pl-2 md:pr-4 md:pl-4 pt-2 pb-5 ">
                  <p className="text-gray-500 text-[10px] ml-2 inline-flex">
                    <img
                      alt="Placeholder"
                      className="block rounded-full"
                      src="https://picsum.photos/32/32/?random"
                    />
                    Posted By:<br></br>
                    Erickson Sernero
                  </p>
                </footer>
              </article>
            </li>
            <li className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
              <article className="overflow-hidden rounded-lg shadow-lg">
                <img
                  alt="Placeholder"
                  className="block h-auto w-full"
                  src="https://picsum.photos/600/400/?random"
                />

                <header className="flex items-center justify-between leading-tight p-2 md:py-3 md:px-4">
                  <h1 className="text-lg max-w-[90%] break-words pr-[25px]">
                    <a
                      className="no-underline hover:underline text-black"
                      href="#"
                    >
                      Name:
                    </a>
                  </h1>
                  <div className="text-center">
                    <p className="text-[25px]"> </p>
                    <p className="text-grey-darker text-[11px]">45</p>
                  </div>
                </header>
                <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-4  ">
                  <p className="text-gray-500 text-sm break-words ">
                    Address: 92 Tabing Ilog Street Aniban 4 Bacoor Cavite
                  </p>
                </div>
                <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-1  ">
                  <p className="text-gray-500 text-xs max-w-[77%] break-words pr-[25px]">
                    Born: 11/11/23 (1 Month Old)
                  </p>
                  <p className="text-gray-500 text-xs ">Gender: Female</p>
                </div>

                <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-1 ">
                  <p className="text-gray-500 text-xs max-w-[77%] break-words pr-[25px]">
                    Breed: Siberian Husky
                  </p>
                  <p className="text-gray-500 text-xs">Vaccinated: Yes</p>
                </div>
                <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-3 ">
                  <p className="text-gray-500 text-xs max-w-[77%] break-words pr-[25px]">
                    Type: Cat
                  </p>
                  <p className="text-gray-500 text-xs">Dewormed: Yes</p>
                </div>
                <footer className="flex items-center justify-between leading-none pr-2 pl-2 md:pr-4 md:pl-4 pt-2 pb-5 ">
                  <p className="text-gray-500 text-[10px] ml-2 inline-flex">
                    <img
                      alt="Placeholder"
                      className="block rounded-full"
                      src="https://picsum.photos/32/32/?random"
                    />
                    Posted By:<br></br>
                    Erickson Sernero
                  </p>
                </footer>
              </article>
            </li>
            <li className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
              <article className="overflow-hidden rounded-lg shadow-lg">
                <img
                  alt="Placeholder"
                  className="block h-auto w-full"
                  src="https://picsum.photos/600/400/?random"
                />

                <header className="flex items-center justify-between leading-tight p-2 md:py-3 md:px-4">
                  <h1 className="text-lg max-w-[90%] break-words pr-[25px]">
                    <a
                      className="no-underline hover:underline text-black"
                      href="#"
                    >
                      Name:
                    </a>
                  </h1>
                  <div className="text-center">
                    <p className="text-[25px]"> </p>
                    <p className="text-grey-darker text-[11px]">45</p>
                  </div>
                </header>
                <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-4  ">
                  <p className="text-gray-500 text-sm break-words ">
                    Address: 92 Tabing Ilog Street Aniban 4 Bacoor Cavite
                  </p>
                </div>
                <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-1  ">
                  <p className="text-gray-500 text-xs max-w-[77%] break-words pr-[25px]">
                    Born: 11/11/23 (1 Month Old)
                  </p>
                  <p className="text-gray-500 text-xs ">Gender: Female</p>
                </div>

                <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-1 ">
                  <p className="text-gray-500 text-xs max-w-[77%] break-words pr-[25px]">
                    Breed: Siberian Husky
                  </p>
                  <p className="text-gray-500 text-xs">Vaccinated: Yes</p>
                </div>
                <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-3 ">
                  <p className="text-gray-500 text-xs max-w-[77%] break-words pr-[25px]">
                    Type: Cat
                  </p>
                  <p className="text-gray-500 text-xs">Dewormed: Yes</p>
                </div>
                <footer className="flex items-center justify-between leading-none pr-2 pl-2 md:pr-4 md:pl-4 pt-2 pb-5 ">
                  <p className="text-gray-500 text-[10px] ml-2 inline-flex">
                    <img
                      alt="Placeholder"
                      className="block rounded-full"
                      src="https://picsum.photos/32/32/?random"
                    />
                    Posted By:<br></br>
                    Erickson Sernero
                  </p>
                </footer>
              </article>
            </li>
            <li className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
              <article className="overflow-hidden rounded-lg shadow-lg">
                <img
                  alt="Placeholder"
                  className="block h-auto w-full"
                  src="https://picsum.photos/600/400/?random"
                />

                <header className="flex items-center justify-between leading-tight p-2 md:py-3 md:px-4">
                  <h1 className="text-lg max-w-[90%] break-words pr-[25px]">
                    <a
                      className="no-underline hover:underline text-black"
                      href="#"
                    >
                      Name:
                    </a>
                  </h1>
                  <div className="text-center">
                    <p className="text-[25px]"> </p>
                    <p className="text-grey-darker text-[11px]">45</p>
                  </div>
                </header>
                <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-4  ">
                  <p className="text-gray-500 text-sm break-words ">
                    Address: 92 Tabing Ilog Street Aniban 4 Bacoor Cavite
                  </p>
                </div>
                <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-1  ">
                  <p className="text-gray-500 text-xs max-w-[77%] break-words pr-[25px]">
                    Born: 11/11/23 (1 Month Old)
                  </p>
                  <p className="text-gray-500 text-xs ">Gender: Female</p>
                </div>

                <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-1 ">
                  <p className="text-gray-500 text-xs max-w-[77%] break-words pr-[25px]">
                    Breed: Siberian Husky
                  </p>
                  <p className="text-gray-500 text-xs">Vaccinated: Yes</p>
                </div>
                <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-3 ">
                  <p className="text-gray-500 text-xs max-w-[77%] break-words pr-[25px]">
                    Type: Cat
                  </p>
                  <p className="text-gray-500 text-xs">Dewormed: Yes</p>
                </div>
                <footer className="flex items-center justify-between leading-none pr-2 pl-2 md:pr-4 md:pl-4 pt-2 pb-5 ">
                  <div className="inline-flex items-center">
                    <img
                      alt="Placeholder"
                      className="block rounded-full"
                      src="https://picsum.photos/32/32/?random"
                    />
                    <p className="text-gray-500 text-[10px] ml-2 inline-flex">
                      Posted By:<br></br>
                      Erickson Sernero
                    </p>
                  </div>
                </footer>
              </article>
            </li>
          </ul>
        </div>
      </div>
      {user && (
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
      )}
    </>
  );
};
export default AllPost;
