
import GlobalStyle from "../assets/style/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./timeline/Timeline.js";
import Trending from "./hashtag/Trending";
import UserContext from "../contexts/Usercontext.js";
import { useState } from "react";
import SignIn from "./authPages/SignIn";
import SignUp from "./authPages/SignUp";
import TimeLineExample from "./authPages/TimeLineExample";
import Header from "./header/Search";


export default function App() {
  const [refresh,setRefresh]=useState(false) 
  
  return (
      <>
         <GlobalStyle />
           <BrowserRouter>
           <UserContext.Provider value={{refresh,setRefresh}}>
            <Routes>
               
               <Route path="/" element={<SignIn />} />
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

