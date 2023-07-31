import React from 'react'
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

const Navbar2 = () => {
    const navigate=useNavigate();
  return (
    <nav>
          <ul className="navbar">
            <li>
              <a onClick={() => navigate("/")}>Home</a>
            </li>

            <li className="auth-buttons">
              <a onClick={() => navigate("/register")}>Register</a>
              <a onClick={() => navigate("/login")}>Login</a>
            </li>
          </ul>
        </nav>
  )
}

export default  Navbar2