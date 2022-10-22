import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import {
  likePost,
  unlikePost,
  getLikes,
  getUserLikes,
} from "../../service/linkrService";
import UserContext from "../../contexts/Usercontext.js";

export default function Like(postId) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState("");
  const [likedByUser, setLikedByUser] = useState(false);
  const { refresh, setRefresh } = useContext(UserContext);
  const userId = JSON.parse(localStorage.getItem("userId"));

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

  useEffect(() => {
    getUserLikes(postId, userId)
      .then((answer) => {
        if (answer.data.userId === userId) {
          setLiked(true);
        }

        console.log(answer.data.userId);
      })
      .catch((error) => {
        console.log(
          "An error occured while trying to fetch user likes, please refresh the page"
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
      {liked ? (
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
