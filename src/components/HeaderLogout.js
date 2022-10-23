import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import Search from "./header/Search";
import styled from "styled-components";

export default function HeaderLogout() {
    const [showLogout, setShowLogout] = useState(false);

    const navigate = useNavigate();

    const perfilImage = JSON.parse(localStorage.getItem("perfilImage"));

    function logout() {
        localStorage.clear();
        navigate("/");
    };

    return (
        <>        
            <Header>
                <Logo>
                    <h1>linkr</h1>
                </Logo>

                <Search />

                <ProfileLogout onClick={() => setShowLogout(!showLogout)}>
                    {showLogout ? 
                    (<IoChevronUpOutline className="io-up-down"/>) : 
                    (<IoChevronDownOutline className="io-up-down"/>)}
                    
                    <img src={perfilImage} alt="profile" />
                </ProfileLogout>
            </Header>

            <LogoutBar showLogout={showLogout} onClick={logout}>
                <p>Logout</p>
            </LogoutBar>
        </>
    )
};

const Header = styled.div`
    background-color: #151515;
    width: 100%;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 1;
`;

const Logo = styled.div`
    width: 150px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 3rem;
        color: #FFFFFF;
        font-weight: 700;
        font-family: 'Passion One', cursive;

    }
`;

const ProfileLogout = styled.div`
    width: 120px;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;

    img {
        width: 60px;
        height: 60px;
        border-radius: 100%;
        object-fit: cover;
    }

    .io-up-down {
        font-size: 35px;
        color: #FFFFFF;
    }

`;

const LogoutBar = styled.div`
    width: 120px;
    height: 50px;
    background-color: #151515;
    position: absolute;
    top: 72px;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 20px;
    position: fixed;
    transform: ${(props) => (props.showLogout ? "translateY(0)" : "translateY(-72px)")};
    transition: all 0.5s ease-out;
    cursor: pointer;

    p {
        font-weight: 700;
        color: #FFFFFF;
        font-size: 1rem;
    }
`;