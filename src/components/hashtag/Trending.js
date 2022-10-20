import { useEffect, useState } from "react";
import styled from "styled-components";
import { getHashtagTranding } from "../../service/linkrService";

export default function Trending() {
  const [tranding, setTranding] = useState([]);

  useEffect(() => {
    listHashtags();
  }, []);

  function listHashtags() {
    getHashtagTranding()
      .then((response) => {
        setTranding(response.data);
      })
      .catch((err) => {
        alert("Errou ao listar trending");
      });
  }

  return (
    <>
      <HashtagsBox>
      <h3>trending</h3>
        <ul>
          {tranding.map((hashtag) => <li># {hashtag.text}</li> )}
       </ul>
      </HashtagsBox>
    </>
  );
}

const HashtagsBox = styled.div`
  position: relative;
  top: 232px;
  left: 877px;
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
