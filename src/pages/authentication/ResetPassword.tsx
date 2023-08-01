import { Dispatch, FC, SetStateAction } from "react";
import { useSelector, useDispatch } from "react-redux";

interface ResetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  handlePasswordReset: () => Promise<void>;
  resetPasswordEmail: string;
  setResetPasswordEmail: Dispatch<SetStateAction<string>>;
}

const ResetPassword: FC<ResetPasswordProps> = ({
  isOpen,
  onClose,
  handlePasswordReset,
  resetPasswordEmail,
  setResetPasswordEmail,
}: ResetPasswordProps) => {
  const { user } = useSelector((state: any) => state.authUser.user);
  if (user !== null) {
    Boolean(user) && setResetPasswordEmail(user.email);
  }

  return (
    <section
      className="bg-gray-50/90  fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center"
      style={
        isOpen
          ? { transform: "translateY(0)" }
          : { transform: "translateY(-100%)" }
      }
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl ">
            {Boolean(user) ? "Changing your password?" : "Password Reset"}
          </h2>
          <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <div>
              {Boolean(!user) ? (
                <>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={resetPasswordEmail}
                    onChange={(e) => setResetPasswordEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Input your email address here"
                  />
                </>
              ) : (
                <></>
              )}
            </div>
            <button
              onClick={handlePasswordReset}
              className="w-full text-white bg-[#002349] hover:bg-blue-900  font-medium rounded-lg text-sm px-5 py-2.5  text-center  "
            >
              Click to send a request to your email
            </button>
            <button
              onClick={onClose}
              style={{ marginTop: 10 }}
              className="w-full text-white bg-[#ff1919] hover:bg-[#cf1313] font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-1"
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
