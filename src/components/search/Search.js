import axios from "axios"
import {DebounceInput} from 'react-debounce-input';
import React, { useState } from "react"
import styled from "styled-components"
import {IoSearchOutline} from "react-icons/io5"
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { searchUser } from "../../service/linkrService";

export default function Search(){

    const [ searchs, setSearch ] = useState({followed: [], users: []})
    let navigate = useNavigate()

    async function SearchUsers(event){
        //event.preventDefault()
        const  {value} = event.target
        //console.log(value)
        if(!value){ 
            setSearch({followed: [], users: []})
            return
        }

        try{
           const resp = await searchUser(value)
           //console.log(resp.data)
            setSearch(resp.data)
        }catch {
          console.log("deu ruim na requisição")
        }
    }

    //console.log(searchs)
    return (
        <StyledHeader>
            <form onSubmit={SearchUsers}>
            <DebounceInput
                minLength={3}
                debounceTimeout={300}
                onChange={SearchUsers} 
                value={searchs.length === 0 ? "" : searchs.name}
                />

                <div className="search-icon">
                    <IconContext.Provider value={{ size: "21px", color: "#C6C6C6" }}>
                        <IoSearchOutline/>
                    </IconContext.Provider>
                </div>
            </form>
            {searchs.followed?.length > 0 || searchs.users?.length > 0
            ?   <div className="search-results">
                   {searchs["followed"].map((search, idx) => {
                        //console.log(search)
                        const delay = `${idx + 1}00ms`
                        return (
                            <ul key={idx}>
                                <li onClick={() => {navigate(`/user/${search.id}`); setSearch([])}} key={idx} style={{'--delay': delay}}><div className="avatar"><img src={search.urlImage}/></div>{search.name} <div className="bolinha"></div> <p>following</p></li>
                            </ul>
                        )
                   })} 

                    {searchs["users"].map((search, idx) => {
                        const delay = `${idx + 1}00ms`
                        return (
                            <ul key={idx}>
                                <li onClick={() => {navigate(`/user/${search.id}`); setSearch([])}} key={idx} style={{'--delay': delay}}><div className="avatar"><img src={search.urlImage}/></div>{search.name}</li>
                            </ul>
                        )
                   })}
                </div> 
            : ""}
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
    max-width: 563px;
    min-height: 45px;
    margin: 0 auto;
    background: #E7E7E7;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 50%;
    top: 13px;
    transform: translate(-50%);
    z-index: 7;   

    form {
        display: flex;
        align-items: center;
        background-color: white;
        border-radius: 8px;
    }

    input {
        border-radius: 8px;
        border: none;
        height: 45px;
        outline: none;
        flex: 1;
        padding: 0 17px;

        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #C6C6C6;
        width: 30vw;
        
    }

    .search-icon {
        margin-right: 17px;
        cursor: pointer;
    }

    .search-results {
        padding: 0 17px;
    }

    .search-results ul {
        overflow: hidden;
    }

    .search-results ul li {
        display: flex;
        align-items: center;
        margin-top: 14px;
        margin-bottom: 16px;
        cursor: pointer;
        position: relative;
        left: 100%;
        animation: rigthToLeft 0.5s ease-in;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-delay: var(--delay);

        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #515151;
    }

    .search-results ul li .avatar {
        margin-right: 12px;
        width: 50px;
        height: 50px;
        position: relative;
    }

    .search-results ul li .avatar img {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .search-results ul li .bolinha {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #C5C5C5;
        margin-top: 5px;
        margin-left: 5px;
    }

    .search-results ul li p {
        margin-left: 5px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #C5C5C5;
    }

    @keyframes rigthToLeft {
        0% {
            left: 100%;
        }

        50% {
            left: 100%
        }

        100% {
            left: 0;
        }
    }
    @media (max-width: 650px) {
        top: 80px;
        width: 90%;
        position: absolute;
  }
`