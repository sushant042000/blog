import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';

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
import { hasCookies, loginUserStart } from "./Store/Slices/userSlice";
import { userApi } from "./API/api";
import Protected from "./components/Protected";

function App() {
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    dispatch(loginUserStart());
    const res = await userApi.getMyProfile();
    dispatch(hasCookies(res.data.data));
  };

  useEffect(() => {
    const token = Cookies.get("token");
    setToken(token);
    if (token) {
      fetchUserData();
    }
  }, [token]);

  return (
    <BrowserRouter>
      <NavBar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/single/:id" element={<SinglePost />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/setting"
          element={<Protected token={token} component={<Setting />} />}
        />
        <Route
          path="/myPosts"
          element={<Protected token={token} component={<MyPosts />} />}
        />
        <Route
          path="/update/:id"
          element={<Protected token={token} component={<UpdatePost />} />}
        />
        <Route
          path="/write"
          element={<Protected token={token} component={<Write />} />}
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
