import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../storeReduxTools/storeHooks";
import { Link, useNavigate } from "react-router-dom";
import { addingDocument, deletingFiles, selectingFiles } from "./PostFunctions";
import { ref, uploadBytes } from "firebase/storage";
import { collection } from "firebase/firestore";
import { db, storage } from "../../database/firebase";
import { v4 } from "uuid";
import { CiSquareRemove } from "react-icons/ci";
import { petsForm, petsFormSchemaCreate } from "../../yupModels/Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Resizer from "react-image-file-resizer";
import {
  dataURIToBlob,
  resizeFile,
} from "../../reusableFunctions/reusablefunctions";

interface Props {
  toastMessageSuccess: (param: string) => void;
  toastMessageError: (param: string) => void;
  hideSearchfunction(): void;
}

const CreatePost = ({
  toastMessageSuccess,
  toastMessageError,
  hideSearchfunction,
}: Props) => {
  hideSearchfunction();
  const fileInputRef = useRef<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<any>([]);
  const categories = images;
  const [cover, setCover] = useState(categories[0]?.name ?? 0);
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  function selectFiles() {
    fileInputRef.current.click();
  }
  function onFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    selectingFiles(event, setImages, images, toastMessageError);
  }
  function onDragOver(event: any) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }
  function onDragLeave(event: any) {
    event.preventDefault();
    setIsDragging(false);
  }

  async function onDrop(event: any) {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      console.log(files[i].type.split("/")[0]);
      if (files[i].type.split("/")[0] !== "image") {
        toastMessageError(
          `${
            files![i].name
          } will not be included in the upload since it's not an image`
        );
      } else {
        if (!images.some((e: any) => e.name === files[i].name)) {
          if (images.length <= 5) {
            const resizedImage: any = await resizeFile(files[i]);
            const imageBlob: any = dataURIToBlob(resizedImage);
            setImages((prevImages: any) => [
              ...prevImages,
              {
                blob: imageBlob,
                name: files![i].name,
                url: URL.createObjectURL(files[i]),
              },
            ]);
          } else {
            toastMessageError(
              `${
                files![i].name
              } will not be included since you have reached the upload limit`
            );
          }
        }
      }
    }
  }
  function NewImageName(cover: any, images: any, coverImage: any) {
    if (cover == images) {
      return coverImage;
    } else {
      return images + "<Ñ:v4>" + v4();
    }
  }
  const handleFormSubmit = async (data: petsForm) => {
    const coverImage = cover + "<Ñ:v4>" + v4();
    const uid = user?.id;
    const heart: any = [];
    const timestamp = new Date();
    const {
      street,
      city,
      state,
      contact,
      fbaccount,
      pet,
      type,
      gender,
      breed,
      birthdate,
      dewormed,
      vaccinated,
      reason,
    } = data;
    const petsDirectory = collection(db, "pets");
    await addingDocument(petsDirectory, {
      coverImage,
      street,
      city,
      state,
      contact,
      fbaccount,
      pet,
      type,
      gender,
      breed,
      birthdate,
      dewormed,
      vaccinated,
      reason,
      uid,
      timestamp,
      heart,
    })
      .then((petIdfromDb) => {
        const uploadImages = async (petIdfromDb: any) => {
          let successChecker = false;
          if (images == undefined) {
            successChecker = true;
          }
          for (let i = 0; i < images.length; i++) {
            const customRef = ref(
              storage,
              `/pets/${petIdfromDb}/${NewImageName(
                cover,
                images[i].name,
                coverImage
              )}`
            );
            await uploadBytes(customRef, images[i].blob)
              .then(() => {
                successChecker = true;
              })
              .catch((error) => {
                toastMessageError(error);
              });
          }
          if (successChecker) {
            toastMessageSuccess("New Post Successfully created");
            navigate("/");
          }
        };
        uploadImages(petIdfromDb);
      })
      .catch((error) => {
        toastMessageError("Error occured while uploading images");
      });
  };
  useEffect(() => {
    setCover(categories[0]?.name);
  }, [categories]);
  function findArrayElementByTitle(array: any[], refImageName: string) {
    const result = array.find(({ name }) => name === refImageName);
    if (result) {
      return result.url;
    } else {
      return categories[0]?.url;
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<petsForm>({
    resolver: yupResolver(petsFormSchemaCreate),
  });
  return (
    <>
      <div className="overflow-auto pb-[4vh] mx-[0%]">
        <div className="container mx-auto px-[0%] md:px-12">
          <section className=" py-1 bg-blueGray-50">
            <div className="w-full md:w-12/12 px-4 mx-auto mt-6">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t self-center bg-white mb-0 px-6 py-6">
                  <div className="text-center flex ">
                    <h6 className="text-blueGray-700 text-2xl font-bold">
                      Create Post For Adoption
                    </h6>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <h6 className="text-blueGray-400 text-md mt-3 mb-6 font-bold">
                      Contact Information
                    </h6>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label className="block text-blueGray-600 text-xs font-bold mb-2">
                            Block or Lot # Street, Subdivision, Barangay
                          </label>
                          <input
                            type="text"
                            placeholder="Block or Lot # Street, Barangay"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            {...register("street")}
                          />
                          {errors.street ? (
                            <span className="text-red-700 text-xs">
                              {errors.street.message}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="w-full sm:w-6/12 lg:w-3/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label className="block text-blueGray-600 text-xs font-bold mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            placeholder="City"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            {...register("city")}
                          />
                          {errors.city ? (
                            <span className="text-red-700 text-xs">
                              {errors.city.message}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="w-full sm:w-6/12 lg:w-3/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label className="block text-blueGray-600 text-xs font-bold mb-2">
                            State or Province
                          </label>
                          <input
                            type="text"
                            placeholder="State or Province"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            {...register("state")}
                          />
                          {errors.state ? (
                            <span className="text-red-700 text-xs">
                              {errors.state.message}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="w-full sm:w-6/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label className="block text-blueGray-600 text-xs font-bold mb-2">
                            Cellphone or Telephone #
                          </label>
                          <input
                            type="text"
                            placeholder="+63 9123456789"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            {...register("contact")}
                          />
                          {errors.contact ? (
                            <span className="text-red-700 text-xs">
                              {errors.contact.message}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="w-full sm:w-6/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label className="block text-blueGray-600 text-xs font-bold mb-2">
                            FB Account(Optional Only)
                          </label>
                          <input
                            type="text"
                            placeholder="Your FB Account Link"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            {...register("fbaccount")}
                          />
                          {errors.fbaccount ? (
                            <span className="text-red-700 text-xs">
                              {errors.fbaccount.message}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>

                    <hr className="mt-8 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-md mt-10 mb-6 font-bold">
                      Pet Information
                    </h6>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label className="block text-blueGray-600 text-xs font-bold mb-2">
                            Pet's Name
                          </label>
                          <input
                            type="text"
                            placeholder="Pet's Name"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            {...register("pet")}
                          />
                          {errors.pet ? (
                            <span className="text-red-700 text-xs">
                              {errors.pet.message}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="w-full sm:w-6/12 lg:w-3/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label className="block text-blueGray-600 text-xs font-bold mb-2">
                            Type
                          </label>
                          <select
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            {...register("type")}
                          >
                            <option>Select</option>
                            <option>Dog</option>
                            <option>Cat</option>
                            <option>Rabbit</option>
                            <option>Guinea Pig</option>
                            <option>Bird</option>
                            <option>Others</option>
                          </select>
                          {errors.type ? (
                            <span className="text-red-700 text-xs">
                              {errors.type.message}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="w-full sm:w-6/12 lg:w-3/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label className="block text-blueGray-600 text-xs font-bold mb-2">
                            Gender
                          </label>
                          <select
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            {...register("gender")}
                          >
                            <option>Select</option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                          {errors.gender ? (
                            <span className="text-red-700 text-xs">
                              {errors.gender.message}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="w-full sm:w-6/12 lg:w-3/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label className="block text-blueGray-600 text-xs font-bold mb-2">
                            Breed
                          </label>
                          <input
                            type="text"
                            placeholder="Pet's Breed"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            {...register("breed")}
                          />
                          {errors.breed ? (
                            <span className="text-red-700 text-xs">
                              {errors.breed.message}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div className="w-full sm:w-6/12 lg:w-3/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label className="block text-blueGray-600 text-xs font-bold mb-2">
                            Birthdate
                          </label>
                          <input
                            type="date"
                            placeholder="Birthdate"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            {...register("birthdate")}
                          />
                          {errors.birthdate ? (
                            <span className="text-red-700 text-xs">
                              {errors.birthdate.message}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div className="w-full sm:w-6/12 lg:w-3/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label
                            className="block text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Dewormed?
                          </label>
                          <select
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            {...register("dewormed")}
                          >
                            <option>Select</option>
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                          {errors.dewormed ? (
                            <span className="text-red-700 text-xs">
                              {errors.dewormed.message}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="w-full sm:w-6/12 lg:w-3/12 px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label className="block text-blueGray-600 text-xs font-bold mb-2">
                            Vaccinated?
                          </label>
                          <select
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            {...register("vaccinated")}
                          >
                            <option>Select</option>
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                          {errors.vaccinated ? (
                            <span className="text-red-700 text-xs">
                              {errors.vaccinated.message}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="w-full px-4 py-1">
                        <div className="relative w-full mb-3">
                          <label
                            className="block text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Why did you decide to put your pet up for adoption?
                          </label>
                          <textarea
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            {...register("reason")}
                          />
                          {errors.reason ? (
                            <span className="text-red-700 text-xs">
                              {errors.reason.message}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr className="mt-8 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-md mt-10 mb-6 font-bold">
                      Pet Photos
                    </h6>
                    <div className="flex flex-wrap ">
                      <div className="w-full lg:w-6/12 px-4 self-center ">
                        <div className="w-full relative mb-3">
                          <label
                            className="block text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Add Pet's Photo/s Here
                          </label>
                          <div
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                            className={
                              isDragging
                                ? "border-0 bg-blue-50 text-center py-10 px-5 sm:p-20 placeholder-blueGray-300 text-blueGray-600  rounded text-sm shadow outline-none ring w-full ease-linear transition-all duration-150"
                                : "border-0  bg-neutral-50  text-center py-10 px-5 sm:p-20 placeholder-blueGray-300 text-blueGray-600  rounded text-sm shadow ease-linear transition-all duration-150"
                            }
                          >
                            {isDragging ? (
                              <p className="text-xs">
                                <span className="select">Drop Images here</span>
                              </p>
                            ) : (
                              <>
                                <p className="text-xs">
                                  <span>Drag & Drop image here or </span>
                                  <span
                                    className="font-bold text-[#002349] underline hover:text-blue-500"
                                    role="button"
                                    onClick={selectFiles}
                                  >
                                    Browse
                                  </span>
                                </p>
                              </>
                            )}
                            <input
                              type="file"
                              name="file"
                              multiple
                              ref={fileInputRef}
                              className="text-center m-5
                              w-[92px]"
                              onChange={onFileSelect}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: images.length <= 0 ? "flex" : "none",
                        }}
                        id="justAPlaceholderDiv"
                        className="w-full lg:w-6/12 px-4 self-center "
                      >
                        <div className="w-full relative mb-3">
                          <label
                            className="block text-blueGray-600  text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Image Preview
                          </label>
                          <div className="border-0 text-center  bg-neutral-50 h-[243px]  px-5 py-[100px] placeholder-blueGray-300 text-blueGray-600  rounded text-sm shadow outline-none ease-linear transition-all duration-150">
                            <p className="text-[#d4d4d4]">
                              Image Preview not yet available<br></br>Please
                              upload image/s first
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: images.length <= 0 ? "none" : "flex",
                        }}
                        className="w-full lg:w-6/12 px-4 bg-neutral-50 self-center"
                      >
                        <div className="w-full relative mb-3">
                          <div className="h-[300px] flex-wrap flex">
                            <div className="py-5 w-full lg:w-6/12">
                              <label
                                className="block text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Select Cover Photo
                              </label>
                              <div>
                                <select
                                  id="selectId"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  onChange={(e: any) =>
                                    setCover(e.target.value)
                                  }
                                >
                                  {categories.map((param: any) => (
                                    <option
                                      key={param}
                                      data-key={param}
                                      value={param.name}
                                    >
                                      {param.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className=" m-auto  contents w-full lg:w-6/12">
                              <img
                                className="object-contain m-auto h-[150px] max-w-[37%] "
                                src={findArrayElementByTitle(images, cover)}
                              />
                            </div>
                          </div>
                          <label
                            className="block text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            List of Images(maximum of 6)
                          </label>
                          <div className="flex-wrap inline-flex w-full">
                            {images.map((images: any, index: any) => (
                              <div
                                key={index}
                                className="w-4/12 border-2 border-neutral-50 p-1 bg-white text-center min-[600px]:w-3/12 xl:w-2/12 2xl:w-2/12"
                              >
                                <span
                                  className="delete"
                                  onClick={() =>
                                    deletingFiles(index, setImages)
                                  }
                                >
                                  <CiSquareRemove className="text-red-600 text-lg cursor-pointer" />
                                </span>
                                <img
                                  className="h-12 p-1 m-auto"
                                  src={images.url}
                                  alt={images.name}
                                />
                                <p className="text-xs">
                                  {images.name.substring(0, 10)}...
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap mt-10 ">
                      <div className="w-full text-right lg:w-6/12 px-4 self-center ">
                        <div className="w-full relative mb-3">
                          <button
                            className="shadow-md min-w-full lg:min-w-[150px] text-white font-bold bg-[#002349] hover:bg-blue-900 py-2 px-4 rounded"
                            type="submit"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4 self-center ">
                        <div className="w-full relative mb-3">
                          <Link to="/">
                            <div className="shadow-md cursor-pointer text-center w-full lg:w-[150px] text-white font-bold bg-[#ff1919] hover:bg-[#cf1313] py-2 px-4 rounded">
                              Cancel
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
