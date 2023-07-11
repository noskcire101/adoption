
import React, { Dispatch } from "react";
import { postProps } from "../../yupModels/postProps";

export const createPages = (dataFromDB:postProps[],itemLimitPerPage:number) =>{
    const pages = [];
    for (let i = 1; i <= Math.ceil(dataFromDB.length / itemLimitPerPage); i++) {
      pages.push(i);
    }
    return pages;
}

export const handleClick =(PageNumber: any,setcurrentPage:React.Dispatch<React.SetStateAction<number>>) => {
    return setcurrentPage(PageNumber);
}


export const handleNextbtn = (setcurrentPage:Dispatch<React.SetStateAction<number>>,currentPage:number,lastPageNumberInCurrentBatch:number,setLastPageNumberInCurrentBatch:Dispatch<React.SetStateAction<number>>,pageNumberLimit:number,setStartingPageNumberInCurrentBatch:Dispatch<React.SetStateAction<number>>,startingPageNumberInCurrentBatch:number) =>  {
   setcurrentPage(currentPage + 1);

    if (currentPage + 1 > lastPageNumberInCurrentBatch) {
        setLastPageNumberInCurrentBatch(lastPageNumberInCurrentBatch + pageNumberLimit);
        setStartingPageNumberInCurrentBatch(startingPageNumberInCurrentBatch + pageNumberLimit);
    }
    return[setcurrentPage,setLastPageNumberInCurrentBatch, setStartingPageNumberInCurrentBatch]
}

export const handlePrevbtn =(setcurrentPage:Dispatch<React.SetStateAction<number>>,currentPage:number,lastPageNumberInCurrentBatch:number,setLastPageNumberInCurrentBatch:Dispatch<React.SetStateAction<number>>,pageNumberLimit:number,setStartingPageNumberInCurrentBatch:Dispatch<React.SetStateAction<number>>,startingPageNumberInCurrentBatch:number) => {
   setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
       setLastPageNumberInCurrentBatch(lastPageNumberInCurrentBatch - pageNumberLimit);
       setStartingPageNumberInCurrentBatch(startingPageNumberInCurrentBatch - pageNumberLimit);
    }

    return [setcurrentPage,setLastPageNumberInCurrentBatch,setStartingPageNumberInCurrentBatch ];
}


export const handleNextBatch = (setcurrentPage:Dispatch<React.SetStateAction<number>>,lastPageNumberInCurrentBatch:number,setLastPageNumberInCurrentBatch:Dispatch<React.SetStateAction<number>>,pageNumberLimit:number,setStartingPageNumberInCurrentBatch:Dispatch<React.SetStateAction<number>>) => {
   setcurrentPage(lastPageNumberInCurrentBatch + 1);
   setLastPageNumberInCurrentBatch(lastPageNumberInCurrentBatch + pageNumberLimit);
   setStartingPageNumberInCurrentBatch(lastPageNumberInCurrentBatch);

  return [setcurrentPage, setLastPageNumberInCurrentBatch,setStartingPageNumberInCurrentBatch]
}

export const handlePrevBatch = (setcurrentPage:Dispatch<React.SetStateAction<number>>,setLastPageNumberInCurrentBatch:Dispatch<React.SetStateAction<number>>,pageNumberLimit:number,setStartingPageNumberInCurrentBatch:Dispatch<React.SetStateAction<number>>,startingPageNumberInCurrentBatch:number) => {
  setcurrentPage(startingPageNumberInCurrentBatch + 1 - pageNumberLimit);
  setLastPageNumberInCurrentBatch(startingPageNumberInCurrentBatch);
   setStartingPageNumberInCurrentBatch(startingPageNumberInCurrentBatch - pageNumberLimit);

  return [setcurrentPage, setLastPageNumberInCurrentBatch,setStartingPageNumberInCurrentBatch ]
  }

export const handleLoadMore = (dataFromDB: postProps[], currentPage:number, itemLimitPerPage:number, pageNumberLimit:number, setitemLimitPerPage :Dispatch<React.SetStateAction<number>>,setLastPageNumberInCurrentBatch:Dispatch<React.SetStateAction<number>>,setStartingPageNumberInCurrentBatch:Dispatch<React.SetStateAction<number>>,setcurrentPage:Dispatch<React.SetStateAction<number>>  ) => {
  if (
    dataFromDB.length >=
    currentPage * (itemLimitPerPage + pageNumberLimit)
  ) {
    setitemLimitPerPage(itemLimitPerPage + pageNumberLimit);
  } else {
    setitemLimitPerPage(itemLimitPerPage + pageNumberLimit);

    setLastPageNumberInCurrentBatch(
      Math.ceil(
        dataFromDB.length /
          (itemLimitPerPage + pageNumberLimit) /
          pageNumberLimit
      ) * pageNumberLimit
    );
    setStartingPageNumberInCurrentBatch(
      Math.ceil(
        dataFromDB.length /
          (itemLimitPerPage + pageNumberLimit) /
          pageNumberLimit
      ) *
        pageNumberLimit -
        pageNumberLimit
    );
    setcurrentPage(
      Math.ceil(dataFromDB.length / (itemLimitPerPage + pageNumberLimit))
    );
  }

  return [setitemLimitPerPage,setLastPageNumberInCurrentBatch,setStartingPageNumberInCurrentBatch,setcurrentPage ]
}
