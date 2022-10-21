import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { getHashtagPosts } from "../../service/linkrService";
import HeaderLogout from "../HeaderLogout";

export default function PostTeste({hashtagName}) {
const [posts, setPosts] = useState([]);

useEffect(() => {
  listPosts();
},[posts]);

function listPosts() {
  getHashtagPosts({hashtagName})
    .then((response) => {
      setPosts(response.data);
   })
    .catch((err) => {
      alert("Erro ao listar posts");
    });
}

  return (
    <>
      <HeaderLogout />
      {posts.length === 0 ? <></> : posts.map((value) => <HashtagsBox>{value.hashtag}</HashtagsBox>)}     
    </>
  );
}

const HashtagsBox = styled.div`
  position: relative;
  margin-bottom: 16px;
  width: 611px;
  height: 276px;
  left: 241px;
  top: 232px;

  background: #171717;
  border-radius: 16px;
`;
const Box = styled.div`
`