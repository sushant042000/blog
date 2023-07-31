import React from "react";
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate=useNavigate()
  return (
    <header>
      <nav>
        <ul className="navbar">
          <li><a href="/">Home</a></li>
          <li><a href="/myPosts">My Posts</a></li>
          <li className="auth-buttons">
            <a href="/register">Register</a>
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
