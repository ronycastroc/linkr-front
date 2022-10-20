import React from "react";
import GlobalStyle from "../assets/style/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./header/Header";

export default function App() {
   return (
      <>
         <GlobalStyle />
         <BrowserRouter>
            <Routes>
               <Route path="/home" element={<Header/>} />
            </Routes>
         </BrowserRouter>
      </>
   );
}