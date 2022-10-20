import { useState } from "react";
import styled from "styled-components"
import { postPublication } from "../service/linkrService";

export default function Timeline(){
    
    const [button,setButton]=useState('Publish')
    const id=1; //pegar id junto com o localstorage
    let obj={
        "id": "1",
        "text": "essa familia é muito unidas",
        "url": "https://www.hltv.org/matches/2359381/astralis-vs-eternal-fire-blast-premier-fall-showdown-2022-europe",
        "description": "Complete overview of the Astralis vs. Eternal Fire matchup at BLAST Premier Fall Showdown 2022 Europe!",
        "image": "https://api.url2png.com/v6/PC48C7F6DF901A9/b7bd0f4355ed8b93df2832a1cc845e38/png/?url=https%3A%2F%2Fwww.hltv.org%2Fmatches%2Fpicture%2F2359381&user_agent=url2pngsecret&thumbnail_max_width=800&viewport=800x418&unique=v2_6665_11251_p_4954_7412_13300_15165_21199_7938_8574_9353_15835_19187",
        "title": "Astralis vs Eternal Fire at BLAST Premier Fall Showdown 2022 Europe"
      }
    let userImage="https://assets.puzzlefactory.pl/puzzle/204/185/original.jpg"
    let userName='vito';
      
    function Snipet ({url,description,title,image}){
        return (
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
        )


    }
    function Publication({name,image,text,url,profileImg,title,description}){

        return(
            <PublicationDiv>
                <WrapperH>
                <WrapperPublication>
                    <img src={profileImg}/>
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
                alert('chego no then')
                setButton("Publish");
                setDisabled(!disabled);
            })
            .catch(()=>{
                alert("There was an error posting your link");
                setButton("Publish");
                setDisabled(!disabled);

            })
            console.log(body)
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
                    <AddPublication></AddPublication>
                    <Publication 
                    id={obj.id}
                    text={obj.text}
                    url={obj.url}
                    description={obj.description}
                    image={obj.image}
                    title={obj.title}  
                    profileImg={userImage}
                    name={userName}
                    ></Publication>
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
    margin-left:18px;   
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
    min-height: 276px;
    background: #171717;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    padding-top:16px;   
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

`
 const WrapperSnipetText=styled(Wrapper)`
    width:349.56px;
    h1{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
    }
    h2{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
    }
    h3{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
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