import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddPosts from "./Components/Posts/AddPosts";
import Posts from "./Components/Posts/Posts";
import AddCategory from "./Components/Category/AddCategory";
import Category from "./Components/Category/Category";
import SignUpPage from "./Components/Authentication/SignUpPage";
import SignInPage from "./Components/Authentication/SignInPage";
import Dashboard from "./Components/Main/Dashboard";
import Display from "./Components/Main/Display";
// import PostDetail from "./Components/Main/PostDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="display" element={<Display />} />
            <Route path="addpost" element={<AddPosts />} />
            <Route path="posts" element={<Posts />} />
            <Route path="addcat" element={<AddCategory />} />
            <Route path="category" element={<Category />} />
          </Route>
            {/* <Route path="/post/:id" element={<PostDetail/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
