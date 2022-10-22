import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { likePost, unlikePost } from "../../service/linkrService";

export default function Like(postId) {
  const [liked, setLiked] = useState(false);

  function like() {
    const promise = likePost(postId);
    promise
      .then(() => {
        setLiked(true);
      })
      .catch((err) => console.log(err));
  }

  function dislike() {
    const promise = unlikePost(postId);
    promise.then(() => {
      setLiked(false);
    });
  }

  return (
    <>
      {liked ? (
        <AiFillHeart color="red" fontSize={"23px"} onClick={() => dislike()} />
      ) : (
        <AiOutlineHeart
          color="white"
          fontSize={"23px"}
          onClick={() => like()}
        />
      )}
    </>
  );
}
