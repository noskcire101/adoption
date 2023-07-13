import React from "react";

interface Props {
  index: any;
  imageUrl: any;
  imageName: any;
}

const PostDetailsImages = ({ index, imageUrl, imageName }: Props) => {
  return (
    <img
      key={index}
      src={imageUrl}
      alt={imageName}
      className="w-full h-[450px] object-cover m-auto max-w-fit"
    />
  );
};

export default PostDetailsImages;
