import GlobalStyle from "../assets/style/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Timeline from "./Timeline";
import Trending from "./hashtag/Trending";

export default function App() {
   return (
      <>
         <GlobalStyle />
         
         <BrowserRouter>
            <Routes>
               
               <Route path="/" element={''} />
               <Route path="/timeline" element={<Timeline/>}/>
               <Route path="/hashtag" element={<Trending />} />
               
            </Routes>
         </BrowserRouter>
      </>
   );
};
