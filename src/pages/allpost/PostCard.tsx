import React from "react";
import { postProps } from "../../yupModels/postProps";
import { Link } from "react-router-dom";
import { GoHeart } from "react-icons/go";
import { MdOutlinePets } from "react-icons/md";
interface Props {
  index: number;
  title: any;
  description: any;
  id: any;
}

const PostCard = ({ index, title, description, id }: Props) => {
  return (
    <>
      <li
        key={index}
        className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
      >
        <article className="overflow-hidden rounded-lg shadow-lg">
          <Link to={`/${id}`}>
            <img
              alt="Placeholder"
              className="block h-auto w-full"
              src="https://picsum.photos/600/400/?random"
            />
          </Link>

          <header className="flex items-center justify-between leading-tight p-2 md:py-3 md:px-4">
            <h1 className="text-lg max-w-[90%] break-words pr-[25px]">
              <a className="no-underline hover:underline text-black" href="#">
                Name: {title}
              </a>
            </h1>
            <div className="text-center">
              <p className="text-[25px]">
                {" "}
                <GoHeart />
              </p>
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
          <footer className="flex-col min-[400px]:flex-row  flex items-center  justify-center min-[400px]:justify-between leading-none pr-2 pl-2 md:pr-4 md:pl-4 pt-2 pb-5 ">
            <Link
              to={`/${id}`}
              className="flex items-center no-underline hover:underline text-black"
            >
              <div className="inline-flex items-center">
                <img
                  alt="Placeholder"
                  className="block rounded-full"
                  src="https://picsum.photos/32/32/?random"
                />
                <p className="text-gray-500 text-[11px] min-[400px]:text-[8px] max-w-[100px] min-[1280px]:max-w-auto min-[1280px]:text-[9px] ml-2 mr-2 inline-flex">
                  By: Erickson Sernero
                  <br></br>
                  Date: June 1, 2023
                </p>
              </div>
            </Link>

            <button
              type="button"
              className="text-white min-w-[153px] bg-[#002349] hover:bg-[#001730]/90 w-full mt-3 min-[400px]:mt-0 min-[400px]:w-auto place-content-center font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
            >
              Request to Adopt
            </button>
          </footer>
        </article>
      </li>

      {/* <li
        key={index}
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-l hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-96 md:rounded-none md:rounded-l-lg"
          src="/docs/images/blog/image-4.jpg"
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {index}
          </p>

          <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {id}
          </h5>
          <div>
            <Link to={`/properties/${id}`}>
              <button className="bg-[#002349] hover:bg-blue-700 border border-[#002349] hover:border-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
                Update
              </button>
            </Link>

            <button className="bg-transparent hover:bg-red-600 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-600 hover:border-transparent rounded">
              Delete
            </button>
          </div>
        </div>
      </li> */}
    </>
  );
};

export default PostCard;
