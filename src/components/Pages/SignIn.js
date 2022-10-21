import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postSignIn } from "../../service/linkrService";
import LogoBox from "../LogoBox";
import styled from "styled-components";

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
      password,
    };

    postSignIn(body)
      .then((res) => {
        resetForm();
        setDisabledInput(false);
        localStorage.setItem("perfilImage", JSON.stringify(res.data.urlImage));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("userId", JSON.stringify(res.data.userId));
        console.log(res.data);

        navigate("/timeline");
      })
      .catch((res) => {
        if (res.response.status === 401) {
          resetForm();
          alert(
            `Seu email ou senha estão incorretos, digite novamente. (${res.response.status} - ${res.response.data})`
          );
          setDisabledInput(false);
          return;
        }
        resetForm();
        setDisabledInput(false);
        alert(
          `Algo deu errado, tente novamente. (${res.response.status} - ${res.response.data})`
        );
      });
  }

  function resetForm() {
    setEmail("");
    setPassword("");
  }

  return (
    <Wrapper>
      <LogoBox />

      <AuthBox>
        <form onSubmit={sendForm}>
          <FormContent>
            <input
              type="email"
              name="email"
              placeholder="e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={disabledInput}
            />

            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={disabledInput}
            />

            <Button
              data-back="Log In"
              data-front="Log In"
              disabled={disabledInput}
            ></Button>

            <Link to="/sign-up">
              <p>First time? Create an account!</p>
            </Link>
          </FormContent>
        </form>
      </AuthBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const AuthBox = styled.div`
  width: 38%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 650px) {
    width: 100%;
    align-items: initial;
    padding-top: 30px;
  }
`;

const FormContent = styled.div`
  margin: 0 auto;
  width: 80%;
  min-height: 50vh;

  input {
    width: 100%;
    height: 60px;
    margin-bottom: 10px;
    border-radius: 6px;
    border: none;
    font-weight: 700;
    font-family: "Oswald", sans-serif;
    font-size: 1.2rem;
  }

  input:focus {
    outline-color: #1877f2;
  }

  input::placeholder {
    color: #9f9f9f;
    padding-left: 10px;
    font-weight: 700;
    font-family: "Oswald", sans-serif;
    font-size: 1.2rem;
  }

  p {
    text-align: center;
    margin-top: 15px;
    color: #ffffff;
    text-decoration: underline;
  }

  @media (max-width: 650px) {
    width: 90%;

    input {
      height: 50px;
      font-size: 1.1rem;
    }

    input::placeholder {
      font-size: 1.1rem;
    }
  }
`;

const Button = styled.button`
  margin: 0 auto;
  opacity: 1;
  outline: 0;
  background-color: #1877f2;
  position: relative;
  text-align: center;
  letter-spacing: 1px;
  display: inline-block;
  text-decoration: none;
  width: 100%;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    &:after {
      opacity: 1;
      transform: translateY(0) rotateX(0);
    }

    &:before {
      opacity: 0;
      transform: translateY(50%) rotateX(90deg);
    }
  }

  &:after {
    line-height: 50px;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    color: #ffffff;
    display: block;
    transition: 0.5s;
    position: absolute;
    background: #151515;
    content: attr(data-back);
    transform: translateY(-50%) rotateX(90deg);
    border: none;
    border-radius: 6px;
    font-size: 1rem;

    @media (max-width: 650px) {
      line-height: 40px;
    }
  }

  &:before {
    line-height: 50px;
    width: 100%;
    top: 0;
    left: 0;
    opacity: 1;
    color: #ffffff;
    display: block;
    transition: 0.5s;
    position: relative;
    background: #1877f2;
    content: attr(data-front);
    transform: translateY(0) rotateX(0);
    border: none;
    font-size: 1rem;
    border-radius: 6px;

    @media (max-width: 650px) {
      line-height: 40px;
    }
  }
`;

export { AuthBox, FormContent, Button };
