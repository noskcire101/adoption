import React, { useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import { AuthForm, authFormSchema } from "../../models/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../../database/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { login } from "../../features/authSlice";
import ResetPassword from "../../components/resetPassword/ResetPassword";
import { useNavigate } from "react-router-dom";

interface Props {
  toastMessageSuccess: (param: string) => void;
  toastMessageError: (param: string) => void;
}
const Login = ({ toastMessageSuccess, toastMessageError }: Props) => {
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const [buttonDisabling, setbuttonDisabling] = useState(false);
  const [resetPasswordContainerVisibily, setResetPasswordContainerVisibily] =
    useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (Boolean(user)) {
      navigate("/");
    }
  }, [user, navigate]);

  const handlePasswordReset = async () => {
    if (!resetPasswordEmail.length) return;
    try {
      await sendPasswordResetEmail(auth, resetPasswordEmail);
      toastMessageSuccess(
        "Reset password request sent. Please check your email."
      );
      setResetPasswordContainerVisibily(false);
    } catch (error: any) {
      toastMessageError(error.message);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      // await setDoc(doc(db, "users", user.uid), { email});
      if (user && user.email) {
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoUrl: user.photoURL || null,
          })
        );
        toastMessageSuccess("Singin Succesfully");
      }
    } catch (error) {
      toastMessageError("Error Occured. Please Try Again");
    }
  };

  const handleFormSubmit = async (data: AuthForm) => {
    const { email, password } = data;
    setbuttonDisabling(true);
    if (authType === "signup") {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(user);
        await setDoc(doc(db, "user", user.uid), { email });
        setbuttonDisabling(false);
        if (user && user.email)
          dispatch(
            login({
              email: user.email,
              id: user.uid,
              photoUrl: user.photoURL || null,
            })
          );
        toastMessageSuccess("Account Succesfully Created");
      } catch (error: any) {
        setbuttonDisabling(false);
        const errorCode = error.code;
        toastMessageError(errorCode);
      }
    } else {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setbuttonDisabling(false);
      if (user && user.email) {
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoUrl: user.photoURL || null,
          })
        );
        toastMessageSuccess("Login Success");
      }
    }
  };

  const handleAuthType = () => {
    setAuthType((prevAuthType) =>
      prevAuthType === "login" ? "signup" : "login"
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: yupResolver(authFormSchema),
  });

  const showForm = useRef<any>();
  function loadPageDelay() {
    const timer = setTimeout(() => {
      if (showForm.current) showForm.current.style.display = "block";
    }, 1000);
    return () => clearTimeout(timer);
  }
  loadPageDelay();
  return (
    <>
      <ResetPassword
        resetPasswordEmail={resetPasswordEmail}
        setResetPasswordEmail={setResetPasswordEmail}
        isOpen={resetPasswordContainerVisibily}
        onClose={() => setResetPasswordContainerVisibily(false)}
        handlePasswordReset={handlePasswordReset}
      />
      <div
        ref={showForm}
        style={{ display: "none" }}
        className="w-full max-w-screen-sm mt-10 m-auto"
      >
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <h3 className="text-[37px] text-center py-7 font-bold dark:text-white">
            {authType === "login" ? "Sign In" : "Sign Up"}
          </h3>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Email
            </label>
            <input
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example@email.com"
              {...register("email")}
            />
            {errors.email ? (
              <span className="text-red-700 absolute text-xs">
                {errors.email.message}
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="••••••"
              {...register("password")}
            />
            {errors.password ? (
              <span className="text-red-700 absolute text-xs">
                {errors.password.message}
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <input
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="••••••"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword ? (
              <span className="text-red-700 absolute text-xs">
                {errors.confirmPassword.message}
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className="pt-5 flex items-center justify-between">
            <button
              disabled={buttonDisabling}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign {authType === "login" ? "In" : "Up"}
            </button>
            <span
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={() => setResetPasswordContainerVisibily(true)}
            >
              Forgot Password?
            </span>
          </div>
          <div className="flex items-start mb-6">
            <label className="mt-5 text-sm font-medium text-gray-900 dark:text-gray-300">
              {authType === "login" ? (
                <>
                  Don't have an account yet?{" "}
                  <span
                    onClick={handleAuthType}
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Signup Here
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={handleAuthType}
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Sign In Here
                  </span>
                </>
              )}
            </label>
          </div>
          <button
            onClick={signInWithGoogle}
            type="button"
            className="text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center place-content-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            <svg
              className="w-4 h-4 mr-2 -ml-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign in with Google
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
