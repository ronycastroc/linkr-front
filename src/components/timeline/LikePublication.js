import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { likePost, unlikePost, getLikes } from "../../service/linkrService";
import UserContext from "../../contexts/Usercontext.js";

export default function Like(postId) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState("");
  const { refresh, setRefresh } = useContext(UserContext);

  useEffect(() => {
    getLikes(postId)
      .then((answer) => {
        setLikeCount(answer.data);
        console.log(answer);
      })
      .catch((error) => {
        console.log(
          "An error occured while trying to fetch likes, please refresh the page"
        );
      });
  }, [refresh]);

  function like() {
    const promise = likePost(postId);
    promise
      .then(() => {
        setLiked(true);
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));
  }

  function dislike() {
    const promise = unlikePost(postId);
    promise
      .then(() => {
        setLiked(false);
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {liked || likeCount !== 0 ? (
        <>
          <AiFillHeart
            color="red"
            fontSize={"23px"}
            onClick={() => dislike()}
          />
          <span>{likeCount} likes</span>
        </>
      ) : (
        <>
          <AiOutlineHeart
            color="white"
            fontSize={"23px"}
            onClick={() => like()}
          />
          <span>{likeCount} likes</span>
        </>
      )}
    </>
  );
}
