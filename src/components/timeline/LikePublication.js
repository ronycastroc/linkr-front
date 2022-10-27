import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import {
  likePost,
  unlikePost,
  getLikes,
  getUserLikes,
  getLikesInfo,
} from "../../service/linkrService";
import UserContext from "../../contexts/Usercontext.js";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

export default function Like(postId) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { refresh, setRefresh } = useContext(UserContext);
  const [info, setInfo] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userId"));
  const username = JSON.parse(localStorage.getItem("name"));

  useEffect(() => {
    getLikes(postId)
      .then((answer) => {
        setLikeCount(answer.data);
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
      })
      .catch((error) => {
        console.log(
          "An error occured while trying to fetch user likes, please refresh the page"
        );
      });
  }, [refresh]);

  useEffect(() => {
    getLikesInfo(postId)
      .then((answer) => {
        setInfo(answer.data);
        //console.log(answer.data);
        console.log(info);
      })
      .catch((error) => {
        console.log(
          "An error occured while trying to fetch likes info, please refresh the page"
        );
      });
  }, [refresh]);

  function like() {
    const promise = likePost(postId);
    promise
      .then(() => {
        setLiked(true);
        setRefresh(!refresh);
        console.log(info);
      })
      .catch((err) => console.log(err));
  }

  function dislike() {
    const promise = unlikePost(postId);
    promise
      .then(() => {
        setLiked(false);
        setRefresh(!refresh);
        //console.log(likeCount);
      })
      .catch((err) => console.log(err));
  }
  let names = [];
  info.map((value) => names.push(value.name));

  return (
    <>
      <ReactTooltip place="bottom" type="light" effect="solid" />
      {
        liked ? (
          <>
            <AiFillHeart
              color="red"
              fontSize={"23px"}
              onClick={() => dislike()}
            />
            <a
              data-tip={
                likeCount + 1 > 2
                  ? likeCount + 1 == 2
                    ? `You, ${names[0]}, and other ${likeCount - 2} people`
                    : `You and ${names.find(
                        (value) => value != username
                      )} liked this`
                  : `You liked this`
              }
            >
              <LikesSpan>{likeCount} likes</LikesSpan>
            </a>
          </>
        ) : (
          <>
            <AiOutlineHeart
              color="white"
              fontSize={"23px"}
              onClick={() => like()}
            />
            <a data-tip={likeCount == 0 ? `` : `${names[0]} liked this`}>
              <LikesSpan>{likeCount} likes</LikesSpan>
            </a>
          </>
        ) /* : (
        <>
          <AiOutlineHeart
            color="white"
            fontSize={"23px"}
            onClick={() => like()}
          />

          <LikesSpan>{likeCount} likes</LikesSpan>
        </>
      ) */
      }
    </>
  );
}

const LikesSpan = styled.span`
  color: white;
`;
