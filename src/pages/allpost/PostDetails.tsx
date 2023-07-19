import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { auth, storage } from "../../database/firebase";
import PostDetailsImages from "./PostDetailsImages";
import Pagination from "../../components/pagination/pagination";
import {
  ageCalculator,
  getAllInfoInADocument,
  titleCase,
} from "./PostFunctions";
import {
  useAppDispatch,
  useAppSelector,
} from "../../storeReduxTools/storeHooks";
import Loader from "../../components/loader/loader";
import { login } from "../../storeReduxTools/authSlice";

interface Props {
  hideSearchfunction(): void;
}

const PostDetails = ({ hideSearchfunction }: Props) => {
  hideSearchfunction();
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const [loader, setLoader] = useState(false);
  const [petData, setPetData] = useState<any>({});
  const [userData, setUserData] = useState<any>({});
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
    setLoader(true);
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
    getAllInfoInADocument(petsDataDirectory, setPetData);
  }, []);
  useEffect(() => {
    const userDataDirectory = `/users/${petData.uid}`;
    getAllInfoInADocument(userDataDirectory, setUserData);
    setLoader(false);
  }, [petData]);

  return (
    <>
      <div className="z-50 drop-shadow-[1px_1px_var(--tw-shadow-color)] items-center justify-between sm:justify-center flex shadow-white bg-gradient-to-b from-white ...   p-5 lg:p-10 text-center sticky top-[60px] sm:top-[65px] ...">
        <h2 className="text-[18px] sm:text-3xl text-[#002349] mr-2">
          Pet's Information
        </h2>
        <div className="w-[148px]">
          <Link
            to="/"
            className="text-white bg-[#002349] hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
            type="button"
          >
            Back to Home
          </Link>
        </div>
      </div>
      <div className="container mx-auto pb-8 pt-0">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-6 px-4">
          <div className="col-span-full lg:col-span-8">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center my-5">
                <h2 className="text-xl font-bold mb-4">
                  Pet's Name: {petData.pet && titleCase(petData.pet)}
                </h2>
                <div className="block h-auto bg-[#f8f8f8] relative w-full">
                  {currentItems.map((images: any, index: any) => (
                    <PostDetailsImages
                      index={index}
                      imageUrl={images.url}
                      imageName={images.name}
                      heart={petData.heart}
                      itemId={id}
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
                <h2 className="text-xl mt-2 font-bold mb-0">
                  if you are interested, please contact:
                </h2>
                <div className="text-center my-5">
                  <a
                    href={`tel:${petData.contact}`}
                    className="text-white min-w-[153px] mx-1 bg-[#002349] hover:bg-[#001730]/90 w-full mt-3 min-[400px]:mt-0 min-[400px]:w-auto place-content-center font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  >
                    Call via Phone
                  </a>
                  {petData.fbaccount && (
                    <a
                      href={`${petData.fbaccount}`}
                      className="text-white min-w-[153px] mx-1 bg-[#002349] hover:bg-[#001730]/90 w-full mt-3 min-[400px]:mt-0 min-[400px]:w-auto place-content-center font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    >
                      Contact via FB
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-4">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mt-6 mb-4">Pet Details</h2>
              <div className="pt-2 pb-3 border-b border-gray-100">
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm mr-2 font-bold">Type:</p>
                  <p className="text-gray-600 text-sm mr-2">{petData.type}</p>
                </div>
              </div>
              <div className="pt-2 pb-3 border-b border-gray-100">
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm mr-2 font-bold">
                    BirthDate:
                  </p>
                  <p className="text-gray-600 text-sm mr-2">
                    <>
                      {petData.birthdate &&
                        String(petData.birthdate.toDate().toDateString())}
                    </>
                  </p>
                </div>
              </div>
              <div className="pt-2 pb-3 border-b border-gray-100">
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm mr-2 font-bold">Age:</p>
                  <p className="text-gray-600 text-sm mr-2">
                    {petData.birthdate &&
                      ageCalculator(petData.birthdate.toDate().toDateString())}
                  </p>
                </div>
              </div>
              <div className="pt-2 pb-3 border-b border-gray-100">
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm mr-2 font-bold">Breed:</p>
                  <p className="text-gray-600 text-sm mr-2">
                    {titleCase(petData.breed)}
                  </p>
                </div>
              </div>
              <div className="pt-2 pb-3 border-b border-gray-100">
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm mr-2 font-bold">
                    Gender:
                  </p>
                  <p className="text-gray-600 text-sm mr-2">{petData.gender}</p>
                </div>
              </div>
              <div className="pt-2 pb-3 border-b border-gray-100">
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm mr-2 font-bold">
                    Dewormed:
                  </p>
                  <p className="text-gray-600 text-sm mr-2">
                    {petData.dewormed}
                  </p>
                </div>
              </div>

              <div className="pt-2 pb-3 border-b border-gray-100">
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm mr-2 font-bold">
                    Vaccinated:
                  </p>
                  <p className="text-gray-600 text-sm mr-2">
                    {petData.vaccinated}
                  </p>
                </div>
              </div>
              <h2 className="text-xl font-bold mt-6 mb-4">Contact Details</h2>
              <div className="pt-2 pb-3 border-b border-gray-100">
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm mr-2 font-bold">
                    Contact:
                  </p>
                  <a
                    href={`tel:${petData.contact}`}
                    className="text-sm mr-2 text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    {petData.contact}
                  </a>
                </div>
              </div>
              {petData.fbaccount && (
                <div className="pt-2 pb-3 border-b border-gray-100">
                  <div className="flex justify-between">
                    <p className="text-gray-600 text-sm mr-2 font-bold">
                      FB Account:
                    </p>
                    <a
                      href={petData.fbaccount}
                      target="_blank"
                      className=" text-sm mr-2 text-blue-700 hover:text-blue-900 hover:underline"
                    >
                      Click to redirect
                    </a>
                  </div>
                </div>
              )}

              <div className="pt-2 pb-3 border-b border-gray-100">
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm mr-2 font-bold">
                    Address:
                  </p>
                  <p className="text-gray-600 text-right text-sm mr-2">
                    {petData.street && titleCase(petData.street)}
                    <br></br>
                    {petData.city && titleCase(petData.city)},{" "}
                    {petData.state && titleCase(petData.state)}
                  </p>
                </div>
              </div>
              <div className="pt-2 pb-3 border-b border-gray-100">
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm mr-2 font-bold">
                    Date Posted:
                  </p>
                  <p className="text-gray-600 text-right text-sm mr-2">
                    {petData.timestamp &&
                      String(petData.timestamp.toDate().toDateString())}
                  </p>
                </div>
              </div>
              <div className="pt-2 pb-1 border-b border-gray-100">
                <div className="flex justify-between">
                  <p className="text-gray-600 text-sm pt-2 mr-2 font-bold">
                    Posted by:
                  </p>
                  <p className="text-gray-600 text-right text-sm mr-2">
                    <div className="inline-flex items-center">
                      {userData.photoUrl ? (
                        <>
                          {userData.photoUrl === null ? (
                            <div className="block text-center bg-slate-300 p-2.5 h-9 w-9 rounded-full">
                              {userData.email[0].toUpperCase()}
                            </div>
                          ) : (
                            <img
                              className="block h-9 rounded-full"
                              src={userData.photoUrl}
                            />
                          )}
                        </>
                      ) : (
                        <div className="block text-center bg-slate-300 p-2.5 h-9 w-9 rounded-full">
                          {userData.email
                            ? userData.email[0].toUpperCase()
                            : ""}
                        </div>
                      )}

                      <p className="text-gray-500 text-[11px] min-[400px]:text-[8px] max-w-[100px] min-[1280px]:max-w-auto min-[1280px]:text-[9px] ml-2 inline-flex">
                        {userData.fullname
                          ? userData.fullname
                          : userData.email
                          ? userData.email
                          : "Deleted User"}
                        <br></br>
                      </p>
                    </div>
                  </p>
                </div>
              </div>
              <p className=" mt-7 mb-0 text-gray-600 text-sm mr-2 font-bold">
                Why did the owner decide to put this pet up for adoption?
              </p>
              <div className="pt-3 pb-3">
                <div className="flex">
                  <p className="text-gray-600 text-sm mr-2 indent-10">
                    {petData.reason}
                  </p>
                </div>
              </div>
              <br></br>
            </div>
          </div>
        </div>
      </div>
      {loader && <Loader />}
    </>
  );
};

export default PostDetails;
