import React, { useState } from "react";
import { checkUserifLiked, handleClickLiked } from "./PostFunctions";
import { useAppSelector } from "../../storeReduxTools/storeHooks";
import { GoHeart, GoHeartFill } from "react-icons/go";
interface Props {
  index: any;
  imageUrl: any;
  imageName: any;
  heart: any[];
  itemId: any;
}

const PostDetailsImages = ({
  index,
  imageUrl,
  imageName,
  heart,
  itemId,
}: Props) => {
  const { user } = useAppSelector((state) => state.auth);

  const [liked, setLiked] = useState(
    user?.id && heart ? checkUserifLiked(heart, user!.id) : false
  );
  const [likedCount, setLikedCount] = useState(heart ? heart.length : 0);
  return (
    <>
      <img
        key={index}
        src={imageUrl}
        alt={imageName}
        className="w-full h-[40vh] sm:h-[50vh] object-cover m-auto max-w-fit"
      />
      <div
        onClick={() =>
          handleClickLiked(
            user!.id,
            itemId,
            liked,
            setLiked,
            likedCount,
            setLikedCount
          )
        }
        className="text-center rounded-full h-[55px] sm:h-[70px] w-[55px] sm:w-[70px] p-[10px] sm:p-[20px] bg-[#ddefff] hover:bg-[#bce0ff] -translate-y-1/2 -translate-x-1/2 absolute cursor-pointer m-0 bottom-[-55px] sm:bottom-[-130px] left-[85%] sm:left-[95%]"
      >
        <p className="text-[25px]">
          {" "}
          {liked ? (
            <GoHeartFill className="text-red-600 m-auto" />
          ) : (
            <GoHeart className="text-red-600 m-auto" />
          )}
        </p>
        <p className="text-grey-darker text-[9px]">{likedCount}</p>
      </div>
    </>
  );
};

export default PostDetailsImages;
