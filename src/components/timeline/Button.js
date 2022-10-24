import styled from "styled-components";

function Button({...otherProps}){
    return(
        <ButtonW {...otherProps}></ButtonW>
    )
}
export{Button}
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
   
    
`;