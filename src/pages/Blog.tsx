import React from "react";
interface Props {
  toastMessageSuccess: (param: string) => void;
  toastMessageError: (param: string) => void;
}
const Blog = ({ toastMessageSuccess, toastMessageError }: Props) => {
  return <div>Blog</div>;
};

export default Blog;
