import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginSignUp from "./components/Register";
import Login from "./components/Login";
import AddPost from "./components/AddPost";
import PostCard from "./components/PostCard";
import Navbar from "./components/Navbar";
import MyPosts from "./components/MyPosts";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<LoginSignUp />} />
        <Route path="/myPosts" element={<MyPosts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addPost" element={<AddPost />} />
        <Route path="/singlePost" element={<PostCard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
