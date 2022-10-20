import GlobalStyle from "../assets/style/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeletePost from "./DeleteModal";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <h1>TESTE NPM START {/* APAGAR */}</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={""} />
          <Route path="/delete" element={<DeletePost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
