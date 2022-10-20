import { useState } from "react";
import styled from "styled-components"
import { postPublication } from "../service/linkrService";

export default function Timeline(){
    const [disabled,setDisabled]=useState(false);
    const [button,setButton]=useState('Publish')
    const id=1; //pegar id junto com o localstorage
    



    let obj={
        "name":"vito",
        "img":"https://assets.puzzlefactory.pl/puzzle/204/185/original.jpg",
        "text":"POST MANEIRO",
        "link":"https://bootcampra.notion.site/Ter-a-13-09-Trabalhando-com-Branches-2b83967706ad4cd7a17917d96532bbad"
    };
    
    
    
    function Publication({name,image,text,link}){

        return(
            <PublicationDiv>
                <WrapperH>
                <WrapperPublication>
                    <img src={image}/>
                    </WrapperPublication>
                <WrapperPublication>
                    <h1>{name}</h1>
                   
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
        function createPost (e){
            e.preventDefault();
            let body = {id,text,"url":link};
            setDisabled(!disabled);
            setButton("Publishing...")
            postPublication(body)
            .then((answer)=>{
                setButton("Publish")
            })
            .catch(()=>{
                alert("There was an error posting your link");
                setButton("Publish");
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
                    disable={disabled}
                    onChange = {(e) => setLink(e.target.value)}
                    >

                </InputLink>
                <InputText 
                    placeholder = 'Awesome article about #javascript'
                    disable={disabled}
                    value = {text}
                    type = 'text'
                    onChange = {(e) => setText(e.target.value)}
                    >
                </InputText>
                <Button disable={disabled} type='submit' >{button}</Button>
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
                    <Publication image={obj.img} text={obj.text} link={obj.link} name={obj.name} ></Publication>
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