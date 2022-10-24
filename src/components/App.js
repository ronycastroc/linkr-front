
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
import HashtagPage from "./hashtag/HashtagPage"
import PrivatePage from "../PrivatePage.js";

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
               <Route path="/home" element={<PrivatePage><Header/></PrivatePage>} />
               <Route path="/hashtag/:hashtag" element={<PrivatePage><HashtagPage /></PrivatePage>} />  
               <Route path="/timeline" element={<PrivatePage><Timeline/></PrivatePage>}/>
                            
            </Routes>
            </UserContext.Provider>
         </BrowserRouter>
      </>
   );
};

