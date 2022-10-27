import { Snippet } from "./Snippet.js";
import { Button } from "./Button.js";
import UserContext from "../../contexts/Usercontext.js";
import { useContext,useEffect, useState } from "react";
import styled from "styled-components";
import { postPublication,getCounting } from "../../service/linkrService";
import ModalDelete from "./DeleteModal.js";
import Like from "./LikePublication.js";
import { TiPencil } from "react-icons/ti";
import {
  CommentsCounting,
  Comments,
} from "../comments/Comments.js";


import { useNavigate } from "react-router-dom";
import ModalRepost from "./RepostModal.js";
import { FaRetweet } from "react-icons/fa";

function Publication({
  id,
  name,
  image,
  text,
  url,
  urlImage,
  title,
  description,
  handleEditClick,
  userId,
}) {
  const [openComment, setOpenComment] = useState(false);
  const [countComments, setCountComments] = useState(0);
  let navigate = useNavigate();


  useEffect(() => {
    getCountComments(id);
  }, []);
  

  function getCountComments() {
    getCounting(id)
      .then((answer) => {
        setCountComments(answer.data); 
      })
      .catch((error) => {
        alert(
          "An error occured while trying to fetch the comments, please refresh the page"
        );
      });
  }

  function openCommentBox() {
    setOpenComment(!openComment);
  }

  return (
    <ContentWrapper>
      <PublicationDiv>
        <WrapperH>
          <WrapperPublicationProfile>
          <img onClick={() => navigate(`/user/${userId}`)} src={urlImage} />
          <LikeDiv>
            <Like postId={id} />
            <ModalRepost postId={id} />
          </LikeDiv>
            <CommentsCountWrapper>
              <CommentsCounting  countComments={countComments} onClick={() => openCommentBox()} />
            </CommentsCountWrapper>
          </WrapperPublicationProfile>
          <WrapperPublication>
            <Icons>
              <TiPencil color="white" onClick={() => handleEditClick(id)} />
              <ModalDelete postId={id} />
            </Icons>
            <h1 onClick={() => navigate(`/user/${userId}`)}>{name}</h1>
            <p>{text}</p>
            <Snippet
              url={url}
              description={description}
              title={title}
              image={image}
            ></Snippet>
          </WrapperPublication>
        </WrapperH>
      </PublicationDiv>
      {openComment ? (
        <Comments id={id} urlImage={urlImage} onSend={() => getCountComments()}/>
      ) : (
        <></>
      )}
    </ContentWrapper>
  );
}

function EditPublication({
  id,
  name,
  newText,
  image,
  placeholder,
  url,
  urlImage,
  title,
  description,
  inputRef,
  handleCancelEdit,
  handleKeyDown,
  setNewText,
  disabled,
}) {
  return (
    <PublicationDiv>
      <WrapperH>
        <WrapperPublication>
          <img src={urlImage} />
          <LikeDiv>
            <Like postId={id} />
            <ModalRepost postId={id} />
          </LikeDiv>
        </WrapperPublication>
        <WrapperPublication>
          <Icons>
            <TiPencil color="white" onClick={() => handleCancelEdit()} />
            <ModalDelete postId={id} />
          </Icons>
          <h1>{name}</h1>
          <InputNewText
            type="text"
            placeholder={placeholder}
            name="newText"
            value={newText}
            ref={inputRef}
            onKeyDown={(e) => handleKeyDown(e, id)}
            onChange={(e) => setNewText(e.target.value)}
            disabled={disabled}
          ></InputNewText>
          <Snippet
            url={url}
            description={description}
            title={title}
            image={image}
          ></Snippet>
        </WrapperPublication>
      </WrapperH>
    </PublicationDiv>
  );
}

function RepostedPublication({
  id,
  name,
  image,
  text,
  url,
  urlImage,
  title,
  description,
  reposterName,
  userId,
  reposterId,
  loggedId,
}) {
  let navigate = useNavigate();
  return (
    <RepostDiv>
      <RepostSpan>
        <FaRetweet color="white" fontSize={"23px"} />
        {reposterId === loggedId
          ? `Re-posted by you`
          : `Re-posted by ${reposterName}`}
      </RepostSpan>
      <PublicationDiv>
        <WrapperH>
          <WrapperPublicationProfile>
            <img onClick={() => navigate(`/user/${userId}`)} src={urlImage} />
            <LikeDiv>
              <Like postId={id} />
              <ModalRepost postId={id} />
            </LikeDiv>
          </WrapperPublicationProfile>
          <WrapperPublication>
            <Icons>
              <TiPencil color="white" />
              <ModalDelete postId={id} />
            </Icons>
            <h1 onClick={() => navigate(`/user/${userId}`)}>{name}</h1>
            <p>{text}</p>
            <Snippet
              url={url}
              description={description}
              title={title}
              image={image}
            ></Snippet>
          </WrapperPublication>
        </WrapperH>
      </PublicationDiv>
    </RepostDiv>
  );
}

function AddPublication() {
  const { refresh, setRefresh } = useContext(UserContext);
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [disabled, setDisabled] = useState("");
  const [button, setButton] = useState("Publish");
  const userImage = JSON.parse(localStorage.getItem("perfilImage"));
  const userId = JSON.parse(localStorage.getItem("userId"));

  function createPost(e) {
    e.preventDefault();
    let body = { id: userId, text, url: link };

    setDisabled("disabled");
    setButton("Publishing...");
    postPublication(body)
      .then((answer) => {
        setRefresh(!refresh);
        setText("");
        setLink("");
      })
      .catch(() => {
        alert("There was an error posting your link");
      });
    setDisabled("");
    setButton("Publish");
  }
  return (
    <AddPublicationDiv>
      <WrapperForm onSubmit={createPost}>
        <WrapperAddPublication>
          <img src={userImage} alt="userImg"></img>
        </WrapperAddPublication>
        <WrapperPublication>
          <h1>What are you going to share today?</h1>
          <InputLink
            placeholder="http://..."
            value={link}
            required
            type="url"
            disabled={disabled}
            onChange={(e) => setLink(e.target.value)}
          ></InputLink>
          <InputText
            placeholder="Awesome article about #javascript"
            disabled={disabled}
            value={text}
            type="text"
            onChange={(e) => setText(e.target.value)}
          ></InputText>

          <ButtonW>
            <Button disabled={disabled} type="submit">
              {button}
            </Button>
          </ButtonW>
        </WrapperPublication>
      </WrapperForm>
    </AddPublicationDiv>
  );
}
export { Publication, AddPublication, EditPublication, RepostedPublication };
const ButtonW = styled.div`
  display: flex;
  justify-content: end;
`;
const WrapperPublication = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: normal;
  padding-left: 20px;
  position: relative;
  h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #ffffff;
    cursor: pointer;
  }
  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
  }
`;

const WrapperPublicationProfile = styled.div`
  padding-left: 20px;

  img {
    cursor: pointer;
  }
`;

const WrapperAddPublication = styled.div`
  padding-left: 20px;
  @media (max-width: 650px) {
    display: none;
  }
`;
const PublicationDiv = styled.div`
  width: 611px;
  background: #171717;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  margin-bottom: 16px;
  z-index: 1;
  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    display: block;
  }
  @media (max-width: 650px) {
    width: 100vw;
    border-radius: 0;
  }
`;

const AddPublicationDiv = styled(PublicationDiv)`
  background: #ffffff;
  min-height: 209px;
  margin-bottom: 30px;
  h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    margin-bottom: 10px;
  }
`;

const InputLink = styled.input`
  width: 100%;
  height: 30px;
  background: #efefef;
  border-radius: 5px;
  border: 0;
  font-family: "Lato";
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 18px;
  color: #949494;
  margin-bottom: 5px;
  text-align: initial;
`;
const InputText = styled(InputLink)`
  min-height: 66px;
`;
const WrapperH = styled.div`
  display: flex;
`;
const WrapperForm = styled.form`
  display: flex;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40px;
  position: absolute;
  right: 0;
`;

const LikeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  cursor: pointer;
`;

const InputNewText = styled.input`
  width: 503px;
  height: 30px;
  background: #ffffff;
  border-radius: 5px;
  border: 0;
  font-family: "Lato";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: #4d4d4d;
  margin-bottom: 5px;
  text-align: initial;
`;
const CommentsCountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  cursor: pointer;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CommentsWrapper = styled.div`
  background-color: green;
  width: 100%;
  position: relative;
  top: 0;
`

const RepostDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 611px;
  height: 275px;
  background: #1e1e1e;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  //padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  margin-bottom: 16px;
  margin-top: 16px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    display: block;
  }
  @media (max-width: 650px) {
    width: 135vw;
    border-radius: 0;
  }
`;

const RepostSpan = styled.div`
  width: 10vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  padding-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
