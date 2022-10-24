import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postSignUp } from "../../service/linkrService";
import { AuthBox, FormContent, Button } from "./SignIn";
import LogoBox from "../LogoBox";
import styled from "styled-components";
import React from "react";

export default function SignUp() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [name, setName] = useState("");
   const [urlImage, setUrlImage] = useState("");
   const [disabledInput, setDisabledInput] = useState(false);

   const navigate = useNavigate();

   function sendForm(e) {
      e.preventDefault();
      setDisabledInput(true);

      const body = {
         email,
         password,
         confirmPassword,
         name,
         urlImage
      }

      if(password !== confirmPassword) {
         setPassword("");
         setConfirmPassword("");
         alert("Senhas não confere, digite novamente!");
         setDisabledInput(false);
         return;
      }

      if(password.length < 6) {
         setPassword("");
         setConfirmPassword("");
         alert("Senha deve ter 6 digitos ou mais!");
         setDisabledInput(false);
         return;
      }

      postSignUp(body)
      .then(() => {
         resetForm();
         setDisabledInput(false);
         navigate("/");
      })
      .catch((res) => {
         if(res.message === "Network Error") {
            resetForm();  
            alert(`Erro ao enviar requisição, tente novamente mais tarde. (${res.message})`);
            setDisabledInput(false);
            return;
         }

         if(res.response.status === 409) {
            setEmail("");            
            alert(`Email já cadastrado, digite outro email. (${res.response.status} - ${res.response.data})`);
            setDisabledInput(false);
            return;
         }
         
         resetForm();                
         alert(`Algo deu errado, tente novamente. (${res.response.status} - ${res.response.data})`);
         setDisabledInput(false);  
      })
   }

   function resetForm() {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUrlImage("");
  }

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
                  min="100000"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={disabledInput}
                  />

                  <input type="password" name="confirm-passwrod"
                  placeholder="confirm password"
                  min="100000"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={disabledInput}
                  />

                  <input type="text" name="username"
                  placeholder="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={disabledInput}
                  />

                  <input type="url" name="url-image"
                  placeholder="picture url"
                  value={urlImage}
                  onChange={(e) => setUrlImage(e.target.value)}
                  required
                  disabled={disabledInput}
                  />

                  <Button data-back="Sign Up" data-front="Sign Up" disabled={disabledInput}></Button>

                  <Link to="/">
                     <p>Switch back to log in</p> 
                  </Link>              
               </FormContent>
            </form>
         </AuthBox>
      </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;

    @media (max-width: 650px) {
    flex-direction: column;
  }
`;