import React, { Dispatch } from "react";
import { handleLoadMore } from "./paginationFunctions";
import { TfiAngleDoubleDown } from "react-icons/tfi";
import styles from "./Pagination.module.css";

interface Props {
  dataFromDB: never[];
  currentPage: number;
  itemLimitPerPage: number;
  pageNumberLimit: number;
  setitemLimitPerPage: Dispatch<React.SetStateAction<number>>;
  setLastPageNumberInCurrentBatch: Dispatch<React.SetStateAction<number>>;
  setStartingPageNumberInCurrentBatch: Dispatch<React.SetStateAction<number>>;
  setcurrentPage: Dispatch<React.SetStateAction<number>>;
}

const LoadMore = ({
  setcurrentPage,
  pageNumberLimit,
  dataFromDB,
  currentPage,
  itemLimitPerPage,
  setitemLimitPerPage,
  setLastPageNumberInCurrentBatch,
  setStartingPageNumberInCurrentBatch,
}: Props) => {
  return (
    <>
      <div className="w-full text-center py-10">
        <button
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
          className="bg-[#002349] hover:bg-blue-700 border cursor-pointer border-[#002349] hover:border-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
        >
          {" "}
          <TfiAngleDoubleDown />
        </button>
      </div>
    </>
  );
};

export default LoadMore;

// This can be used to disable button when bug from "expond more" functionality appear(just incase)
//   className={
//     dataFromDB.length >= currentPage * (itemLimitPerPage + 5)
//       ? "bg-[#002349] hover:bg-blue-700 border cursor-pointer border-[#002349] hover:border-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
//       : "bg-gray-300  border border-gray-300 cursor-not-allowed text-white font-bold py-2 px-4 mr-2 rounded"
//   }
// >
//   {dataFromDB.length >= currentPage * (itemLimitPerPage + 5)
//     ? "Expand Pages"
//     : "Expansion Limit Reached"}
