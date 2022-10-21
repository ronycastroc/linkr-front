import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postSignIn } from "../../service/linkrService";
import LogoBox from "../LogoBox";
import styled from "styled-components";
import React from "react";

export default function SignIn() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [disabledInput, setDisabledInput] = useState(false);

   const navigate = useNavigate();

   function sendForm(e) {
      e.preventDefault();
      setDisabledInput(true);

      const body = {
         email,
         password
      }

      postSignIn(body)
      .then((res) => {
         resetForm();
         setDisabledInput(false);
         localStorage.setItem("perfilImage", JSON.stringify(res.data.urlImage));
         localStorage.setItem("token", JSON.stringify(res.data.token));
         navigate("/timeline");
      })
      .catch((res) => {
         if(res.response.status === 401) {
            resetForm();            
            alert(`Seu email ou senha estão incorretos, digite novamente. (${res.response.status} - ${res.response.data})`);
            setDisabledInput(false);
            return;
         }
         resetForm();
         setDisabledInput(false);
         alert(`Algo deu errado, tente novamente. (${res.response.status} - ${res.response.data})`);
      })
   };

   function resetForm() {
      setEmail("");
      setPassword("");
   };

   return (
      <Wrapper>
         
         <LogoBox />

         <AuthBox>
            <form onSubmit={sendForm}>
               <FormContent>
                  <input type="email" name="email"
                  placeholder="e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={disabledInput}
                  />

                  <input type="password" name="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={disabledInput}
                  />

                  <button disabled={disabledInput}>Log In</button>

                  <Link to="/sign-up">
                     <p>First time? Create an account!</p> 
                  </Link>                     
                  
               </FormContent>
            </form>
         </AuthBox>

      </Wrapper>        
   );
};

const Wrapper = styled.div`
   display: flex;
`;

const AuthBox = styled.div`
   width: 38%;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
`;

const FormContent = styled.div`
   margin: 0 auto;
   width: 70%;
   min-height: 50vh;

   input {
      width: 100%;
      height: 60px;
      margin-bottom: 10px;
      border-radius: 6px;
      border: none;
      font-weight: 700;
      font-family: 'Oswald', sans-serif;
      font-size: 1.2rem;
      
   }

   input:focus {
      outline-color: #1877F2;
   }

   input::placeholder {
      color: #9F9F9F;
      padding-left: 10px;
      font-weight: 700;
      font-family: 'Oswald', sans-serif;
      font-size: 1.2rem;
    }

   button {
      margin-top: 3px;
      width: 100%;
      height: 60px;
      border: none;
      border-radius: 6px;
      font-weight: 700;
      font-family: 'Oswald', sans-serif;
      font-size: 1.2rem;
      background-color: #1877F2;
      color: #FFFFFF;
      cursor: pointer; 
      transition: 0.2s;
      position: relative;
   }

   button:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
   }

   p {
      text-align: center;
      margin-top: 15px;
      color: #FFFFFF;
      text-decoration: underline;

   }
`;

export { AuthBox, FormContent };
