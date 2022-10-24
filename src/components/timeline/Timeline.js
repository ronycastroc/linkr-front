import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import {getPublications } from "../../service/linkrService";
import {Publication,AddPublication} from "./Publication.js"
import UserContext from "../../contexts/Usercontext.js";
import HeaderLogout from "../HeaderLogout";
import { ReactTagify } from "react-tagify";
import Trending from "../hashtag/Trending";
import { useNavigate } from "react-router-dom";



export default function Timeline(){
    const [publications,setPublications]=useState('');
    const {refresh}=useContext(UserContext);
    const navigate = useNavigate();


    useEffect(()=>{
        getPublications()
         .then((answer)=>{
            setPublications(answer.data)
            console.log(publications)
         })
         .catch((error)=>{
            alert("An error occured while trying to fetch the posts, please refresh the page")
         })
         
    },[refresh]);

    function navigateToHashtagPage(tag){
        const hashtag = tag.replace("#","");
        navigate(`/hashtag/${hashtag}`);
        return 
    }   

    return(
        <Wrapper>
            <HeaderLogout />

             <WrapperH>
                <Wrapper>                

                    <Title><h1>Timeline</h1></Title>
                    <AddPublication></AddPublication>
                    {publications?(publications.length===0?(<Title><h1>There are no posts yet</h1></Title>):(
                        publications.map((value,key)=>
                            <Publication 
                                key={key}
                                id={value.id}
                                text={<ReactTagify colors="white" tagClicked={(tag)=>(navigateToHashtagPage(tag) )}  >{value.text}</ReactTagify>}
                                url={value.url}
                                description={value.description}
                                image={value.image}
                                title={value.title}  
                                urlImage={value.urlImage}
                                name={value.name}
                            ></Publication>
                        )
                    )):(<Title><h1>Loading...</h1></Title>)}
                </Wrapper>
                        <Trending onClick={(tag)=> navigateToHashtagPage(tag)}></Trending>
                <Wrapper>
                
                </Wrapper>
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
 const Title=styled.div`
    width: 100%;
    margin-top: 100px;
    margin-bottom:43px;
    h1{
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;

    @media (max-width: 650px) {
        margin-left: 5%;
    }

    }
 `