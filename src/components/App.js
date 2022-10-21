import React from "react";
import GlobalStyle from "../assets/style/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./timeline/Timeline.js";
import Trending from "./hashtag/Trending";
import UserContext from "../contexts/Usercontext.js";
import { useState } from "react";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import TimeLineExample from "./Pages/TimeLineExample";
import Header from "./header/Header";


export default function App() {
  const [refresh,setRefresh]=useState(false) 
  
  return (
      <>
         <GlobalStyle />
           <BrowserRouter>
           <UserContext.Provider value={{refresh,setRefresh}}>
            <Routes>
               
               <Route path="/" element={''} />
               <Route path="/sign-up" element={<SignUp />} />
               <Route path="/home" element={<Header/>} />
               <Route path="/timeline" element={<Timeline/>}/>
               <Route path="/hashtag" element={<Trending />} />
               
            </Routes>
            </UserContext.Provider>
         </BrowserRouter>
      </>
   );
};

