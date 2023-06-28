import { Dispatch, FC, SetStateAction } from "react";
import { useAppSelector } from "../../hooks/storeHooks";

interface ResetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  handlePasswordReset: () => Promise<void>;
  resetPasswordEmail: string;
  resetPasswordSuccess: string | null;
  resetPasswordError: string | null;
  setResetPasswordEmail: Dispatch<SetStateAction<string>>;
}

const ResetPassword: FC<ResetPasswordProps> = ({
  isOpen,
  onClose,
  handlePasswordReset,
  resetPasswordEmail,
  resetPasswordSuccess,
  resetPasswordError,
  setResetPasswordEmail,
}: ResetPasswordProps) => {
  const { user } = useAppSelector((state) => state.auth);
  if (user !== null) {
    Boolean(user) && setResetPasswordEmail(user.email);
  }

  return (
    <section
      className="bg-gray-50/90 dark:bg-gray-900 fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center"
      style={
        isOpen
          ? { transform: "translateY(0)" }
          : { transform: "translateY(-100%)" }
      }
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-align: center; text-gray-900 md:text-2xl dark:text-white">
            {Boolean(user) ? "Change Password" : "Password Reset"}
          </h2>
          <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                value={resetPasswordEmail}
                onChange={(e) => setResetPasswordEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="example@email.com"
              />
            </div>
            <button
              onClick={handlePasswordReset}
              className="w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {Boolean(user) ? "Change Password" : "Reset Password"}
            </button>
            {resetPasswordSuccess && (
              <p className="text-green-500 mt-2">{resetPasswordSuccess}</p>
            )}
            {resetPasswordError && (
              <p className="text-red-500 mt-2">{resetPasswordError}</p>
            )}
            <button
              onClick={onClose}
              style={{ marginTop: 10 }}
              className="w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5  text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
