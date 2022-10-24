import styled from "styled-components";
import React, { useContext, useEffect } from "react";
import Trending from "./Trending";
import { useNavigate, useParams } from "react-router-dom";
import Title from "./Title";
import { useState } from "react";
import { Publication } from "../timeline/Publication";
import { ReactTagify } from "react-tagify";
import { getHashtagPosts } from "../../service/linkrService";
import UserContext from "../../contexts/Usercontext";
import HeaderLogout from "../authComponents/HeaderLogout";

export default function HashtagPage() {
  const { hashtag } = useParams();
  const [publications, setPublications] = useState([]);
  const { refresh, setRefresh } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setPublications();
    getHashtag(hashtag);
  }, [refresh]);

  function getHashtag(tag) {
    getHashtagPosts(tag)
      .then((answer) => {
        setPublications(answer.data);
      })
      .catch((error) => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }

  function navigateToHashtagPage(tag) {
    getHashtag(tag);
    const hashtag = tag.replace("#", "");
    navigate(`/hashtag/${hashtag}`);
    return;
  }

  return (
    <Wrapper>
      <HeaderLogout></HeaderLogout>
      <TW>
        <Title data={`# ${hashtag}`} />
      </TW>{" "}
      <WrapperH>
        {refresh === false ? (
          <WrapperContent>
            {publications ? (
              publications.map((value, key) => (
                <PubWrapper>
                  <Publication
                    key={key}
                    id={value.id}
                    text={
                      <ReactTagify
                        colors="white"
                        tagClicked={(tag) => navigate(`/hashtag/${tag}`)}
                      >
                        {value.text}
                      </ReactTagify>
                    }
                    url={value.url}
                    description={value.description}
                    image={value.image}
                    title={value.title}
                    urlImage={value.urlImage}
                    name={value.name}
                  ></Publication>
                </PubWrapper>
              ))
            ) : (
              <Title>
                <h1>Loading...</h1>
              </Title>
            )}
          </WrapperContent>
        ) : (
          <></>
        )}
        <WT>
          <Trending onClick={(tag) => navigateToHashtagPage(tag)} />
        </WT>
      </WrapperH>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media (max-width: 650px) {
    * {
      box-sizing: border-box;
    }

    flex-wrap: wrap;
    justify-content: center;
  }
`;

const TW = styled.div`
  position: fixed;
  top: 15%;
  right: 0%;
  width: 100%;
  height: 10%;

  @media (max-width: 650px) {
    * {
      box-sizing: border-box;
    }
    display: flex;
    width: 100%;
    position: relative;
    right: 45vw;
    top: 25vw;
  }
`;

const WT = styled.span`
  @media (max-width: 650px) {
    * {
      box-sizing: border-box;
    }
    display: none;
  }
`;
const WrapperContent = styled.div`
  width: 100%;
  height: 100%;

  position: relative;
  top: 200px;
  display: flex;
  flex-direction: column;
 
`;

const WrapperH = styled.div`
  display: flex;
`;

const PubWrapper = styled.div`
  position: relative;
  top: 20%;
`;
