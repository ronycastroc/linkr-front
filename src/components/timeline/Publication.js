import {Snippet} from "./Snippet.js"
import{Button} from "./Button.js"
import UserContext from "../../contexts/Usercontext.js";
import { useContext, useState } from "react";
import styled from "styled-components";
import {postPublication} from "../../service/linkrService"

let userImage="https://assets.puzzlefactory.pl/puzzle/204/185/original.jpg"
let userName='victor';
const id=2; //pegar id junto com o localstorage

function Publication({name,image,text,url,urlImage,title,description}){

    return(
        <PublicationDiv>
            <WrapperH>
                <WrapperPublication>
                 <img src={urlImage}/>
                </WrapperPublication>
                <WrapperPublication>
                    <h1>{name}</h1>
                    <p>{text}</p>
                    <Snippet 
                        url={url} 
                        description={description} 
                        title={title} image={image}>
                    </Snippet>
                </WrapperPublication>
           </WrapperH>
        </PublicationDiv>

    )
}

function AddPublication(){
    const {refresh,setRefresh}=useContext(UserContext)
    const [link,setLink]=useState('');
    const [text,setText]=useState('');
    const [disabled,setDisabled]=useState(false);
    const [button,setButton]=useState('Publish')
    
    function createPost (e){
        e.preventDefault();
        let body = {id,text,"url":link};
        setDisabled(!disabled);
        setButton("Publishing...");
        postPublication(body)
        .then((answer)=>{
            setRefresh(!refresh)
        })
        .catch(()=>{
            alert("There was an error posting your link");
        })
        setButton("Publish");
        setDisabled(!disabled);
        
    }
    return(
        <AddPublicationDiv>
           <WrapperForm onSubmit={createPost}>
           <WrapperPublication>
            <img src="https://assets.puzzlefactory.pl/puzzle/204/185/original.jpg" alt="userImg"></img>
            </WrapperPublication>
           <WrapperPublication>
           <h1>What are you going to share today?</h1>
            <InputLink 
                placeholder = 'http://...'
                value = {link}
                required
                type="url"
                disabled = {disabled}
                onChange = {(e) => setLink(e.target.value)}
                >

            </InputLink>
            <InputText 
                placeholder = 'Awesome article about #javascript'
                disabled={disabled}
                value = {text}
                type = 'text'
                onChange = {(e) => setText(e.target.value)}
                >
            </InputText>
            <Button disabled={disabled} type='submit' >{button}</Button>
           </WrapperPublication>
           </WrapperForm>
            
        </AddPublicationDiv>
    )
}
export {Publication,AddPublication}

const WrapperPublication = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    align-items:normal;
    padding-left:20px;   
    h1{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
    }
    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
    }
`;
const PublicationDiv = styled.div`
    width: 611px;
    background: #171717;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    padding-top:20px;   
    padding-bottom:20px;
    padding-right:20px;
    margin-bottom:16px;
    img{
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
        display:block;
    }
`;

const AddPublicationDiv = styled(PublicationDiv)`
    background: #FFFFFF;
    min-height:209px;
    margin-bottom:30px;
    h1{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
        margin-bottom:10px;
    }
`;


const InputLink =styled.input`
    width: 503px;
    height: 30px;
    background: #EFEFEF;
    border-radius: 5px;
    border: 0;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
    margin-bottom:5px;      
    text-align: initial;

`;
const InputText = styled(InputLink)`
    min-height:66px;

`;
const WrapperH = styled.div`
    display:flex;

`
const WrapperForm=styled.form`
    display:flex;
`