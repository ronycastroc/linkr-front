import React from "react";
import styled from "styled-components";

export default function ({data}) {
  return (
  <>
  <TitleWrapper>
    <p>{data}</p>
  </TitleWrapper>;
  </>)
  
}

const TitleWrapper = styled.p`
  position: absolute;
  width: 80%;
  height: 64px;
  left: 241px;
  top: 22%;

  p{font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;

  color: #ffffff;}
  @media (max-width: 650px) {
    * {
      box-sizing: border-box;
    }
    p{
      font-size: 33px;
      }
    
    left: 300px;
    top: -5px;
   }

`;
