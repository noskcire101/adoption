import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 10000);
  }, []);
  return (
    <>
      <div>notFoundPage</div>
    </>
  );
};

export default NotFoundPage;
