import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { AuthFormSignUp, authFormSchemaSignUp } from "../../yupModels/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../database/firebase";
import { setDoc, doc } from "firebase/firestore";
import {
  useAppDispatch,
  useAppSelector,
} from "../../storeReduxTools/storeHooks";
import { login } from "../../storeReduxTools/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { convertToTitleCase } from "../../reusableFunctions/covert";
import Loader from "../../components/loader/loader";

interface Props {
  toastMessageSuccess: (param: string) => void;
  toastMessageError: (param: string) => void;
  hideSearchfunction(): void;
}
const Signup = ({
  toastMessageSuccess,
  toastMessageError,
  hideSearchfunction,
}: Props) => {
  hideSearchfunction();
  const [buttonDisabling, setbuttonDisabling] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    Boolean(user) && navigate("/");
  }, [user]);

  const signInWithGoogle = async () => {
    try {
      setLoader(true);
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result.user);
          const user = result.user;
          setDoc(
            doc(db, "users", user.uid),
            {
              fullname: user.displayName,
              email: user.email,
              photoUrl: user.photoURL ? user.photoURL : null,
            },
            { merge: true }
          );
          if (user && user.email) {
            dispatch(
              login({
                id: user.uid,
                fullName: user.displayName,
                email: user.email,
                photoUrl: user.photoURL || null,
              })
            );
            setLoader(false);
            toastMessageSuccess("Sign Up Succesfully");
          }
        })
        .catch((err) => console.log(err.message));
      // await setDoc(doc(db, "users", user.uid), { email });
    } catch (error: any) {
      toastMessageError(error.message);
      setLoader(false);
    }
  };

  const handleFormSubmit = async (data: AuthFormSignUp) => {
    const { fullName, email, password } = data;
    setbuttonDisabling(true);
    setLoader(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        photoUrl: null,
      });
      setbuttonDisabling(false);
      if (user && user.email)
        dispatch(
          login({
            id: user.uid,
            fullName: fullName,
            email: user.email,
            photoUrl: user.photoURL || null,
          })
        );
      setLoader(false);
      toastMessageSuccess("Account Succesfully Created");
    } catch (error: any) {
      setbuttonDisabling(false);
      setLoader(false);
      const errorCode = error.code;
      toastMessageError(
        convertToTitleCase(errorCode.replace("auth/", "").replace(/-/g, " "))
      );
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormSignUp>({
    resolver: yupResolver(authFormSchemaSignUp),
  });

  return (
    <>
      <div className="w-full max-w-md mt-5 m-auto">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <h3 className="text-[37px] text-center py-7 font-bold text-black">
            Sign Up
          </h3>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Fullname
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Fullname"
              {...register("fullName")}
            />
            {errors.fullName ? (
              <span className="text-red-700 mt--10 text-xs">
                {errors.fullName.message}
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="example@email.com"
              {...register("email")}
            />
            {errors.email ? (
              <span className="text-red-700 mt--10 text-xs">
                {errors.email.message}
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Password
            </label>
            <input
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="••••••"
              {...register("password")}
            />
            {errors.password ? (
              <span className="text-red-700 mt--10 text-xs">
                {errors.password.message}
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Confirm Password
            </label>
            <input
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="••••••"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword ? (
              <span className="text-red-700 mt--10 text-xs">
                {errors.confirmPassword.message}
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className="flex items-start mb-3">
            <label className="mt-3 text-sm font-medium  text-gray-900 ">
              Already have an account?{" "}
              <Link to="/login">
                <span className="font-bold  text-sm text-blue-500 hover:text-blue-800 hover:underline cursor-pointer">
                  Sign In Here
                </span>
              </Link>
            </label>
          </div>
          <div className="pt-4 pb-3 flex items-center justify-between">
            <button
              disabled={buttonDisabling}
              className="bg-[#002349] hover:bg-blue-900 min-w-[100%] text-white font-bold py-2 px-4 rounded focus:outline-none"
              type="submit"
            >
              Sign Up
            </button>
          </div>

          <div className="flex items-center justify-center mb-3">
            <button
              className="flex items-center place-content-center w-[100%] bg-white border border-gray-300 rounded shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
              onClick={signInWithGoogle}
              type="button"
            >
              <svg
                className="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                width="800px"
                height="800px"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                {" "}
                <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
                <defs> </defs>{" "}
                <g
                  id="Icons"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  {" "}
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    {" "}
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      {" "}
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
              </svg>
              <span>Sign Up With Google</span>
            </button>
          </div>
        </form>
      </div>
      {loader && <Loader />}
    </>
  );
};

export default Signup;
