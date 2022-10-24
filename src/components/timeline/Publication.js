import { Snippet } from "./Snippet.js";
import { Button } from "./Button.js";
import UserContext from "../../contexts/Usercontext.js";
import { useContext, useState } from "react";
import styled from "styled-components";
import { postPublication } from "../../service/linkrService";
import ModalDelete from "./DeleteModal.js";
import Like from "./LikePublication.js";

function Publication({
  id,
  name,
  image,
  text,
  url,
  urlImage,
  title,
  description,
}) {
  return (
    <PublicationDiv>
      <WrapperH>
        <WrapperPublicationProfile>
          <img src={urlImage} />
          <LikeDiv>
            <Like postId={id} />
          </LikeDiv>
        </WrapperPublicationProfile>
        <WrapperPublication>
          <Icons>
            <ModalDelete postId={id} />
          </Icons>
          <h1>{name}</h1>
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
export { Publication, AddPublication };
const ButtonW=styled.div`
display: flex;
justify-content: end;
`
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
 

`

const WrapperAddPublication = styled.div`
 padding-left: 20px;
 @media (max-width: 650px) {
    display: none;
  }

`
const PublicationDiv = styled.div`
  width: 611px;
  background: #171717;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  margin-bottom: 16px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    display: block;
  }
  @media (max-width: 650px) {
    width: 100vw;
    border-radius:0;}
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
  justify-content: center;
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
