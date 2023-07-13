import React, { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./AllPost.module.css";

import Pagination from "../../components/pagination/pagination";

import { getAllDocsInACollection } from "./PostFunctions";
import { Link } from "react-router-dom";
import { petsFormFinal } from "../../yupModels/Form";
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
  const [dataFromDB, setDataFromDB] = useState<petsFormFinal[]>([]);
  const currentItems: any[] = dataFromDB.slice(
    indexOfFirstItemInCurrrentBatch,
    indexOfLastItemInCurrentBatch
  );

  useEffect(() => {
    getAllDocsInACollection("pets", setDataFromDB);
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
                <PostCard
                  id={data.id}
                  index={index}
                  birthdate={data.birthdate.toDate().toDateString()}
                  breed={data.breed}
                  city={data.city}
                  contact={data.contact}
                  coverImage={data.coverImage}
                  dewormed={data.dewormed}
                  fbaccount={data.fbaccount}
                  gender={data.gender}
                  pet={data.pet}
                  reason={data.reason}
                  state={data.state}
                  street={data.street}
                  type={data.type}
                  vaccinated={data.vaccinated}
                  timestamp={data.timestamp.toDate().toDateString()}
                  uid={data.uid}
                  heart={data.heart}
                />
              );
            })}
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
          displayLoadMore={true}
        />
      )}
    </>
  );
};
export default AllPost;
