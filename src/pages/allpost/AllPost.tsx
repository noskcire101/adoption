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
  showSearchfunction(): void;
  filter: {
    main: string;
    type: string;
    gender: string;
    age: string;
  };
}

const AllPost = ({
  toastMessageSuccess,
  toastMessageError,
  showSearchfunction,
  filter,
}: Props) => {
  showSearchfunction();
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
  // let [listOfItem, setListOfItem] = useState<any>([]);

  function searchItem(
    array: any[],
    setState: React.Dispatch<React.SetStateAction<any[]>>,
    searchStringMain: string
  ) {
    let result: any;
    let arrayVal = array;
    if (searchStringMain !== "") {
      result = arrayVal.filter((param: any) =>
        param.pet.toLowerCase().includes(searchStringMain.toLowerCase())
      );
      setState(result);
      console.log(result, "result");
    } else {
      setState(array);
      console.log(array, "array");
    }
  }

  useEffect(() => {
    getAllDocsInACollection(
      "pets",
      setDataFromDB,
      filter.type,
      filter.gender,
      filter.age,
      filter.main
    );
    console.log(filter.type, "-type");
    console.log(filter.gender, "-gender");
    console.log(filter.age, "-age");
    console.log(filter.main, "-main");
  }, [filter, currentPage]);

  // useEffect(() => {
  //   getAllDocsInACollection(
  //     "pets",
  //     setDataFromDB,
  //     filter.type,
  //     filter.gender,
  //     filter.age
  //   );
  //   searchItem(dataFromDB, setDataFromDB, filter.main);
  //   console.log(filter.type, "-type");
  //   console.log(filter.gender, "-gender");
  //   console.log(filter.age, "-age");
  // }, [filter.main]);

  const [delayExecute, setdelayExecute] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setdelayExecute(true);
    }, 10000);
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
