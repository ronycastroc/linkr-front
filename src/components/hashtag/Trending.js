import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getHashtagPosts, getHashtagTrending } from "../../service/linkrService";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/Usercontext";
import { useContext } from "react";
import { ReactTagify } from "react-tagify";

export default function Trending({onClick}) {
  const [tranding, setTranding] = useState([]);
  const {refresh}=useContext(UserContext);
  const {reload} = useContext(UserContext);
  const navigate = useNavigate();

  
  useEffect(() => {
    listHashtags();
  },[refresh]);

  
  function listHashtags() {
    getHashtagTrending()
      .then((response) => {
        setTranding(response.data);
       })
      .catch((err) => {
        console.log(err)
        alert("Error trying to list hashtags trending");
      });
  }
  return (
    <>
      <HashtagsBox>
        <h3>trending</h3>
        <ul>
          {tranding.map((hashtag, key) => <li  key={key} onClick={()=> onClick(hashtag.text) } ># {hashtag.text}</li> )}
       </ul>
      </HashtagsBox>
    </>
  );
}

const HashtagsBox = styled.div`
  position: relative;
  top: 160px;
  left:4%;
  width: 301px;
  height: 406px;
  background-color: #171717;
  border-radius: 16px;

  h3 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #ffffff;

    padding-left: 16px;
    padding-bottom: 12px;
    margin-top: 9px;
    border-bottom: 1px solid #484848;
  }

  ul {
    margin-top: 22px;
    margin-left: 16px;
  }
  li {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: 0.05em;

    color: #ffffff;
  }
`;
