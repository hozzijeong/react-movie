import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import Tv from "./Tv";

function UrlRoutes() {
  <BrowserRouter>
    <Routes>
      <Route path="/search" element={<Search />} />
      <Route path="/tv:id" element={<Tv />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>;
}

export default UrlRoutes;
