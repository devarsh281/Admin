import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Side } from "./Components/Side";
import AddPosts from "./Components/Posts/AddPosts";
import Posts from "./Components/Posts/Posts";
import AddCategory from "./Components/Category/AddCategory";
import Category from "./Components/Category/Category";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Side />}></Route>
          <Route path="/addpost" element={<AddPosts />}></Route>
          <Route path="/posts" element={<Posts />}></Route>
          <Route path="/addcat" element={<AddCategory />}></Route>
          <Route path="/category" element={<Category />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
