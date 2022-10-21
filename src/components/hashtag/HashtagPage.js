import styled from "styled-components";
import React from "react";
import Trending from "./Trending";
import { useParams } from "react-router-dom";
import PostTeste from "./PostTeste";
import Title from "./Title";
import { useState } from "react";

export default function HashtagPage(){
const { hashtag } = useParams();
console.log(hashtag)

return(
    <>
    <Title data= {`# ${hashtag}`}  />
    <PostTeste hashtagName={hashtag}/>
    <Trending />
    </>
)

}