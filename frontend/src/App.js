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
function App() {
  const { isAuthenticated, error } = useSelector((state) => state.user);
  console.log("in app", isAuthenticated);
  // <Route path="/myPost" element={ isAuthenticated ? <MyPosts />: <Login/>} />

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<LoginSignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addPost" element={<AddPost />} />
        <Route path="/singlePost" element={<PostCard />} />
        <Route
          path="/myPost"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} component={<MyPosts/>}>
              <MyPosts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
