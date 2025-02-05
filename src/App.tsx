import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddPosts from "./components/posts/AddPosts";
import Posts from "./components/posts/Posts";
import AddCategory from "./components/category/AddCategory";
import Category from "./components/category/Category";
import SignUpPage from "./components/authentication/SignUpPage";
import SignInPage from "./components/authentication/SignInPage";
import Dashboard from "./components/main/Dashboard";
import Display from "./components/main/Display";
import PostDetail from "./components/main/PostDetail";

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
          <Route path="/post/:id" element={<PostDetail/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
