import GlobalStyle from "../assets/style/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trending from "./hashtag/Trending";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={""} />
        </Routes>
        <Routes>{<Route path="/hashtag" element={<Trending />} />}</Routes>
      </BrowserRouter>
    </>
  );
}
