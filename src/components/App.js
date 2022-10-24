
import GlobalStyle from "../assets/style/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./timeline/Timeline.js";
import Trending from "./hashtag/Trending";
import UserContext from "../contexts/Usercontext.js";
import { useState } from "react";
import SignIn from "./authComponents/SignIn";
import SignUp from "./authComponents/SignUp";
import HashtagPage from "./hashtag/HashtagPage"
import Overlay from "./authComponents/Overlay";

export default function App() {
   const [refresh, setRefresh] = useState(false)
   const [showLogout, setShowLogout] = useState(false);

   return (
      <>
         <GlobalStyle />
         <Overlay showLogout={showLogout} setShowLogout={setShowLogout}/>
         <BrowserRouter>
            <UserContext.Provider value={{ refresh, setRefresh, showLogout, setShowLogout }}>
               <Routes>
                  <Route path="/" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
                  <Route path="/timeline" element={<Timeline />} />
               </Routes>
            </UserContext.Provider>
         </BrowserRouter>
      </>
   );
};



