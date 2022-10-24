import styled from "styled-components";

function Snippet({ url, description, title, image }) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <SnippetDiv>
        <WrapperSnippetText>
          <h1>{title}</h1>
          <h2>{description}</h2>
          <h3>{url}</h3>
        </WrapperSnippetText>
        <WrapperSnippetImg>
          <img src={image} />
        </WrapperSnippetImg>
      </SnippetDiv>
    </a>
  );
}

export { Snippet };

const SnippetDiv = styled.div`
  display: flex;
  width: 100%;
  min-height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  position: relative;
  margin-top: 15px;
`;
const WrapperSnippetText = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width:70%;
  padding: 20px;
  justify-content: space-between;
  h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
    width: 100%;
  }
  h2 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
    width: 100%;
  }
  h3 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
    width: 100%;
  }
  @media (max-width: 650px) {
  h1{
    font-size: 11px;
  }
  h2{
    font-size: 9px;

  }
  h3{
    font-size: 9px;

  }
  }
`;
const WrapperSnippetImg = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 30%;
  height: 100%;
  position: absolute;
  top: 0;
    right: 0;
  img {
    width: 100% !important;
    height: 100% !important;
    border-radius: 0px 11px 11px 0px !important;
  }
`;
