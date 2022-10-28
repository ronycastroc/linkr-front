import { useParams,useNavigate } from "react-router-dom"
import { useContext, useEffect, useState,useRef } from "react";
import styled from "styled-components"
import { Publication } from "./Publication.js"
import HeaderLogout from "../authComponents/HeaderLogout.js";
import { followUser, getFollower, getTimeline, unfollowUser } from "../../service/linkrService.js";
import Trending from "../hashtag/Trending.js";
import UserContext from "../../contexts/Usercontext.js";
import InfiniteScroll from 'react-infinite-scroll-component';
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import { ReactTagify } from "react-tagify";
export default function TimelineUser() {
    
    const [reposts, setReposts] = useState("");
    const [publications, setPublications] = useState("");
    const { id } = useParams()
    const [isFollowed, setIsFollowed] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const { refresh, setRefresh } = useContext(UserContext);
    const userJsonId = JSON.parse(localStorage.getItem("userId"));
    const navigate = useNavigate();
    const [timelineLength,setTimelineLength]=useState("");
    const [hasMore,setHasMore]=useState(true)
    const [offset,setOffset]=useState(0);
    const [isEditingPostId, setIsEditingPostId] = useState(null);
    async function getTimelineUser() {
        try {
            const answer = await getTimeline(id,offset)
            setPublications(answer.data.posts)
            setTimelineLength(answer.data.length[0].count)
        } catch (error) {
            console.log(error)
        }
    };
    async function infintyLoad(){
        setOffset(offset+10)
        getTimeline(id,offset)
          .then((answer) => {
            setPublications([...publications,...answer.data.posts]);
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
    
    function navigateToHashtagPage(tag) {
        const hashtag = tag.replace("#", "");
        navigate(`/hashtag/${hashtag}`);
        return;
      }
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
    

    useEffect(() => {getTimelineUser()},[refresh]);

    async function followUnfollow() {
        setRefresh(!refresh);
        setDisabled(true);

        if (isFollowed.length === 0) {
            followUser(id)
                .then(() => {
                    setRefresh(!refresh)
                    setDisabled(false)
                })
                .catch((error) => {
                    setDisabled(false)
                    alert("The operation could not be performed, please try again.")
                    console.log(error)
                });
        } else {
            unfollowUser(id)
                .then(() => {
                    setRefresh(!refresh)
                    setDisabled(false)
                })
                .catch((error) => {
                    setDisabled(false)
                    alert("The operation could not be performed, please try again.")
                    console.log(error)
                });
        }
    };

    useEffect(() => {
        getFollower(id)
            .then(res => {
                setIsFollowed(res.data)
                setDisabled(false)
            })
            .catch((error) => console.log(error))
    }, [refresh]);

    return (
        <Wrapper>
      <HeaderLogout />
      <WrapperH>
        {userJsonId === Number(id) ? ("") : (
                    <ButtonFollow
                        disabled={disabled}
                        isFollowed={isFollowed.length === 0}
                        onClick={followUnfollow}>
                        {isFollowed.length === 0 ?
                            (<p>Follow</p>) :
                            (<p>Unfollow</p>)}
                    </ButtonFollow>)}
        <Wrapper>
        {publications.length > 0 ? (<Title><h1>{publications[0].name} publications</h1></Title>) : (<Title><h1>Timeline</h1></Title>)}
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
            
          )}
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

    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const WrapperH = styled.div`
    display:flex;
    
`
const Title = styled.div`
    width: 100%;
    margin-top: 95px;
    margin-bottom:43px;
    h1{
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
    }

    @media (max-width: 650px) {
        margin-top: 140px;
        padding-left: 5%;
    }
 `

const ButtonFollow = styled.button`
border: none;
width: 112px;
height: 31px;
position: absolute;
top: 120px;
right: 12%;
border-radius: 5px;    
font-weight: 700;
cursor: pointer;
transition: all 0.3s linear;      
background-color: ${props => props.isFollowed ? "#1877F2" : "#FFFFFF"};
color: ${props => props.isFollowed ? "#FFFFFF" : "#1877F2"};   

&:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

@media (max-width: 650px) {
    top: 165px;
    right: 5%;
    width: 90px;
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