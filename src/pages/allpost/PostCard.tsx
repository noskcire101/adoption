import { Link } from "react-router-dom";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { MdOutlinePets } from "react-icons/md";
import {
  ageCalculator,
  checkUserifLiked,
  getAllInfoInADocument,
  handleClickLiked,
  titleCase,
} from "./PostFunctions";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../storeReduxTools/storeHooks";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../database/firebase";

interface Props {
  id: any;
  index: number;
  birthdate: any;
  breed: any;
  city: any;
  contact: any;
  coverImage: any;
  dewormed: any;
  fbaccount?: any;
  gender: any;
  pet: any;
  reason: any;
  state: any;
  street: any;
  type: any;
  vaccinated: any;
  timestamp: any;
  uid: any;
  heart: any[];
}

const PostCard = ({
  id,
  index,
  birthdate,
  breed,
  city,
  contact,
  coverImage,
  dewormed,
  fbaccount,
  gender,
  pet,
  reason,
  state,
  street,
  type,
  vaccinated,
  timestamp,
  uid,
  heart,
}: Props) => {
  const userDataDirectory = `/users/${uid}`;
  const { user } = useAppSelector((state) => state.auth);
  const [liked, setLiked] = useState(checkUserifLiked(heart, user!.id));
  const [dataFromDb, setdataFromDb] = useState<any>({});
  const [likedCount, setLikedCount] = useState(heart.length);
  const [viewMoreShow, setViewMoreShow] = useState({ display: "none" });
  const [cover, setCover] = useState<any>(null);

  useEffect(() => {
    getAllInfoInADocument(userDataDirectory, setdataFromDb);
    const getPostImgSrc = async () => {
      const imgRef = ref(storage, `pets/${id}/${coverImage}`);
      const url = await getDownloadURL(imgRef);
      setCover(url);
    };
    getPostImgSrc();
  }, [likedCount, coverImage]);

  return (
    <>
      <li
        key={index}
        className="my-1 mb-10 px-1 w-full lg:my-4 lg:px-4 lg:w-1/2 xl:w-1/3"
      >
        <article className="overflow-hidden rounded-lg shadow-lg">
          <Link
            onMouseEnter={(e) => {
              setViewMoreShow({ display: "block" });
            }}
            onMouseLeave={(e) => {
              setViewMoreShow({ display: "none" });
            }}
            to={`/${id}`}
          >
            <div className="block h-auto bg-[#f8f8f8] relative w-full">
              {cover ? (
                <img
                  src={cover}
                  className="w-full h-[300px] object-cover m-auto max-w-fit"
                />
              ) : (
                <svg
                  className="w-8 h-[300px] m-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}

              <div
                style={viewMoreShow}
                className="-translate-y-1/2 -translate-x-1/2  w-full h-full bg-opacity-50 bg-black absolute text-center m-0 top-1/2 left-1/2"
              ></div>
              <p
                style={viewMoreShow}
                className="-translate-y-1/2 -translate-x-1/2 text-[#ececec] hover:text-white absolute text-center m-0 top-1/2 left-1/2"
              >
                View Full Details
              </p>
            </div>
          </Link>

          <header className="flex items-center justify-between leading-tight p-2 mt-1 md:py-3 md:px-4">
            <h1 className="text-lg max-w-[90%] break-words  pr-[25px]">
              <div className=" text-black">Name: {titleCase(pet)}</div>
            </h1>
            <div
              onClick={() =>
                handleClickLiked(
                  user!.id,
                  id,
                  liked,
                  setLiked,
                  likedCount,
                  setLikedCount
                )
              }
              className="text-center cursor-pointer"
            >
              <p className="text-[25px]">
                {" "}
                {liked ? (
                  <GoHeartFill className="text-red-600" />
                ) : (
                  <GoHeart className="text-red-600" />
                )}
              </p>
              <p className="text-grey-darker text-[10px]">{likedCount}</p>
            </div>
          </header>

          <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-1  ">
            <p className="text-gray-500 text-xs max-w-[60%] break-words pr-[25px]">
              Born: {birthdate}
            </p>
            <p className="text-gray-500 text-xs ">
              Age: {ageCalculator(birthdate)}
            </p>
          </div>
          <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-1  ">
            <p className="text-gray-500 text-xs max-w-[60%] break-words pr-[25px]">
              From: {titleCase(city)}, {titleCase(state)}
            </p>
            <p className="text-gray-500 text-xs ">Gender: {gender}</p>
          </div>

          <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-1 ">
            <p className="text-gray-500 text-xs max-w-[60%] break-words pr-[25px]">
              Breed: {titleCase(breed)}
            </p>
            <p className="text-gray-500 text-xs">Vaccinated: {vaccinated}</p>
          </div>
          <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-3 ">
            <p className="text-gray-500 text-xs max-w-[60%] break-words pr-[25px]">
              Type: {type}
            </p>
            <p className="text-gray-500 text-xs">Dewormed: {dewormed}</p>
          </div>
          <footer className="flex-col min-[400px]:flex-row  flex items-center  justify-center min-[400px]:justify-between leading-none pr-2 pl-2 md:pr-4 md:pl-4 pt-2 pb-5 ">
            <Link
              to={`/${id}`}
              className="flex items-center no-underline hover:underline text-black"
            >
              <div className="inline-flex items-center">
                {dataFromDb.photoUrl ? (
                  <>
                    {dataFromDb.photoUrl === null ? (
                      <div className="block text-center bg-slate-300 p-2.5 h-9 w-9 rounded-full">
                        {dataFromDb.email[0].toUpperCase()}
                      </div>
                    ) : (
                      <img
                        className="block h-9 rounded-full"
                        src={dataFromDb.photoUrl}
                      />
                    )}
                  </>
                ) : (
                  <div className="block text-center bg-slate-300 p-2.5 h-9 w-9 rounded-full">
                    {dataFromDb.email ? dataFromDb.email[0].toUpperCase() : ""}
                  </div>
                )}

                <p className="text-gray-500 text-[11px] min-[400px]:text-[8px] max-w-[100px] min-[1280px]:max-w-auto min-[1280px]:text-[9px] ml-2 mr-2 inline-flex">
                  By:{" "}
                  {dataFromDb.fullname
                    ? dataFromDb.fullname
                    : dataFromDb.email
                    ? dataFromDb.email
                    : "Deleted User"}
                  <br></br>
                  Date: {timestamp}
                </p>
              </div>
            </Link>

            {user!.id && user!.id == uid ? (
              <Link
                to={`/update/${id}`}
                className="text-black min-w-[153px] bg-[#ddefff] hover:bg-[#bbdfff]/90 w-full mt-3 min-[400px]:mt-0 min-[400px]:w-auto place-content-center font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                Edit My Post
              </Link>
            ) : (
              <Link
                to={`/${id}`}
                className="text-white min-w-[153px] bg-[#002349] hover:bg-[#001730]/90 w-full mt-3 min-[400px]:mt-0 min-[400px]:w-auto place-content-center font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                View Details
              </Link>
            )}
          </footer>
        </article>
      </li>
    </>
  );
};

export default PostCard;
