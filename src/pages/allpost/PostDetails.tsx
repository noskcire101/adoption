import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { storage } from "../../database/firebase";
import PostDetailsImages from "./PostDetailsImages";
import Pagination from "../../components/pagination/pagination";
import { ageCalculator, fetchingSingleData, titleCase } from "./PostFunctions";

const PropertiesUpdate = () => {
  const { id } = useParams();
  const [petData, setPetData] = useState<any>({});
  const [currentPage, setcurrentPage] = useState(1);
  const [itemLimitPerPage, setitemLimitPerPage] = useState(1);
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
  const [dataFromDB, setDataFromDB] = useState<any>([]);
  const currentItems: any[] = dataFromDB.slice(
    indexOfFirstItemInCurrrentBatch,
    indexOfLastItemInCurrentBatch
  );

  useEffect(() => {
    listAll(ref(storage, `/pets/${id}`)).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url: any) => {
          setDataFromDB((prevImages: any) => [
            ...prevImages,
            { blob: "none", name: item.name, url: url, age: "old" },
          ]);
        });
      });
    });
    const petsDataDirectory = `/pets/${id}`;
    fetchingSingleData(petsDataDirectory, setPetData);
  }, []);

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 md:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold mb-4">
                  Hi I'm {petData.pet && titleCase(petData.pet)}
                </h2>
                <div className="block h-auto bg-[#f8f8f8] relative w-full">
                  {currentItems.map((images: any, index: any) => (
                    <PostDetailsImages
                      index={index}
                      imageUrl={images.url}
                      imageName={images.name}
                    />
                  ))}
                </div>
                <Pagination
                  setitemLimitPerPage={setitemLimitPerPage}
                  itemLimitPerPage={itemLimitPerPage}
                  dataFromDB={dataFromDB}
                  pageNumberLimit={pageNumberLimit}
                  currentPage={currentPage}
                  setcurrentPage={setcurrentPage}
                  startingPageNumberInCurrentBatch={
                    startingPageNumberInCurrentBatch
                  }
                  setStartingPageNumberInCurrentBatch={
                    setStartingPageNumberInCurrentBatch
                  }
                  lastPageNumberInCurrentBatch={lastPageNumberInCurrentBatch}
                  setLastPageNumberInCurrentBatch={
                    setLastPageNumberInCurrentBatch
                  }
                  displayLoadMore={false}
                />
              </div>
            </div>
          </div>
          <div className="col-span-4 md:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mt-6 mb-4">Pet Details</h2>
              <div className="pt-3 pb-4 border-y border-gray-100">
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm mr-2 font-bold">Type:</p>
                  <p className="text-gray-600 text-sm mr-2">{petData.type}</p>
                </div>
              </div>
              <div className="pt-3 pb-4 border-b border-gray-100">
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm mr-2 font-bold">
                    BirthDate:
                  </p>
                  <p className="text-gray-600 text-sm mr-2">
                    <>
                      {String(
                        petData.birthdate &&
                          petData.birthdate.toDate().toDateString()
                      )}
                    </>
                  </p>
                </div>
              </div>
              <div className="pt-3 pb-4 border-b border-gray-100">
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm mr-2 font-bold">Age:</p>
                  <p className="text-gray-600 text-sm mr-2">
                    {ageCalculator(
                      petData.birthdate &&
                        petData.birthdate.toDate().toDateString()
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertiesUpdate;
function fetchingData(
  petsDataDirectory: string,
  setPetData: React.Dispatch<any>
) {
  throw new Error("Function not implemented.");
}
