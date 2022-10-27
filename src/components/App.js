
import GlobalStyle from "../assets/style/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./timeline/Timeline.js";
import UserContext from "../contexts/Usercontext.js";
import { useState } from "react";
import SignIn from "./authComponents/SignIn";
import SignUp from "./authComponents/SignUp";
import HashtagPage from "./hashtag/HashtagPage"
import Overlay from "./authComponents/Overlay";
import PrivatePage from "../PrivatePage.js";
import TimelineUser from "./timeline/TimelineUser";

export default function App() {
   const [refresh, setRefresh] = useState(true)
   const [showLogout, setShowLogout] = useState(false);

   return (
      <>
         <GlobalStyle />
         <BrowserRouter>
            <Overlay showLogout={showLogout} setShowLogout={setShowLogout} />
            <UserContext.Provider value={{ refresh, setRefresh, showLogout, setShowLogout }}>
               <Routes>
                  <Route path="/" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/hashtag/:hashtag" element={<PrivatePage><HashtagPage /></PrivatePage>} />
                  <Route path="/timeline" element={<PrivatePage><Timeline /></PrivatePage>} />
                  <Route path="/user/:id" element={<TimelineUser/>} />
               </Routes>
            </UserContext.Provider>
         </BrowserRouter>
      </>
   );
};



