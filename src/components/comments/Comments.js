import styled from "styled-components";
import { AiOutlineComment } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getComments, getCounting, postComments, } from "../../service/linkrService";



function CommentsCounting({countComments, onClick }) {
  

  return (
    <Wrapper onClick={onClick}>
      <AiOutlineComment color="white" fontSize={"23px"}></AiOutlineComment>
      <Counting>
        <p>
          {countComments}
          {" comments"}
        </p>
      </Counting>
    </Wrapper>
  );
}

function Comments({ id, urlImage, onSend }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getListComments();
  }, []);

  function getListComments() { 
    getComments(id)
      .then((answer) => {
        setComments(answer.data); 
        onSend()
      })
      .catch((error) => {
        console.log(error);
        alert(
          "An error occured while trying to fetch the comments, please refresh the page"
        );
      });
  }

  return (
    <>
      <ListW>
        <ListPostComments comments={comments} />
      </ListW>
      <InsertW>
        <InsertComment
          image={urlImage}
          postId={id}
          onSendComment={() => getListComments()}
        />
      </InsertW>
    </>
  );
}

function ListPostComments({ comments }) {
  return (
    <>
      {comments.length === 0 ? (
        <></>
      ) : (
        <AllCommentsWrapper>
          {comments.map((post, key) => (
            <>
              <CommentBox>
                <ProfilePicture key={key}>
                  <img src={post.urlImage} alt="User avatar" />
                </ProfilePicture>
                <UserWrapper>
                  <Username>
                    {" "}
                    <span>{post.name}</span>
                    <li>{"following"}</li>{" "}
                  </Username>
                  <CommentContent>
                    <p>{post.comment}</p>
                  </CommentContent>
                </UserWrapper>
              </CommentBox>
              <Line></Line>
            </>
          ))}
        </AllCommentsWrapper>
      )}
    </>
  );
}

function InsertComment({ image, postId, onSendComment }) {
  const [comment, setComment] = useState("");

  function sendForm(e) {
    e.preventDefault();

    const body = {
      comment,
    };

    postComments(postId, body)
      .then((answer) => {
          setComment("");
        onSendComment();
      })
      .catch((error) => {
        alert(
          `An error occured while trying to submitting the comment, please refresh the page`
        );
      });
  }

  return (
    <InputWrapper>
      <img src={image} />
      <form onSubmit={sendForm}>
        <input
          type="text"
          name="text"
          placeholder={`write a comment... `}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></input>

        <Icon>
          <button onClick={() => sendForm}>
            <FiSend color="#f3f3f3"></FiSend>
          </button>
        </Icon>
      </form>
    </InputWrapper>
  );
}

export { CommentsCounting, Comments };

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Counting = styled.div`
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  p {
    margin-bottom: 4px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13x;
    text-align: center;
    color: white;
  }
`;

const AllCommentsWrapper = styled.div`
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 611px;
  height: 100%;
  background: #1e1e1e;
  z-index: 1;
`;
const CommentBox = styled.div`
  background: #1e1e1e;
  width: 90%;
  padding-top: 10px;
  padding-right: 20px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  margin-bottom: 5px;

  img {
    background-color: antiquewhite;
    width: 39px;
    height: 39px;
    border-radius: 100%;
    margin-top: 1%;
    margin-bottom: 4px;
    margin-left: 25px;
  }
`;
const ProfilePicture = styled.div`
  margin-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
`;
const Line = styled.div`
  width: 90%;
  border-bottom: 1px #353535 solid;
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 230px;
  height: 4px;
  margin-left: 4%;

  span {
    width: 87px;
    height: 17px;
    left: 323px;
    top: 518px;

    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #f3f3f3;
  }
`;
const CommentContent = styled.div`
  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;

    color: #acacac;
  }
`;

const Username = styled.div`
  display: flex;

  li {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    font-size: 14px;
    line-height: 17px;

    color: #565656;
  }
`;

const InputWrapper = styled.div`
  width: 611px;
  height: 83px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  position: relative;
  background: #1e1e1e;

  input {
    width: 510px;
    height: 39px;
    background: #252525;
    border-radius: 8px;
    padding-left: 15px;

    font-family: "Lato";
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    border: none;
  }
  img {
    width: 39px;
    height: 39px;
    border-radius: 100%;
    margin-top: 1%;
    margin-bottom: 4px;
    margin-left: 20px;
  }
`;
const Icon = styled.div`
  position: absolute;
  left: 92%;
  top: 40%;

  button {
    background: transparent;
    border: none !important;
    font-size: 15px;
  }
`;
const InsertW = styled.div`
  position: relative;
  bottom: 25px;
  left: 0;
`;
const ListW = styled.div`
  position: relative;
  bottom: 30px;
`;
