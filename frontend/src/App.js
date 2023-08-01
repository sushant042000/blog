import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginSignUp from "./components/Register";
import Login from "./components/Login";
import AddPost from "./components/AddPost";
import PostCard from "./components/PostCard";
import Navbar from "./components/Navbar";
import MyPosts from "./components/MyPosts";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Navbar2 from "./components/NavBar2";
import BlogDetail from "./components/BlogDetail";
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState();
  const { isAuthenticated } = useSelector((state) => state.user);
  const Auth = (token) => {
    setAuthenticated(true);
    setToken(token);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    token ? Auth(token) : setAuthenticated(false);
    console.log("token app", token);
  }, [token]);

  // console.log("token app", token);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<LoginSignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addPost" element={<AddPost />} />
        <Route path="/singlePost" element={<PostCard />} />
        <Route path="/myPost" element={<MyPosts />} />
        <Route path="/blogDetail/:id" element={<BlogDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
