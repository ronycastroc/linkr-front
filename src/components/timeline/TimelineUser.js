import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import styled from "styled-components"
import { Publication } from "./Publication.js"
import HeaderLogout from "../authComponents/HeaderLogout.js";
import { getTimeline } from "../../service/linkrService.js";
import Trending from "../hashtag/Trending.js";


export default function TimelineUser() {
    const [posts, setPosts] = useState([])
    const { id } = useParams()


    async function getTimelineUser() {
        try {
          const resp = await getTimeline(id)
            setPosts(resp.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTimelineUser()
    }, [posts]);
    return (
        <Wrapper>
            <HeaderLogout/>
            <WrapperH>
                <Wrapper>
                    {posts.length > 0 ? (<Title><h1>{posts[0].name} posts</h1></Title>) : (<Title><h1>Timeline</h1></Title>)}
                    {posts ? (posts.length === 0 ? (<Title><h1>There are no posts yet</h1></Title>) : (
                        posts.map((post, key) =>
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
 `
