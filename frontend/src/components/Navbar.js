import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/userApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUserStart,
  logoutUserSuccess,
} from "../strore/slices/userSlices";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      dispatch(logoutUserStart());
      const response = await userApi.logout();
      alert("Logged Out");
      dispatch(logoutUserSuccess());
      navigate("/");
    } catch (error) {
      const { status, statusText } = error.response;
      if (status === 401 && statusText === "Unauthorized") {
        alert("you already logged out");
      }
    }
  };
  return (
    <header>
      {isAuthenticated ? 
      
        <nav>
        <ul className="navbar">
          <li>
            <a style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              Home
            </a>
          </li>
          <li>
            <a
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/myPost")}
            >
              My Posts
            </a>
          </li>
          <li>
            <a
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/addPost")}
            >
              Add Post
            </a>
          </li>
          <li className="auth-buttons">
            <a style={{ cursor: "pointer" }} onClick={() => logout()}>
              Logout
            </a>
          </li>
          
        </ul>
      </nav> :
      <nav>
      <ul className="navbar">
        <li>
          <a style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Home
          </a>
        </li>
        <li>
          <a style={{ cursor: "pointer" }} onClick={() => navigate("/register")}>
            Register
          </a>
        </li>
        <li>
          <a style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
            Login
          </a>
        </li>
        
      </ul>
    </nav>}
    </header>
  );
};

export default Navbar;
