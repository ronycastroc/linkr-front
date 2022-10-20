import React from "react";
import GlobalStyle from "../assets/style/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import TimeLineExample from "./Pages/TimeLineExample";
import Header from "./header/Header";


export default function App() {
   return (
      <>
         <GlobalStyle />
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<SignIn />} />
               <Route path="/sign-up" element={<SignUp />} />
               <Route path="/timeline" element={<TimeLineExample />}/>              
               <Route path="/home" element={<Header/>} />
            </Routes>
         </BrowserRouter>
      </>
   );
}
