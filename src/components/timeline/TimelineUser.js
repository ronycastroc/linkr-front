import { useParams,useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import { Publication } from "./Publication.js"
import HeaderLogout from "../authComponents/HeaderLogout.js";
import { followUser, getFollower, getTimeline, unfollowUser } from "../../service/linkrService.js";
import Trending from "../hashtag/Trending.js";
import UserContext from "../../contexts/Usercontext.js";


export default function TimelineUser() {
    
    const [publications, setPublications] = useState("");
    const { id } = useParams()
    const [isFollowed, setIsFollowed] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const { refresh, setRefresh } = useContext(UserContext);
    const userJsonId = JSON.parse(localStorage.getItem("userId"));
    const navigate = useNavigate();
    
    async function getTimelineUser() {
        try {
            const resp = await getTimeline(id)
            setPublications(resp.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    function navigateToHashtagPage(tag) {
        const hashtag = tag.replace("#", "");
        navigate(`/hashtag/${hashtag}`);
        return;
      }

    useEffect(() => {getTimelineUser()},[]);

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
    }, []);

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
                    {publications ? (publications.length === 0 ? (<Title><h1>There are no posts yet</h1></Title>) : (
                        publications.map((post, key) =>
                            <Publication
                                key={key}
                                id={post.id}
                                text={post.text}
                                url={post.url}
                                description={post.description}
                                image={post.image}
                                title={post.title}
                                urlImage={post.urlImage}
                                name={post.name}
                                userId={id}
                            ></Publication>
                        )

                    )) : (<Title><h1>Loading...</h1></Title>)}
                </Wrapper>
                <Wrapper>

                </Wrapper>
                <Trending onClick={(tag) => navigateToHashtagPage(tag)}></Trending>
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
