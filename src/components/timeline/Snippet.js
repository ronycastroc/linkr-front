import React from "react"
import styled from "styled-components"

function Snippet ({url,description,title,image}){
    return (
        <a href = {url} target="_blank" rel="noreferrer" >
            <SnippetDiv>
                <WrapperSnippetText>
                    <h1>{title}</h1>
                    <h2>{description}</h2>
                    <h3>{url}</h3>
                </WrapperSnippetText>
                <WrapperSnippetImg>
                <img src={image}/>
                </WrapperSnippetImg>
            </SnippetDiv>
        </a>
    )
};

export {Snippet}

const SnippetDiv = styled.div`
    display:flex;
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    position: relative;
    margin-top:15px;
    
   
`
const WrapperSnippetText=styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width:349.56px;
    padding:20px;
    justify-content: space-between;
    h1{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
        width:100%
    }
    h2{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
        width:100%
    }
    h3{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
        width:100%
    }
 `;
 const WrapperSnippetImg=styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    img{
        position:absolute;
        top:0;
        right:0;
        width: 154px;
        height: 154px;
        border-radius: 0px 11px  11px 0px;
    }
 `