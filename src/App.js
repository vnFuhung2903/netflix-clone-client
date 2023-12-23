import React from "react";
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import Movie from "./pages/Movies/Movie/Movie";
import TVs from "./pages/TVShows/TVs";
import TV from "./pages/TVShows/TV/TV";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Register from "./pages/Signup/Register/Register";
import List from "./pages/List/List";
import Query from "./pages/Query/Query";
import "./style.css";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/app" exact element={<Home/>}></Route>
          <Route path="/movies" exact element={<Movies/>}></Route>
          <Route path="/movie/:id" exact element={<Movie/>}></Route>
          <Route path="/tvs" exact element={<TVs/>}></Route>
          <Route path="/tv/:id" exact element={<TV/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/register" exact element={<Register/>}></Route>
          <Route path="/list" element={<List/>}></Route>
          <Route path="/query/:search?" element={<Query/>}></Route>
          <Route path="*" element={<Navigate to={"/app"}/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
