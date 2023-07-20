import React, { useEffect, useState } from "react";
import styles from "./AllPost.module.css";
import Pagination from "../../components/pagination/pagination";
import { getAllDocsInACollection } from "./PostFunctions";
import { Link, useNavigate } from "react-router-dom";
import { petsFormFinal } from "../../yupModels/Form";
import PostCard from "./PostCard";
import { useAppSelector } from "../../storeReduxTools/storeHooks";
import NeedsLoginMessage from "../../components/needsLoginMessage/NeedsLoginMessage";
import MainContentTitle from "../../components/mainContentTitle/mainContentTitle";
import Loader from "../../components/loader/loader";
import { useAppDispatch } from "../../storeReduxTools/storeHooks";
import { auth } from "../../database/firebase";
import { login } from "../../storeReduxTools/authSlice";

interface Props {
  toastMessageSuccess: (param: string) => void;
  toastMessageError: (param: string) => void;
  showOrHideSearchfunction(): void;
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
  showOrHideSearchfunction,
  filter,
}: Props) => {
  showOrHideSearchfunction();
  const { user } = useAppSelector((state) => state.auth);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemLimitPerPage, setitemLimitPerPage] = useState(6);
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
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.email) {
        dispatch(
          login({
            id: user.uid,
            fullName: user.displayName || null,
            email: user.email,
            photoUrl: user?.photoURL || null,
          })
        );
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    getAllDocsInACollection(
      "pets",
      setDataFromDB,
      filter.type,
      filter.gender,
      filter.age,
      filter.main,
      setLoader,
      false,
      user?.id ?? 0
    ).catch((error) => console.error(error));
  }, [filter, currentPage]);
  const MyPostHideOrNot = dataFromDB.filter((param: any) =>
    param.uid.includes(user?.id)
  );
  return (
    <>
      <MainContentTitle ifHasData={MyPostHideOrNot.length} />

      <div
        style={{ display: user && user ? "block" : "none" }}
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
      {dataFromDB && (
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
      {loader && <Loader />}
    </>
  );
};
export default AllPost;
