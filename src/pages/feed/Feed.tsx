import React, { Fragment, ReactNode, useEffect, useState } from "react";
import styles from "./Feed.module.css";

import Pagination from "../../components/pagination/pagination";

import { getAllDocsInACollection } from "../../database/crud";
import { Link } from "react-router-dom";
import { blogProps } from "../../yupModels/blog";
import FeedCard from "./FeedCard";
import { useAppSelector } from "../../storeReduxTools/storeHooks";

interface Props {
  toastMessageSuccess: (param: string) => void;
  toastMessageError: (param: string) => void;
}

const Feed = ({ toastMessageSuccess, toastMessageError }: Props) => {
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
      {/* <div className="overflow-auto h-[81vh] sm:h-[100%] pb-[4vh] mx-[0%]"></div> */}
      {/* {user && (
        <h2 className="drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-white bg-gradient-to-b from-white ... text-2xl  p-10 text-center sticky top-[71px] ... text-[#002349] md:text-3xl   ">
          Free Pets For Adoption
        </h2>
      )} */}
      <div className="overflow-auto pb-[4vh] mx-[0%]">
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
