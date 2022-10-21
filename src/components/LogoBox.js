import styled from "styled-components";
import React from "react";




export default function LogoBox() {
    return (
        <Wrapper>
            <div>
               <h1>linkr</h1>
               <h2>save, share and discover<br/> the best links on the web</h2>
            </div>            
         </Wrapper>
    )
}

const Wrapper = styled.div`
   width: 62%;
   height: 100vh;
   background-color: #151515;

      h1 {
         color: #FFFFFF;
         font-weight: 700;
         font-size: 6.6rem;
         margin-top: 28vh;
         margin-left: 10vw;
         font-family: 'Passion One', cursive;         
      }

      h2 {
         color: #FFFFFF;
         font-weight: 700;
         font-size: 2.5rem;
         margin-left: 10vw;
         font-family: 'Oswald', sans-serif;
      }
   
`;