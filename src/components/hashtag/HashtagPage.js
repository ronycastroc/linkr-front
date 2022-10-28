import styled from "styled-components";
import React, { useContext, useEffect,useRef ,useState} from "react";
import Trending from "./Trending";
import { useNavigate, useParams } from "react-router-dom";
import { Publication ,EditPublication,} from "../timeline/Publication";
import { ReactTagify } from "react-tagify";
import { getHashtagPosts,editPost } from "../../service/linkrService";
import UserContext from "../../contexts/Usercontext";
import HeaderLogout from "../authComponents/HeaderLogout";
import InfiniteScroll from 'react-infinite-scroll-component';
import {AiOutlineLoading3Quarters} from "react-icons/ai"


export default function HashtagPage() {
  const { hashtag } = useParams();
  const [publications, setPublications] = useState([]);
  const { refresh, setRefresh } = useContext(UserContext);
  const navigate = useNavigate();
  const [offset,setOffset]=useState(0);
  const [timelineLength,setTimelineLength]=useState("");
  const [isEditingPostId, setIsEditingPostId] = useState(null);
  const [disabled, setDisabled] = useState("");
  const [hasMore,setHasMore]=useState(true)
  
  useEffect(() => {
    getHashtag(hashtag);
  }, []);

  async function getHashtag(tag) {
  
    console.log('offset1',offset)
    getHashtagPosts(tag,offset)
      .then((answer) => {
        setPublications(answer.data.listPosts);
        setTimelineLength(answer.data.length[0].count)
        
        console.log('offset2',offset)
      })
      .catch((error) => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }

  async function infintyLoad(){
    setOffset(offset+10)
    getHashtagPosts(tag,offset)
      .then((answer) => {
        setPublications([...publications,...answer.data.listPosts]);
        setTimelineLength(answer.data.length[0].count)
        setOffset(offset+10)
        if(timelineLength-offset>0){
          setHasMore(true);
        }else{
          setHasMore(false)
        }
      })
      .catch((error) => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }




  async function navigateToHashtagPage(tag) {
    console.log('offset3',offset)
    getHashtag(tag);
    const hashtag = tag.replace("#", "");
    navigate(`/hashtag/${hashtag}`);
    return;
  }
  function handleEditClick(postId) {
    setIsEditingPostId(postId);
  }

  function handleCancelEdit() {
    setIsEditingPostId(null);
  }

  function handleSendEdit(e, postId) {
    e.preventDefault();
    const body = { newText: newText };
    setDisabled("Disabled");
    editPost(postId, body)
      .then(() => {
        //console.log(postId);
        setIsEditingPostId(null);
        setRefresh(!refresh);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(`You can only edit you own posts!`);
          setIsEditingPostId(null);
        } else {
          alert(
            `There was an error in editing this post. Alterations could not be saved.`
          );
          setDisabled("");
        }

        console.log(postId);
      });
  }

  function handleKeyDown(e, postId) {
    if (e.keyCode === 27) {
      handleCancelEdit();
      //console.log(postId);
    }
    if (e.keyCode === 13) {
      handleSendEdit(e, postId);
      //console.log(postId);
    }
  }
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditingPostId) {
      inputRef.current.focus();
    }
  }, [isEditingPostId]);

  return (
    <Wrapper>
      <HeaderLogout />
      <WrapperH>
        <Wrapper>
          <Title>
            <h1># {hashtag}</h1>
          </Title>
          <InfiniteScroll
            loader={
            <Loading>
              <AiOutlineLoading3Quarters color="#6D6D6D" size="36px" ></AiOutlineLoading3Quarters>
              <h1>Loading more posts...</h1>
            </Loading>}
            next={infintyLoad}
            hasMore={hasMore}
            dataLength={publications.length}
            scrollThreshold={1}
          >
            {
            publications.length === 0 ? (
              <Title>
                <h1>There are no posts yet</h1>
              </Title>
            ) : (
              publications.map((value, key) =>
                isEditingPostId === value.id ? (
                  <form onSubmit={handleSendEdit}>
                    <EditPublication
                      key={key}
                      id={value.id}
                      text={
                        <ReactTagify
                          colors="white"
                          tagClicked={(tag) => navigateToHashtagPage(tag)}
                        >
                          {value.text}
                        </ReactTagify>
                      }
                      placeholder={value.text}
                      url={value.url}
                      description={value.description}
                      image={value.image}
                      title={value.title}
                      urlImage={value.urlImage}
                      name={value.name}
                      inputRef={inputRef}
                      handleCancelEdit={handleCancelEdit}
                      handleKeyDown={handleKeyDown}
                      setNewText={setNewText}
                      disabled={disabled}
                    />
                  </form>
                ) : (
                  <Publication
                    key={key}
                    userId={value.userId}
                    id={value.id}
                    text={
                      <ReactTagify
                        colors="white"
                        tagClicked={(tag) => navigateToHashtagPage(tag)}
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
                    handleEditClick={handleEditClick}
                  ></Publication>
                )
              )
            )
            
          }
        </InfiniteScroll>
        </Wrapper>
        <Trending onClick={(tag) => navigateToHashtagPage(tag)}></Trending>
        <Wrapper></Wrapper>
      </WrapperH>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const WrapperH = styled.div`
  display: flex;
`;

const Title = styled.div`
  width: 100%;
  margin-top: 100px;
  margin-bottom: 43px;
  h1 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;

    @media (max-width: 650px) {
      margin-left: 5%;
      margin-top: 50px;
    }
  }
`;
const Loading =styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  h1{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;
    letter-spacing: 0.05em;
    color: #6D6D6D;
  }
`