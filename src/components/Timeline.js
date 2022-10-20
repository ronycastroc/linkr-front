import { useEffect, useState } from "react";
import styled from "styled-components"
import { postPublication,getPublications } from "../service/linkrService";


export default function Timeline(){
    const [publications,setPublications]=useState('');
    const [refresh,setRefresh]=useState(false)
    const [button,setButton]=useState('Publish')
    const id=2; //pegar id junto com o localstorage
    let userImage="https://assets.puzzlefactory.pl/puzzle/204/185/original.jpg"
    let userName='victor';
    
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



    function Snipet ({url,description,title,image}){
        return (
            <a href = {url} target="_blank" >
                <SnipetDiv>
                    <WrapperSnipetText>
                        <h1>{title}</h1>
                        <h2>{description}</h2>
                        <h3>{url}</h3>
                    </WrapperSnipetText>
                    <WrapperSnipetImg>
                    <img src={image}/>
                    </WrapperSnipetImg>
                </SnipetDiv>
            </a>
        )


    }
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
                    <Snipet url={url} description={description} title={title} image={image}
                    >

                    </Snipet>
                    
                    
                    
                </WrapperPublication>
               </WrapperH>


            </PublicationDiv>

        )
    }
    function Button({...otherProps}){
        return(
            <ButtonW {...otherProps}></ButtonW>
        )
    }

    function AddPublication(){
        const [link,setLink]=useState('');
        const [text,setText]=useState('');
        const [disabled,setDisabled]=useState(false);
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
    return(
        <Wrapper>
             <WrapperH>
                <Wrapper>
                
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
const WrapperPublication = styled(Wrapper)`
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

const ButtonW = styled.button`
    background: #1877F2;
    border-radius: 5px;
    width: 112px;
    height: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
    margin-left:391px;

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
const WrapperHashtag = styled(WrapperH)`


`
const SnipetDiv = styled(WrapperH)`
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    position: relative;
    margin-top:15px;
    
   
`
 const WrapperSnipetText=styled(Wrapper)`
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
 const WrapperSnipetImg=styled(Wrapper)`
    img{
        position:absolute;
        top:0;
        right:0;
        width: 153.44px;
        height: 155px;
        border-radius: 0px 11px  11px 0px;
    }
 `
 const Title=styled.div`
    width: 100%;
    margin-top: 53px;
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