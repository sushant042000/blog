import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import SinglePost from "./components/SinglePost";
import Home from "./Pages/Home";
import Posts from "./components/Posts";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Setting from "./Pages/Setting";

import { useDispatch } from "react-redux";
import Write from "./Pages/Write";

import MyPosts from "./Pages/MyPosts";
import UpdatePost from "./Pages/UpdatePost";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { hasCookies } from "./Store/Slices/userSlice";

function App() {
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    setToken(token);
    if (token) {
      dispatch(hasCookies());
    }
  }, [token]);

  return (
    <BrowserRouter>
      <NavBar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/single/:id" element={<SinglePost />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/myPosts" element={<MyPosts />} />
        <Route path="/update/:id" element={<UpdatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
