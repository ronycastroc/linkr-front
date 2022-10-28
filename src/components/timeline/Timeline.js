import { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import {
  editPost,
  getPublications,
  getReposts,
  getNewPublications,
  getIsFollowing
} from "../../service/linkrService";
import {
  Publication,
  AddPublication,
  EditPublication,
  RepostedPublication,
} from "./Publication.js";
import UserContext from "../../contexts/Usercontext.js";
import HeaderLogout from "../authComponents/HeaderLogout";
import { ReactTagify } from "react-tagify";
import Trending from "../hashtag/Trending";
import { useNavigate } from "react-router-dom";
import useInterval from 'use-interval'
import {HiOutlineRefresh} from "react-icons/hi"
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import InfiniteScroll from 'react-infinite-scroll-component';


export default function Timeline() {
  const [publications, setPublications] = useState("");
  const { refresh, setRefresh } = useContext(UserContext);
  const navigate = useNavigate();
  const [isEditingPostId, setIsEditingPostId] = useState(null);
  const [newText, setNewText] = useState("");
  const [disabled, setDisabled] = useState("");
  const [timelineLength,setTimelineLength]=useState("");
  const [newPostNumber,setNewPostNumber]=useState('');
  const [hasNew,setHasNew]=useState('')
  const [isFollowing,setIsFollowing]=useState([]);
  const [reposts, setReposts] = useState("");
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [hasMore,setHasMore]=useState(true)
  const [offset,setOffset]=useState(0);
  
  
  async function loadPublications(){
    getPublications(userId,offset)
      .then((answer) => {
        setPublications(answer.data.urls);
        setTimelineLength(answer.data.length[0].count)
        
      })
      .catch((error) => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }

  async function infintyLoad(){
    setOffset(offset+10)
    getPublications(userId,offset)
      .then((answer) => {
        setPublications([...publications,...answer.data.urls]);
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



  useEffect(()=>{
    getIsFollowing(userId)
     .then((answer)=>{
      setIsFollowing(answer.data)
     })
     .catch((error) => {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    });
  
  }, [])

  useEffect(()=>{loadPublications()}, [refresh]);

  useInterval(() => {
    
    getNewPublications(userId,timelineLength)
      .then((answer) => {
        setNewPostNumber(answer.data.newPublicationLength)
        if(newPostNumber>0){
          setHasNew(
          <NewPosts onClick={()=>{
            updateTimeline()
            }}>
            <h5>{newPostNumber} new posts, load more!</h5>
            <HiOutlineRefresh color="white" size="22px"></HiOutlineRefresh>
          </NewPosts>)
          
        }
      })
      .catch((error) => {
      alert(error);
    });
  },15000)

  async function updateTimeline (){
    setRefresh(!refresh)
    setHasNew('')
    setNewPostNumber(0)
    setOffset(0)
  }

  useEffect(() => {
    getReposts()
      .then((answer) => {
        setReposts(answer.data);
        console.log(answer.data);
      })
      .catch((error) => {
        alert(
          "An error occured while trying to fetch re-posts, please refresh the page"
        );
      });
  }, [refresh]);

  function navigateToHashtagPage(tag) {
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
            <h1>Timeline</h1>
          </Title>
          <AddPublication></AddPublication>
          {hasNew}
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
            {isFollowing.length > 0 ? (
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
          )  : 
          <Title>
          <h1>You don't follow anyone yet. Search for new friends!</h1>
        </Title>}
        </InfiniteScroll>
            

          {reposts ? (
            reposts.map((value, key) => (
              <RepostedPublication
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
                reposterName={value.reposterName}
                reposterId={value.reposterId}
                loggedId={userId}
              ></RepostedPublication>
            ))
          ) : (
            <></>
          )}
        </Wrapper>
        <Trending onClick={(tag) => navigateToHashtagPage(tag)}></Trending>
        <Wrapper></Wrapper>
      </WrapperH>
    </Wrapper>
  );
}
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
const NewPosts = styled.div`
  width: 100%;
  height: 61px;
  background: #1877F2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 17px;
  display: flex;
  justify-content:center;
  align-items:center;
  cursor: pointer;
  h5{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
    margin-right: 5px;
  }
`
