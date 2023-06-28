// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
// import { signOut } from "firebase/auth";
// import { logout } from "../../features/authSlice";
// import { auth } from "../../database/firebase";
// import ProfileCard from "../../components/profileCard/ProfileCard";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const { user } = useAppSelector((state) => state.auth);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const handleLogout = async () => {
//     await signOut(auth);
//     dispatch(logout());
//   };

//   useEffect(() => {
//     if (Boolean(!user)) {
//       navigate("/login");
//     }
//   }, [navigate, user]);

//   return <>{user && <ProfileCard user={user} handleLogout={handleLogout} />}</>;
// };

// export default Profile;

import React from "react";

const Profile = () => {
  return <div>Profile</div>;
};

export default Profile;
