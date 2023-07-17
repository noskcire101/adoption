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
  const [cover, setCover] = useState<any>([]);

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
        className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
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
              <img
                // src="https://picsum.photos/600/400/?random"
                src={cover}
                className="w-full h-[300px] object-cover m-auto max-w-fit"
              />
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
            <p className="text-gray-500 text-xs max-w-[77%] break-words pr-[25px]">
              Born: {birthdate}
            </p>
            <p className="text-gray-500 text-xs ">
              Age: {ageCalculator(birthdate)}
            </p>
          </div>
          <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-1  ">
            <p className="text-gray-500 text-xs max-w-[77%] break-words pr-[25px]">
              From: {titleCase(city)}, {titleCase(state)}
            </p>
            <p className="text-gray-500 text-xs ">Gender: {gender}</p>
          </div>

          <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-1 ">
            <p className="text-gray-500 text-xs max-w-[77%] break-words pr-[25px]">
              Breed: {titleCase(breed)}
            </p>
            <p className="text-gray-500 text-xs">Vaccinated: {vaccinated}</p>
          </div>
          <div className="flex items-center justify-between leading-tight pr-2 pl-2 md:pr-4 md:pl-4 pt-0 pb-3 ">
            <p className="text-gray-500 text-xs max-w-[77%] break-words pr-[25px]">
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
                        alt="Placeholder"
                        className="block h-9 rounded-full"
                        src={dataFromDb.photoUrl}
                      />
                    )}
                  </>
                ) : (
                  <div className="block p-4 bg-slate-500 rounded-full"></div>
                )}

                <p className="text-gray-500 text-[11px] min-[400px]:text-[8px] max-w-[100px] min-[1280px]:max-w-auto min-[1280px]:text-[9px] ml-2 mr-2 inline-flex">
                  By:{" "}
                  {dataFromDb.fullname ? dataFromDb.fullname : "Deleted User"}
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
              <button
                type="button"
                className="text-white min-w-[153px] bg-[#002349] hover:bg-[#001730]/90 w-full mt-3 min-[400px]:mt-0 min-[400px]:w-auto place-content-center font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                Request to Adopt
              </button>
            )}
          </footer>
        </article>
      </li>
    </>
  );
};

export default PostCard;
