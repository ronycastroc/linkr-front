import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import {getPublications } from "../../service/linkrService";
import {Publication,AddPublication} from "./Publication.js"
import UserContext from "../../contexts/Usercontext.js";
import HeaderLogout from "../HeaderLogout";


export default function Timeline(){
    const [publications,setPublications]=useState('');
    const {refresh}=useContext(UserContext)
    
    useEffect(()=>{
        getPublications()
         .then((answer)=>{
            setPublications(answer.data)
            console.log(publications)
         })
         .catch((error)=>{
            alert("An error occured while trying to fetch the posts, please refresh the page")
         })
         //Tem um Wrapper vazio que talvez funcione pra colocar a tabela de hashtags

    },[refresh]);
    return(
        <Wrapper>
             <WrapperH>
                <Wrapper>
                    <HeaderLogout />

                    <Title><h1>Timeline</h1></Title>
                    <AddPublication></AddPublication>
                    {publications?(publications.length===0?(<Title><h1>There are no posts yet</h1></Title>):(
                        publications.map((value,key)=>
                            <Publication 
                                key={key}
                                id={value.id}
                                text={value.text}
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
    }
 `