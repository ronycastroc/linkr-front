
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
import TimelineUser from "./header/TimelineUser";


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
               <Route path="/user/:id" element={<TimelineUser />} />
              
            </Routes>
            </UserContext.Provider>
         </BrowserRouter>
      </>
   );
};

