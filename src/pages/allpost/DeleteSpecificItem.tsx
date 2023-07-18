import { Dispatch, FC, SetStateAction, useState } from "react";
import { useAppSelector } from "../../storeReduxTools/storeHooks";
import Loader from "../../components/loader/loader";
import { deletingItemTotally } from "./PostFunctions";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const DeleteSpecificItem = ({ isOpen, onClose, id }: Props) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const dataDirectory = `/pets/${id}`;
  const filesDirectory = `/pets/${id}`;
  function handleDelete() {
    setLoader(true);
    deletingItemTotally(dataDirectory, filesDirectory, backToHome);
  }
  function backToHome() {
    navigate("/");
  }
  return (
    <>
      <section
        className="bg-gray-50/90 dark:bg-gray-900 fixed top-0 left-0 right-0 bottom-0 z-20 flex justify-center"
        style={
          isOpen
            ? { transform: "translateY(0)" }
            : { transform: "translateY(-100%)" }
        }
      >
        <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-sm dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
              Are you sure you want to delete this post? This cannot be undone.
            </h2>
            <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <button
                onClick={handleDelete}
                className="w-full text-white bg-[#ff1919] hover:bg-[#cf1313] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Delete
              </button>
              <button
                onClick={onClose}
                style={{ marginTop: 10 }}
                className="w-full text-white bg-[#002349] hover:bg-blue-900  font-medium rounded-lg text-sm px-5 py-2.5  text-center  mt-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </section>
      {loader && <Loader />}
    </>
  );
};

export default DeleteSpecificItem;
