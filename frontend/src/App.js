import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LoginSignUp from "./components/Register";
import Login from "./components/Login";
import AddPost from "./components/AddPost";
import PostCard from "./components/PostCard";
function App() {
 return(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<LoginSignUp />} />
    <Route path="/login" element={<Login />} />
    <Route path="/addPost" element={<AddPost />} />
    <Route path="/singlePost" element={<PostCard />} />
  </Routes>
</BrowserRouter>
 )
}

export default App;
