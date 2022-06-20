import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "./Home";
import Search from "./Search";
import Tv from "./Tv";

function UrlRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/tv" element={<Tv />}>
          <Route path="tv/:id" element={<Tv />} />
        </Route>
        <Route path="/" element={<Home />}>
          <Route path="movies/:id" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default UrlRoutes;
