import React from "react";
import styled from "styled-components";

export default function ({data}) {
  return (
  <>
  <TitleWrapper>
    {data}
  </TitleWrapper>;
  </>)
  
}

const TitleWrapper = styled.p`
  position: absolute;
  width: 80%;
  height: 64px;
  left: 241px;
  top: 22%;

  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;

  color: #ffffff;
`;
